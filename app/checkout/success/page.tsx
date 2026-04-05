import Link from 'next/link';
import { db } from "@/database/config";
import { payments, enrollments } from "@/database/schema";
import { eq } from "drizzle-orm";
import { CheckCircle, BookOpen, ArrowRight } from "lucide-react";


export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const resolvedParams = await searchParams;
  const { orderId } = resolvedParams;
  
  if (orderId) {
    const paymentList = await db.select().from(payments).where(eq(payments.id, orderId)).limit(1);
    const paymentRecord = paymentList[0];
    
    // Update the DB optimistically for smooth user experience upon return
    if (paymentRecord && paymentRecord.status === 'pending') {
       await db.update(payments).set({ status: 'completed' }).where(eq(payments.id, orderId));
       await db.update(enrollments).set({ status: 'active' }).where(eq(enrollments.id, paymentRecord.enrollmentId));
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-xl text-center border top-emerald-500 border-t-8">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <CheckCircle className="w-12 h-12 text-emerald-600" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Payment Successful!</h1>
        <p className="text-slate-500 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Your payment has been processed successfully. You are now officially enrolled in the course. Welcome to Oasis of Arabic!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/profile" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg">
            <BookOpen className="w-5 h-5 mr-2" />
            Go to My Courses
          </Link>
          <Link href="/courses" className="inline-flex items-center justify-center px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all">
            Browse More Courses
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
