

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Globe, Award, TrendingUp, CheckCircle, Users } from 'lucide-react';

export default function AboutPage() {
  const imageUrl = '/about_hero.png';

  const stats = [
    { icon: Users, label: 'Active Students', value: '5,000+', subtitle: 'Learning globally' },
    { icon: Globe, label: 'Global Reach', value: '40+', subtitle: 'Countries represented' },
    { icon: Award, label: 'Expert Tutors', value: '50+', subtitle: 'Native Arabic speakers' },
    { icon: TrendingUp, label: 'Success Rate', value: '98%', subtitle: 'Course completion' },
  ];

  const courses = [
    { name: 'Quranic Arabic', description: 'Understand the language of the Quran with deep linguistic insights.' },
    { name: 'Conversational Arabic', description: 'Master daily spoken Arabic with native instructors.' },
    { name: 'Tajweed Rules', description: 'Perfect your recitation with personalized feedback.' },
  ];

  const features = [
    'Live 1-on-1 Sessions',
    'Interactive Group Classes',
    'Flexible Scheduling',
    'Comprehensive Materials',
    'Progress Tracking',
    'Native Expert Tutors',
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/80"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              About <span className="text-accent drop-shadow-sm">Oasis of Arabic</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto font-medium">
              Your gateway to mastering the beautiful Arabic language, anywhere, anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 border-border/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-card">
              <CardContent className="p-6 text-center">
                <stat.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="text-3xl lg:text-4xl font-black text-foreground mb-1">{stat.value}</p>
                <p className="text-sm font-bold text-gray-700">{stat.label}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Our Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-4xl font-extrabold text-foreground mb-6">Our Mission</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                <strong className="text-primary font-bold">Oasis of Arabic</strong> was founded on a simple principle: to make learning Arabic accessible, engaging, and profound for everyone, regardless of their starting level. 
              </p>
              <p>
                We blend traditional teaching methods with modern digital tools to create an interactive environment. Our courses are structured to teach the deep linguistic roots of Arabic while making conversation practical and natural.
              </p>
              <p>
                Whether you are aiming to understand the Quran deeper, reconnect with your heritage, or simply learn a new language for travel and business, our diverse team of <strong className="text-primary">Native Tutors</strong> ensures your learning journey is authentic.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-accent/30 hover:ring-accent/60 transition-all duration-500">
              <Image
                src={imageUrl}
                alt="Learning Arabic at Oasis of Arabic"
                fill
                className="object-cover p-1"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mb-24">
          <h2 className="text-4xl font-extrabold text-foreground mb-8 text-center">Our Core Offerings</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="border border-border hover:border-primary/50 transition-colors shadow-sm hover:shadow-lg bg-card group">
                <CardContent className="p-8">
                  <div className="flex flex-col items-start space-y-4">
                    <div className="p-3 bg-secondary rounded-lg group-hover:bg-primary/10 transition-colors">
                      <BookOpen className="w-8 h-8 text-primary shrink-0" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{course.name}</h3>
                      <p className="text-gray-600 leading-relaxed">{course.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Checklist */}
        <div className="mb-24">
          <h2 className="text-4xl font-extrabold text-foreground mb-8 text-center">Seamless Learning Experience</h2>
          <Card className="border-none shadow-xl bg-linear-to-br from-card to-secondary overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 p-6 border-b border-r border-border hover:bg-white transition-colors">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                    <span className="font-semibold text-gray-800 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Us CTA */}
        <div className="bg-primary rounded-[2.5rem] p-12 lg:p-16 text-primary-foreground text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 relative z-10">Ready to Start Learning?</h2>
          <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto relative z-10">
            Join the immersive Oasis of Arabic experience and speak with confidence.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 relative z-10 border-t border-primary-foreground/20 pt-12">
            {[
              { icon: BookOpen, title: 'Structured', desc: 'Step-by-step path' },
              { icon: Globe, title: '100% Online', desc: 'Learn anywhere' },
              { icon: TrendingUp, title: 'Fast Progress', desc: 'Proven methods' },
              { icon: Award, title: 'Certified', desc: 'Completion certificate' },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex p-4 rounded-full bg-primary-foreground/10 mb-4 group-hover:bg-primary-foreground/20 transition-colors">
                  <item.icon className="w-8 h-8 text-accent mx-auto" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-primary-foreground/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
