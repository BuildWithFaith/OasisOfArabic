import Link from 'next/link';
import { Course } from '@/lib/types';
import { Clock, MonitorPlay, FileText } from 'lucide-react';

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
      <div className="relative h-48 bg-secondary overflow-hidden">
        {course.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
            Course Image
          </div>
        )}
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full shadow-md">
          {course.currency} {course.price}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center text-gray-700 text-sm font-medium">
            <div className="p-1.5 bg-accent/30 rounded-md mr-3 text-primary">
              <MonitorPlay className="w-4 h-4" />
            </div>
            {course.zoomClassesPerWeek} Live Zoom Classes / week
          </div>
          <div className="flex items-center text-gray-700 text-sm font-medium">
            <div className="p-1.5 bg-accent/30 rounded-md mr-3 text-primary">
              <Clock className="w-4 h-4" />
            </div>
            {course.classDurationMinutes} Mins per class
          </div>
          <div className="flex items-center text-gray-700 text-sm font-medium">
            <div className="p-1.5 bg-accent/30 rounded-md mr-3 text-primary">
              <FileText className="w-4 h-4" />
            </div>
            Extensive Grammar Materials
          </div>
        </div>
        
        <Link 
          href={`/checkout?courseId=${course.id}`}
          className="block w-full text-center bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-lg transition-colors shadow-sm"
        >
          Enroll Now
        </Link>
      </div>
    </div>
  );
}
