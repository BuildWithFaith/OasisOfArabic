import { NextRequest, NextResponse } from "next/server";
import { getPayfastToken, initiatePayfastTransaction } from "@/lib/payfast";
import { db } from "@/database/config";
import { courses, enrollments, payments } from "@/database/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized. Please log in to enroll." }, { status: 401 });
    }

    const { courseId, amount, customer } = await req.json();

    if (!courseId) {
       return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    // 1. Verify Course exists
    const courseRes = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
    const course = courseRes[0];
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // 2. Create Enrollment Record
    const newEnrollment = await db.insert(enrollments).values({
      userId: session.user.id,
      courseId: course.id,
      status: 'pending' // active after payment success
    }).returning();

    // 3. Create Payment Record
    const newPayment = await db.insert(payments).values({
      enrollmentId: newEnrollment[0].id,
      userId: session.user.id,
      amount: course.price,
      currency: course.currency,
      status: 'pending'
    }).returning();

    const paymentId = newPayment[0].id;

    // Get real customer IP
    const customerIp = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";

    // 4. Get auth token for PayFast
    const token = await getPayfastToken(customerIp, paymentId, course.price);

    // 5. Initiate transaction
    const result = await initiatePayfastTransaction({
      token,
      orderId: paymentId,
      amount: course.price,
      customerName: session.user.name,
      customerEmail: session.user.email,
      customerPhone: customer?.phone || '00000000000',
      customerIp,
    });

    if (!result.redirectUrl && !result.token) {
      return NextResponse.json(
        { error: "PayFast initiation failed", detail: result },
        { status: 400 }
      );
    }

    // Return redirect URL to frontend
    return NextResponse.json({
      redirectUrl: result.redirectUrl,
      transactionToken: result.token,
    });
  } catch (err: any) {
    console.error("Checkout Final Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
