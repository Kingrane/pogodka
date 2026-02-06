import { motion } from 'framer-motion';
import WindVane from './WindVane';

const WeatherCard = ({ label, value, unit, icon: Icon, windDirection, windSpeed, humidity, lang = 'ru', delay = 0 }) => {
  const isWindCard = windDirection !== undefined;
  const isHumidityCard = humidity !== undefined && humidity > 70;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 } 
      }}
      className="glass rounded-2xl p-5 group cursor-pointer relative overflow-hidden h-full flex flex-col"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/0 to-[var(--accent-color)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Fog effect for high humidity */}
      {isHumidityCard && (
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      )}
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] font-accent">
            {label}
          </span>
          
          {/* Show wind vane for wind card, otherwise show icon */}
          {isWindCard ? (
            <WindVane direction={windDirection} speed={windSpeed || 10} />
          ) : Icon && (
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.2 }}
            >
              <Icon 
                className="w-5 h-5 text-[var(--accent-color)] opacity-60 group-hover:opacity-100 transition-all duration-300" 
              />
            </motion.div>
          )}
        </div>
        
        <div className="flex items-baseline gap-1 flex-wrap mt-auto">
          <span className="text-2xl md:text-3xl font-display font-bold text-[var(--text-primary)] tabular-nums tracking-tight">
            {value}
          </span>
          {unit && (
            <span className="text-sm text-[var(--text-muted)] font-accent">
              {unit}
            </span>
          )}
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export default WeatherCard;
