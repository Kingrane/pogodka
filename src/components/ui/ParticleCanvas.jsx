import { useEffect, useRef } from 'react';

class Particle {
  constructor(canvas, weatherType, windDirection, windSpeed, accentColor) {
    this.canvas = canvas;
    this.weatherType = weatherType;
    this.windDirection = windDirection;
    this.windSpeed = windSpeed;
    this.accentColor = accentColor;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = 0;
    this.speedY = 0;
    this.opacity = Math.random() * 0.5 + 0.2;

    const angle = (this.windDirection * Math.PI) / 180;
    const speed = this.windSpeed * 0.1;

    switch (this.weatherType) {
      case 'rain':
        this.speedX = Math.cos(angle) * speed * 2;
        this.speedY = Math.sin(angle) * speed * 2 + 5;
        this.size = Math.random() * 1.5 + 0.5;
        break;
      case 'snow':
        this.speedX = Math.cos(angle) * speed * 0.5 + (Math.random() - 0.5);
        this.speedY = Math.sin(angle) * speed * 0.5 + 1;
        this.size = Math.random() * 3 + 2;
        break;
      case 'clouds':
        this.speedX = Math.cos(angle) * speed * 0.3;
        this.speedY = Math.sin(angle) * speed * 0.1;
        this.size = Math.random() * 100 + 50;
        this.opacity = Math.random() * 0.1 + 0.05;
        break;
      case 'storm':
        this.speedX = Math.cos(angle) * speed * 3;
        this.speedY = Math.sin(angle) * speed * 3 + 8;
        this.size = Math.random() * 2 + 1;
        break;
      default:
        this.speedX = Math.cos(angle) * speed * 0.2;
        this.speedY = Math.sin(angle) * speed * 0.2;
        this.size = Math.random() * 2 + 0.5;
    }
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > this.canvas.width) this.x = 0;
    if (this.x < 0) this.x = this.canvas.width;
    if (this.y > this.canvas.height) this.y = 0;
    if (this.y < 0) this.y = this.canvas.height;
  }

  draw(ctx) {
    if (this.weatherType === 'rain' || this.weatherType === 'storm') {
      ctx.beginPath();
      ctx.strokeStyle = this.accentColor;
      ctx.lineWidth = this.size * 0.5;
      ctx.globalAlpha = this.opacity;
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.speedX * 2, this.y + this.speedY * 2);
      ctx.stroke();
    } else if (this.weatherType === 'clouds') {
      ctx.beginPath();
      ctx.fillStyle = this.accentColor;
      ctx.globalAlpha = this.opacity * 0.5;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.fillStyle = this.accentColor;
      ctx.globalAlpha = this.opacity;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

const ParticleCanvas = ({ weatherType = 'clear', windSpeed = 10, windDirection = 45 }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let isActive = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    let accentColor = '#D4A574';
    const updateAccentColor = () => {
      accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-color').trim() || '#D4A574';
    };
    updateAccentColor();

    const particleCount = weatherType === 'clouds' ? 10 :
      weatherType === 'rain' ? 60 :
      weatherType === 'snow' ? 50 :
      weatherType === 'storm' ? 80 : 30;

    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle(canvas, weatherType, windDirection, windSpeed, accentColor));
    }

    const animate = () => {
      if (!isActive) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });
      ctx.restore();
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isActive = false;
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [weatherType, windSpeed, windDirection]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        opacity: 0.5,
        willChange: 'transform',
      }}
    />
  );
};

export default ParticleCanvas;
