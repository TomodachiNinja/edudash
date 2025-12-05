import { Router } from 'express';
import { getAllCourses, getUserCourses, enrollCourse, updateProgress } from '../controllers/courseController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/all', getAllCourses);
router.get('/my-courses', authenticate, getUserCourses);
router.post('/enroll', authenticate, enrollCourse);
router.put('/progress/:enrollmentId', authenticate, updateProgress);

export default router;
