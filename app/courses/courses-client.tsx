"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Video,
  Clock,
  GraduationCap,
  Star,
  Users,
  BookOpen,
  Loader2,
  Search,
  SlidersHorizontal,
  Image as ImageIcon,
  CheckCircle,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  price: number;
  currency: string;
  isActive: boolean;
  zoomClassesPerWeek: number;
  classDurationMinutes: number;
  zoomJoinLink: string | null;
  materialsUrl: string | null;
  imageUrl: string | null;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

const features = [
  { icon: Video, label: "Live Zoom Classes" },
  { icon: GraduationCap, label: "Expert Instructors" },
  { icon: BookOpen, label: "Structured Curriculum" },
  { icon: Users, label: "Small Group Sessions" },
];

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col">
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-green-100 to-emerald-50 overflow-hidden">
        {course.imageUrl ? (
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <span className="text-5xl">🌿</span>
            <span className="text-green-600 font-semibold text-sm">Oasis of Arabic</span>
          </div>
        )}
        {/* Price badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-white/95 backdrop-blur-sm text-green-700 font-bold px-3 py-1 rounded-full text-sm shadow-sm">
            {course.currency} {course.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-xl leading-snug mb-2 group-hover:text-green-700 transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-5 flex-1">
          {course.description}
        </p>

        {/* Class details */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-blue-50 px-3 py-1.5 rounded-full">
            <Video className="w-3.5 h-3.5 text-blue-500" />
            {course.zoomClassesPerWeek}x per week
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-purple-50 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5 text-purple-500" />
            {course.classDurationMinutes} min/class
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-green-50 px-3 py-1.5 rounded-full">
            <Star className="w-3.5 h-3.5 text-green-500" />
            Live Zoom
          </div>
        </div>

        {/* What's included */}
        <div className="mb-5 space-y-1.5">
          {["Live interactive classes", "Expert Arabic instruction", "Course materials included"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={`/auth/login?redirect=/checkout?course=${course.id}`}
          className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors shadow-sm hover:shadow-md"
        >
          Enroll Now →
        </Link>
      </div>
    </div>
  );
}

export default function CoursesPageClient({ initialCourses }: { initialCourses: Course[] }) {
  const [search, setSearch] = useState("");

  const filtered = initialCourses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <GraduationCap className="w-4 h-4" />
            Premium Arabic Learning
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Master Arabic with{" "}
            <span className="text-emerald-300">Expert Guidance</span>
          </h1>
          <p className="text-lg sm:text-xl text-green-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Live Zoom classes with qualified instructors. Learn Quranic Arabic, Modern Standard Arabic,
            and Arabic Grammar — from beginner to advanced.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full border border-white/20"
              >
                <Icon className="w-4 h-4 text-emerald-300" />
                {label}
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 placeholder-gray-400 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {search ? `Results for "${search}"` : "Available Courses"}
            </h2>
            <p className="text-gray-400 mt-1 text-sm">
              {filtered.length} course{filtered.length !== 1 ? "s" : ""} available
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <SlidersHorizontal className="w-4 h-4" />
            All levels
          </div>
        </div>

        {/* No courses */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🌿</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {search ? "No courses match your search" : "Courses Coming Soon"}
            </h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              {search
                ? "Try a different search term or browse all courses."
                : "We're preparing amazing Arabic courses. Check back soon or contact us!"}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-green-600 hover:text-green-700 font-semibold underline underline-offset-2"
              >
                Clear search
              </button>
            )}
            {!search && (
              <Link
                href="/contact"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                Contact Us →
              </Link>
            )}
          </div>
        )}

        {/* Courses Grid */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 bg-gradient-to-br from-green-800 to-emerald-700 rounded-3xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Not sure which course? Ask us!</h2>
          <p className="text-green-100 mb-8 max-w-lg mx-auto">
            Our team is happy to help you choose the right Arabic course based on your goals and level.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-green-700 font-bold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors shadow-sm"
            >
              Contact Us
            </Link>
            <a
              href="mailto:founder@OasisOfArabic.com"
              className="border-2 border-white/50 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
