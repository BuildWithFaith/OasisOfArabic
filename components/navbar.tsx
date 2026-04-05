"use client";

import Link from "next/link";
import Image from "next/image";
import { User, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState, useRef } from "react";
import {
  Navbar as AceternityNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "./ui/resizable-navbar";

export function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user as any;
  const isAdmin = user?.role === 'admin' || user?.role === 'readonly';
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    }

    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isProfileDropdownOpen]);

  const navItems = [
    { name: "Courses", link: "/#courses" },
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
    ...(user ? [{ name: "My Learning", link: "/profile" }] : []),
  ];

  const handleMobileItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <AceternityNavbar className="sticky top-0">
      {/* Desktop Navigation */}
      <NavBody>
        {/* Logo */}
        <Link
          href="/"
          className="relative z-20 flex items-center space-x-3 px-2 py-1    "
        >
          <Image
            src="/logo.png"
            alt="Oasis of Arabic Logo"
            width={100}
            height={100}
            className="object-contain    "
          />
          <span className="text-xl font-bold text-black dark:text-white">
            Oasis of Arabic
          </span>
        </Link>

        {/* Nav Items */}
        <NavItems items={navItems} />

        {/* Right Side Actions */}
        <div className="relative z-20 flex items-center space-x-2">

          {/* Auth Section */}
          {user ? (
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition text-black dark:text-neutral-300"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {user.name || user.email}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-800 z-50">
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 text-black dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition first:rounded-t-lg"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className={`flex items-center space-x-2 px-4 py-3 text-black dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition ${!isAdmin ? 'first:rounded-t-lg' : ''}`}
                  >
                    <User className="w-4 h-4" />
                    <span>My Learning</span>
                  </Link>
                  <button
                    onClick={async () => {
                      await authClient.signOut();
                      window.location.href = "/";
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-black dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition last:rounded-b-lg border-t border-gray-200 dark:border-neutral-800"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavbarButton
              href="/auth/login"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold  "
            >
              <User className="w-4 h-4 mr-2 inline  " />
              Login
            </NavbarButton>
          )}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader className=" -navbar">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 px-2 py-1    ">
            <Image
              src="/logo.png"
              alt="Oasis of Arabic Logo"
              width={40}
              height={40}
              className="object-fit    "
            />
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">

            {/* Mobile Menu Toggle */}
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>

        {/* Mobile Menu */}
        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={handleMobileItemClick}
              className="text-black dark:text-neutral-300 hover:text-primary dark:hover:text-white   text-base font-medium"
            >
              {item.name}
            </Link>
          ))}

          {/* Auth Section in Mobile Menu */}
          {user ? (
            <div className="flex flex-col space-y-3 w-full pt-4 border-t border-gray-200 dark:border-neutral-800">
              <span className="text-sm text-black dark:text-neutral-300 font-medium">
                {user.name || user.email}
              </span>
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={handleMobileItemClick}
                  className="flex items-center space-x-2 text-black dark:text-neutral-300 hover:text-primary dark:hover:text-white"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
              <Link
                href="/profile"
                onClick={handleMobileItemClick}
                className="flex items-center space-x-2 text-black dark:text-neutral-300 hover:text-primary dark:hover:text-white"
              >
                <User className="w-4 h-4" />
                <span>My Learning</span>
              </Link>
              <button
                onClick={async () => {
                  await authClient.signOut();
                  window.location.href = "/";
                }}
                className="flex items-center space-x-2 text-black dark:text-neutral-300 hover:text-primary dark:hover:text-white"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="w-full pt-4 border-t border-gray-200 dark:border-neutral-800">
              <a
                href="/auth/login"
                onClick={handleMobileItemClick}
                className="flex items-center justify-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90   text-base font-bold py-3 px-6 rounded-lg"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </a>
            </div>
          )}
        </MobileNavMenu>
      </MobileNav>
    </AceternityNavbar>
  );
}
