import React from 'react';
import { X, Layers, Lock, Cable } from 'lucide-react';

interface EnterpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const EnterpriseModal: React.FC<EnterpriseModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#090a0f] border border-neutral-800 p-6 sm:p-8 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              Solutions
            </span>
            <h2 className="text-lg font-medium text-white font-sans">
              Roow Enterprise
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

        <div className="mt-6 space-y-4 text-sm text-neutral-300">
          <p className="text-base text-neutral-100">
            Roow delivers dedicated VPC, on-premises, and sovereign air-gapped vibecoding infrastructure for high-velocity engineering organizations.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 bg-[#11131a] border border-neutral-800/80 flex items-start gap-3">
              <Layers className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-mono text-xs text-white uppercase tracking-wider">
                  Self-Hosted Sovereign Enclaves
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Host Roow within your own AWS, GCP, or on-prem Kubernetes cluster. Zero telemetry or code egress.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-[#11131a] border border-neutral-800/80 flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-mono text-xs text-white uppercase tracking-wider">
                  Enterprise Key Vault &amp; RBAC
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  SSO/SAML 2.0 integration, granular developer permissions, audit logging, and centralized LLM budget controls.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-[#11131a] border border-neutral-800/80 flex items-start gap-3">
              <Cable className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-mono text-xs text-white uppercase tracking-wider">
                  Custom MCP Toolchain Integration
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Direct connection to internal enterprise microservices, private GitHub Enterprise, Jira, and internal databases.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="px-4 py-2 bg-[#0055d4] hover:bg-[#0047b8] text-xs font-mono tracking-wider uppercase text-white font-medium cursor-pointer transition-colors"
          >
            Contact Solutions Team
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
