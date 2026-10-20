import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTextScramble } from '../hooks/useTextScramble.ts';

interface ProblemSectionProps {
  onOpenJoin?: () => void;
  onOpenContact?: () => void;
}

// 01: Artificial Limits - Wireframe Constriction Funnel & Barrier Gate with Throttled Flow
const ArtificialLimitsComponent: React.FC = () => {
  const stream1Ref = useRef<SVGLineElement>(null);
  const stream2Ref = useRef<SVGLineElement>(null);
  const stream3Ref = useRef<SVGLineElement>(null);
  const dripRef = useRef<SVGCircleElement>(null);
  const gateRef = useRef<SVGRectElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.025;
      const t = timeRef.current;

      // Inflow stream pulse animations
      if (stream1Ref.current) {
        const op1 = 0.35 + 0.55 * Math.sin(t * 3.2);
        stream1Ref.current.setAttribute('opacity', op1.toFixed(2));
      }
      if (stream2Ref.current) {
        const op2 = 0.45 + 0.55 * Math.sin(t * 3.2 + 1.2);
        stream2Ref.current.setAttribute('opacity', op2.toFixed(2));
      }
      if (stream3Ref.current) {
        const op3 = 0.35 + 0.55 * Math.sin(t * 3.2 + 2.4);
        stream3Ref.current.setAttribute('opacity', op3.toFixed(2));
      }

      // Throttled single drip animation falling smoothly past the barrier
      if (dripRef.current) {
        const cycle = (t * 0.9) % 1; // 0 to 1 cycle
        const dripY = 61 + cycle * 12.5; // falls from y=61 to y=73.5
        const dripOpacity =
          cycle < 0.15 ? cycle * 6 : cycle > 0.85 ? Math.max(0, (1 - cycle) * 6) : 0.9;
        dripRef.current.setAttribute('cy', dripY.toFixed(1));
        dripRef.current.setAttribute('opacity', dripOpacity.toFixed(2));
      }

      // Barrier gate subtle containment pulse
      if (gateRef.current) {
        const gateOp = 0.82 + 0.18 * Math.sin(t * 1.8);
        gateRef.current.setAttribute('opacity', gateOp.toFixed(2));
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <svg viewBox="0 0 100 100" className="w-18 h-18 sm:w-20 sm:h-20 text-[#E3EF4F] fill-none overflow-visible">
      {/* 3 Upper Inflow Stream Lines */}
      <line
        ref={stream1Ref}
        x1="36"
        y1="31"
        x2="36"
        y2="45"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        ref={stream2Ref}
        x1="50"
        y1="28"
        x2="50"
        y2="45"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        ref={stream3Ref}
        x1="64"
        y1="31"
        x2="64"
        y2="45"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Constriction Funnel Walls */}
      <line x1="28" y1="45" x2="41" y2="52" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="72" y1="45" x2="59" y2="52" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />

      {/* Artificial Barrier Gate Rectangle */}
      <rect
        ref={gateRef}
        x="32"
        y="52"
        width="36"
        height="9"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="#000000"
        fillOpacity="0.6"
      />

      {/* Diagonal Warning Hash Lines across Gate */}
      <line x1="37" y1="61" x2="43" y2="52" stroke="currentColor" strokeWidth="1.4" />
      <line x1="43" y1="61" x2="49" y2="52" stroke="currentColor" strokeWidth="1.4" />
      <line x1="49" y1="61" x2="55" y2="52" stroke="currentColor" strokeWidth="1.4" />
      <line x1="55" y1="61" x2="61" y2="52" stroke="currentColor" strokeWidth="1.4" />

      {/* Throttled Dashed Drip Line Below Barrier */}
      <line
        x1="50"
        y1="61"
        x2="50"
        y2="73.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray="2 2"
        opacity="0.6"
      />

      {/* Animated Traveling Drip Droplet */}
      <circle ref={dripRef} cx="50" cy="65" r="1.6" fill="currentColor" />

      {/* Final throttled pooled droplet */}
      <circle cx="50" cy="73.5" r="2.2" fill="currentColor" />
    </svg>
  );
};

