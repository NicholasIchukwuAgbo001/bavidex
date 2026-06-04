import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
}

export default function Interactive3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic scale to handle retina screens
    const resizeCanvas = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);

    // Track mouse motions with lerp/interpolation for smooth movement
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -0.5 to 0.5
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle touch movements for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current.targetX = (e.touches[0].clientX / window.innerWidth) - 0.5;
        mouseRef.current.targetY = (e.touches[0].clientY / window.innerHeight) - 0.5;
      }
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Build 3D Particles
    const particleCount = 85;
    const particles: Particle[] = [];
    const colors = [
      'rgba(220, 38, 38, 0.45)',  // Red 600 glow
      'rgba(239, 68, 68, 0.25)',  // Red 500 glow
      'rgba(255, 255, 255, 0.15)', // White soft glow
      'rgba(39, 39, 42, 0.6)'      // Zinc 800 backup
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 2000,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const fov = 400; // Field of view
    
    // Core animation Loop
    const render = () => {
      if (!canvas || !ctx) return;

      ctx.fillStyle = 'rgba(7, 7, 8, 0.08)'; // Keep trailing alpha to create subtle neon drag paths
      ctx.fillRect(0, 0, width, height);

      // Smoothly interpolate mouse positions (lerping)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw active cybergrid lines (3D depth floor and ceiling)
      ctx.strokeStyle = 'rgba(220, 38, 38, 0.035)'; // High-end subtle red gridlines
      ctx.lineWidth = 1;

      const gridZStep = 300;
      const gridZMax = 1800;
      const gridYOffset = 300; // Shift down for floor grid

      // 3D Grid drawing lines
      for (let gz = gridZStep; gz < gridZMax; gz += gridZStep) {
        const perspectiveScale = fov / gz;
        const screenYFloor = centerY + gridYOffset * perspectiveScale + mouse.y * 110;
        const screenYCeil = centerY - gridYOffset * perspectiveScale + mouse.y * 110;
        
        ctx.beginPath();
        // Floor line
        ctx.moveTo(centerX - 1200 * perspectiveScale + mouse.x * 110, screenYFloor);
        ctx.lineTo(centerX + 1200 * perspectiveScale + mouse.x * 110, screenYFloor);
        // Ceiling line
        ctx.moveTo(centerX - 1200 * perspectiveScale + mouse.x * 110, screenYCeil);
        ctx.lineTo(centerX + 1200 * perspectiveScale + mouse.x * 110, screenYCeil);
        ctx.stroke();
      }

      // Draw grid vertical vanishing lines
      const gridXStep = 240;
      for (let gx = -1200; gx <= 1200; gx += gridXStep) {
        const scaleNear = fov / gridZStep;
        const scaleFar = fov / (gridZMax - 200);

        // Floor vertical
        ctx.beginPath();
        ctx.moveTo(centerX + (gx + mouse.x * 110) * scaleNear, centerY + gridYOffset * scaleNear + mouse.y * 110);
        ctx.lineTo(centerX + (gx + mouse.x * 110) * scaleFar, centerY + gridYOffset * scaleFar + mouse.y * 110);
        ctx.stroke();

        // Ceiling vertical
        ctx.beginPath();
        ctx.moveTo(centerX + (gx + mouse.x * 110) * scaleNear, centerY - gridYOffset * scaleNear + mouse.y * 110);
        ctx.lineTo(centerX + (gx + mouse.x * 110) * scaleFar, centerY - gridYOffset * scaleFar + mouse.y * 110);
        ctx.stroke();
      }

      // Render 3D particles sorted by distance (z-index painters algorithm)
      particles.sort((a, b) => b.z - a.z);

      particles.forEach(p => {
        // Move particle closer on Z axis (flowing space travel simulation)
        p.z -= 2.2; 

        // If particle moves behind observer, reset to far distance
        if (p.z <= 0) {
          p.z = 2000;
          p.x = (Math.random() - 0.5) * 2000;
          p.y = (Math.random() - 0.5) * 2000;
        }

        // Project 3D coordinates onto 2D screen viewport
        const scale = fov / p.z;
        const px = centerX + (p.x + mouse.x * 550) * scale;
        const py = centerY + (p.y + mouse.y * 550) * scale;

        // Render point if inside screen bounds
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const depthSize = p.size * scale * 1.8;
          const alphaFactor = Math.min((2000 - p.z) / 400, 1) * Math.min(p.z / 300, 1);

          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.4, depthSize), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alphaFactor;
          
          // Draw a soft glowing halo for larger points
          if (depthSize > 2 && p.color.includes('220')) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(220, 38, 38, 0.6)';
          } else {
            ctx.shadowBlur = 0;
          }
          
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="3d-interactive-canvas-bg"
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-[#070708] opacity-55 mix-blend-screen"
    />
  );
}
