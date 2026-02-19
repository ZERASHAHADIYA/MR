"use client";
import { useEffect, useRef } from 'react';

const LaserFlow = ({ laserColor = "#00ff88" }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    const animate = () => {
      time += 0.02;
      
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create laser flow effect
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.3, laserColor + '40');
      gradient.addColorStop(0.5, laserColor + 'AA');
      gradient.addColorStop(0.7, laserColor + '40');
      gradient.addColorStop(1, 'transparent');

      // Animated laser beams
      for (let i = 0; i < 5; i++) {
        const y = (canvas.height / 6) * (i + 1);
        const offset = Math.sin(time + i * 0.5) * 50;
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 + Math.sin(time * 2 + i) * 1;
        ctx.globalAlpha = 0.6 + Math.sin(time + i) * 0.3;
        
        ctx.beginPath();
        ctx.moveTo(-100 + offset, y);
        ctx.lineTo(canvas.width + 100 + offset, y);
        ctx.stroke();
      }

      // Vertical laser lines
      for (let i = 0; i < 3; i++) {
        const x = (canvas.width / 4) * (i + 1);
        const vertGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        vertGradient.addColorStop(0, 'transparent');
        vertGradient.addColorStop(0.5, laserColor + '60');
        vertGradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = vertGradient;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.4;
        
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Flowing particles
      for (let i = 0; i < 20; i++) {
        const x = (time * 100 + i * 50) % (canvas.width + 100) - 50;
        const y = (canvas.height / 20) * i;
        
        ctx.fillStyle = laserColor + '80';
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(x, y, 1 + Math.sin(time * 3 + i) * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [laserColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
        mixBlendMode: 'lighten',
        opacity: 0.8
      }}
    />
  );
};

export default LaserFlow;