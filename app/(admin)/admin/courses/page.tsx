import CoursesAdminClient from "./courses-admin-client";
import { getAllCourses } from "@/app/data/courses";

export const metadata = {
  title: "Admin - Manage Courses",
};

export default async function CoursesAdminPage() {
  const courses = await getAllCourses();

  // Convert Date objects to strings since they pass boundary to client component
  const serializedCourses = courses.map(c => ({
    ...c,
    createdAt: new Date(c.createdAt).toISOString(),
    updatedAt: c.updatedAt ? new Date(c.updatedAt).toISOString() : "",
  }));

  return <CoursesAdminClient initialCourses={serializedCourses} />;
}
