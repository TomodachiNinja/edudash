import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const courses = [
  { id: 1, title: "Complete React Development", instructor: "Sarah Johnson", progress: 65, totalHours: 40, hoursLeft: 14, image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800", category: "Web Development", rating: 4.8, reviews: 1240, youtubeUrl: "https://www.youtube.com/playlist?list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt" },
  { id: 2, title: "UI/UX Design Masterclass", instructor: "Michael Chen", progress: 40, totalHours: 25, hoursLeft: 15, image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&q=80&w=800", category: "Design", rating: 4.9, reviews: 850, youtubeUrl: "https://www.youtube.com/playlist?list=PLjwm_8O3suyP5k4sC8V0tC7XvT85z0A_" },
  { id: 3, title: "Python for Data Science", instructor: "David Miller", progress: 85, totalHours: 50, hoursLeft: 7.5, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", category: "Data Science", rating: 4.7, reviews: 2100, youtubeUrl: "https://www.youtube.com/playlist?list=PLeo1K3hjS3usILfyIGkyBQdxCIldu3MS" }
];

const users: any[] = [];
const notifications = [
  { id: 1, title: "New Course Available", message: "Advanced React Patterns is now live!", time: "2m ago", read: false, type: 'info' },
  { id: 2, title: "Assignment Due", message: "Complete UI Design Basics by tomorrow", time: "1h ago", read: false, type: 'alert' }
];

app.get('/', (req, res) => res.json({ message: 'EduDash API is running' }));
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const user = { id: users.length + 1, name, email };
  users.push(user);
  res.status(201).json({ token: 'demo-token', user });
});
app.post('/api/auth/login', (req, res) => res.json({ token: 'demo-token', user: { id: 1, name: 'John Doe', email: req.body.email } }));
app.get('/api/courses/all', (req, res) => res.json(courses));
app.get('/api/courses/my-courses', (req, res) => res.json(courses));
app.get('/api/notifications', (req, res) => res.json(notifications));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
