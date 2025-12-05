# EduDash AI - Educational Dashboard

Full-stack educational platform with AI-powered features.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini API

## Setup

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

### Environment Variables

Create `backend/.env`:
```
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
NODE_ENV=development
```

## Database Setup
Run SQL in Supabase (see `backend/SUPABASE_SETUP.md`)

## Running
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
