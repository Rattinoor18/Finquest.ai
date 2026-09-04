import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Sparkles,
  BookOpen,
  RotateCcw
} from 'lucide-react';
import { COURSE_MODULES } from '../data/courseData';
import { useCourseProgress } from '../hooks/useCourseProgress';

export const CourseLandingPage: React.FC = () => {
  const { 
    completedLessons, 
    totalLessons, 
    progressPct, 
    isCourseComplete,
    unlockAllForTesting,
    resetProgress
  } = useCourseProgress();

  // Find next uncompleted lesson
  let nextLessonUrl = '/course/module-1/lesson-1-1';
  let foundNext = false;
  for (const mod of COURSE_MODULES) {
    for (const les of mod.lessons) {
      if (!completedLessons.includes(les.id)) {
        nextLessonUrl = `/course/${mod.id}/${les.id}`;
        foundNext = true;
        break;
      }
    }
    if (foundNext) break;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold">
              <GraduationCap className="w-3.5 h-3.5" /> Complete Financial Literacy Curriculum
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              FinQuest Mastery Course
            </h1>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              8 structured modules and 24 interactive lessons. Clear each module's quiz to test your understanding, level up your financial health, and unlock your verifiable Certificate of Completion.
            </p>
          </div>

          {/* Certificate & Continue CTA */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
            <Link
              to={nextLessonUrl}
              className="px-6 py-3.5 rounded-2xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold shadow-lg shadow-[var(--accent-glow)] flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <span>{isCourseComplete ? "Review Course" : "Continue Learning"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/course/certificate"
              className={`px-6 py-3 rounded-2xl glass-card text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                isCourseComplete 
                  ? 'border-emerald-500/50 text-emerald-500 shadow-md' 
                  : 'border-[var(--border-glass)] text-[var(--text-secondary)]'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{isCourseComplete ? "Claim Certificate ✓" : "Certificate Preview"}</span>
            </Link>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-4 border-t border-[var(--border-glass)] space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[var(--text-secondary)]">Overall Course Progress:</span>
            <span className="font-mono text-[var(--accent)] font-bold">{completedLessons.length} of {totalLessons} Lessons ({progressPct}%)</span>
          </div>
          <div className="w-full h-3 rounded-full bg-[var(--surface)] border border-[var(--border-glass)] overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Dev / Testing Quick Unlock & Reset Toolbar */}
        <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-2">
          <span>Progress is saved automatically to your device.</span>
          <div className="flex items-center gap-3">
            <button 
              onClick={unlockAllForTesting}
              className="text-[var(--accent)] font-semibold hover:underline"
              title="Unlock all lessons for evaluation testing"
            >
              Quick-Complete All (Testing)
            </button>
            <span>•</span>
            <button 
              onClick={resetProgress}
              className="text-red-500 font-semibold hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset Progress
            </button>
          </div>
        </div>
      </div>

      {/* Module Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[var(--accent)]" /> Syllabus & Modules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSE_MODULES.map((mod, idx) => {
            const modCompletedCount = mod.lessons.filter(l => completedLessons.includes(l.id)).length;
            const isModComplete = modCompletedCount === mod.lessons.length;

            return (
              <div 
                key={mod.id} 
                className="p-6 rounded-3xl glass-card border border-[var(--border-glass)] space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[var(--accent-light)] text-[var(--accent)]">
                      Module 0{idx + 1}
                    </span>
                    {isModComplete ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-[var(--text-muted)]">
                        {modCompletedCount}/{mod.lessons.length} done
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[var(--text-primary)] leading-tight">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {mod.description}
                  </p>

                  {/* Lessons list */}
                  <div className="space-y-1.5 pt-2">
                    {mod.lessons.map((les, lIdx) => {
                      const isDone = completedLessons.includes(les.id);
                      return (
                        <Link
                          key={les.id}
                          to={`/course/${mod.id}/${les.id}`}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all group ${
                            isDone 
                              ? 'bg-emerald-500/5 border-emerald-500/20 text-[var(--text-primary)] hover:border-emerald-500/40' 
                              : 'bg-[var(--surface)] border-[var(--border-glass)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] shrink-0 font-bold ${
                              isDone ? 'bg-emerald-500 text-white' : 'bg-[var(--surface-glass)] text-[var(--text-muted)] border border-[var(--border-glass)]'
                            }`}>
                              {isDone ? "✓" : lIdx + 1}
                            </span>
                            <span className="font-medium truncate">{les.title}</span>
                          </div>
                          <span className="text-[10px] text-[var(--text-muted)] font-mono shrink-0 ml-2 group-hover:text-[var(--accent)]">
                            {les.readTime} →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--border-glass)] flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)] text-[11px]">3 interactive quizzes included</span>
                  <Link
                    to={`/course/${mod.id}/${mod.lessons[0].id}`}
                    className="font-bold text-[var(--accent)] hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>{modCompletedCount > 0 ? "Review Module" : "Start Module"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
