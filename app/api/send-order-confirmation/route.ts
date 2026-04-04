import { NextRequest, NextResponse } from 'next/server';
import { sendEnrollmentConfirmation } from '@/lib/email';

// This endpoint has been updated for Oasis of Arabic
// It now sends enrollment confirmation emails (not rice orders)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentName, studentEmail, courseTitle, coursePrice, currency, zoomLink } = body;

    if (!studentName || !studentEmail || !courseTitle || !coursePrice) {
      return NextResponse.json(
        { error: 'studentName, studentEmail, courseTitle, and coursePrice are required' },
        { status: 400 }
      );
    }

    await sendEnrollmentConfirmation({
      studentName,
      studentEmail,
      courseTitle,
      coursePrice: Number(coursePrice),
      currency,
      zoomLink,
    });

    return NextResponse.json({ success: true, message: 'Enrollment confirmation sent' });
  } catch (error: any) {
    console.error('Error sending enrollment confirmation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send confirmation email' },
      { status: 500 }
    );
  }
}
