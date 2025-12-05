const API_URL = 'http://localhost:5000/api';

export const api = {
  auth: {
    register: (data: any) => fetch(`${API_URL}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
    login: (data: any) => fetch(`${API_URL}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json())
  },
  courses: {
    getAll: () => fetch(`${API_URL}/courses`).then(r => r.json()),
    getEnrollments: (token: string) => fetch(`${API_URL}/enrollments`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
    enroll: (token: string, courseId: number) => fetch(`${API_URL}/enrollments`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ course_id: courseId }) }).then(r => r.json())
  },
  notifications: {
    getAll: (token: string) => fetch(`${API_URL}/notifications`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json())
  }
};
