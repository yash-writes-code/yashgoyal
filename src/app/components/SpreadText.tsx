"use client";

import { useEffect, useRef } from "react";

interface SpreadTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  spreadRadius?: number;
}

export default function SpreadText({
  text,
  className,
  style,
  spreadRadius = 60,
}: SpreadTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const animsRef = useRef<
    { ox: number; oy: number; x: number; y: number; vx: number; vy: number; el: HTMLSpanElement }[]
  >([]);
  const mouseRef = useRef({ x: 0, y: 0, inside: false });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = charsRef.current.filter(Boolean);
    const states = spans.map((el) => {
      const rect = el.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      return {
        ox: rect.left - parentRect.left + rect.width / 2,
        oy: rect.top - parentRect.top + rect.height / 2,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        el,
      };
    });
    animsRef.current = states;

    const FRICTION = 0.75;
    const RETURN = 0.15;
    const FORCE = 180;

    function update() {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const inside = mouseRef.current.inside;
      const parentRect = container!.getBoundingClientRect();

      for (const s of animsRef.current) {
        const rect = s.el.getBoundingClientRect();
        const cx = rect.left - parentRect.left + rect.width / 2 - s.x;
        const cy = rect.top - parentRect.top + rect.height / 2 - s.y;

        if (inside) {
          const dx = cx - (mx);
          const dy = cy - (my);
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < spreadRadius) {
            const strength = (1 - dist / spreadRadius) * FORCE;
            const angle = Math.atan2(dy, dx);
            s.vx += Math.cos(angle) * strength * 0.04;
            s.vy += Math.sin(angle) * strength * 0.04;
          }
        }

        // Return to origin (0,0 offset)
        s.vx += (0 - s.x) * RETURN;
        s.vy += (0 - s.y) * RETURN;
        s.vx *= FRICTION;
        s.vy *= FRICTION;
        s.x += s.vx;
        s.y += s.vy;

        s.el.style.transform = `translate(${s.x}px, ${s.y}px)`;
      }

      rafRef.current = requestAnimationFrame(update);
    }

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [text, spreadRadius]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current!.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.inside = true;
  }

  function handleMouseLeave() {
    mouseRef.current.inside = false;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ ...style, display: "inline-block", cursor: "default" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) charsRef.current[i] = el;
          }}
          style={{
            display: "inline-block",
            willChange: "transform",
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
