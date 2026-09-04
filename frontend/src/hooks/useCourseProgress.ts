import { useState, useEffect } from 'react';
import { COURSE_MODULES } from '../data/courseData';

export interface CourseProgressState {
  completedLessons: string[];
  learnerName: string;
  certificateId: string;
  certificateEarnedDate: string | null;
}

const STORAGE_KEY = 'finquest_course_progress';

export function useCourseProgress() {
  const [state, setState] = useState<CourseProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      completedLessons: ['lesson-1-1'],
      learnerName: 'Prathamjot Singh',
      certificateId: 'FQ-CERT-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      certificateEarnedDate: null,
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const totalLessons = COURSE_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = state.completedLessons.length;
  const progressPct = Math.min(100, Math.round((completedCount / totalLessons) * 100));
  const isCourseComplete = completedCount >= totalLessons;

  const markLessonCompleted = (lessonId: string) => {
    setState(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const updated = [...prev.completedLessons, lessonId];
      const newlyComplete = updated.length >= totalLessons;
      return {
        ...prev,
        completedLessons: updated,
        certificateEarnedDate: newlyComplete && !prev.certificateEarnedDate
          ? new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
          : prev.certificateEarnedDate,
      };
    });
  };

  const setLearnerName = (name: string) => {
    setState(prev => ({ ...prev, learnerName: name }));
  };

  const unlockAllForTesting = () => {
    const allIds: string[] = [];
    COURSE_MODULES.forEach(m => m.lessons.forEach(l => allIds.push(l.id)));
    setState(prev => ({
      ...prev,
      completedLessons: allIds,
      certificateEarnedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }));
  };

  const resetProgress = () => {
    setState({
      completedLessons: [],
      learnerName: state.learnerName,
      certificateId: 'FQ-CERT-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      certificateEarnedDate: null,
    });
  };

  return {
    state,
    completedLessons: state.completedLessons,
    totalLessons,
    progressPct,
    isCourseComplete,
    markLessonCompleted,
    setLearnerName,
    unlockAllForTesting,
    resetProgress,
  };
}
