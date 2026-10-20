/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { AboutModal } from './components/AboutModal.tsx';
import { PricingModal } from './components/PricingModal.tsx';
import { JoinModal } from './components/JoinModal.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { AdvisorsMarquee } from './components/AdvisorsMarquee.tsx';
import { ProblemSection } from './components/ProblemSection.tsx';
import { SolutionSection } from './components/SolutionSection.tsx';
import { RuntimeSection } from './components/RuntimeSection.tsx';
import { FAQSection } from './components/FAQSection.tsx';
import { StartBuildingSection } from './components/StartBuildingSection.tsx';

export default function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Close any modal with the Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAboutOpen(false);
        setIsPricingOpen(false);
        setIsJoinOpen(false);
        setIsContactOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#0055d4] selection:text-white">
      {/* Stepped Column Wipe Preloader */}
      <Preloader />

      {/* Top Navigation Bar */}
      <Navbar
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenJoin={() => setIsJoinOpen(true)}
      />

      {/* Main Hero Container & Content Sections */}
      <main className="flex-1 flex flex-col justify-start">
        <HeroSection
          onOpenJoin={() => setIsJoinOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />
        <AdvisorsMarquee />
        <ProblemSection onOpenJoin={() => setIsJoinOpen(true)} />
        <SolutionSection onOpenJoin={() => setIsJoinOpen(true)} />
        {/* How It Works Section */}
        <RuntimeSection />
        {/* FAQ Section (recreated from reference below How It Works) */}
        <FAQSection />
        {/* Start Building Section (recreated from reference beneath FAQ) */}
        <StartBuildingSection
          onOpenContact={() => setIsContactOpen(true)}
          onOpenJoin={() => setIsJoinOpen(true)}
        />
      </main>

      {/* Modals for Functional Interaction */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenEnterprise={() => {
          setIsAboutOpen(false);
          setIsPricingOpen(true);
        }}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onOpenContact={() => {
          setIsPricingOpen(false);
          setIsContactOpen(true);
        }}
      />

      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
