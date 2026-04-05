"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { Mail, Phone, Globe, Send, Lock } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function ContactPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user as any;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to send a message");
      return;
    }

    if (!formData.subject || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: user.name || "User",
        email: user.email,
        phone: user.phone || "",
        subject: formData.subject,
        message: formData.message,
      };

      const response = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-emerald-800 mb-4">Contact Us</h1>
          <p className="text-xl text-emerald-600/80 max-w-2xl mx-auto">
            Have a question about our Arabic courses or need assistance? We're here to help you on your learning journey!
          </p>
        </div>

        {/* Get in Touch Section - Full Width */}
        <Card className="border-none shadow-xl rounded-3xl overflow-hidden mb-8 bg-white ring-1 ring-emerald-100">
          <CardHeader className="bg-emerald-600 p-8">
            <CardTitle className="text-3xl font-bold text-white text-center">
              Get in Touch
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Email */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-emerald-50 hover:bg-emerald-100 transition-colors">
                <div className="bg-emerald-600 p-4 rounded-full mb-4 shadow-lg shadow-emerald-200">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900 mb-2">Email</h3>
                <a
                  href="mailto:founder@oasisofarabic.com"
                  className="text-emerald-700 hover:text-emerald-500 font-medium transition-colors"
                >
                  founder@oasisofarabic.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-emerald-50 hover:bg-emerald-100 transition-colors">
                <div className="bg-emerald-600 p-4 rounded-full mb-4 shadow-lg shadow-emerald-200">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900 mb-2">Phone</h3>
                <a
                  href="tel:03827486382"
                  className="text-emerald-700 hover:text-emerald-500 font-medium transition-colors"
                >
                  03827486382
                </a>
              </div>

              {/* Location */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-emerald-50 hover:bg-emerald-100 transition-colors">
                <div className="bg-emerald-600 p-4 rounded-full mb-4 shadow-lg shadow-emerald-200">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900 mb-2">Learning Format</h3>
                <p className="text-emerald-700 font-medium">Available Globally</p>
                <p className="mt-2 text-xs font-bold bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full inline-block uppercase tracking-wider">
                  100% Online Classes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content - Two Sections */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Contact Form */}
          <div className="flex-1">
            {/* Contact Form */}
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden ring-1 ring-emerald-100">
              <CardHeader className="bg-emerald-900 text-white p-8">
                <CardTitle className="text-2xl text-white font-bold flex items-center">
                  <Send className="w-6 h-6 mr-3 text-emerald-400" />
                  Send us a Message
                </CardTitle>
                <p className="text-emerald-200 mt-2">Fill out the form below and our team will get back to you shortly.</p>
              </CardHeader>
              <CardContent className="p-8 bg-white">
                {!user ? (
                  <div className="text-center py-16">
                    <div className="bg-emerald-50 p-6 rounded-full inline-flex mb-6 ring-8 ring-emerald-50/50">
                      <Lock className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-900 mb-3">
                      Authentication Required
                    </h3>
                    <p className="text-emerald-600/80 mb-8 max-w-md mx-auto">
                      Please log in to your Oasis of Arabic account to send us a secure message. This helps us personalize our support for your learning journey.
                    </p>
                    <Link href="/auth/login">
                      <Button className="bg-emerald-600 text-white hover:bg-emerald-700 font-bold px-10 py-6 text-lg rounded-xl shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1">
                        Sign In to Contact Us
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-emerald-900 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        required
                        className="border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl p-4 text-base h-auto"
                        placeholder="E.g., Question about Tajweed Course"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-emerald-900 mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        rows={6}
                        className="w-full border border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl p-4 text-base resize-none outline-none transition-all placeholder:text-gray-400"
                        placeholder="Tell us how we can assist you with your Arabic studies..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 text-lg rounded-xl shadow-xl shadow-emerald-600/20 transition-all transform hover:-translate-y-1"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                          Sending Message...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="w-5 h-5 mr-3" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-emerald-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-emerald-600/80 text-lg">Quick answers to common questions about our platform.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-none shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 ring-1 ring-emerald-100 hover:ring-emerald-300 group">
              <CardContent className="p-8">
                <h3 className="font-bold text-emerald-900 mb-3 text-xl group-hover:text-emerald-600 transition-colors">
                  Are the courses suitable for beginners?
                </h3>
                <p className="text-emerald-700/80 leading-relaxed">
                  Absolutely! Our curriculum is designed to accommodate all levels, from complete beginners learning the alphabet to advanced students mastering Arabic grammar and eloquence.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 ring-1 ring-emerald-100 hover:ring-emerald-300 group">
              <CardContent className="p-8">
                <h3 className="font-bold text-emerald-900 mb-3 text-xl group-hover:text-emerald-600 transition-colors">
                  How are the classes conducted?
                </h3>
                <p className="text-emerald-700/80 leading-relaxed">
                  All our classes are conducted 100% online through our interactive learning platform. You'll have access to live sessions, recorded materials, and direct communication with your instructors.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 ring-1 ring-emerald-100 hover:ring-emerald-300 group">
              <CardContent className="p-8">
                <h3 className="font-bold text-emerald-900 mb-3 text-xl group-hover:text-emerald-600 transition-colors">
                  What payment methods do you accept?
                </h3>
                <p className="text-emerald-700/80 leading-relaxed">
                  We securely process payments online via PayFast for all our course enrollments. This allows you to start your learning journey immediately upon registration.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 ring-1 ring-emerald-100 hover:ring-emerald-300 group">
              <CardContent className="p-8">
                <h3 className="font-bold text-emerald-900 mb-3 text-xl group-hover:text-emerald-600 transition-colors">
                  Do I get a certificate upon completion?
                </h3>
                <p className="text-emerald-700/80 leading-relaxed">
                  Yes, upon successful completion of any graded course path, you will receive an official Oasis of Arabic certificate to showcase your achievement and proficiency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
