"use client";

import { useEffect, useRef, useState } from "react";

interface PixelAvatarProps {
  src: string;
  width: number;
  height: number;
  pixelSize?: number;
}

export default function PixelAvatar({
  src,
  width,
  height,
  pixelSize = 6,
}: PixelAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -999, y: -999, inside: false });
  const pixelsRef = useRef<
    { ox: number; oy: number; x: number; y: number; vx: number; vy: number; color: string }[]
  >([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      imgRef.current = img;
      setLoaded(true);
    };
    imgRef.current = img;
  }, [src]);

  // Build pixel grid when image loads
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas || !imgRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw image to offscreen canvas to sample colors
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext("2d")!;
    octx.drawImage(imgRef.current, 0, 0, width, height);

    const cols = Math.ceil(width / pixelSize);
    const rows = Math.ceil(height / pixelSize);
    const pixels: typeof pixelsRef.current = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const sx = col * pixelSize + Math.floor(pixelSize / 2);
        const sy = row * pixelSize + Math.floor(pixelSize / 2);
        const data = octx.getImageData(
          Math.min(sx, width - 1),
          Math.min(sy, height - 1),
          1,
          1
        ).data;
        const color = `rgb(${data[0]},${data[1]},${data[2]})`;
        const ox = col * pixelSize;
        const oy = row * pixelSize;
        pixels.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0, color });
      }
    }
    pixelsRef.current = pixels;
  }, [loaded, width, height, pixelSize]);

  // Animation loop
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPREAD_RADIUS = 80;
    const FORCE = 220;
    const FRICTION = 0.82;
    const RETURN_SPEED = 0.12;

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const inside = mouseRef.current.inside;

      for (const p of pixelsRef.current) {
        if (inside) {
          const dx = p.x + pixelSize / 2 - mx;
          const dy = p.y + pixelSize / 2 - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < SPREAD_RADIUS) {
            const strength = (1 - dist / SPREAD_RADIUS) * FORCE;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * strength * 0.05;
            p.vy += Math.sin(angle) * strength * 0.05;
          }
        }

        // Return to origin
        p.vx += (p.ox - p.x) * RETURN_SPEED;
        p.vy += (p.oy - p.y) * RETURN_SPEED;

        // Friction
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        p.x += p.vx;
        p.y += p.vy;

        ctx!.fillStyle = p.color;
        ctx!.fillRect(Math.round(p.x), Math.round(p.y), pixelSize - 1, pixelSize - 1);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [loaded, width, height, pixelSize]);

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.inside = true;
  }

  function handleMouseLeave() {
    mouseRef.current.inside = false;
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "block",
        cursor: "crosshair",
        imageRendering: "pixelated",
      }}
    />
  );
}
