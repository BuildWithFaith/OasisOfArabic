'use server';

import { db } from '@/database/config';
import { courses } from '@/database/schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { unlink } from 'fs/promises';
import { join } from 'path';

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return null;
  const user = session.user as { role?: string };
  if (user.role !== 'admin') return null;
  return session.user;
}

async function deleteLocalImage(imageUrl?: string | null) {
  if (!imageUrl) return;
  if (!imageUrl.startsWith('/uploads/')) return;
  
  try {
    const filePath = join(process.cwd(), 'public', imageUrl);
    await unlink(filePath);
  } catch (error) {
    console.error(`Failed to delete old image ${imageUrl}:`, error);
  }
}

export async function createCourseAction(formData: any) {
  const admin = await requireAdmin();
  if (!admin) throw new Error('Unauthorized');

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
  } = formData;

  if (!title || !description || !slug || price === undefined) {
    throw new Error('title, description, slug, and price are required');
  }

  try {
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

    // Cache tagging invalidation
    // @ts-expect-error Next.js 16 types mismatch for revalidateTag arguments
    revalidateTag('courses');

    return { course: newCourse };
  } catch (error: any) {
    if (error.code === '23505') {
      throw new Error('A course with this slug already exists');
    }
    throw error;
  }
}

export async function updateCourseAction(id: string, formData: any) {
  const admin = await requireAdmin();
  if (!admin) throw new Error('Unauthorized');

  const {
    title,
    description,
    slug,
    price,
    currency,
    isActive,
    zoomClassesPerWeek,
    classDurationMinutes,
    zoomJoinLink,
    materialsUrl,
    imageUrl,
  } = formData;

  const updateData: Record<string, unknown> = {
    updatedAt: new Date(),
  };

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (slug !== undefined) updateData.slug = slug;
  if (price !== undefined) updateData.price = Number(price);
  if (currency !== undefined) updateData.currency = currency;
  if (isActive !== undefined) updateData.isActive = isActive;
  if (zoomClassesPerWeek !== undefined) updateData.zoomClassesPerWeek = Number(zoomClassesPerWeek);
  if (classDurationMinutes !== undefined) updateData.classDurationMinutes = Number(classDurationMinutes);
  if (zoomJoinLink !== undefined) updateData.zoomJoinLink = zoomJoinLink;
  if (materialsUrl !== undefined) updateData.materialsUrl = materialsUrl;
  if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

  const [existingCourse] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, id));

  if (!existingCourse) {
    throw new Error('Course not found');
  }

  const [updated] = await db
    .update(courses)
    .set(updateData)
    .where(eq(courses.id, id))
    .returning();

  if (imageUrl !== undefined && existingCourse.imageUrl && existingCourse.imageUrl !== imageUrl) {
    await deleteLocalImage(existingCourse.imageUrl);
  }

  // Cache tagging invalidation
  // @ts-expect-error Next.js 16 types mismatch for revalidateTag arguments
  revalidateTag('courses');

  return { course: updated };
}

export async function deleteCourseAction(id: string) {
  const admin = await requireAdmin();
  if (!admin) throw new Error('Unauthorized');

  const [existingCourse] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, id));

  if (!existingCourse) {
    throw new Error('Course not found');
  }

  const [deleted] = await db
    .delete(courses)
    .where(eq(courses.id, id))
    .returning();

  if (existingCourse.imageUrl) {
    await deleteLocalImage(existingCourse.imageUrl);
  }

  // Cache tagging invalidation
  // @ts-expect-error Next.js 16 types mismatch for revalidateTag arguments
  revalidateTag('courses');

  return { success: true, deleted };
}

export async function revalidateCoursesCacheAction() {
  const admin = await requireAdmin();
  if (!admin) throw new Error('Unauthorized');

  // @ts-expect-error Next.js 16 types mismatch for revalidateTag arguments
  revalidateTag('courses');
  return { success: true };
}
