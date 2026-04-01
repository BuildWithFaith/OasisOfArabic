"use client";

import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function CoursesAdminPage() {
  return (
    <AdminAuthGuard>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-green-600" />
            Manage Courses
          </h1>
          <p className="text-gray-600 mt-2">
            Add, update, or remove courses for the Oasis of Arabic platform.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Course List</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 italic pb-8">
              No courses configured yet. More dynamic Drizzle integration coming soon!
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminAuthGuard>
  );
}
