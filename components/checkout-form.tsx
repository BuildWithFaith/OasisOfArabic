"use client";

import { useState } from "react";
import { Course } from "@/lib/types";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Loader2, CreditCard } from "lucide-react";

export default function CheckoutForm({ course }: { course: Course }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("You must be logged in to enroll.");
      // Could redirect to login here
      return;
    }

    if (!phone) {
      toast.error("Please provide a phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          amount: course.price,
          customer: {
            phone,
          }
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to initiate checkout");
      }

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error("Invalid response from payment gateway");
      }
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  if (isPending) return <div className="text-slate-400">Loading your session...</div>;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Enrollment Details</h2>

      {!session ? (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center">
          <p className="text-slate-400 mb-4">Please log in to enroll in this course.</p>
          <Link href={`/auth/login?redirect=/checkout?course=${course.id}`}>
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Log In directly
            </button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleEnroll} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
            <input 
              type="text" 
              value={session.user.name} 
              disabled 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-400 opacity-70 cursor-not-allowed"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input 
              type="email" 
              value={session.user.email} 
              disabled 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-400 opacity-70 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
            <input 
              type="tel" 
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +923001234567"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <div className="pt-6 border-t border-slate-800">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-xs text-lg font-medium text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-hidden disabled:bg-slate-800 disabled:text-slate-500 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay {course.currency} {course.price}
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-500 mt-4">
              Payments are securely processed via PayFast.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
