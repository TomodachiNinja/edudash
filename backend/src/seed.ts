import dotenv from 'dotenv';
import { connectDB } from './config/database';
import Course from './models/Course';

dotenv.config();

const courses = [
  {
    title: "Complete React Development",
    instructor: "Sarah Johnson",
    category: "Web Development",
    totalHours: 40,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 1240,
    youtubeUrl: "https://www.youtube.com/playlist?list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt"
  },
  {
    title: "UI/UX Design Masterclass",
    instructor: "Michael Chen",
    category: "Design",
    totalHours: 25,
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 850,
    youtubeUrl: "https://www.youtube.com/playlist?list=PLjwm_8O3suyP5k4sC8V0tC7XvT85z0A_"
  },
  {
    title: "Python for Data Science",
    instructor: "David Miller",
    category: "Data Science",
    totalHours: 50,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    reviews: 2100,
    youtubeUrl: "https://www.youtube.com/playlist?list=PLeo1K3hjS3usILfyIGkyBQdxCIldu3MS"
  },
  {
    title: "Digital Marketing Fundamentals",
    instructor: "Emily Wilson",
    category: "Marketing",
    totalHours: 15,
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    reviews: 560,
    youtubeUrl: "https://www.youtube.com/playlist?list=PLjVLYmrlmjGcHubHv6zV6L-x_ZfDk6z4B"
  },
  {
    title: "JavaScript Advanced Concepts",
    instructor: "James Anderson",
    category: "Web Development",
    totalHours: 30,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 980,
    youtubeUrl: "https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP"
  },
  {
    title: "Graphic Design Principles",
    instructor: "Jessica Lee",
    category: "Design",
    totalHours: 20,
    image: "https://images.unsplash.com/photo-1572044162444-ad6021194360?auto=format&fit=crop&q=80&w=800",
    rating: 4.5,
    reviews: 430,
    youtubeUrl: "https://www.youtube.com/playlist?list=PLW-zSkCnZ-gA50-m6M6l-9-9-9-9-9-9"
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await Course.deleteMany({});
    await Course.insertMany(courses);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
