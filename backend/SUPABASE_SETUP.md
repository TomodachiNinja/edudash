# Supabase Setup Guide

## 1. Create Supabase Account
Go to https://supabase.com and sign up for free

## 2. Create New Project
- Click "New Project"
- Enter project name: "edudash"
- Set database password
- Choose region closest to you
- Click "Create new project"

## 3. Get API Credentials
- Go to Project Settings > API
- Copy "Project URL" and "anon public" key
- Update `.env` file:
```
SUPABASE_URL=your_project_url
SUPABASE_KEY=your_anon_key
```

## 4. Create Database Tables

Run these SQL commands in Supabase SQL Editor:

```sql
-- Courses table
CREATE TABLE courses (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  instructor TEXT NOT NULL,
  category TEXT NOT NULL,
  total_hours INTEGER NOT NULL,
  image TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  youtube_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enrollments table
CREATE TABLE enrollments (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  course_id BIGINT REFERENCES courses NOT NULL,
  progress INTEGER DEFAULT 0,
  hours_completed DECIMAL(5,2) DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Notifications table
CREATE TABLE notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample courses
INSERT INTO courses (title, instructor, category, total_hours, image, rating, reviews, youtube_url) VALUES
('Complete React Development', 'Sarah Johnson', 'Web Development', 40, 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800', 4.8, 1240, 'https://www.youtube.com/playlist?list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt'),
('UI/UX Design Masterclass', 'Michael Chen', 'Design', 25, 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&q=80&w=800', 4.9, 850, 'https://www.youtube.com/playlist?list=PLjwm_8O3suyP5k4sC8V0tC7XvT85z0A_'),
('Python for Data Science', 'David Miller', 'Data Science', 50, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', 4.7, 2100, 'https://www.youtube.com/playlist?list=PLeo1K3hjS3usILfyIGkyBQdxCIldu3MS');
```

## 5. Enable Row Level Security (Optional)

```sql
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Allow public read for courses
CREATE POLICY "Public courses" ON courses FOR SELECT USING (true);

-- Users can only see their own enrollments
CREATE POLICY "Users view own enrollments" ON enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create own enrollments" ON enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own enrollments" ON enrollments FOR UPDATE USING (auth.uid() = user_id);

-- Users can only see their own notifications
CREATE POLICY "Users view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
```

## 6. Start Backend Server
```bash
npm run dev
```

Server will run on http://localhost:5000
