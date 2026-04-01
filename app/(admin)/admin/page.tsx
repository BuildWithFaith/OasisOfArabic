"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, DollarSign, CheckCircle2, Calendar, Activity } from "lucide-react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboard() {
  const router = useRouter();

  // Dummy stats for the NextJS build, dynamic Drizzle queries will be added later
  const stats = {
    totalRevenue: 0,
    activeEnrollments: 0,
    totalCourses: 0,
    totalStudents: 0
  };

  return (
    <AdminAuthGuard>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-600 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Oasis of Arabic Platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success" className="text-sm px-3 py-1">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              System Online
            </Badge>
            <Badge variant="info" className="text-sm px-3 py-1">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date().toLocaleDateString()}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(stats.totalRevenue)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Active Enrollments</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {stats.activeEnrollments}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
             <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Available Courses</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {stats.totalCourses}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
