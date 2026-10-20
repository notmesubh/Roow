import React from 'react';
import { X, Check } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-[#090a0f] border border-neutral-800 p-6 sm:p-8 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              Pricing Plans
            </span>
            <h2 className="text-lg font-medium text-white font-sans">
              Roow Ecosystem Tiers
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

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Community / BYOK Tier */}
          <div className="p-5 bg-[#11131a] border border-neutral-800/80 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                Community BYOK
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold font-mono text-[#E3EF4F]">$0</span>
                <span className="text-xs text-neutral-400">/ free forever</span>
              </div>
              <p className="mt-2 text-xs text-neutral-300">
                Bring your own API keys. Unrestricted access to the entire Roow vibecoding canvas and local terminal.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-neutral-300 font-sans">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E3EF4F] shrink-0" />
                  <span>Unlimited projects &amp; local workspaces</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E3EF4F] shrink-0" />
                  <span>Connect any OpenAI, Anthropic, or OpenRouter key</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E3EF4F] shrink-0" />
                  <span>Local Model Context Protocol (MCP) servers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E3EF4F] shrink-0" />
                  <span>Community Discord &amp; GitHub support</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                onClose();
              }}
              className="mt-6 w-full py-2.5 bg-[#E3EF4F] hover:bg-[#d8e442] text-black font-semibold text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
            >
              Get Started Free
            </button>
          </div>

          {/* Pro / Team Tier */}
          <div className="p-5 bg-[#0e1628] border border-blue-900/60 flex flex-col justify-between relative">
            <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#0055d4] text-[9px] font-mono uppercase font-bold tracking-wider text-white">
              Team Cloud
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-300">
                Roow Cloud &amp; Teams
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold font-mono text-white">$20</span>
                <span className="text-xs text-neutral-400">/ seat / month</span>
              </div>
              <p className="mt-2 text-xs text-neutral-300">
                Managed cloud environments, persistent team agents, centralized key vault, and shared MCP registries.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-neutral-300 font-sans">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Everything in Community BYOK</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Cloud dev containers with 1-click preview URLs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Encrypted team API key pooling &amp; budget caps</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Priority fast-lane infrastructure support</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="mt-6 w-full py-2.5 bg-[#0055d4] hover:bg-[#0047b8] text-xs font-mono tracking-wider uppercase text-white font-semibold transition-colors cursor-pointer"
            >
              Talk to Team
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
          <span className="text-xs text-neutral-500 font-mono">
            Zero token markups. You pay model providers directly at cost.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono tracking-wider uppercase text-neutral-200 cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
