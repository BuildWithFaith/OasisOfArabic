

import { Card, CardContent } from '@/components/ui/card';
import { Globe, Video, Clock, MousePointer2 } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Service & <span className="text-accent">Shipping Policy</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto font-medium">
              Information about how we deliver our learning services.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-10">
        <Card className="border-none shadow-2xl bg-card">
          <CardContent className="p-8 md:p-12">
            <div className="space-y-12">
              {/* ONLINE ONLY SECTION */}
              <section className="bg-primary/5 p-8 rounded-2xl border-l-4 border-primary">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">100% Digital Delivery</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg font-medium">
                  Oasis of Arabic is an online-only learning platform. We do not ship physical products, textbooks, or materials via traditional mail.
                </p>
              </section>

              {/* SERVICE DELIVERY METHOD */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">How Services are Delivered</h2>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <MousePointer2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">Interactive Portal</h3>
                      <p className="text-gray-600">Immediately after purchase, you will find your courses in the "My Learning" section of your profile. All videos and resources are hosted directly on our secure platform.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <Video className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">Live Zoom Sessions & Recordings</h3>
                      <p className="text-gray-600">For courses involving live instruction, Zoom links will be provided. We may also provide access to session recordings for a limited time to assist in your personal study and rewatching.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">Global Timing</h3>
                      <p className="text-gray-600">As we teach students globally, all live session times will be clearly marked with the corresponding time zone (e.g., GMT+3) to avoid confusion.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Technical Requirements */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Technical Requirements</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To receive our services effectively, users must have:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>A stable internet connection (minimum 2Mbps for Zoom).</li>
                  <li>A modern web browser (Chrome, Safari, Firefox, or Edge).</li>
                  <li>The Zoom client installed for live interactive sessions.</li>
                </ul>
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
