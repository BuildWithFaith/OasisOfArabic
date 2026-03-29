import { db } from '../../database/config';
import { courses } from '../../database/schema';
import { eq } from 'drizzle-orm';
import { Course } from '../types';

export class CourseService {
  static async getAllCourses(): Promise<Course[]> {
    const allCourses = await db.select().from(courses);
    return allCourses as Course[];
  }

  static async getCourseBySlug(slug: string): Promise<Course | null> {
    const results = await db
      .select()
      .from(courses)
      .where(eq(courses.slug, slug))
      .limit(1);
    
    return (results[0] as Course) || null;
  }

  static async getCourseById(id: string): Promise<Course | null> {
    const results = await db
      .select()
      .from(courses)
      .where(eq(courses.id, id))
      .limit(1);
    
    return (results[0] as Course) || null;
  }
}
