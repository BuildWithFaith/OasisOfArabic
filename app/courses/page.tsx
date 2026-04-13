import type { Metadata } from "next";
import CoursesPageClient from "./courses-client";
import { getActiveCourses } from "@/app/data/courses";

export const metadata: Metadata = {
  title: "Arabic Courses",
  description:
    "Explore our premium Arabic language courses at Oasis of Arabic. Live Zoom classes, expert instructors, and flexible schedules for all levels.",
  keywords: ["Arabic courses", "Learn Arabic", "Zoom Arabic classes", "Quran Arabic"],
};

export default async function CoursesPage() {
  const courses = await getActiveCourses();
  
  return <CoursesPageClient initialCourses={courses} />;
}
