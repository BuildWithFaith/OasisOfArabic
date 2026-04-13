

import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, FileText, Lock, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Terms & <span className="text-accent">Conditions</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto font-medium">
              Rules and guidelines for using the Oasis of Arabic platform.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-10">
        <Card className="border-none shadow-2xl bg-card">
          <CardContent className="p-8 md:p-12">
            <div className="space-y-12">
              {/* Introduction */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Agreement to Terms</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  By accessing or using Oasis of Arabic, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
                </p>
              </section>

              {/* INTELLECTUAL PROPERTY - CRITICAL SECTION */}
              <section className="bg-primary/5 p-8 rounded-2xl border-l-4 border-primary">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Intellectual Property & Content Protection</h2>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="font-semibold text-primary">All course materials, including but not limited to Zoom lectures, video recordings, PDFs, and curriculum structures, are the exclusive property of Oasis of Arabic.</p>
                  <ul className="list-disc pl-5 space-y-3">
                    <li><strong className="text-foreground">Study Recordings:</strong> We may provide recorded Zoom lectures to students solely for their personal rewatching and learning benefit. These recordings are for individual study only.</li>
                    <li><strong className="text-foreground">No Redistribution:</strong> You are strictly prohibited from sharing, uploading, or distributing these recordings in any form (public or private).</li>
                    <li><strong className="text-foreground">No Reselling:</strong> You may not publish, sell, or commercially exploit any course content, including Zoom session recordings.</li>
                    <li><strong className="text-foreground">Personal Use Only:</strong> Access to the course and its recordings is for your personal learning only. Sharing login credentials or reselling access to third parties will result in immediate termination of your account without refund.</li>
                  </ul>
                  <div className="mt-6 flex items-start gap-3 bg-red-50 p-4 rounded-xl text-red-800">
                    <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">
                      Violation of these intellectual property terms may result in legal action and permanent banning from our platform.
                    </p>
                  </div>
                </div>
              </section>

              {/* User Accounts */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">User Responsibilities</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>You are responsible for safeguarding your password.</li>
                  <li>You agree not to disclose your password to any third party.</li>
                  <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
                </ul>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Termination</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice before any new terms taking effect.
                </p>
              </section>

              <div className="pt-8 border-t border-border/50 text-center">
                <p className="text-gray-500 text-sm italic">
                  Last updated: April 10, 2026
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
