export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { db } from '@/database/config';
import { courses, enrollments, payments, users } from '@/database/schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { eq, count, sum } from 'drizzle-orm';

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return null;
  const user = session.user as { role?: string };
  if (user.role !== 'admin') return null;
  return session.user;
}

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Run all queries in parallel
    const [
      totalCoursesResult,
      totalStudentsResult,
      activeEnrollmentsResult,
      totalRevenueResult,
    ] = await Promise.all([
      db.select({ count: count() }).from(courses),
      db.select({ count: count() }).from(users),
      db.select({ count: count() }).from(enrollments).where(eq(enrollments.status, 'active')),
      db.select({ total: sum(payments.amount) }).from(payments).where(eq(payments.status, 'completed')),
    ]);

    return NextResponse.json({
      totalCourses: totalCoursesResult[0]?.count ?? 0,
      totalStudents: totalStudentsResult[0]?.count ?? 0,
      activeEnrollments: activeEnrollmentsResult[0]?.count ?? 0,
      totalRevenue: Number(totalRevenueResult[0]?.total ?? 0),
    });
  } catch (error: any) {
    console.error('GET /api/admin/stats error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