// 02: Locked-In Workflows - Isometric Wireframe Cage with Nested Tesseract Breathing & Constraint Pulses
const LockedWorkflowsComponent: React.FC = () => {
  const innerTopPolygonRef = useRef<SVGPolygonElement>(null);
  const innerLeftPolygonRef = useRef<SVGPolygonElement>(null);
  const innerRightPolygonRef = useRef<SVGPolygonElement>(null);
  const strutLinesRef = useRef<SVGLineElement[]>([]);
  const pulseDotsRef = useRef<SVGCircleElement[]>([]);
  const coreDotRef = useRef<SVGCircleElement>(null);
  const coreRingRef = useRef<SVGCircleElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Outer fixed isometric hexagon vertices
  const V_OUTER = [
    { x: 50, y: 18 }, // 0: top
    { x: 80, y: 33 }, // 1: top-right
    { x: 80, y: 67 }, // 2: bottom-right
    { x: 50, y: 82 }, // 3: bottom
    { x: 20, y: 67 }, // 4: bottom-left
    { x: 20, y: 33 }, // 5: top-left
  ];

  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.024;
      const t = timeRef.current;

      // Smooth harmonic breathing of inner isometric cage (scale between 0.38 and 0.64)
      const s = 0.51 + 0.13 * Math.sin(t * 1.8);

      // Mathematically precise 2:1 isometric inner vertices
      const vInner = [
        { x: 50, y: 48 - 30 * s }, // 0: inner top
        { x: 50 + 30 * s, y: 48 - 15 * s }, // 1: inner top-right
        { x: 50 + 30 * s, y: 48 + 19 * s }, // 2: inner bottom-right
        { x: 50, y: 48 + 34 * s }, // 3: inner bottom
        { x: 50 - 30 * s, y: 48 + 19 * s }, // 4: inner bottom-left
        { x: 50 - 30 * s, y: 48 - 15 * s }, // 5: inner top-left
      ];

      // Update inner top face
      if (innerTopPolygonRef.current) {
        const pts = `50,${vInner[0].y.toFixed(1)} ${vInner[1].x.toFixed(1)},${vInner[1].y.toFixed(1)} 50,48 ${vInner[5].x.toFixed(1)},${vInner[5].y.toFixed(1)}`;
        innerTopPolygonRef.current.setAttribute('points', pts);
      }
      // Update inner left face
      if (innerLeftPolygonRef.current) {
        const pts = `${vInner[5].x.toFixed(1)},${vInner[5].y.toFixed(1)} 50,48 50,${vInner[3].y.toFixed(1)} ${vInner[4].x.toFixed(1)},${vInner[4].y.toFixed(1)}`;
        innerLeftPolygonRef.current.setAttribute('points', pts);
      }
      // Update inner right face
      if (innerRightPolygonRef.current) {
        const pts = `50,48 ${vInner[1].x.toFixed(1)},${vInner[1].y.toFixed(1)} ${vInner[2].x.toFixed(1)},${vInner[2].y.toFixed(1)} 50,${vInner[3].y.toFixed(1)}`;
        innerRightPolygonRef.current.setAttribute('points', pts);
      }

      // Update the 6 radial struts connecting outer cage to inner core
      for (let i = 0; i < 6; i++) {
        const line = strutLinesRef.current[i];
        if (line) {
          line.setAttribute('x2', vInner[i].x.toFixed(1));
          line.setAttribute('y2', vInner[i].y.toFixed(1));
        }

        // Animated constraint pulse beads traveling along the struts inward to the lock core
        const dot = pulseDotsRef.current[i];
        if (dot) {
          const progress = (t * 0.75 + i * 0.166) % 1;
          const px = V_OUTER[i].x + progress * (vInner[i].x - V_OUTER[i].x);
          const py = V_OUTER[i].y + progress * (vInner[i].y - V_OUTER[i].y);
          const dotOp = Math.sin(progress * Math.PI) * 0.9;
          dot.setAttribute('cx', px.toFixed(1));
          dot.setAttribute('cy', py.toFixed(1));
          dot.setAttribute('opacity', dotOp.toFixed(2));
        }
      }

      // Center lock core breathing
      if (coreDotRef.current) {
        const r = 2.4 + 0.6 * Math.sin(t * 2.4);
        coreDotRef.current.setAttribute('r', r.toFixed(2));
      }

      // Expanding radar containment ring at center (50, 48)
      if (coreRingRef.current) {
        const ringCycle = (t * 0.8) % 1;
        const ringR = 3 + ringCycle * 8; // expands from 3 to 11
        const ringOp = Math.max(0, (1 - ringCycle) * 0.65);
        coreRingRef.current.setAttribute('r', ringR.toFixed(1));
        coreRingRef.current.setAttribute('opacity', ringOp.toFixed(2));
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-18 h-18 sm:w-20 sm:h-20 text-[#E3EF4F] fill-none overflow-visible"
    >
      {/* Outer Rigid Isometric Shell */}
      {/* Top Face */}
      <polygon
        points="50,18 80,33 50,48 20,33"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.95"
        fill="#E3EF4F"
        fillOpacity="0.05"
      />
      {/* Left Face */}
      <polygon
        points="20,33 50,48 50,82 20,67"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.8"
        fill="#000000"
        fillOpacity="0.4"
      />
      {/* Right Face */}
      <polygon
        points="50,48 80,33 80,67 50,82"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.8"
        fill="#000000"
        fillOpacity="0.5"
      />

      {/* Internal Perspective Dashed Partitions (from original visual) */}
      <line x1="50" y1="23" x2="50" y2="44" stroke="currentColor" strokeWidth="1.1" strokeDasharray="2 2" opacity="0.6" />
      <line x1="35" y1="48" x2="35" y2="70" stroke="currentColor" strokeWidth="1.1" strokeDasharray="2 2" opacity="0.5" />
      <line x1="65" y1="48" x2="65" y2="70" stroke="currentColor" strokeWidth="1.1" strokeDasharray="2 2" opacity="0.5" />

      {/* 6 Struts Connecting Outer Frame to Inner Isometric Cube */}
      {V_OUTER.map((pt, i) => (
        <line
          key={i}
          ref={(el) => {
            if (el) strutLinesRef.current[i] = el;
          }}
          x1={pt.x}
          y1={pt.y}
          x2={50}
          y2={48}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.45"
        />
      ))}

      {/* 6 Inward-Traveling Constraint Pulse Beads */}
      {Array.from({ length: 6 }).map((_, i) => (
        <circle
          key={i}
          ref={(el) => {
            if (el) pulseDotsRef.current[i] = el;
          }}
          cx={50}
          cy={48}
          r={1.4}
          fill="#ffffff"
          opacity={0}
        />
      ))}

      {/* Inner Breathing Isometric Cube Faces */}
      <polygon
        ref={innerTopPolygonRef}
        points="50,33 65,40.5 50,48 35,40.5"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.85"
        fill="#E3EF4F"
        fillOpacity="0.08"
      />
      <polygon
        ref={innerLeftPolygonRef}
        points="35,40.5 50,48 50,65 35,57.5"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.75"
        fill="#000000"
        fillOpacity="0.3"
      />
      <polygon
        ref={innerRightPolygonRef}
        points="50,48 65,40.5 65,57.5 50,65"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.75"
        fill="#000000"
        fillOpacity="0.4"
      />

      {/* Expanding Containment Ring */}
      <circle
        ref={coreRingRef}
        cx={50}
        cy={48}
        r={3}
        stroke="currentColor"
        strokeWidth="1"
        opacity={0.5}
      />

      {/* Center Locked Core Reticle */}
      <circle cx={50} cy={48} r={4.5} stroke="currentColor" strokeWidth="0.9" strokeDasharray="1.5 1.5" opacity="0.7" />
      <circle ref={coreDotRef} cx={50} cy={48} r={2.5} fill="currentColor" />
    </svg>
  );
};

// 03: Fragmented Ecosystem - Fractured Constellation Nodes with Disconnected Micro-Orbits
const FragmentedEcosystemComponent: React.FC = () => {
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Exact 4 Satellite Nodes with coordinates matching user's image_661fe3d9.png
  // Center nexus at (47.25, 52.0)
  const BASE_NODES = [
    { x: 41.0, y: 44.5, freqX: 1.35, freqY: 1.10, phase: 0.0, amp: 2.0 }, // 0: Top-Left
    { x: 54.5, y: 42.5, freqX: 1.20, freqY: 1.45, phase: 1.3, amp: 2.1 }, // 1: Top-Right
    { x: 40.0, y: 61.5, freqX: 1.45, freqY: 1.25, phase: 2.5, amp: 2.3 }, // 2: Bottom-Left (primary disconnected island)
    { x: 53.5, y: 59.0, freqX: 1.15, freqY: 1.40, phase: 3.8, amp: 2.0 }, // 3: Bottom-Right
  ];

  const CENTER = { x: 47.25, y: 52.0 };

  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.024;
      const t = timeRef.current;

      const currentPos: { x: number; y: number }[] = [];

      BASE_NODES.forEach((node, i) => {
        // Smooth harmonic Lissajous drift
        const dx = Math.sin(t * node.freqX + node.phase) * node.amp;
        const dy = Math.cos(t * node.freqY + node.phase) * node.amp;
        const posX = node.x + dx;
        const posY = node.y + dy;
        currentPos.push({ x: posX, y: posY });

        // Update SVG node group position
        const groupEl = nodeRefs.current[i];
        if (groupEl) {
          groupEl.setAttribute('transform', `translate(${dx.toFixed(2)}, ${dy.toFixed(2)})`);
        }
      });

      // Update the 4 dynamic dashed connecting lines
      // Node 2 (Bottom-Left) intermittently experiences a disconnection jitter
      const glitchCycle = (t * 0.35) % 1;
      const isNode2Disconnected = glitchCycle > 0.65 && glitchCycle < 0.90;

      BASE_NODES.forEach((_, i) => {
        const p = currentPos[i];
        const lineEl = lineRefs.current[i];
        if (!lineEl) return;

        const vx = CENTER.x - p.x;
        const vy = CENTER.y - p.y;
        const dist = Math.hypot(vx, vy);
        const ux = vx / dist;
        const uy = vy / dist;

        // Line endpoints from node boundary (r=4.8) to cross center area
        const sx = p.x + ux * 4.8;
        const sy = p.y + uy * 4.8;
        const ex = CENTER.x - ux * 3.5;
        const ey = CENTER.y - uy * 3.5;

        lineEl.setAttribute('x1', sx.toFixed(2));
        lineEl.setAttribute('y1', sy.toFixed(2));
        lineEl.setAttribute('x2', ex.toFixed(2));
        lineEl.setAttribute('y2', ey.toFixed(2));

        if (i === 2 && isNode2Disconnected) {
          // Flickering disconnected line
          const jitter = Math.random() > 0.5 ? 0.7 : 0.1;
          lineEl.setAttribute('opacity', jitter.toString());
        } else {
          const op = 0.5 + 0.35 * Math.sin(t * 2.2 + i * 1.5);
          lineEl.setAttribute('opacity', op.toFixed(2));
        }
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-18 h-18 sm:w-20 sm:h-20 text-[#E3EF4F] fill-none overflow-visible select-none"
    >
      {/* 4 Dynamic Telemetry Dashed Link Lines from Nodes to Center Nexus */}
      {BASE_NODES.map((_, i) => (
        <line
          key={`link-${i}`}
          ref={(el) => {
            lineRefs.current[i] = el;
          }}
          x1={BASE_NODES[i].x}
          y1={BASE_NODES[i].y}
          x2={CENTER.x}
          y2={CENTER.y}
          stroke="currentColor"
          strokeWidth="1.3"
          strokeDasharray="2 2"
          opacity="0.6"
        />
      ))}

      {/* Central 'X' Cross - Clean, Razor-sharp, Non-glowing */}
      <g>
        <line
          x1={CENTER.x - 3.8}
          y1={CENTER.y - 3.8}
          x2={CENTER.x + 3.8}
          y2={CENTER.y + 3.8}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1={CENTER.x + 3.8}
          y1={CENTER.y - 3.8}
          x2={CENTER.x - 3.8}
          y2={CENTER.y + 3.8}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Center Highlight Dot */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r="1.4"
          fill="#ffffff"
        />
      </g>

      {/* 4 Satellite Tool Nodes - Clean Vector Rings with Center Dot (No Blur / No Glow Filter) */}
      {BASE_NODES.map((node, i) => (
        <g
          key={`node-${i}`}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
        >
          {/* Black interior fill to block dashed lines behind circle */}
          <circle
            cx={node.x}
            cy={node.y}
            r="4.8"
            fill="#000000"
            fillOpacity="0.8"
          />

          {/* Clean Vector Ring - Crisp #E3EF4F */}
          <circle
            cx={node.x}
            cy={node.y}
            r="4.8"
            stroke="currentColor"
            strokeWidth="1.6"
          />

          {/* Center Dot */}
          <circle
            cx={node.x}
            cy={node.y}
            r="1.4"
            fill="currentColor"
          />
        </g>
      ))}
    </svg>
  );
};

export const ProblemSection: React.FC<ProblemSectionProps> = ({
  onOpenJoin,
  onOpenContact,
}) => {
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const getStartedText = useTextScramble('GET STARTED', isBtnHovered);

  return (
    <section className="relative w-full bg-black select-none">
      {/* Centered framed container matching Hero, Marquee, and Solution layouts */}
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28">
        {/* Outer framed dashed container seamlessly joined */}
        <div className="relative w-full border border-dashed border-white/25 -mt-px overflow-hidden">
          {/* Main 2-Column Split: Pitch Black Left (Staggered Nodes) vs Canvas Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px] lg:min-h-[720px]">
            {/* Left Column (lg:col-span-7): Pitch Black Canvas with Staggered Wireframe Problem Components */}
            <div className="order-last lg:order-first lg:col-span-7 bg-black p-8 sm:p-12 md:p-14 lg:p-16 border-t lg:border-t-0 lg:border-r border-dashed border-white/20 flex flex-col justify-center relative">
              {/* Asymmetric 2-Column Staggered Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 lg:gap-16 items-start">
                {/* Left Sub-Column: Problem 01 (Top) + Problem 03 (Bottom) */}
                <div className="flex flex-col gap-12 sm:gap-14 lg:gap-16">
                  {/* Problem 01: Artificial Limits (Constriction Choke & Barrier) */}
                  <div className="group cursor-pointer">
                    {/* Visual Box with 4 Corner Reticles */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 sm:mb-5 flex items-center justify-center bg-black/40">
                      {/* Corner Reticle Brackets */}
                      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-neutral-500 pointer-events-none" />
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-neutral-500 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-neutral-500 pointer-events-none" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-neutral-500 pointer-events-none" />

                      {/* Distinct Animated Component for Problem 01 */}
                      <ArtificialLimitsComponent />
                    </div>

                    {/* Numeric Identifier: turns blue on hover while component stays lime */}
                    <span className="block text-[11px] font-mono font-semibold tracking-wider text-[#E3EF4F] group-hover:text-[#38bdf8] transition-colors duration-200 mb-1">
                      01
                    </span>

                    {/* Title: turns blue on hover */}
                    <h3 className="text-base sm:text-[17px] font-bold text-white font-sans uppercase tracking-[0.06em] mb-2 group-hover:text-[#38bdf8] transition-colors duration-200">
                      Fragmented workflows
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] sm:text-[13.5px] text-neutral-400 font-sans leading-relaxed max-w-[280px]">
                      Constantly switching between tools breaks your flow.
                    </p>
                  </div>

                  {/* Problem 03: Fragmented Ecosystem (Fractured Constellation) */}
                  <div className="group cursor-pointer">
                    {/* Visual Box with 4 Corner Reticles */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 sm:mb-5 flex items-center justify-center bg-black/40">
                      {/* Corner Reticle Brackets */}
                      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-neutral-500 pointer-events-none" />
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-neutral-500 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-neutral-500 pointer-events-none" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-neutral-500 pointer-events-none" />

                      {/* Distinct Animated Component for Problem 03 */}
                      <FragmentedEcosystemComponent />
                    </div>

                    {/* Numeric Identifier: turns blue on hover while component stays lime */}
                    <span className="block text-[11px] font-mono font-semibold tracking-wider text-[#E3EF4F] group-hover:text-[#38bdf8] transition-colors duration-200 mb-1">
                      03
                    </span>

                    {/* Title: turns blue on hover */}
                    <h3 className="text-base sm:text-[17px] font-bold text-white font-sans uppercase tracking-[0.06em] mb-2 group-hover:text-[#38bdf8] transition-colors duration-200">
                      Unnecessary friction
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] sm:text-[13.5px] text-neutral-400 font-sans leading-relaxed max-w-[280px]">
                      Complicated setups and artificial restrictions get in the way of building.
                    </p>
                  </div>
                </div>

                {/* Right Sub-Column: Problem 02 Staggered in Vertical Center */}
                <div className="md:pt-28 lg:pt-32">
                  {/* Problem 02: Locked-In Workflows (Isometric Walled Cage) */}
                  <div className="group cursor-pointer">
                    {/* Visual Box with 4 Corner Reticles */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 sm:mb-5 flex items-center justify-center bg-black/40">
                      {/* Corner Reticle Brackets */}
                      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-neutral-500 pointer-events-none" />
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-neutral-500 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-neutral-500 pointer-events-none" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-neutral-500 pointer-events-none" />

                      {/* Redesigned Harmonious Animated Component for Problem 02 */}
                      <LockedWorkflowsComponent />
                    </div>

                    {/* Numeric Identifier: turns blue on hover while component stays lime */}
                    <span className="block text-[11px] font-mono font-semibold tracking-wider text-[#E3EF4F] group-hover:text-[#38bdf8] transition-colors duration-200 mb-1">
                      02
                    </span>

                    {/* Title: turns blue on hover */}
                    <h3 className="text-base sm:text-[17px] font-bold text-white font-sans uppercase tracking-[0.06em] mb-2 group-hover:text-[#38bdf8] transition-colors duration-200">
                      Restricted model access
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] sm:text-[13.5px] text-neutral-400 font-sans leading-relaxed max-w-[280px]">
                      Being tied to a single provider limits your choices.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (lg:col-span-5): Yellow #E3EF4F Gradient Canvas fading to Pitch Black */}
            <div className="order-first lg:order-last lg:col-span-5 relative p-8 sm:p-12 md:p-14 lg:p-16 flex flex-col justify-between overflow-hidden min-h-[500px] bg-black">
              {/* Yellow (#E3EF4F) to Pitch Black Vertical Gradient matching screenshot structure */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, #E3EF4F 0%, #d8ea38 36%, #b8cd18 56%, #687907 72%, #1e2501 85%, #000000 96%, #000000 100%)',
                }}
              />
              {/* Ambient Specular Light Diffusion */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 0%, #f4fb85 0%, transparent 65%)',
                }}
              />

              <div className="relative z-10 pointer-events-auto">
                {/* Top Badge: Sleek black tag with #E3EF4F text & glowing dot */}
                <div className="mb-6 sm:mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#E3EF4F] border border-black shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E3EF4F] shadow-[0_0_8px_#E3EF4F]" />
                    <span className="text-[11px] font-mono uppercase tracking-[0.18em] font-bold">
                      PROBLEM
                    </span>
                  </div>
                </div>

                {/* Main Headline in Crisp Pitch Black (15:1 High Contrast Ratio) */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-medium tracking-tight text-black font-sans antialiased leading-[1.12] mb-6 max-w-md">
                  Vibecoding shouldn't feel fragmented.
                </h2>

                {/* Subtitle / Narrative in Deep High-Contrast Neutral */}
                <p className="text-[15px] sm:text-[16px] text-neutral-950 font-sans antialiased leading-relaxed max-w-md font-normal mb-4">
                  Building with AI often means juggling separate tools, managing API keys, switching between models, and dealing with disconnected workflows.
                </p>

                <p className="text-[14.5px] sm:text-[15.5px] text-black font-sans antialiased leading-relaxed max-w-md font-semibold">
                  Your tools should work together, not slow you down.
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
                      ? 'bg-black border-white text-white shadow-xl shadow-black/40'
                      : 'bg-black/85 border-white/40 text-white hover:bg-black hover:border-white shadow-lg'
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
          </div>
        </div>
      </div>
    </section>
  );
};
