import { useEffect, useRef } from 'react';

const FilmGrain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 15;    // A (opacity - very subtle)
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animate = () => {
      generateNoise();
      animationId = requestAnimationFrame(animate);
    };

    // Lower frame rate for better performance (every 3rd frame)
    let frameCount = 0;
    const throttledAnimate = () => {
      frameCount++;
      if (frameCount % 3 === 0) {
        generateNoise();
      }
      animationId = requestAnimationFrame(throttledAnimate);
    };

    throttledAnimate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ 
        opacity: 0.03,
        mixBlendMode: 'overlay',
      }}
    />
  );
};

export default FilmGrain;
