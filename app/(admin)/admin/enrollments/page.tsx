"use client";

import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function EnrollmentsAdminPage() {
  return (
    <AdminAuthGuard>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            Manage Enrollments
          </h1>
          <p className="text-gray-600 mt-2">
            View student enrollments across all batches.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Student Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 italic pb-8">
              No student enrollments yet. More dynamic Drizzle integration coming soon!
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminAuthGuard>
  );
}
