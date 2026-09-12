import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  type: "petal" | "sparkle";
  angle: number;
  angleSpeed: number;
  swayRadius: number;
  swaySpeed: number;
  color: string;
}

export const AmbientParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Soft blush rose petal colors
    const petalColors = [
      "rgba(244, 217, 217, 0.55)", // soft blush rose
      "rgba(255, 235, 235, 0.60)", // light petal
      "rgba(235, 198, 198, 0.50)", // warm rose petal
      "rgba(247, 230, 215, 0.55)", // champagne petal
    ];

    // Elegant twinkling diamond & champagne star sparkles (NO round yellow dots)
    const sparkleColors = [
      "rgba(255, 255, 255, 0.95)", // glistening pure white star
      "rgba(255, 248, 225, 0.90)", // warm ivory sparkle
      "rgba(245, 230, 180, 0.85)", // gentle champagne shimmer
      "rgba(255, 235, 210, 0.85)", // delicate golden star
    ];

    const particleCount = window.innerWidth < 768 ? 24 : 45;
    const particles: Particle[] = [];

    // Initialize particles: purely rose petals and star sparkles
    const createParticle = (initY?: number): Particle => {
      const isPetal = Math.random() < 0.55;
      const type: "petal" | "sparkle" = isPetal ? "petal" : "sparkle";

      return {
        x: Math.random() * width,
        y: initY !== undefined ? initY : Math.random() * height,
        size: isPetal
          ? Math.random() * 8 + 6       // 6px - 14px delicate rose petals
          : Math.random() * 3 + 2,       // 2px - 5px star sparkles
        speedY: isPetal
          ? Math.random() * 0.7 + 0.3
          : Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: isPetal
          ? Math.random() * 0.5 + 0.35
          : Math.random() * 0.5 + 0.5,
        type,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.02,
        swayRadius: Math.random() * 30 + 10,
        swaySpeed: Math.random() * 0.015 + 0.005,
        color: isPetal
          ? petalColors[Math.floor(Math.random() * petalColors.length)]
          : sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    let time = 0;

    // Draw single organic curved rose petal
    const drawPetal = (
      pCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      color: string
    ) => {
      pCtx.save();
      pCtx.translate(x, y);
      pCtx.rotate(angle);
      pCtx.fillStyle = color;
      pCtx.beginPath();
      pCtx.moveTo(0, -size);
      pCtx.bezierCurveTo(size * 0.8, -size * 0.6, size * 0.9, size * 0.5, 0, size);
      pCtx.bezierCurveTo(-size * 0.9, size * 0.5, -size * 0.8, -size * 0.6, 0, -size);
      pCtx.closePath();
      pCtx.fill();
      pCtx.restore();
    };

    // Draw radiant 4-point star sparkle with glowing diamond core
    const drawSparkle = (
      pCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number,
      color: string
    ) => {
      pCtx.save();
      pCtx.translate(x, y);
      pCtx.rotate(time * 0.02); // gentle rotation as it falls
      pCtx.fillStyle = color;
      pCtx.globalAlpha = Math.min(1, Math.max(0.15, opacity));
      
      // 4-point twinkling star
      pCtx.beginPath();
      for (let i = 0; i < 4; i++) {
        pCtx.rotate(Math.PI / 2);
        pCtx.lineTo(size * 1.8, 0);
        pCtx.lineTo(size * 0.35, size * 0.35);
      }
      pCtx.closePath();
      pCtx.fill();

      // Brilliant white center sparkle glow
      pCtx.beginPath();
      pCtx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
      pCtx.fillStyle = "#FFFFFF";
      pCtx.globalAlpha = Math.min(1, opacity + 0.2);
      pCtx.fill();
      
      pCtx.restore();
    };

    // Animation Loop
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Check boundary of SCRATCH TO REVEAL section so no petals fall over it
      const scratchEl = document.getElementById("scratch");
      const scratchRect = scratchEl ? scratchEl.getBoundingClientRect() : null;

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(time * p.swaySpeed + p.swayRadius) * 0.5 + p.speedX;
        p.angle += p.angleSpeed;

        // Wrap around boundaries smoothly
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Skip drawing if particle is inside the SCRATCH TO REVEAL section
        const isInsideScratch =
          scratchRect &&
          p.y >= scratchRect.top - 10 &&
          p.y <= scratchRect.bottom + 10 &&
          p.x >= scratchRect.left &&
          p.x <= scratchRect.right;

        if (!isInsideScratch) {
          if (p.type === "petal") {
            drawPetal(ctx, p.x, p.y, p.size, p.angle, p.color);
          } else {
            // Twinkling Star Sparkle (Replaces the round yellow dot)
            const pulse = Math.sin(time * 0.07 + p.angle) * 0.35 + 0.65;
            drawSparkle(ctx, p.x, p.y, p.size, p.opacity * pulse, p.color);
          }
        }
      });

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-80"
      aria-hidden="true"
    />
  );
};
