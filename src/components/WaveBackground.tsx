import React, { useEffect, useRef } from 'react';

interface WaveBackgroundProps {
  interactive?: boolean;
}

export const WaveBackground: React.FC<WaveBackgroundProps> = ({ interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Mouse coordinates normalized
    let mouseX = -1;
    let mouseY = -1;
    let targetMouseX = -1;
    let targetMouseY = -1;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / width;
      targetMouseY = (e.clientY - rect.top) / height;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1;
      targetMouseY = -1;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let startTime = performance.now();

    const render = (currentTime: number) => {
      const elapsed = (currentTime - startTime) * 0.001; // seconds

      // Smooth mouse follow
      if (targetMouseX >= 0) {
        if (mouseX < 0) {
          mouseX = targetMouseX;
          mouseY = targetMouseY;
        } else {
          mouseX += (targetMouseX - mouseX) * 0.05;
          mouseY += (targetMouseY - mouseY) * 0.05;
        }
      } else {
        mouseX = -1;
        mouseY = -1;
      }

      // 1. Draw base gradient
      // Left and bottom-left: rich vivid blue. Top-right: pure black.
      ctx.fillStyle = '#010309';
      ctx.fillRect(0, 0, width, height);

      // Deep blue radial glow across center-left and bottom-left
      const radialGrad = ctx.createRadialGradient(
        width * 0.22,
        height * 0.78,
        width * 0.02,
        width * 0.28,
        height * 0.65,
        width * 0.78
      );
      radialGrad.addColorStop(0, '#004fd6');
      radialGrad.addColorStop(0.28, '#003db3');
      radialGrad.addColorStop(0.52, '#00257c');
      radialGrad.addColorStop(0.75, '#001140');
      radialGrad.addColorStop(1, '#00040e');

      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Secondary vivid royal blue pool at lower bottom-left
      const bottomGlow = ctx.createRadialGradient(
        width * 0.12,
        height * 0.95,
        10,
        width * 0.2,
        height * 0.9,
        width * 0.45
      );
      bottomGlow.addColorStop(0, 'rgba(0, 85, 230, 0.85)');
      bottomGlow.addColorStop(0.4, 'rgba(0, 60, 185, 0.55)');
      bottomGlow.addColorStop(0.8, 'rgba(0, 25, 100, 0.15)');
      bottomGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = bottomGlow;
      ctx.fillRect(0, 0, width, height);

      // Subtle cyan/blue highlight in center
      const centerGlow = ctx.createRadialGradient(
        width * 0.42,
        height * 0.5,
        5,
        width * 0.45,
        height * 0.5,
        width * 0.35
      );
      centerGlow.addColorStop(0, 'rgba(10, 80, 200, 0.3)');
      centerGlow.addColorStop(0.6, 'rgba(4, 30, 100, 0.1)');
      centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw vertical parametric wave lines
      // In the reference image, there are ~76 vertical lines spanning the width
      const numLines = Math.floor(Math.max(60, Math.min(88, width / 20)));
      const stepsY = 120; // vertical resolution

      // Subtly drifting phase for organic breathing feel (very slow so it feels stable like reference)
      const drift = Math.sin(elapsed * 0.25) * 0.015;

      ctx.lineWidth = 1.1;

      for (let i = 0; i < numLines; i++) {
        const u = i / (numLines - 1); // 0.0 (left) to 1.0 (right)

        // Starting x at top
        const baseX = u * width;

        // Determine line color and opacity based on position across canvas
        // Left side: light cyan-blue, center: bright ice-blue, right: pure brilliant white
        let strokeColor = '';
        if (u < 0.45) {
          // Left zone: soft electric blue / periwinkle
          const alpha = 0.38 + 0.32 * Math.sin(u * Math.PI * 1.5);
          strokeColor = `rgba(145, 190, 255, ${alpha.toFixed(3)})`;
        } else if (u < 0.65) {
          // Center transition: high luminance ice blue
          const t = (u - 0.45) / 0.2;
          const alpha = 0.65 + 0.25 * t;
          strokeColor = `rgba(215, 235, 255, ${alpha.toFixed(3)})`;
        } else {
          // Right zone: crisp white against deep black
          const t = (u - 0.65) / 0.35;
          const alpha = 0.72 + 0.25 * Math.sin(t * Math.PI);
          strokeColor = `rgba(255, 255, 255, ${Math.min(0.96, alpha).toFixed(3)})`;
        }

        ctx.strokeStyle = strokeColor;
        ctx.beginPath();

        for (let j = 0; j <= stepsY; j++) {
          const v = j / stepsY; // 0.0 (top) to 1.0 (bottom)
          const y = v * height;

          // Compute horizontal displacement dx for this (u, v) point
          // The reference has distinct folds:
          // 1. Center-left gentle wave (u around 0.15 - 0.4)
          // 2. Center dramatic vertical drape (u around 0.5 - 0.7) where lines swoop sharply left then right
          // 3. Right side convergence (u around 0.75 - 0.95)

          // Envelope that clamps displacement to 0 at the extreme top
          const topClamping = Math.min(1.0, v / 0.06);

          // Fold A: Left gentle s-curve
          const foldA = Math.sin(v * Math.PI * 2.2 + 0.4 + drift) * 18 * Math.exp(-Math.pow((u - 0.28) / 0.22, 2));

          // Fold B: The dominant central drape fold (seen in reference around center-right)
          // Upper tuck (pulling left between v=0.2 and v=0.6)
          const tuckUpper = -105 * Math.exp(-Math.pow((v - 0.38) / 0.22, 2)) * Math.exp(-Math.pow((u - 0.60) / 0.24, 2));
          // Lower rebound (sweeping right between v=0.55 and v=0.9)
          const tuckLower = 68 * Math.exp(-Math.pow((v - 0.74) / 0.20, 2)) * Math.exp(-Math.pow((u - 0.64) / 0.20, 2));

          // Fold C: Right side ripple and vertical ribbon
          const foldC = 36 * Math.sin(v * Math.PI * 2.8 - 0.3) * Math.exp(-Math.pow((u - 0.82) / 0.18, 2));

          // Fold D: Subtle secondary harmonic ripples across all lines
          const harmonic1 = Math.sin(v * 7.5 + u * 4.2 + elapsed * 0.12) * 6;
          const harmonic2 = Math.cos(v * 12.0 - u * 6.0) * 3;

          // Mouse proximity displacement (interactive lens effect)
          let mouseDisp = 0;
          if (mouseX >= 0 && mouseY >= 0) {
            const dx = (baseX / width) - mouseX;
            const dy = v - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 0.25) {
              const force = (1 - dist / 0.25);
              mouseDisp = Math.sin(dx * 15) * force * 24;
            }
          }

          const totalDisplacement = (foldA + tuckUpper + tuckLower + foldC + harmonic1 + harmonic2 + mouseDisp) * topClamping;

          const currentX = baseX + totalDisplacement;

          if (j === 0) {
            ctx.moveTo(currentX, y);
          } else {
            ctx.lineTo(currentX, y);
          }
        }

        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black select-none pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
      />
    </div>
  );
};
