import { useEffect, useRef } from 'react';

const FilmGrain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let isActive = true;

    // Use smaller resolution for better performance
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth / 2);
      canvas.height = Math.floor(window.innerHeight / 2);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    };

    resize();
    window.addEventListener('resize', resize);

    const generateNoise = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      const size = w * h * 4;

      // Optimized noise generation
      for (let i = 0; i < size; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 20;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Update every 100ms instead of every frame
    const animate = () => {
      if (!isActive) return;
      generateNoise();
      animationId = setTimeout(() => {
        animationId = requestAnimationFrame(animate);
      }, 100);
    };

    animate();

    return () => {
      isActive = false;
      window.removeEventListener('resize', resize);
      clearTimeout(animationId);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{
        opacity: 0.02,
        mixBlendMode: 'overlay',
        imageRendering: 'pixelated',
      }}
    />
  );
};

export default FilmGrain;
