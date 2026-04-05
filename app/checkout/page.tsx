import { db } from "@/database/config";
import { courses } from "@/database/schema";
import { inArray, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/checkout-form";
import { CartAutoOpen } from "@/components/cart-auto-open";
import type { Course } from "@/lib/types";
import { auth } from "@/lib/auth";
import { headers, cookies } from "next/headers";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const [session, resolvedParams, cookieStore] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    searchParams,
    cookies()
  ]);

  const courseId = resolvedParams.course;
  let selectedCourses: Course[] = [];

  // Priority 1: Direct course ID from URL
  if (courseId) {
    const courseList = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
    if (courseList.length > 0) {
      selectedCourses = [courseList[0] as Course];
    }
  } 
  // Priority 2: Items from Cart Cookie
  else {
    const cartCookie = cookieStore.get('cart_items');
    if (cartCookie?.value) {
      try {
        const cartItems = JSON.parse(cartCookie.value) as Course[];
        const ids = cartItems.map(item => item.id);
        if (ids.length > 0) {
          selectedCourses = await db.select().from(courses).where(inArray(courses.id, ids));
        }
      } catch (e) {
        console.error("Failed to parse cart cookie", e);
      }
    }
  }

  if (selectedCourses.length === 0) {
    redirect("/courses");
  }

  if (!session) {
    // If it was a direct course link, redirect back to it
    const redirectUrl = courseId ? `/checkout?course=${courseId}` : '/checkout';
    redirect(`/auth/login?redirect=${encodeURIComponent(redirectUrl)}`);
  }

  // Calculate total
  const totalPrice = selectedCourses.reduce((sum, c) => sum + Number(c.price), 0);
  const currency = selectedCourses[0].currency;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <CartAutoOpen />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 text-center bg-white p-6 rounded-3xl shadow-xs">
          Secure Checkout
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 h-fit">
               <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <span className="bg-emerald-100 text-emerald-700 p-2 rounded-xl">📚</span>
                 Order Summary
               </h2>
               
               <div className="space-y-6">
                 {selectedCourses.map((course) => (
                   <div key={course.id} className="flex gap-4 items-center">
                     {course.imageUrl && (
                       <img src={course.imageUrl} alt={course.title} className="w-16 h-16 object-cover rounded-xl shadow-xs" />
                     )}
                     <div className="flex-1">
                       <h3 className="font-bold text-slate-900 line-clamp-1">{course.title}</h3>
                       <p className="text-slate-500 text-sm">{course.currency} {course.price}</p>
                     </div>
                   </div>
                 ))}
               </div>
               
               <div className="mt-8 pt-6 border-t border-slate-100">
                 <div className="flex justify-between items-center mb-4">
                   <span className="text-slate-500">Subtotal</span>
                   <span className="font-semibold">{currency} {totalPrice.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-center mb-4">
                   <span className="text-slate-500">Tax</span>
                   <span className="font-semibold text-emerald-600">Calculated at checkout</span>
                 </div>
                 <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                   <span className="font-bold text-slate-800">Total Due</span>
                   <span className="text-3xl font-extrabold text-emerald-600 tracking-tight">
                     {currency} {totalPrice.toFixed(2)}
                   </span>
                 </div>
               </div>
          </div>
          
          {/* Checkout Form */}
          <div className="h-fit">
            <CheckoutForm courses={selectedCourses} totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
