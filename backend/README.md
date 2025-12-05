# EduDash Backend API

Backend server for EduDash educational platform built with Node.js, Express, TypeScript, and MongoDB.

## Features

- User authentication (register/login) with JWT
- Course management
- Enrollment tracking with progress
- Notifications system
- RESTful API design

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/edudash
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

3. Start MongoDB (if running locally):
```bash
mongod
```

4. Seed the database:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses/all` - Get all courses
- `GET /api/courses/my-courses` - Get user's enrolled courses (protected)
- `POST /api/courses/enroll` - Enroll in a course (protected)
- `PUT /api/courses/progress/:enrollmentId` - Update course progress (protected)

### Notifications
- `GET /api/notifications` - Get user notifications (protected)
- `PUT /api/notifications/:id/read` - Mark notification as read (protected)
- `PUT /api/notifications/read-all` - Mark all as read (protected)

## Database Models

### User
- name, email, password, role, profileImage

### Course
- title, instructor, category, totalHours, image, rating, reviews, youtubeUrl

### Enrollment
- userId, courseId, progress, hoursCompleted, status

### Notification
- userId, title, message, type, read

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run seed` - Seed database with sample courses
