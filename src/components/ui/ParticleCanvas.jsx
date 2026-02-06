import { useEffect, useRef } from 'react';

const ParticleCanvas = ({ weatherType = 'clear', windSpeed = 10, windDirection = 45 }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = 0;
        this.speedY = 0;
        this.opacity = Math.random() * 0.5 + 0.2;
        
        // Set speed based on weather type and wind
        const angle = (windDirection * Math.PI) / 180;
        const speed = windSpeed * 0.1;
        
        switch (weatherType) {
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
          default: // clear
            this.speedX = Math.cos(angle) * speed * 0.2;
            this.speedY = Math.sin(angle) * speed * 0.2;
            this.size = Math.random() * 2 + 0.5;
        }
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.beginPath();
        
        const accentColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--accent-color').trim() || '#D4A574';
        
        if (weatherType === 'rain' || weatherType === 'storm') {
          // Draw rain drops as lines
          ctx.strokeStyle = accentColor;
          ctx.lineWidth = this.size * 0.5;
          ctx.globalAlpha = this.opacity;
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x + this.speedX * 2, this.y + this.speedY * 2);
          ctx.stroke();
        } else if (weatherType === 'clouds') {
          // Draw soft circles for clouds
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
          );
          gradient.addColorStop(0, accentColor + '20');
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.globalAlpha = this.opacity;
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw dots for snow and clear
          ctx.fillStyle = accentColor;
          ctx.globalAlpha = this.opacity;
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.globalAlpha = 1;
      }
    }

    // Initialize particles
    const particleCount = weatherType === 'clouds' ? 15 : 
                          weatherType === 'rain' ? 100 : 
                          weatherType === 'snow' ? 80 : 50;
    
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
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
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleCanvas;
