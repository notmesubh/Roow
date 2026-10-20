import { useState, useEffect, useRef, useCallback } from 'react';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$@%&*!?~+=/\\<>[]';

interface UseTextScrambleOptions {
  chars?: string;
  speed?: number; // ms per tick
  duration?: number; // total scramble duration in ms
}

export function useTextScramble(
  originalText: string,
  isHovered: boolean,
  options?: UseTextScrambleOptions
) {
  const chars = options?.chars || DEFAULT_CHARS;
  const speed = options?.speed || 45;
  const duration = options?.duration || 450;

  const [displayText, setDisplayText] = useState(originalText);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isHovered) {
      clearTimers();
      const length = originalText.length;
      const startTime = Date.now();

      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / duration);
        // Gradually lock letters from left to right as time progresses
        const lockIndex = Math.floor(progress * length);

        let scrambled = '';
        for (let i = 0; i < length; i++) {
          if (originalText[i] === ' ') {
            scrambled += ' ';
          } else if (i < lockIndex) {
            scrambled += originalText[i];
          } else {
            const randomChar = chars[Math.floor(Math.random() * chars.length)];
            scrambled += randomChar;
          }
        }
        setDisplayText(scrambled);
      }, speed);

      timeoutRef.current = setTimeout(() => {
        clearTimers();
        setDisplayText(originalText);
      }, duration);
    } else {
      clearTimers();
      setDisplayText(originalText);
    }

    return () => clearTimers();
  }, [isHovered, originalText, chars, speed, duration, clearTimers]);

  return displayText;
}
