import { CourseService } from '@/lib/services/course-service';
import CourseCard from '@/components/course-card';
import { Suspense } from 'react';
import Link from 'next/link';
import { GraduationCap, Video, Users } from 'lucide-react';

export default async function Home() {
  const courses = await CourseService.getAllCourses();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/20 blur-[100px] rounded-full opacity-60 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Enrollments are open for the new batch
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-r from-primary via-accent to-primary animate-fade-in-up animation-delay-100">
            Master Arabic Online.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
            Join thousands of students learning Arabic from the comfort of their home. Live Zoom classes, interactive materials, and expert guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
            <Link 
              href="#courses" 
              className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
            >
              Browse Courses
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-4 rounded-xl bg-card hover:bg-gray-50 text-foreground font-semibold transition-all border border-border w-full sm:w-auto hover:-translate-y-1"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Outline */}
      <section className="py-20 bg-secondary/80 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <Video className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3 text-foreground">Live Zoom Classes</h3>
              <p className="text-gray-600 leading-relaxed">Engage directly with instructors in small groups 3 times a week, 45 minutes per session. Build conversational confidence instantly.</p>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <GraduationCap className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3 text-foreground">Structured Grammar</h3>
              <p className="text-gray-600 leading-relaxed">Our curriculum breaks down complex Arabic grammar into digestible, practical lessons designed for non-native speakers.</p>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <Users className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3 text-foreground">Global Community</h3>
              <p className="text-gray-600 leading-relaxed">Join a vibrant international community of learners. Practice speaking and reading with peers from around the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-32 relative">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/30 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Available Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Start your journey today. Choose the level that fits your current proficiency.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length > 0 ? (
              courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="inline-block p-6 rounded-2xl bg-secondary border border-border">
                  <p className="text-foreground font-medium">No courses available at the moment. Please check back later.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
