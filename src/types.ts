export type Role = 'CUSTOMER' | 'COMPANION' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isVerified: boolean;
}

export interface Companion {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number; // in INR
  categories: string[];
  languages: string[];
  city: string;
  bio: string;
  isVerified: boolean;
  completedSessions: number;
}

export interface Booking {
  id: string;
  companionId: string;
  companionName: string;
  companionAvatar: string;
  category: string;
  date: string;
  time: string;
  durationHours: number;
  totalAmount: number;
  venueName: string;
  status: 'REQUESTED' | 'ACCEPTED' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}
