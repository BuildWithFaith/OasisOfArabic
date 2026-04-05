'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { authClient } from '@/lib/auth-client';
import { AdminPermission } from '@/lib/store/auth-store';
import { 
  LayoutDashboard, 
  LogOut, 
  ShieldCheck,
  Home,
  BookOpen,
  GraduationCap
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user as any;
  const adminPermission = user?.role === 'admin' ? AdminPermission.FULL_ACCESS : (user?.role === 'readonly' ? AdminPermission.READ_ONLY : AdminPermission.NONE);
  
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };
  
  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      name: 'Courses',
      href: '/admin/courses',
      icon: BookOpen,
    },
    {
      name: 'Enrollments',
      href: '/admin/enrollments',
      icon: GraduationCap,
    },
    {
      name: 'Auth Test',
      href: '/admin/test',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4 border-b border-gray-200">
        <Link href="/admin" className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-xl">Admin Panel</span>
        </Link>
        <div className="mt-2">
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            adminPermission === AdminPermission.FULL_ACCESS ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
          )}>
            {adminPermission === AdminPermission.FULL_ACCESS ? 'Full Access' : 'Read Only'}
          </span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive(item.href)
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link
          href="/"
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <Home className="w-5 h-5 mr-3" />
          Back to Site
        </Link>
        <button
          onClick={async () => {
            await authClient.signOut();
            window.location.href = '/';
          }}
          className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}
