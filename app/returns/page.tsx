

import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, CreditCard, XCircle, Info } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Return & <span className="text-accent">Refund Policy</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto font-medium">
              Transparent policy regarding course purchases and enrollments.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-10">
        <Card className="border-none shadow-2xl bg-card">
          <CardContent className="p-8 md:p-12">
            <div className="space-y-12">
              {/* NO REFUND SECTION - CRITICAL */}
              <section className="bg-red-50 p-8 rounded-2xl border-l-4 border-red-600">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-red-900">Strict No-Refund Policy</h2>
                </div>
                <div className="space-y-4 text-red-800 leading-relaxed">
                  <p className="text-lg font-bold">
                    At Oasis of Arabic, we provide immediate access to digital learning materials and live seat reservations upon purchase. For this reason, we maintain a strict no-refund policy.
                  </p>
                  <p>
                    By purchasing any course on our platform, you acknowledge and agree that <span className="underline decoration-2">all sales are final</span> and no money will be refunded after the purchase is complete.
                  </p>
                </div>
              </section>

              {/* WHY NO REFUND */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Info className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Why we don't offer refunds</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                    <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                       <CreditCard className="w-4 h-4 text-primary" /> Immediate Access
                    </h3>
                    <p className="text-gray-600 text-sm">Course materials, library access, and portal credentials are provided instantly upon payment.</p>
                  </div>
                  <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                    <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                       <RefreshCw className="w-4 h-4 text-primary" /> Instructor Commitments
                    </h3>
                    <p className="text-gray-600 text-sm">Payments are used to secure time slots with our native expert instructors who prepare for your sessions in advance.</p>
                  </div>
                </div>
              </section>

              {/* Quality Commitment */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Quality Commitment</h2>
                <p className="text-gray-700 leading-relaxed">
                  While we do not offer refunds, we are deeply committed to your success. If you are experiencing technical difficulties or have concerns about your learning path, please reach out to our support team at <span className="font-bold text-primary">support@oasisofarabic.com</span>. We will do our absolute best to resolve any issue and ensure you have a premium learning experience.
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
