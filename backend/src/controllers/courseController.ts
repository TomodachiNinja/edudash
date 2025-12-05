import { Request, Response } from 'express';
import Course from '../models/Course';
import Enrollment from '../models/Enrollment';

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserCourses = async (req: Request, res: Response) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.id })
      .populate('courseId')
      .exec();
    
    const courses = enrollments.map(e => ({
      ...e.courseId.toObject(),
      progress: e.progress,
      hoursLeft: e.courseId.totalHours - e.hoursCompleted,
      enrollmentId: e._id
    }));

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const enrollCourse = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.body;
    
    const existing = await Enrollment.findOne({ userId: req.user.id, courseId });
    if (existing) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    const enrollment = await Enrollment.create({ userId: req.user.id, courseId });
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProgress = async (req: Request, res: Response) => {
  try {
    const { enrollmentId } = req.params;
    const { progress, hoursCompleted } = req.body;

    const enrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId,
      { progress, hoursCompleted, status: progress >= 100 ? 'completed' : 'active' },
      { new: true }
    );

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
