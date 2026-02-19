import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const Vortex = ({
  children,
  className,
  containerClassName,
  particleCount = 700,
  rangeY = 800,
  baseHue = 120,
  baseSpeed = 0.0,
  rangeSpeed = 1.5,
  baseRadius = 1,
  rangeRadius = 2,
  backgroundColor = "transparent",
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const particleCount_ = particleCount;
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    let w = (canvas.width = container.offsetWidth);
    let h = (canvas.height = container.offsetHeight);

    const resizeCanvas = () => {
      w = canvas.width = container.offsetWidth;
      h = canvas.height = container.offsetHeight;
    };

    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.z = Math.random() * 1000;
        this.xOrigin = this.x;
        this.yOrigin = this.y;
        this.radius = baseRadius + Math.random() * rangeRadius;
        this.speed = baseSpeed + Math.random() * rangeSpeed;
        this.angle = Math.random() * Math.PI * 2;
        this.orbitRadius = Math.random() * 120;
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.opacity = Math.random() * 0.5 + 0.5;
      }

      update() {
        this.angle += this.speed * 0.01;
        
        const dx = this.x - this.orbitX;
        const dy = this.y - this.orbitY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 300) {
          this.x += Math.cos(this.angle) * this.speed * 0.5;
          this.y += Math.sin(this.angle) * this.speed * 0.5;
        } else {
          this.x += (this.orbitX - this.x) * 0.0005;
          this.y += (this.orbitY - this.y) * 0.0005;
        }

        this.z -= this.speed;
        if (this.z <= 0) {
          this.z = 1000;
          this.x = Math.random() * w;
          this.y = Math.random() * h;
        }

        if (this.x < 0 || this.x > w) {
          this.x = Math.random() * w;
        }
        if (this.y < 0 || this.y > h) {
          this.y = Math.random() * h;
        }
      }

      draw() {
        const scale = 1000 / (1000 + this.z);
        const x2d = (this.x - w / 2) * scale + w / 2;
        const y2d = (this.y - h / 2) * scale + h / 2;
        const radius2d = this.radius * scale;

        if (x2d < 0 || x2d > w || y2d < 0 || y2d > h) return;

        const opacity = this.opacity * (1 - this.z / 1000);
        const hue = (baseHue + this.z * 0.1) % 360;
        
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(x2d, y2d, radius2d, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${opacity})`;
        ctx.fill();
        ctx.restore();
      }
    }

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount_; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      particlesRef.current.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      
      rafRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [particleCount_, rangeY, baseHue, baseSpeed, rangeSpeed, baseRadius, rangeRadius]);

  return (
    <div className={containerClassName} ref={containerRef}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`relative h-full w-full ${className}`}
        style={{ backgroundColor }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{
            mixBlendMode: "normal",
          }}
        />
        <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  );
};