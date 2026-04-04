"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  DollarSign,
  CheckCircle2,
  Calendar,
  Activity,
  Loader2,
  TrendingUp,
  GraduationCap,
} from "lucide-react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import Link from "next/link";

interface Stats {
  totalRevenue: number;
  activeEnrollments: number;
  totalCourses: number;
  totalStudents: number;
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bg,
  prefix = "",
  suffix = "",
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bg: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium mb-2">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>
            {prefix}
            {typeof value === "number" ? value.toLocaleString() : value}
            {suffix}
          </p>
        </div>
        <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-7 h-7 ${color}`} />
        </div>
      </div>
    </div>
  );
}

const quickLinks = [
  {
    href: "/admin/courses",
    label: "Manage Courses",
    icon: BookOpen,
    description: "Add, edit, or remove courses",
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    href: "/admin/enrollments",
    label: "View Enrollments",
    icon: GraduationCap,
    description: "See all student enrollments",
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    href: "/courses",
    label: "View Public Site",
    icon: TrendingUp,
    description: "See what students see",
    color: "bg-purple-600 hover:bg-purple-700",
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setStats(data);
      })
      .catch(console.error)
      .finally(() => setLoadingStats(false));
  }, []);

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Activity className="w-9 h-9 text-green-600" />
                Admin Dashboard
              </h1>
              <p className="text-gray-500 mt-1 text-lg">Oasis of Arabic — Platform Overview</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success" className="text-sm px-3 py-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                System Online
              </Badge>
              <Badge variant="info" className="text-sm px-3 py-1.5">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                {new Date().toLocaleDateString("en-PK", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Badge>
            </div>
          </div>

          {/* Stats Grid */}
          {loadingStats ? (
            <div className="flex items-center gap-3 py-8 text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin text-green-600" />
              Loading live statistics...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <StatCard
                title="Total Revenue"
                value={stats?.totalRevenue ?? 0}
                icon={DollarSign}
                color="text-green-600"
                bg="bg-green-100"
                prefix="PKR "
              />
              <StatCard
                title="Active Enrollments"
                value={stats?.activeEnrollments ?? 0}
                icon={CheckCircle2}
                color="text-blue-600"
                bg="bg-blue-100"
              />
              <StatCard
                title="Total Courses"
                value={stats?.totalCourses ?? 0}
                icon={BookOpen}
                color="text-purple-600"
                bg="bg-purple-100"
              />
              <StatCard
                title="Registered Students"
                value={stats?.totalStudents ?? 0}
                icon={Users}
                color="text-orange-600"
                bg="bg-orange-100"
              />
            </div>
          )}

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${link.color} text-white rounded-2xl p-5 flex items-center gap-4 transition-colors shadow-sm hover:shadow-md`}
                >
                  <div className="bg-white/20 rounded-xl p-3">
                    <link.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-base">{link.label}</p>
                    <p className="text-sm text-white/80">{link.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Platform Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-green-600" />
              Platform Info
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Business Email</p>
                <p className="font-semibold text-gray-800">founder@OasisOfArabic.com</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Payment Gateway</p>
                <p className="font-semibold text-gray-800">PayFast (PKR + International)</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Database</p>
                <p className="font-semibold text-gray-800">Neon Postgres (Drizzle ORM)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
