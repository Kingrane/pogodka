import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const TimeScrubber = ({ hourlyData, onTimeChange, currentHour, lang = 'ru' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredHour, setHoveredHour] = useState(null);
  const containerRef = useRef(null);

  const t = {
    ru: { now: 'Сейчас', forecast: 'Прогноз на 24ч' },
    en: { now: 'Now', forecast: '24h Forecast' }
  }[lang];

  const handleMouseMove = (e) => {
    if (!containerRef.current || !hourlyData.length) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const hourIndex = Math.floor(percentage * (hourlyData.length - 1));
    
    setHoveredHour(hourIndex);
    
    if (isDragging && onTimeChange) {
      onTimeChange(hourlyData[hourIndex]);
    }
  };

  const handleClick = (e) => {
    if (!containerRef.current || !hourlyData.length) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const hourIndex = Math.floor(percentage * (hourlyData.length - 1));
    
    if (onTimeChange) {
      onTimeChange(hourlyData[hourIndex]);
    }
  };

  // Find min/max temps for scaling
  const temps = hourlyData.map(h => h.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const tempRange = maxTemp - minTemp || 1;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)] font-accent">
          {t.forecast}
        </span>
        <span className="text-xs text-[var(--accent-color)] font-accent">
          {hoveredHour !== null ? 
            `${String(hourlyData[hoveredHour]?.hour).padStart(2, '0')}:00` : 
            t.now
          }
        </span>
      </div>

      {/* Graph container */}
      <div 
        ref={containerRef}
        className="relative h-32 glass rounded-2xl p-4 cursor-crosshair overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredHour(null)}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onClick={handleClick}
      >
        {/* Temperature line */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="tempGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area under curve */}
          <path
            d={`M 0,${32 + 64} ${hourlyData.map((h, i) => {
              const x = (i / (hourlyData.length - 1)) * 100;
              const y = 32 + 32 - ((h.temp - minTemp) / tempRange) * 64;
              return `L ${x},${y}`;
            }).join(' ')} L 100,${32 + 64} Z`}
            fill="url(#tempGradient)"
            className="transition-all duration-300"
          />
          
          {/* Temperature line */}
          <path
            d={`M 0,${32 + 32 - ((hourlyData[0]?.temp - minTemp) / tempRange) * 64} ${hourlyData.map((h, i) => {
              const x = (i / (hourlyData.length - 1)) * 100;
              const y = 32 + 32 - ((h.temp - minTemp) / tempRange) * 64;
              return `L ${x},${y}`;
            }).join(' ')}`}
            fill="none"
            stroke="var(--accent-color)"
            strokeWidth="2"
            className="transition-all duration-300"
          />
        </svg>

        {/* Hour markers */}
        <div className="absolute bottom-2 left-4 right-4 flex justify-between text-[10px] text-[var(--text-muted)] font-accent">
          {hourlyData.filter((_, i) => i % 4 === 0).map((h, i) => (
            <span key={i}>{String(h.hour).padStart(2, '0')}:00</span>
          ))}
        </div>

        {/* Current time indicator */}
        {currentHour && (
          <motion.div
            className="absolute top-0 bottom-0 w-0.5 bg-[var(--accent-color)]"
            style={{ 
              left: `${(hourlyData.findIndex(h => h.hour === currentHour.hour) / (hourlyData.length - 1)) * 100}%`,
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--accent-color)]" />
          </motion.div>
        )}

        {/* Hover indicator */}
        {hoveredHour !== null && (
          <motion.div
            className="absolute top-0 bottom-0 w-px bg-white/30 pointer-events-none"
            style={{ left: `${(hoveredHour / (hourlyData.length - 1)) * 100}%` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="absolute top-2 -translate-x-1/2 glass rounded-lg px-2 py-1 text-xs font-accent">
              {hourlyData[hoveredHour]?.temp}°
            </div>
          </motion.div>
        )}
      </div>

      {/* Scrub instruction */}
      <p className="text-center text-xs text-[var(--text-muted)] mt-2 font-accent">
        {lang === 'ru' ? 'Нажмите или перетащите по графику для просмотра прогноза' : 'Click or drag on the graph to view forecast'}
      </p>
    </div>
  );
};

export default TimeScrubber;
