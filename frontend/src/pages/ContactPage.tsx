import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="p-8 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-3 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold">
          <Mail className="w-3.5 h-3.5" /> Team Aurelius Support
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          Contact & Feedback
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
          Have a question about the curriculum, found an edge case, or want to partner with FinQuest for your campus?
        </p>
      </div>

      <div className="p-8 rounded-3xl glass-panel border border-[var(--border-glass)] space-y-6">
        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-sm text-[var(--text-primary)]">Message Sent Successfully!</h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Thank you, {name}. Team Aurelius has received your query and will reply to <span className="font-mono font-bold text-[var(--accent)]">{email}</span> within 24 hours.
            </p>
            <button
              onClick={() => { setSubmitted(false); setMessage(''); }}
              className="mt-3 px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-bold"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-[var(--text-secondary)]">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prathamjot Singh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[var(--text-secondary)]">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. student@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[var(--text-secondary)]">Subject</label>
              <input
                type="text"
                placeholder="Course feedback, bug report, or campus workshop"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[var(--text-secondary)]">Message *</label>
              <textarea
                required
                rows={4}
                placeholder="Write your note here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold shadow-lg shadow-[var(--accent-glow)] flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit Message</span>
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-[var(--border-glass)] text-center text-xs text-[var(--text-muted)] space-y-1">
          <p>Or email Team Aurelius directly:</p>
          <a
            href="mailto:team.aurelius.finquest@gmail.com"
            className="font-mono text-[var(--accent)] font-bold hover:underline"
          >
            team.aurelius.finquest@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};
