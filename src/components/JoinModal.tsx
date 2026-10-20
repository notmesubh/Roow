import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Frontier AI Systems Engineer',
    portfolio: '',
    note: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-[#090a0f] border border-neutral-800 p-6 sm:p-8 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 bg-blue-950/80 border border-blue-800/60 text-[10px] font-mono uppercase tracking-widest text-blue-300">
              Community &amp; Early Access
            </span>
            <h2 className="text-lg font-medium text-white font-sans">
              Join Roow Ecosystem
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#E3EF4F] mx-auto" />
            <h3 className="text-lg font-medium text-white font-sans">
              Welcome to the Waitlist
            </h3>
            <p className="text-sm text-neutral-400 max-w-md mx-auto">
              Thank you, {formData.name || 'Builder'}. Your invite code and access key will be sent to {formData.email} as the next wave opens.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2 bg-neutral-900 border border-neutral-700 text-xs font-mono tracking-wider uppercase text-white hover:bg-neutral-800 cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full bg-[#11131a] border border-neutral-800 px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@example.com"
                className="w-full bg-[#11131a] border border-neutral-800 px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Primary Vibecoding Domain
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-[#11131a] border border-neutral-800 px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-sans"
              >
                <option value="Full-Stack Web &amp; Apps">Full-Stack Web &amp; Apps</option>
                <option value="AI Agents &amp; Tooling">AI Agents &amp; Tooling</option>
                <option value="Creative &amp; Spatial 3D">Creative &amp; Spatial 3D</option>
                <option value="Independent Hacker / Founder">Independent Hacker / Founder</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                GitHub / X / Portfolio URL
              </label>
              <input
                type="url"
                value={formData.portfolio}
                onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full bg-[#11131a] border border-neutral-800 px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0055d4] hover:bg-[#0047b8] text-white text-xs font-mono font-semibold tracking-wider uppercase transition-colors cursor-pointer"
              >
                <span>Request Early Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
