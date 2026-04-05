import Link from 'next/link';
import { db } from "@/database/config";
import { payments, enrollments } from "@/database/schema";
import { eq } from "drizzle-orm";
import { XCircle, RefreshCcw, Headset } from "lucide-react";


export default async function CheckoutFailedPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const resolvedParams = await searchParams;
  const { orderId } = resolvedParams;
  
  if (orderId) {
    const paymentList = await db.select().from(payments).where(eq(payments.id, orderId)).limit(1);
    const paymentRecord = paymentList[0];
    
    if (paymentRecord && paymentRecord.status === 'pending') {
       await db.update(payments).set({ status: 'failed' }).where(eq(payments.id, orderId));
       await db.update(enrollments).set({ status: 'cancelled' }).where(eq(enrollments.id, paymentRecord.enrollmentId));
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-xl text-center border-t border-red-500 border-t-8">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Payment Failed</h1>
        <p className="text-slate-500 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Unfortunately, we couldn't process your payment. Your bank may have declined the transaction or there was a network error.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/courses" className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg">
            <RefreshCcw className="w-5 h-5 mr-2" />
            Try Again
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all">
            <Headset className="w-5 h-5 mr-2" />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
