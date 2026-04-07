import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database/config';
import { courses } from '@/database/schema';
import { auth } from '@/lib/auth';
import { desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

async function requireAdmin(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return null;
  }
  const user = session.user as { role?: string };
  if (user.role !== 'admin') {
    return null;
  }
  return session.user;
}

// GET /api/admin/courses — list all courses (admin)
export async function GET(request: NextRequest) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allCourses = await db.select().from(courses).orderBy(desc(courses.createdAt));
    return NextResponse.json({ courses: allCourses });
  } catch (error: any) {
    console.error('GET /api/admin/courses error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/admin/courses — create a new course
export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      slug,
      price,
      currency = 'PKR',
      isActive = true,
      zoomClassesPerWeek = 3,
      classDurationMinutes = 45,
      zoomJoinLink,
      materialsUrl,
      imageUrl,
    } = body;

    if (!title || !description || !slug || price === undefined) {
      return NextResponse.json(
        { error: 'title, description, slug, and price are required' },
        { status: 400 }
      );
    }

    const [newCourse] = await db
      .insert(courses)
      .values({
        title,
        description,
        slug,
        price: Number(price),
        currency,
        isActive,
        zoomClassesPerWeek: Number(zoomClassesPerWeek),
        classDurationMinutes: Number(classDurationMinutes),
        zoomJoinLink: zoomJoinLink || null,
        materialsUrl: materialsUrl || null,
        imageUrl: imageUrl || null,
      })
      .returning();

    revalidatePath('/');
    revalidatePath('/courses');
    revalidatePath('/admin/courses');

    return NextResponse.json({ course: newCourse }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/admin/courses error:', error);
    if (error.code === '23505') {
      return NextResponse.json({ error: 'A course with this slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
