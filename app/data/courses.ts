import { db } from '@/database/config';
import { courses } from '@/database/schema';
import { eq, asc, desc } from 'drizzle-orm';
import { cacheTag } from 'next/cache';

// Fetch only active courses (for public facing pages)
export async function getActiveCourses() {
  'use cache';
  cacheTag('courses');
  
  try {
    const activeCourses = await db
      .select()
      .from(courses)
      .where(eq(courses.isActive, true))
      .orderBy(asc(courses.createdAt));
      
    return activeCourses;
  } catch (error) {
    console.error('Failed to fetch active courses:', error);
    return [];
  }
}

// Fetch all courses (for admin pages)
export async function getAllCourses() {
  'use cache';
  cacheTag('courses');
  
  try {
    const allCourses = await db
      .select()
      .from(courses)
      .orderBy(desc(courses.createdAt));
      
    return allCourses;
  } catch (error) {
    console.error('Failed to fetch all courses:', error);
    return [];
  }
}
