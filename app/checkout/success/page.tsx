import { db } from "@/database/config";
import { payments, enrollments } from "@/database/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ orderId: string }> }) {
  const params = await searchParams;
  const paymentId = params.orderId;

  if (paymentId) {
    // 1. Find the payment record
    const paymentRecord = await db.select().from(payments).where(eq(payments.id, paymentId)).limit(1);
    
    if (paymentRecord[0]) {
      // 2. Update payment status to completed
      await db.update(payments)
        .set({ status: 'completed' })
        .where(eq(payments.id, paymentId));

      // 3. Update related enrollment status to active
      await db.update(enrollments)
        .set({ status: 'active', enrolledAt: new Date() })
        .where(eq(enrollments.id, paymentRecord[0].enrollmentId));
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl shadow-emerald-900/20">
        <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 text-emerald-500">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Enrollment Successful!</h1>
        <p className="text-slate-400 mb-6">Welcome to the course. Your payment (ID: {paymentId}) has been confirmed.</p>
        <Link 
          href="/profile" 
          className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          Go to My Courses
        </Link>
      </div>
    </div>
  );
}
