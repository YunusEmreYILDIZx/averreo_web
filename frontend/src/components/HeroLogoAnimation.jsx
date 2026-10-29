import { useEffect, useRef } from 'react';

export default function HeroLogoAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Ultra-fine micro telemetry particles
    const numParticles = 45;
    const particles = [];
    const mouse = { x: -1000, y: -1000, radius: 150 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.4 + 0.8,
        alpha: Math.random() * 0.45 + 0.15,
      });
    }

    let radarAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Pitch black background clearing
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Render subtle technical grid lines
      const gridSize = 40;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 0.5;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render subtle radar sweep in the center/right area
      const centerX = width > 768 ? width * 0.65 : width * 0.5;
      const centerY = height * 0.5;
      const radarRadius = Math.min(width, height) * 0.38;

      radarAngle += 0.008;
      ctx.save();
      ctx.translate(centerX, centerY);

      // Radar cone gradient
      const sweepGradient = ctx.createConicGradient(radarAngle, 0, 0);
      sweepGradient.addColorStop(0, 'rgba(56, 189, 248, 0.12)');
      sweepGradient.addColorStop(0.1, 'rgba(56, 189, 248, 0.02)');
      sweepGradient.addColorStop(0.2, 'rgba(0, 0, 0, 0)');
      sweepGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = sweepGradient;
      ctx.beginPath();
      ctx.arc(0, 0, radarRadius, 0, Math.PI * 2);
      ctx.fill();

      // Outer radar border ring
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      // Render connected particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 2.5;
          p.y -= (dy / dist) * force * 2.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 110) {
            const lineAlpha = (1 - dist2 / 110) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden select-none">
      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 block" />

      {/* Pure Pitch Black Gradient Overlay for Crisp Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10 pointer-events-none" />

      {/* Clean Floating Averreo Vector Emblem (Responsive positioning and opacity for mobile) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center md:justify-end md:pr-24 lg:pr-36 pointer-events-none">
        <div className="relative flex items-center justify-center animate-float-logo opacity-30 md:opacity-100 transition-opacity duration-700">
          <img
            src="/assets/images/averreo_emblem_transparent.png?v=4"
            alt="Averreo Emblem"
            className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 object-contain filter drop-shadow-[0_0_25px_rgba(255,255,255,0.35)] drop-shadow-[0_0_60px_rgba(56,189,248,0.2)] transition-all duration-700 hover:scale-105 pointer-events-auto"
          />
        </div>
      </div>
    </div>
  );
}
