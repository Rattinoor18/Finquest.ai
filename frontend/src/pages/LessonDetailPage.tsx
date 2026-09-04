import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  Clock,
  Award,
  ChevronRight
} from 'lucide-react';
import { COURSE_MODULES } from '../data/courseData';
import { useCourseProgress } from '../hooks/useCourseProgress';

export const LessonDetailPage: React.FC = () => {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { completedLessons, markLessonCompleted } = useCourseProgress();

  const currentModule = COURSE_MODULES.find(m => m.id === moduleId);
  const currentLesson = currentModule?.lessons.find(l => l.id === lessonId);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  if (!currentModule || !currentLesson) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Lesson Not Found</h2>
        <p className="text-sm text-[var(--text-secondary)]">The requested lesson does not exist in our curriculum.</p>
        <Link to="/course" className="inline-block px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold">
          Back to Course Syllabus
        </Link>
      </div>
    );
  }

  // Determine prev and next lessons
  let prevLesson: { modId: string; lesId: string; title: string } | null = null;
  let nextLesson: { modId: string; lesId: string; title: string } | null = null;

  const allLessonsFlat: Array<{ modId: string; lesId: string; title: string }> = [];
  COURSE_MODULES.forEach(m => {
    m.lessons.forEach(l => {
      allLessonsFlat.push({ modId: m.id, lesId: l.id, title: l.title });
    });
  });

  const currentIndex = allLessonsFlat.findIndex(x => x.lesId === currentLesson.id);
  if (currentIndex > 0) prevLesson = allLessonsFlat[currentIndex - 1];
  if (currentIndex < allLessonsFlat.length - 1) nextLesson = allLessonsFlat[currentIndex + 1];

  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === currentLesson.quiz.correctIndex;
    setIsCorrect(correct);
    setQuizSubmitted(true);
    if (correct) {
      markLessonCompleted(currentLesson.id);
    }
  };

  const isAlreadyCompleted = completedLessons.includes(currentLesson.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] flex-wrap">
        <Link to="/" className="hover:text-[var(--accent)]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/course" className="hover:text-[var(--accent)]">Course</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[var(--text-secondary)] truncate max-w-[160px]">{currentModule.title}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-[var(--accent)] truncate max-w-[200px]">{currentLesson.title}</span>
      </nav>

      {/* Lesson Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            {currentModule.title}
          </span>
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] font-mono">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {currentLesson.readTime}
            </span>
            {isAlreadyCompleted && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Completed
              </span>
            )}
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
          {currentLesson.title}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed italic border-l-2 border-[var(--accent)] pl-4">
          {currentLesson.summary}
        </p>
      </div>

      {/* Lesson Content Body */}
      <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-[var(--border-glass)] space-y-6 leading-relaxed text-sm sm:text-base text-[var(--text-primary)]">
        {currentLesson.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}

        {/* Key Takeaways Callout Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--accent-light)] border border-[var(--border-glass-strong)] space-y-3 mt-8">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[var(--accent)]">
            <Sparkles className="w-4 h-4" />
            <span>Key Actionable Takeaways</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)] list-disc list-inside">
            {currentLesson.keyTakeaways.map((item, i) => (
              <li key={i} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Lesson Quiz Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border-glass)] pb-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[var(--accent)]" />
            <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
              Lesson Concept Check
            </h3>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">Pass quiz to mark complete</span>
        </div>

        <div className="space-y-3">
          <p className="font-bold text-sm sm:text-base text-[var(--text-primary)]">
            {currentLesson.quiz.question}
          </p>

          <div className="space-y-2.5 pt-2">
            {currentLesson.quiz.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isOptCorrect = idx === currentLesson.quiz.correctIndex;

              let styleClass = 'bg-[var(--surface)] border-[var(--border-glass)] hover:border-[var(--accent)] text-[var(--text-primary)]';

              if (quizSubmitted) {
                if (isOptCorrect) {
                  styleClass = 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold';
                } else if (isSelected && !isOptCorrect) {
                  styleClass = 'bg-red-500/15 border-red-500 text-red-700 dark:text-red-300';
                }
              } else if (isSelected) {
                styleClass = 'border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)] ring-2 ring-[var(--accent-glow)] font-semibold';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => !quizSubmitted && setSelectedOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${styleClass}`}
                >
                  <span className="w-6 h-6 rounded-full border border-[var(--border-glass)] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quiz Feedback Banner */}
        {quizSubmitted && (
          <div className={`p-4 rounded-2xl text-xs sm:text-sm space-y-1.5 animate-in fade-in duration-200 ${
            isCorrect 
              ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-200' 
              : 'bg-red-500/15 border border-red-500/40 text-red-800 dark:text-red-200'
          }`}>
            <div className="font-bold flex items-center gap-2">
              {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
              <span>{isCorrect ? "Correct! Lesson marked complete." : "Incorrect choice. Try again!"}</span>
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              {currentLesson.quiz.explanation}
            </p>
          </div>
        )}

        {/* Quiz Button */}
        <div className="flex justify-end pt-2">
          {!quizSubmitted ? (
            <button
              onClick={handleQuizSubmit}
              disabled={selectedOption === null}
              className="px-6 py-3 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-40 text-white text-xs font-bold shadow-md shadow-[var(--accent-glow)] transition-all"
            >
              Verify My Answer
            </button>
          ) : (
            <button
              onClick={() => {
                setQuizSubmitted(false);
                setSelectedOption(null);
              }}
              className="px-6 py-2.5 rounded-xl glass-card text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              Retry Quiz
            </button>
          )}
        </div>
      </div>

      {/* Previous / Next Lesson Navigation Footer */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-[var(--border-glass)]">
        {prevLesson ? (
          <Link
            to={`/course/${prevLesson.modId}/${prevLesson.lesId}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--accent)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous: {prevLesson.title}</span>
            <span className="sm:hidden">Previous</span>
          </Link>
        ) : <div />}

        {nextLesson ? (
          <Link
            to={`/course/${nextLesson.modId}/${nextLesson.lesId}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold shadow-md shadow-[var(--accent-glow)] transition-all"
          >
            <span className="hidden sm:inline">Next: {nextLesson.title}</span>
            <span className="sm:hidden">Next Lesson</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            to="/course/certificate"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/25 transition-all"
          >
            <Award className="w-4 h-4" />
            <span>Finish Course & Claim Certificate</span>
          </Link>
        )}
      </div>
    </div>
  );
};
