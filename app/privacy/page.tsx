

import { Card, CardContent } from '@/components/ui/card';
import { Eye, Shield, Database, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Privacy <span className="text-accent">Policy</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto font-medium">
              How we protect and manage your personal information.
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
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Our Privacy Commitment</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  At Oasis of Arabic, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
                </p>
              </section>

              {/* DATA COLLECTION */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Data We Collect</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                  <ul className="list-disc pl-5 space-y-3 text-gray-700">
                    <li><strong className="text-foreground">Identity Data:</strong> includes first name, last name, and profile picture.</li>
                    <li><strong className="text-foreground">Contact Data:</strong> includes email address and optionally your phone number.</li>
                    <li><strong className="text-foreground">Learning Data:</strong> includes course progress, certificates earned, and session attendance.</li>
                    <li><strong className="text-foreground">Technical Data:</strong> includes internet protocol (IP) address, login data, browser type and version.</li>
                  </ul>
                </div>
              </section>

              {/* HOW WE USE DATA */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">How We Use Your Data</h2>
                </div>
                <p className="text-gray-700 mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>To register you as a new student.</li>
                  <li>To deliver courses and manage your learning progress.</li>
                  <li>To process payments for course enrollments.</li>
                  <li>To notify you about changes to our service or schedules.</li>
                </ul>
              </section>

              {/* SECURITY */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Data Security</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. For example, we use industry-standard encryption for data in transit and at rest.
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Cookies</h2>
                <p className="text-gray-700 leading-relaxed">
                  We use cookies to maintain your login session and improve your browsing experience. You can set your browser to refuse all or some browser cookies, but note that some parts of this website may become inaccessible or not function properly.
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
