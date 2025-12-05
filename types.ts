
export interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  totalHours: number;
  hoursLeft: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  youtubeUrl: string;
}

export interface Stat {
  id: number;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  iconName: string;
  color: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
}

export interface Achievement {
  id: number;
  title: string;
  date: string;
  iconName: string;
  color: string;
}

export interface UpcomingClass {
  id: number;
  title: string;
  instructor: string;
  time: string;
  date: string;
}

export interface ChartData {
  name: string;
  hours: number;
}

export interface Opportunity {
  id: number;
  type: 'internship' | 'scholarship' | 'course' | 'achievement';
  badge: string;
  title: string;
  subtitle: string;
  description?: string;
  buttonText: string;
  backgroundImage?: string;
  // Card specific properties
  cardTitle: string;
  cardSubtitle: string;
  cardValue?: string; // Stipend or main stat
  cardIcon?: string;
  tags?: string[];
  features?: string[]; // For bullet points or lists
}

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  image: string;
  date: string;
}
