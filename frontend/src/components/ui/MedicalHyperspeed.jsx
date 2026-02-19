'use client';

import { useEffect, useRef } from 'react';

const MedicalHyperspeed = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Medical green colors
    const colors = {
      road: '#0a0f0a',
      lines: '#1a2e1a',
      leftLights: ['#10b981', '#059669', '#047857'],
      rightLights: ['#6ee7b7', '#34d399', '#10b981'],
      sticks: '#6ee7b7'
    };

    // Road lines
    const roadLines = [];
    for (let i = 0; i < 50; i++) {
      roadLines.push({
        y: Math.random() * canvas.height,
        speed: 3 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.4
      });
    }

    // Car lights
    const lights = [];
    for (let i = 0; i < 30; i++) {
      const isLeft = Math.random() > 0.5;
      lights.push({
        x: isLeft ? canvas.width * 0.35 : canvas.width * 0.65,
        y: Math.random() * canvas.height,
        speed: isLeft ? 4 + Math.random() * 3 : -(4 + Math.random() * 3),
        size: 2 + Math.random() * 3,
        color: isLeft 
          ? colors.leftLights[Math.floor(Math.random() * colors.leftLights.length)]
          : colors.rightLights[Math.floor(Math.random() * colors.rightLights.length)],
        opacity: 0.6 + Math.random() * 0.4,
        trail: []
      });
    }

    // Side sticks
    const sticks = [];
    for (let i = 0; i < 20; i++) {
      sticks.push({
        x: canvas.width * 0.15,
        y: (i * canvas.height) / 20,
        speed: 5,
        height: 40 + Math.random() * 30
      });
      sticks.push({
        x: canvas.width * 0.85,
        y: (i * canvas.height) / 20,
        speed: 5,
        height: 40 + Math.random() * 30
      });
    }

    const animate = () => {
      // Dark background with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.5, '#0a0f0a');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw road
      ctx.fillStyle = colors.road;
      const roadWidth = canvas.width * 0.4;
      const roadX = (canvas.width - roadWidth) / 2;
      ctx.fillRect(roadX, 0, roadWidth, canvas.height);

      // Draw center divider
      ctx.strokeStyle = colors.lines;
      ctx.lineWidth = 2;
      ctx.setLineDash([20, 20]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw road lines
      roadLines.forEach(line => {
        ctx.strokeStyle = `rgba(26, 46, 26, ${line.opacity})`;
        ctx.lineWidth = 3;
        ctx.setLineDash([30, 30]);
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.4, line.y);
        ctx.lineTo(canvas.width * 0.6, line.y);
        ctx.stroke();

        line.y += line.speed;
        if (line.y > canvas.height) {
          line.y = -50;
        }
      });
      ctx.setLineDash([]);

      // Draw side sticks
      sticks.forEach(stick => {
        const gradient = ctx.createLinearGradient(stick.x, stick.y, stick.x, stick.y + stick.height);
        gradient.addColorStop(0, colors.sticks);
        gradient.addColorStop(1, 'rgba(110, 231, 183, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(stick.x - 2, stick.y, 4, stick.height);

        stick.y += stick.speed;
        if (stick.y > canvas.height) {
          stick.y = -stick.height;
        }
      });

      // Draw car lights with trails
      lights.forEach(light => {
        // Add current position to trail
        light.trail.unshift({ x: light.x, y: light.y });
        if (light.trail.length > 15) light.trail.pop();

        // Draw trail
        light.trail.forEach((pos, index) => {
          const trailOpacity = light.opacity * (1 - index / light.trail.length);
          const trailSize = light.size * (1 - index / light.trail.length * 0.5);
          
          const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, trailSize * 3);
          gradient.addColorStop(0, `${light.color}${Math.floor(trailOpacity * 255).toString(16).padStart(2, '0')}`);
          gradient.addColorStop(0.5, `${light.color}${Math.floor(trailOpacity * 0.3 * 255).toString(16).padStart(2, '0')}`);
          gradient.addColorStop(1, `${light.color}00`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, trailSize * 3, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw main light
        const mainGradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.size * 4);
        mainGradient.addColorStop(0, `${light.color}${Math.floor(light.opacity * 255).toString(16).padStart(2, '0')}`);
        mainGradient.addColorStop(0.4, `${light.color}${Math.floor(light.opacity * 0.5 * 255).toString(16).padStart(2, '0')}`);
        mainGradient.addColorStop(1, `${light.color}00`);
        
        ctx.fillStyle = mainGradient;
        ctx.beginPath();
        ctx.arc(light.x, light.y, light.size * 4, 0, Math.PI * 2);
        ctx.fill();

        light.y += light.speed;

        // Reset position
        if (light.speed > 0 && light.y > canvas.height + 50) {
          light.y = -50;
          light.trail = [];
        } else if (light.speed < 0 && light.y < -50) {
          light.y = canvas.height + 50;
          light.trail = [];
        }
      });

      // Add perspective effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.3);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

export default MedicalHyperspeed;
