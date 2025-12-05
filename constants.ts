
import { Course, Stat, Testimonial, Achievement, UpcomingClass, ChartData, Opportunity, NewsItem } from './types';

export const COURSES: Course[] = [
  {
    id: 1,
    title: "Complete React Development",
    instructor: "Sarah Johnson",
    progress: 65,
    totalHours: 40,
    hoursLeft: 14,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    category: "Web Development",
    rating: 4.8,
    reviews: 1240,
    youtubeUrl: "https://www.youtube.com/playlist?list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt"
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    instructor: "Michael Chen",
    progress: 40,
    totalHours: 25,
    hoursLeft: 15,
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&q=80&w=800",
    category: "Design",
    rating: 4.9,
    reviews: 850,
    youtubeUrl: "https://www.youtube.com/playlist?list=PLjwm_8O3suyP5k4sC8V0tC7XvT85z0A_"
  },
  {
    id: 3,
    title: "Python for Data Science",
    instructor: "David Miller",
    progress: 85,
    totalHours: 50,
    hoursLeft: 7.5,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    category: "Data Science",
    rating: 4.7,
    reviews: 2100,
    youtubeUrl: "https://www.youtube.com/playlist?list=PLeo1K3hjS3usILfyIGkyBQdxCIldu3MS"
  },
  {
    id: 4,
    title: "Digital Marketing Fundamentals",
    instructor: "Emily Wilson",
    progress: 20,
    totalHours: 15,
    hoursLeft: 12,
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800",
    category: "Marketing",
    rating: 4.6,
    reviews: 560,
    youtubeUrl: "https://www.youtube.com/playlist?list=PLjVLYmrlmjGcHubHv6zV6L-x_ZfDk6z4B"
  },
  {
    id: 5,
    title: "JavaScript Advanced Concepts",
    instructor: "James Anderson",
    progress: 50,
    totalHours: 30,
    hoursLeft: 15,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800",
    category: "Web Development",
    rating: 4.8,
    reviews: 980,
    youtubeUrl: "https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP"
  },
  {
    id: 6,
    title: "Graphic Design Principles",
    instructor: "Jessica Lee",
    progress: 30,
    totalHours: 20,
    hoursLeft: 14,
    image: "https://images.unsplash.com/photo-1572044162444-ad6021194360?auto=format&fit=crop&q=80&w=800",
    category: "Design",
    rating: 4.5,
    reviews: 430,
    youtubeUrl: "https://www.youtube.com/playlist?list=PLW-zSkCnZ-gA50-m6M6l-9-9-9-9-9-9"
  }
];

export const STATS: Stat[] = [
  {
    id: 1,
    label: "Total Courses",
    value: "12",
    change: "+2 from last month",
    trend: "up",
    iconName: "BookOpen",
    color: "from-purple-500 to-indigo-500"
  },
  {
    id: 2,
    label: "Completed",
    value: "5",
    change: "+1 from last month",
    trend: "up",
    iconName: "CheckCircle",
    color: "from-blue-400 to-cyan-400"
  },
  {
    id: 3,
    label: "In Progress",
    value: "7",
    change: "Active learning",
    trend: "up",
    iconName: "Clock",
    color: "from-emerald-400 to-teal-400"
  },
  {
    id: 4,
    label: "Certificates",
    value: "5",
    change: "Earned total",
    trend: "up",
    iconName: "Award",
    color: "from-orange-400 to-amber-400"
  }
];

export const ACTIVITY_DATA: ChartData[] = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 4.0 },
  { name: 'Wed', hours: 1.5 },
  { name: 'Thu', hours: 3.5 },
  { name: 'Fri', hours: 5.0 },
  { name: 'Sat', hours: 6.5 },
  { name: 'Sun', hours: 4.0 },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Web Developer",
    quote: "EduDash completely transformed the way I learn. The tracking features keep me motivated every single day.",
    image: "https://picsum.photos/100/100?random=10",
    rating: 5
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "UX Designer",
    quote: "The quality of instructors is unmatched. I landed my dream job after completing the UX Masterclass.",
    image: "https://picsum.photos/100/100?random=11",
    rating: 5
  },
  {
    id: 3,
    name: "Sam Wilson",
    role: "Data Analyst",
    quote: "Intuitive interface and great community. I highly recommend EduDash to anyone looking to upskill.",
    image: "https://picsum.photos/100/100?random=12",
    rating: 4
  }
];

