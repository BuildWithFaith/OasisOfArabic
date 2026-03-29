export interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  price: number;
  currency: string;
  isActive: boolean;
  zoomClassesPerWeek: number;
  classDurationMinutes: number;
  zoomJoinLink: string | null;
  materialsUrl: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: 'pending' | 'active' | 'cancelled' | 'completed';
  enrolledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  enrollmentId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  payfastReference: string | null;
  createdAt: Date;
  updatedAt: Date;
}
