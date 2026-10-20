import React from 'react';
import { X, ShieldCheck, Database, Workflow } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnterprise: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenEnterprise,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#090a0f] border border-neutral-800 p-6 sm:p-8 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              Overview
            </span>
            <h2 className="text-lg font-medium text-white font-sans">
              About Roow
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

        {/* Content */}
        <div className="mt-6 space-y-5 text-sm text-neutral-300 font-sans leading-relaxed">
          <p className="text-base text-neutral-100 font-normal">
            Roow is building an open, unmetered ecosystem for unrestricted vibecoding. We liberate developers from artificial rate limits, proprietary walled gardens, and fragmented workflows.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-[#11131a] border border-neutral-800/80">
              <ShieldCheck className="w-5 h-5 text-blue-400 mb-2.5" />
              <h3 className="font-medium text-white text-xs font-mono uppercase tracking-wider mb-1">
                Zero Platform Markup
              </h3>
              <p className="text-xs text-neutral-400 leading-normal">
                Bring your own API keys. Direct connection to your favorite frontier models without middleman taxes.
              </p>
            </div>

            <div className="p-4 bg-[#11131a] border border-neutral-800/80">
              <Database className="w-5 h-5 text-blue-400 mb-2.5" />
              <h3 className="font-medium text-white text-xs font-mono uppercase tracking-wider mb-1">
                Connected MCP Bus
              </h3>
              <p className="text-xs text-neutral-400 leading-normal">
                Native Model Context Protocol support to link any database, API, local terminal, or custom tool.
              </p>
            </div>

            <div className="p-4 bg-[#11131a] border border-neutral-800/80">
              <Workflow className="w-5 h-5 text-blue-400 mb-2.5" />
              <h3 className="font-medium text-white text-xs font-mono uppercase tracking-wider mb-1">
                Unified Workflow
              </h3>
              <p className="text-xs text-neutral-400 leading-normal">
                An uninterrupted canvas where prompt, logic, terminal, and build live in synchronized harmony.
              </p>
            </div>
          </div>

          <div className="pt-2 text-xs text-neutral-400 font-mono">
            Designed for engineers, builders, and hackers who refuse to let artificial token caps derail their creative momentum.
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenEnterprise();
            }}
            className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider cursor-pointer"
          >
            Explore Roow Plans →
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono tracking-wider uppercase text-neutral-200 cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
