import { NextRequest, NextResponse } from "next/server";
import { getPayfastToken, initiatePayfastTransaction } from "@/lib/payfast";
import { db } from "@/database/config";
import { courses, enrollments, payments } from "@/database/schema";
import { eq, inArray } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized. Please log in to enroll." }, { status: 401 });
    }

    const { courseIds, amount, customer } = await req.json();

    if (!courseIds || !Array.isArray(courseIds) || courseIds.length === 0) {
       return NextResponse.json({ error: "Missing or invalid courseIds" }, { status: 400 });
    }

    // 1. Verify all Courses exist
    const courseRes = await db.select().from(courses).where(inArray(courses.id, courseIds));
    if (courseRes.length !== courseIds.length) {
      return NextResponse.json({ error: "One or more courses not found" }, { status: 404 });
    }

    const totalAmount = courseRes.reduce((sum, c) => sum + c.price, 0);

    // 2. Create Enrollment Records for all courses
    const enrollmentPromises = courseRes.map(course => 
      db.insert(enrollments).values({
        userId: session.user.id,
        courseId: course.id,
        status: 'pending'
      }).returning()
    );
    
    const newEnrollments = await Promise.all(enrollmentPromises);

    // 3. Create a single Payment Record for the total amount
    // Linked to the first enrollment for now (schema limitation)
    const newPayment = await db.insert(payments).values({
      enrollmentId: newEnrollments[0][0].id,
      userId: session.user.id,
      amount: totalAmount,
      currency: courseRes[0].currency,
      status: 'pending'
    }).returning();

    const paymentId = newPayment[0].id;

    // Get real customer IP
    const customerIp = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";

    // 4. Get auth token for PayFast
    const token = await getPayfastToken(customerIp, paymentId, totalAmount);

    // 5. Initiate transaction
    const result = await initiatePayfastTransaction({
      token,
      orderId: paymentId,
      amount: totalAmount,
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
