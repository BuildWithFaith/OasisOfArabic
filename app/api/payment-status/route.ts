import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { transactionId, token } = await req.json();

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

    // Update your order in Appwrite based on data.transaction_status
    // "SUCCESS", "FAILED", "PENDING"

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
