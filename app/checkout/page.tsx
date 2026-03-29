import { CourseService } from "@/lib/services/course-service";
import CheckoutForm from "@/components/checkout-form";
import { MonitorPlay, Clock, FileText } from "lucide-react";
import Link from "next/link";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ courseId?: string }>;
}) {
  const params = await searchParams;
  const courseId = params.courseId;

  if (!courseId) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl text-white mb-4">No course selected.</h1>
        <Link href="/" className="text-emerald-500 hover:underline">Return to Home</Link>
      </div>
    );
  }

  const course = await CourseService.getCourseById(courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl text-white mb-4">Course not found.</h1>
        <Link href="/" className="text-emerald-500 hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 selection:bg-emerald-500/30">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center animate-fade-in-up">
          <h1 className="text-4xl text-white font-bold mb-4">Complete Your Enrollment</h1>
          <p className="text-slate-400">You are one step away from joining our dynamic Arabic classes.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Order Summary */}
          <div className="order-2 lg:order-1 animate-fade-in-up animation-delay-100">
            <CheckoutForm course={course} />
          </div>

          {/* Course Summary */}
          <div className="order-1 lg:order-2 animate-fade-in-up animation-delay-200">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 sticky top-8">
              <h2 className="text-xl font-bold text-white mb-6">Course Summary</h2>
              
              <div className="flex gap-4 mb-6 pb-6 border-b border-slate-800">
                <div className="w-24 h-24 bg-slate-800 rounded-xl overflow-hidden shrink-0">
                  {course.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">No Image</div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{course.title}</h3>
                  <p className="text-emerald-500 font-medium">{course.currency} {course.price}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-slate-300">
                  <MonitorPlay className="w-5 h-5 mr-3 text-emerald-500 shrink-0" />
                  <span>{course.zoomClassesPerWeek} Live Zoom Classes per week</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <Clock className="w-5 h-5 mr-3 text-emerald-500 shrink-0" />
                  <span>{course.classDurationMinutes} Minutes per session</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <FileText className="w-5 h-5 mr-3 text-emerald-500 shrink-0" />
                  <span>Access to premium grammar materials & exercises</span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white">{course.currency} {course.price}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-800 font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-emerald-400 text-xl">{course.currency} {course.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