export const UPCOMING_CLASSES: UpcomingClass[] = [
  { id: 1, title: "Advanced React Patterns", instructor: "Sarah Johnson", time: "10:00 AM", date: "Today" },
  { id: 2, title: "Figma Prototyping", instructor: "Michael Chen", time: "2:00 PM", date: "Tomorrow" },
  { id: 3, title: "Python Data Visualization", instructor: "David Miller", time: "11:00 AM", date: "Oct 24" }
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 1, title: "Fast Learner", date: "Oct 20, 2023", iconName: "Zap", color: "text-yellow-500" },
  { id: 2, title: "Homework Hero", date: "Oct 15, 2023", iconName: "Book", color: "text-blue-500" },
  { id: 3, title: "7 Day Streak", date: "Oct 10, 2023", iconName: "Flame", color: "text-orange-500" }
];

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 1,
    type: "internship",
    badge: "🇮🇳 SKILL INDIA MISSION",
    title: "Pradhan Mantri Kaushal Vikas Yojana",
    subtitle: "Join the flagship scheme for skill training. Certified Internships with stipend & placement assistance.",
    buttonText: "Join PMKVY",
    backgroundImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600",
    cardTitle: "Skill Development",
    cardSubtitle: "Govt. of India",
    cardValue: "Free Training",
    features: ["Certified", "Placement", "Stipend"],
    tags: ["Govt Scheme", "Certified"]
  },
  {
    id: 2,
    type: "scholarship",
    badge: "🎓 DIGITAL INDIA",
    title: "National Scholarship Portal",
    subtitle: "Simplified, Mission-oriented, Accountable, Responsive & Transparent 'SMART' System for student scholarships.",
    buttonText: "Check Eligibility",
    backgroundImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600",
    cardTitle: "Financial Aid",
    cardSubtitle: "Ministry of Electronics",
    cardValue: "100%",
    tags: ["Scholarship", "Education"]
  },
  {
    id: 3,
    type: "course",
    badge: "🚀 MASTER NEW SKILLS",
    title: "Unlock Your Potential with Online Courses",
    subtitle: "Access 500+ premium courses in Technology, Business, and Design from industry experts.",
    buttonText: "Explore Courses",
    backgroundImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1600",
    cardTitle: "Full Stack Bootcamp",
    cardSubtitle: "Best Seller",
    cardValue: "4.9/5",
    tags: ["Certification", "Expert-led"]
  },
  {
    id: 4,
    type: "achievement",
    badge: "🚀 CAREER GROWTH",
    title: "Launch Your Dream Career",
    subtitle: "See how 10,000+ graduates transformed their careers with 125% average salary hike.",
    buttonText: "View Stories",
    backgroundImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600",
    cardTitle: "Salary Hike",
    cardSubtitle: "Avg. Increase",
    cardValue: "125%",
    tags: ["Promotion", "Hired", "Impact"]
  }
];

export const NEWS_UPDATES: NewsItem[] = [
  {
    id: 1,
    title: "AI in Classrooms: Transforming Education in 2024",
    category: "AI & EdTech",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    date: "Just now"
  },
  {
    id: 2,
    title: "New Government Policy on Skill Development",
    category: "Policy",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
    date: "2 hours ago"
  },
  {
    id: 3,
    title: "Top 10 Emerging Tech Skills for Students",
    category: "Career Skills",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    date: "5 hours ago"
  },
  {
    id: 4,
    title: "Global Trends in Online Learning for 2025",
    category: "Future Ed",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    date: "1 day ago"
  }
];
