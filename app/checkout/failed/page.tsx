import { db } from "@/database/config";
import { payments } from "@/database/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { XCircle } from "lucide-react";

export default async function FailedPage({ searchParams }: { searchParams: Promise<{ orderId: string }> }) {
  const params = await searchParams;
  const paymentId = params.orderId;

  if (paymentId) {
    // 1. Find the payment record and mark it failed
    await db.update(payments)
      .set({ status: 'failed' })
      .where(eq(payments.id, paymentId));
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl shadow-red-900/20">
        <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 text-red-500">
          <XCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Payment Failed</h1>
        <p className="text-slate-400 mb-6">Unfortunately, your payment (ID: {paymentId}) could not be completed.</p>
        <Link 
          href="/" 
          className="inline-block bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
