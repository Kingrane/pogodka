import { useState } from 'react';
import { motion } from 'framer-motion';
import WeatherIcon from '../ui/WeatherIcon';

const TimeScrubber = ({ hourlyData, onTimeChange, currentHour, lang = 'ru' }) => {
  const t = {
    ru: { now: 'Сейчас', forecast: 'Прогноз на 24ч' },
    en: { now: 'Now', forecast: '24h Forecast' }
  }[lang];

  const handleHourClick = (hour) => {
    if (onTimeChange) {
      onTimeChange(hour);
    }
  };

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="min-w-full">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)] font-accent">
            {t.forecast}
          </span>
        </div>

        <div className="flex gap-3 pb-2">
          {hourlyData.map((hour, index) => {
            const isCurrent = currentHour && currentHour.hour === hour.hour;
            return (
              <motion.button
                key={index}
                onClick={() => handleHourClick(hour)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-2 glass rounded-xl p-3 min-w-[70px] transition-all ${
                  isCurrent ? 'ring-2 ring-[var(--accent-color)]' : 'hover:bg-white/10'
                }`}
              >
                <span className="text-xs text-[var(--text-muted)] font-accent">
                  {index === 0 ? t.now : `${String(hour.hour).padStart(2, '0')}:00`}
                </span>
                <WeatherIcon type={hour.icon} className="w-6 h-6 text-[var(--accent-color)]" />
                <span className="text-lg font-bold text-[var(--text-primary)]">
                  {hour.temp}°
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimeScrubber;
