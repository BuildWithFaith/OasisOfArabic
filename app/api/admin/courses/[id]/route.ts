import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database/config';
import { courses } from '@/database/schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { unlink } from 'fs/promises';
import path from 'path';

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
    const filePath = path.join(process.cwd(), 'public', imageUrl);
    await unlink(filePath);
  } catch (error) {
    console.error(`Failed to delete old image ${imageUrl}:`, error);
  }
}

type RouteContext = { params: Promise<{ id: string }> };

// PUT /api/admin/courses/[id] — update a course
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();

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
    } = body;

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

    // Retrieve existing course to check if image was replaced
    const [existingCourse] = await db
      .select()
      .from(courses)
      .where(eq(courses.id, id));

    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const [updated] = await db
      .update(courses)
      .set(updateData)
      .where(eq(courses.id, id))
      .returning();

    // If updating imageUrl and it changed, delete the old image
    if (imageUrl !== undefined && existingCourse.imageUrl && existingCourse.imageUrl !== imageUrl) {
      await deleteLocalImage(existingCourse.imageUrl);
    }

    revalidatePath('/');
    revalidatePath('/courses');
    revalidatePath('/admin/courses');

    return NextResponse.json({ course: updated });
  } catch (error: any) {
    console.error('PUT /api/admin/courses/[id] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/courses/[id] — delete a course
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    // Retrieve existing course to get image url before deletion
    const [existingCourse] = await db
      .select()
      .from(courses)
      .where(eq(courses.id, id));

    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const [deleted] = await db
      .delete(courses)
      .where(eq(courses.id, id))
      .returning();

    if (existingCourse.imageUrl) {
      await deleteLocalImage(existingCourse.imageUrl);
    }

    revalidatePath('/');
    revalidatePath('/courses');
    revalidatePath('/admin/courses');

    return NextResponse.json({ success: true, deleted });
  } catch (error: any) {
    console.error('DELETE /api/admin/courses/[id] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
