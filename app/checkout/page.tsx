import { db } from "@/database/config";
import { courses } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/checkout-form";
import type { Course } from "@/lib/types";


export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const resolvedParams = await searchParams;
  const courseId = resolvedParams.course;

  if (!courseId) {
    redirect("/courses");
  }

  const courseList = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
  const course = courseList[0] as Course;

  if (!course) {
    redirect("/courses");
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 text-center bg-white p-6 rounded-3xl shadow-xs">
          Secure Checkout
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Summary */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 h-fit">
               <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <span className="bg-emerald-100 text-emerald-700 p-2 rounded-xl">📚</span>
                 Order Summary
               </h2>
               
               {course.imageUrl && (
                 <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover rounded-2xl mb-6 shadow-xs" />
               )}
               
               <h3 className="text-2xl font-bold text-slate-900">{course.title}</h3>
               <p className="text-slate-500 text-sm mt-3 leading-relaxed">{course.description}</p>
               
               <div className="mt-8 pt-6 border-t border-slate-100">
                 <div className="flex justify-between items-center mb-4">
                   <span className="text-slate-500">Subtotal</span>
                   <span className="font-semibold">{course.currency} {course.price}</span>
                 </div>
                 <div className="flex justify-between items-center mb-4">
                   <span className="text-slate-500">Tax</span>
                   <span className="font-semibold text-emerald-600">Calculated at checkout</span>
                 </div>
                 <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                   <span className="font-bold text-slate-800">Total Due</span>
                   <span className="text-3xl font-extrabold text-emerald-600 tracking-tight">
                     {course.currency} {course.price}
                   </span>
                 </div>
               </div>
          </div>
          
          {/* Checkout Form */}
          <div className="h-fit">
            <CheckoutForm course={course} />
          </div>
        </div>
      </div>
    </div>
  );
}
