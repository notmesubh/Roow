import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTextScramble } from '../hooks/useTextScramble.ts';

interface SolutionSectionProps {
  onOpenJoin?: () => void;
  onOpenContact?: () => void;
}

// 01: Rotating Wireframe 3D Sphere (Matching reference video)
const RotatingWireframeSphere: React.FC = () => {
  const meridiansRef = useRef<SVGEllipseElement[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const R = 38;
    const numMeridians = 8;

    const animate = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;

      meridiansRef.current.forEach((el, i) => {
        if (!el) return;
        const phi = t + (i * Math.PI) / numMeridians;
        const cosVal = Math.cos(phi);
        const rx = Math.max(0.6, Math.abs(cosVal) * R);
        const op = 0.32 + Math.abs(cosVal) * 0.58;
        el.setAttribute('rx', rx.toFixed(2));
        el.setAttribute('opacity', op.toFixed(2));
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <svg viewBox="0 0 100 100" className="w-18 h-18 sm:w-20 sm:h-20 fill-none overflow-visible">
      <defs>
        <linearGradient id="sphereGradientBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="28%" stopColor="#bae6fd" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Outer circle perimeter */}
      <circle cx="50" cy="50" r="38" stroke="url(#sphereGradientBlue)" strokeWidth="1.2" opacity="0.9" />

      {/* Latitudinal Rings */}
      <ellipse cx="50" cy="30" rx="32" ry="6.5" stroke="url(#sphereGradientBlue)" strokeWidth="0.9" opacity="0.45" />
      <ellipse cx="50" cy="50" rx="38" ry="8.5" stroke="url(#sphereGradientBlue)" strokeWidth="1" opacity="0.6" strokeDasharray="2.5 2.5" />
      <ellipse cx="50" cy="70" rx="32" ry="6.5" stroke="url(#sphereGradientBlue)" strokeWidth="0.9" opacity="0.45" />

      {/* 8 Rotating Longitudinal Meridians */}
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          ref={(el) => {
            if (el) meridiansRef.current[i] = el;
          }}
          cx="50"
          cy="50"
          rx="38"
          ry="38"
          stroke="url(#sphereGradientBlue)"
          strokeWidth="1.1"
          opacity="0.65"
        />
      ))}
    </svg>
  );
};

