import { NextResponse, connection } from 'next/server';
import { db } from '@/database/config';
import { courses } from '@/database/schema';
import { eq, asc } from 'drizzle-orm';

// GET /api/courses — public endpoint, returns all active courses
export async function GET() {
  await connection(); // opt out of static prerendering
  try {
    const activeCourses = await db
      .select()
      .from(courses)
      .where(eq(courses.isActive, true))
      .orderBy(asc(courses.createdAt));

    return NextResponse.json({ courses: activeCourses });
  } catch (error: any) {
    console.error('GET /api/courses error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
