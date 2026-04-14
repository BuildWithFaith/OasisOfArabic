---
name: Next.js 16 (15+) Caching & Render Architecture
description: "Best practices and mental model for Next.js 16 'use cache', cacheTag, cacheLife, Partial Prerendering (PPR), and escaping caching boundaries correctly."
---

# Next.js 16 Caching & Render Architecture

This skill outlines the modern Next.js 16 layout, rendering, and caching paradigm, updated to reflect the stable 16.2.3 and 15+ documentation.
Historically implicit behaviors and experimental flags (`ppr`, `dynamicIO`) have now unified into **explicit Cache Components**. 

## 1. The Core Mental Model
In Next.js 16, **you must explicitly declare what gets cached** using the `"use cache"` directive.
- Pre-rendering behavior relies on explicit directives rather than route-level config macros like `export const dynamic = 'force-static'`.
- Granular cache timeouts and profiles are provided via `cacheLife()`.
- Explicit invalidation is done by tagging segments with `cacheTag()` and running `revalidateTag()` via Server Actions.

## 2. Setting Up the Cached Data Access Layer
Data queries should live in their own file/layer and employ cache directives. 

```typescript
// app/data/movies.ts
import { db } from '@/database/config';
import { cacheTag, cacheLife } from 'next/cache';

export async function getActiveMovies() {
  'use cache';
  cacheLife('hours'); // Using explicit cache profiles (max, days, hours, minutes, seconds)
  cacheTag('movies'); // Apply a granular string tag for subsequent revalidation
  
  return await db.select().from(movies).where({ isActive: true });
}
```
**Important:** Do not place `"use cache"` inside your Server Actions (mutations) or mix them in identical files. Isolate the data reads cleanly!

## 3. Server Actions & Cache Invalidation
When modifying data via Forms or Buttons (Save, Delete, Update), use mutating Server Actions. They must bust the explicit cache tag previously provided:

```typescript
// app/actions/movies.ts
'use server';
import { revalidateTag } from 'next/cache';
import { db } from '@/database/config';

export async function createMovie(title: string) {
  // 1. Mutate DB
  await db.insert(movies).values({ title });
  
  // 2. Invalidate identical tag
  revalidateTag('movies');
  
  return { success: true };
}
```

## 4. Escaping the Cache & Dealing with Dynamic Data
When using `"use cache"`, your function becomes static for its designated lifetime. **You cannot access standard Dynamic APIs (e.g. `searchParams`, `cookies()`, `headers()`) from within it.** The compiler will throw an error or the request will timeout because it cannot resolve request-specific parameters offline.

### Passing Dynamic Data Safely ✅
Read your dynamic properties *outside* the `"use cache"` boundary and pass them as arguments to the caching function. The Next.js caching layer automatically converts these arguments into cache keys.

```tsx
import { getMovieBySearch } from '@/app/data/movies';

export default async function Page({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  // Read outside the cache boundary
  const { query } = await searchParams;
  
  // Pass dynamic inputs safely down into the cached component/function
  return <MovieResults query={query} />;
}

// Automatically keys cache by 'query' string!
async function MovieResults({ query }: { query?: string }) {
  'use cache';
  const results = await getMovieBySearch(query);
  return <div>{...}</div>
}
```

### Suspending Dynamic APIs for PPR ✅
To ensure Partial Prerendering (PPR) succeeds, if you have a purely dynamic UI boundary (like displaying user cookies), wrap it in `<Suspense>`. This separates the static Page shell from the dynamic injected UI segment:

```tsx
import { Suspense } from 'react';
import { cookies } from 'next/headers';

async function UserBadge() {
  const cookieStore = await cookies();
  const session = cookieStore.get('auth');
  return <span>{session ? 'Logged in' : 'Guest'}</span>;
}

export default function ShellLayout() {
  return (
    <nav>
      <span>My Application</span>
      <Suspense fallback={<span>Loading Profile...</span>}>
         <UserBadge />
      </Suspense>
    </nav>
  );
}
```

## 5. Opting Out of Prerendering Manually
If you need to strictly halt static prerendering for a specific Server Component and force it dynamically on request manually, utilize the `connection()` function from `next/server`.

```tsx
import { connection } from 'next/server';

export default async function DynamicComponent() {
  await connection(); // Halts prerendering here; forces request-time execution
  
  const token = generateRandomToken();
  return <div>Generated: {token}</div>;
}
```

---
**Summary Checklist for Next.js 16 Caching Architecture**
- [ ] Centralize fetch logic into `data/*.ts` using `"use cache"`, `cacheTag()`, and optionally `cacheLife()`.
- [ ] Connect Server Actions directly to database queries followed seamlessly with `revalidateTag('my_tag')`.
- [ ] DO NOT query `await searchParams()`, `cookies()`, or `headers()` inside a `"use cache"` boundary.
- [ ] Push un-cached dynamic UI operations underneath parents mapped inside a `<Suspense>` wrapper.
- [ ] Rely on `connection()` to explicitly flag highly-dynamic random behavior when necessary.
