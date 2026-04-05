import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/config";
import { payments, enrollments } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { transactionId, token, orderId } = await req.json();

    const res = await fetch(
      `${process.env.PAYFAST_BASE_URL}/Transaction/GetTransactionStatus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          merchant_id: process.env.PAYFAST_MERCHANT_ID,
          transaction_id: transactionId,
        }),
      }
    );

    const data = await res.json();

    // If we have orderId passed from the client, we can verify and update
    if (orderId && data && data.transaction_status) {
      if (data.transaction_status === "SUCCESS") {
        const paymentList = await db.select().from(payments).where(eq(payments.id, orderId)).limit(1);
        const paymentRecord = paymentList[0];
        
        if (paymentRecord && paymentRecord.status !== 'completed') {
          await db.update(payments).set({ status: 'completed', payfastReference: transactionId || null }).where(eq(payments.id, orderId));
          await db.update(enrollments).set({ status: 'active' }).where(eq(enrollments.id, paymentRecord.enrollmentId));
        }
      } else if (data.transaction_status === "FAILED") {
        await db.update(payments).set({ status: 'failed', payfastReference: transactionId || null }).where(eq(payments.id, orderId));
      }
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
