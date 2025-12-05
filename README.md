<div align="center">

# 🎓 EduDash AI

### AI-Powered Educational Dashboard Platform

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)](https://edudashai.vercel.app)

### 🌐 [Live Demo](https://edudashai.vercel.app)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Setup](#️-setup) • [API](#-api-endpoints)

</div>

---

## ✨ Features

- 🤖 **AI-Powered Learning** - Integrated Google Gemini API for intelligent assistance
- 📊 **Interactive Dashboard** - Real-time analytics and progress tracking
- 👥 **Multi-Role Support** - Student, Teacher, and Admin interfaces
- 📚 **Course Management** - Create, enroll, and manage courses seamlessly
- 🔔 **Smart Notifications** - Stay updated with important announcements
- 📈 **Progress Analytics** - Visualize learning progress with charts
- 🎨 **Modern UI** - Beautiful interface with TailwindCSS and Lucide icons
- 🔐 **Secure Authentication** - Powered by Supabase Auth

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React 18.2** - UI library
- 📘 **TypeScript** - Type safety
- ⚡ **Vite** - Build tool
- 🎨 **TailwindCSS** - Styling
- 📊 **Recharts** - Data visualization
- 🎯 **Lucide React** - Icons

### Backend
- 🟢 **Node.js + Express** - Server framework
- 📘 **TypeScript** - Type safety
- 🗄️ **Supabase** - Database & Auth
- 🤖 **Google Gemini API** - AI capabilities

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/TomodachiNinja/edudash.git
cd edudash

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Start development servers
npm run dev          # Frontend (Terminal 1)
cd backend && npm run dev  # Backend (Terminal 2)
```

## ⚙️ Setup

### 1️⃣ Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Google Gemini API key

### 2️⃣ Environment Configuration

Create `backend/.env` file:

```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

### 3️⃣ Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `backend/SUPABASE_SETUP.md`
3. Copy your project URL and anon key to `.env`

### 4️⃣ Access the Application

**Live Demo**: [https://edudashai.vercel.app](https://edudashai.vercel.app)

**Local Development**:
```bash
# Frontend
npm run dev

# Backend
cd backend
npm run dev
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course (Teacher/Admin)
- `POST /api/courses/:id/enroll` - Enroll in course

### Notifications
- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/:id/read` - Mark as read

## 📁 Project Structure

```
edudash/
├── 📂 src/              # Frontend source
│   └── api/             # API client
├── 📂 components/       # React components
├── 📂 backend/          # Backend source
│   ├── src/
│   │   ├── config/      # Database config
│   │   ├── controllers/ # Route controllers
│   │   ├── models/      # Data models
│   │   ├── routes/      # API routes
│   │   └── middleware/  # Auth middleware
│   └── .env            # Environment variables
├── App.tsx             # Main app component
├── package.json        # Frontend dependencies
└── vite.config.ts      # Vite configuration
```

## 🎯 Default Credentials

After running the seed script:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@edudash.com | admin123 |
| Teacher | teacher@edudash.com | teacher123 |
| Student | student@edudash.com | student123 |

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Google Gemini for AI capabilities
- Supabase for backend infrastructure
- React and Vite communities

---

<div align="center">

**Made with ❤️ by TomodachiNinja**

⭐ Star this repo if you find it helpful!

</div>
