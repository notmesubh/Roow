import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '10 - 50 developers',
    message: '',
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
            <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              Inquiry
            </span>
            <h2 className="text-lg font-medium text-white font-sans">
              Contact Roow Team
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
              Inquiry Dispatched
            </h3>
            <p className="text-sm text-neutral-400 max-w-md mx-auto">
              Thank you, {formData.name || 'Builder'}. A developer solutions specialist from Roow will reach out to {formData.email} directly.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alex Vance"
                  className="w-full bg-[#11131a] border border-neutral-800 px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full bg-[#11131a] border border-neutral-800 px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Organization / Team
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Acme Studio"
                  className="w-full bg-[#11131a] border border-neutral-800 px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Engineering Team Size
                </label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full bg-[#11131a] border border-neutral-800 px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-sans"
                >
                  <option value="1 - 10 developers">1 - 10 developers</option>
                  <option value="10 - 50 developers">10 - 50 developers</option>
                  <option value="50 - 200 developers">50 - 200 developers</option>
                  <option value="&gt; 200 developers">&gt; 200 developers</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Vibecoding Workflow / Deployment Requirements
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="BYOK model integration, custom MCP tools, on-prem deployment..."
                className="w-full bg-[#11131a] border border-neutral-800 px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 font-sans resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0055d4] hover:bg-[#0047b8] text-white text-xs font-mono font-semibold tracking-wider uppercase transition-colors cursor-pointer"
              >
                <span>Request Technical Discovery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
