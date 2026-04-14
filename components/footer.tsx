'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-accent mb-1">Oasis of Arabic</h3>
            <p className="text-accent/80 text-xs font-semibold uppercase tracking-wider mb-4">
              © Oasis of Arabic | Master Arabic Online
            </p>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Premium online Arabic courses designed to help you master the language with expert instructors and a structured curriculum.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/oasisofarabic/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-accent hover:text-primary p-2.5 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/oasisofarabic"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-accent hover:text-primary p-2.5 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-accent mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-accent transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#courses" className="text-white/80 hover:text-accent transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-accent transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-accent transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-white/80 hover:text-accent transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  My Learning
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-accent mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/80 text-sm">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <address className="not-italic hover:text-accent transition-colors">
                  Orangi Town Sector 14/B, Karachi, Pakistan
                </address>
              </li>
              <li className="flex items-center gap-3 text-white/80 text-sm">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:03314838025" className="hover:text-accent transition-colors">
                  03314838025
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/80 text-sm">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:support@oasisofarabic.com" className="hover:text-accent transition-colors">
                  support@oasisofarabic.com
                </a>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/terms"
                className="text-[10px] uppercase tracking-widest font-bold bg-white/5 hover:bg-accent hover:text-primary px-3 py-1.5 rounded transition-all"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-[10px] uppercase tracking-widest font-bold bg-white/5 hover:bg-accent hover:text-primary px-3 py-1.5 rounded transition-all"
              >
                Privacy
              </Link>
              <Link
                href="/returns"
                className="text-[10px] uppercase tracking-widest font-bold bg-white/5 hover:bg-accent hover:text-primary px-3 py-1.5 rounded transition-all"
              >
                Refunds
              </Link>
              <Link
                href="/shipping"
                className="text-[10px] uppercase tracking-widest font-bold bg-white/5 hover:bg-accent hover:text-primary px-3 py-1.5 rounded transition-all"
              >
                Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center bg-white/5 p-4 rounded-xl">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Oasis of Arabic. All rights reserved.
          </p>
          <p className="text-white/60 text-sm mt-2 md:mt-0">
            Design and developed by{' '}
            <a
              href="https://contra.com/muhammadwahajofficiall_f1yj87dw/services"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors underline decoration-dotted underline-offset-4 font-semibold"
            >
              Muhammad Wahaj
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