// 02: Undulating Ribbon Wave Curtain (Matching reference video)
const WaveCurtainComponent: React.FC = () => {
  const pathsRef = useRef<SVGPathElement[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const numLines = 15;
    const startX = 26;
    const spacing = 3.4;

    const animate = () => {
      timeRef.current += 0.035;
      const t = timeRef.current;

      pathsRef.current.forEach((el, i) => {
        if (!el) return;
        const x = startX + i * spacing;
        // S-curve wave offset with smooth traveling phase
        const waveOffset = Math.sin(t + i * 0.38) * 11;
        const cpY1 = 44;
        const cpY2 = 66;
        const targetX = x + waveOffset;

        const d = `M ${x} 14 L ${x} 38 C ${x} ${cpY1}, ${targetX} ${cpY1}, ${targetX} 55 C ${targetX} ${cpY2}, ${x} ${cpY2}, ${x} 72 L ${x} 86`;
        el.setAttribute('d', d);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <svg viewBox="0 0 100 100" className="w-18 h-18 sm:w-20 sm:h-20 fill-none overflow-visible">
      <defs>
        <linearGradient id="waveGradientBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="30%" stopColor="#bae6fd" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* 15 Undulating Wave Lines */}
      {Array.from({ length: 15 }).map((_, i) => (
        <path
          key={i}
          ref={(el) => {
            if (el) pathsRef.current[i] = el;
          }}
          d={`M ${26 + i * 3.4} 14 L ${26 + i * 3.4} 86`}
          stroke="url(#waveGradientBlue)"
          strokeWidth="1.3"
          opacity="0.85"
        />
      ))}
    </svg>
  );
};

// 03: Reasoning Trace Signal Lines (Matching reference video)
const ReasoningTraceComponent: React.FC = () => {
  const linesRef = useRef<SVGLineElement[]>([]);
  const dotsRef = useRef<SVGCircleElement[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const numTraces = 14;
    const baseY = 84;

    const animate = () => {
      timeRef.current += 0.04;
      const t = timeRef.current;

      for (let i = 0; i < numTraces; i++) {
        const line = linesRef.current[i];
        const dot = dotsRef.current[i];
        if (!line || !dot) continue;

        // Harmonic heights oscillating smoothly like telemetry reasoning trace
        const h = 26 + Math.sin(t + i * 0.45) * 15 + Math.cos(t * 0.75 + i * 0.3) * 9;
        const targetY = Math.max(16, baseY - h);

        line.setAttribute('y1', targetY.toFixed(1));
        dot.setAttribute('cy', targetY.toFixed(1));
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <svg viewBox="0 0 100 100" className="w-18 h-18 sm:w-20 sm:h-20 fill-none overflow-visible">
      <defs>
        <linearGradient id="traceGradientBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#bae6fd" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Dashed baseline */}
      <line
        x1="22"
        y1="84"
        x2="78"
        y2="84"
        stroke="url(#traceGradientBlue)"
        strokeWidth="1.2"
        opacity="0.55"
        strokeDasharray="2.5 2.5"
      />

      {/* 14 Reasoning Trace Lines with summit pulse nodes */}
      {Array.from({ length: 14 }).map((_, i) => {
        const x = 26 + i * 3.7;
        return (
          <g key={i}>
            <line
              ref={(el) => {
                if (el) linesRef.current[i] = el;
              }}
              x1={x}
              y1={45}
              x2={x}
              y2={84}
              stroke="url(#traceGradientBlue)"
              strokeWidth="1.4"
              opacity="0.82"
            />
            <circle
              ref={(el) => {
                if (el) dotsRef.current[i] = el;
              }}
              cx={x}
              cy={45}
              r={1.4}
              fill="#ffffff"
              opacity="0.95"
            />
          </g>
        );
      })}
    </svg>
  );
};

export const SolutionSection: React.FC<SolutionSectionProps> = ({
  onOpenJoin,
  onOpenContact,
}) => {
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const getStartedText = useTextScramble('GET STARTED', isBtnHovered);

  return (
    <section className="relative w-full bg-black select-none">
      {/* Centered framed container matching Hero, Marquee, and Problem layouts */}
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28">
        {/* Outer framed dashed container seamlessly joined */}
        <div className="relative w-full border border-dashed border-white/25 -mt-px overflow-hidden">
          {/* Main 2-Column Split: Royal Blue Gradient Left fading to Pitch Black vs Pitch Black Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px] lg:min-h-[720px]">
            {/* Left Column: Luminous Deep Royal Blue Gradient Canvas fading to Pitch Black */}
            <div className="lg:col-span-5 relative p-8 sm:p-12 md:p-14 lg:p-16 flex flex-col justify-between overflow-hidden min-h-[500px] bg-black">
              {/* Royal Blue to Pitch Black Vertical Gradient matching screenshot */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, #004ee6 0%, #003bb8 26%, #002275 42%, #000e35 56%, #000000 72%, #000000 100%)',
                }}
              />
              {/* Ambient Specular Light Diffusion */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                style={{
                  background:
                    'radial-gradient(ellipse at 35% 0%, #2563eb 0%, transparent 65%)',
                }}
              />

              <div className="relative z-10 pointer-events-auto">
                {/* Top Badge: Pill-less, sleek uppercase tag */}
                <div className="mb-6 sm:mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-white/25 shadow-lg shadow-blue-500/15 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
                    <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-white font-bold">
                      SOLUTION
                    </span>
                  </div>
                </div>

                {/* Main Headline */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-medium tracking-tight text-white font-sans antialiased leading-[1.12] mb-6 max-w-md drop-shadow-lg">
                  One ecosystem. Your way of building.
                </h2>

                {/* Subtitle / Narrative */}
                <p className="text-[15px] sm:text-[16px] text-blue-100/90 font-sans antialiased leading-relaxed max-w-md font-normal drop-shadow">
                  Roow brings AI models, development tools, and integrations into one connected environment, giving you the freedom to build your way.
                </p>
              </div>

              {/* Action Button: Technical Ticket [ GET STARTED | -> ] with Hero-style Scramble Interaction */}
              <div className="relative z-10 mt-10 lg:mt-16 pointer-events-auto">
                <button
                  onClick={onOpenJoin || onOpenContact}
                  onMouseEnter={() => setIsBtnHovered(true)}
                  onMouseLeave={() => setIsBtnHovered(false)}
                  type="button"
                  aria-label="Get Started"
                  className={`inline-flex items-stretch backdrop-blur-md border border-dashed transition-all duration-200 ease-out cursor-pointer active:scale-[0.98] h-[44px] ${
                    isBtnHovered
                      ? 'bg-black border-white text-white shadow-xl shadow-blue-500/20'
                      : 'bg-black/80 border-white/40 text-white hover:bg-black hover:border-white shadow-lg'
                  }`}
                >
                  <span className="px-5 sm:px-6 py-2.5 text-[13px] font-mono font-semibold tracking-[0.08em] uppercase flex items-center justify-center text-white min-w-[124px] text-center select-none">
                    {getStartedText}
                  </span>
                  <span
                    className={`w-0 border-r border-dashed self-stretch my-1 transition-colors duration-200 ${
                      isBtnHovered ? 'border-white/70' : 'border-white/40'
                    }`}
                  />
                  <span className="px-3.5 py-2.5 flex items-center justify-center">
                    <ArrowRight
                      className={`w-4 h-4 text-white transition-transform duration-200 ease-out ${
                        isBtnHovered ? 'translate-x-1.5' : ''
                      }`}
                    />
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column: Solid Pitch Black with Staggered Wireframe Functions */}
            <div className="lg:col-span-7 bg-black p-8 sm:p-12 md:p-14 lg:p-16 border-t lg:border-t-0 lg:border-l border-dashed border-white/20 flex flex-col justify-center relative">
              {/* Asymmetric 2-Column Staggered Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 lg:gap-16 items-start">
                {/* Left Sub-Column: Function 01 (Top) + Function 03 (Bottom) */}
                <div className="flex flex-col gap-12 sm:gap-14 lg:gap-16">
                  
                  {/* Function 01: Wireframe 3D Sphere (Matching reference video) */}
                  <div className="group cursor-pointer">
                    {/* Visual Box with 4 Corner Reticles */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 sm:mb-5 flex items-center justify-center bg-black/40">
                      {/* Corner Reticle Brackets */}
                      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-neutral-500 pointer-events-none" />
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-neutral-500 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-neutral-500 pointer-events-none" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-neutral-500 pointer-events-none" />

                      {/* 3D Wireframe Sphere */}
                      <RotatingWireframeSphere />
                    </div>

                    {/* Numeric Identifier */}
                    <span className="block text-[11px] font-mono font-semibold tracking-wider text-[#38bdf8] group-hover:text-[#E3EF4F] transition-colors duration-200 mb-1">
                      01
                    </span>

                    {/* Title */}
                    <h3 className="text-base sm:text-[17px] font-bold text-white font-sans uppercase tracking-[0.06em] mb-2 group-hover:text-[#E3EF4F] transition-colors duration-200">
                      Model freedom
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] sm:text-[13.5px] text-neutral-400 font-sans leading-relaxed max-w-[280px]">
                      Choose Roow-provided AI models or bring your own API keys.
                    </p>
                  </div>

                  {/* Function 03: Reasoning Trace Signal (Matching reference video) */}
                  <div className="group cursor-pointer">
                    {/* Visual Box with 4 Corner Reticles */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 sm:mb-5 flex items-center justify-center bg-black/40">
                      {/* Corner Reticle Brackets */}
                      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-neutral-500 pointer-events-none" />
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-neutral-500 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-neutral-500 pointer-events-none" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-neutral-500 pointer-events-none" />

                      {/* Reasoning Trace Signal Animation */}
                      <ReasoningTraceComponent />
                    </div>

                    {/* Numeric Identifier */}
                    <span className="block text-[11px] font-mono font-semibold tracking-wider text-[#38bdf8] group-hover:text-[#E3EF4F] transition-colors duration-200 mb-1">
                      03
                    </span>

                    {/* Title */}
                    <h3 className="text-base sm:text-[17px] font-bold text-white font-sans uppercase tracking-[0.06em] mb-2 group-hover:text-[#E3EF4F] transition-colors duration-200">
                      Flexible usage
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] sm:text-[13.5px] text-neutral-400 font-sans leading-relaxed max-w-[280px]">
                      Choose a plan that fits your needs, with Roow AI usage limits based on your subscription.
                    </p>
                  </div>
                </div>

                {/* Right Sub-Column: Function 02 Staggered in Vertical Center */}
                <div className="md:pt-28 lg:pt-32">
                  {/* Function 02: Ribbon Wave Curtain (Matching reference video) */}
                  <div className="group cursor-pointer">
                    {/* Visual Box with 4 Corner Reticles */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 sm:mb-5 flex items-center justify-center bg-black/40">
                      {/* Corner Reticle Brackets */}
                      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-neutral-500 pointer-events-none" />
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-neutral-500 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-neutral-500 pointer-events-none" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-neutral-500 pointer-events-none" />

                      {/* Waveform Ribbon Curtain Animation */}
                      <WaveCurtainComponent />
                    </div>

                    {/* Numeric Identifier */}
                    <span className="block text-[11px] font-mono font-semibold tracking-wider text-[#38bdf8] group-hover:text-[#E3EF4F] transition-colors duration-200 mb-1">
                      02
                    </span>

                    {/* Title */}
                    <h3 className="text-base sm:text-[17px] font-bold text-white font-sans uppercase tracking-[0.06em] mb-2 group-hover:text-[#E3EF4F] transition-colors duration-200">
                      Connected tools
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] sm:text-[13.5px] text-neutral-400 font-sans leading-relaxed max-w-[280px]">
                      Bring your workflow together with supported MCP servers and integrations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
