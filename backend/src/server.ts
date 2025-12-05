import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './config/supabase';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'EduDash API with Supabase' }));

app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: error.message });
  res.json(data);
});

app.get('/api/courses', async (req, res) => {
  const { data, error } = await supabase.from('courses').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/courses', async (req, res) => {
  const { data, error } = await supabase.from('courses').insert(req.body).select();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

app.get('/api/enrollments', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return res.status(401).json({ error: 'Invalid token' });

  const { data, error } = await supabase.from('enrollments').select('*, courses(*)').eq('user_id', user.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/enrollments', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return res.status(401).json({ error: 'Invalid token' });

  const { course_id, progress = 0 } = req.body;
  const { data, error } = await supabase.from('enrollments').insert({ user_id: user.id, course_id, progress }).select();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

app.put('/api/enrollments/:id', async (req, res) => {
  const { id } = req.params;
  const { progress } = req.body;
  const { data, error } = await supabase.from('enrollments').update({ progress }).eq('id', id).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.get('/api/notifications', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return res.status(401).json({ error: 'Invalid token' });

  const { data, error } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
