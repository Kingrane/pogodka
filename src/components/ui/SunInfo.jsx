import { Sunrise, Sunset, Wind } from 'lucide-react';
import { motion } from 'framer-motion';

const SunInfo = ({ sunrise, sunset, airQuality, lang = 'ru' }) => {
  const translations = {
    ru: {
      sunrise: 'Восход',
      sunset: 'Закат',
      airQuality: 'Качество воздуха',
      aqi: ['Отличное', 'Хорошее', 'Умеренное', 'Плохое', 'Очень плохое']
    },
    en: {
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      airQuality: 'Air Quality',
      aqi: ['Excellent', 'Good', 'Moderate', 'Poor', 'Very Poor']
    }
  };

  const t = translations[lang];

  const getAQILabel = (aqi) => {
    if (!aqi) return null;
    return t.aqi[aqi - 1] || t.aqi[2];
  };

  const getAQIColor = (aqi) => {
    const colors = [
      'text-green-500',
      'text-yellow-500', 
      'text-orange-500',
      'text-red-500',
      'text-purple-500'
    ];
    return colors[aqi - 1] || 'text-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-8"
    >
      {/* Sunrise */}
      <div className="flex items-center gap-3 glass rounded-xl px-4 py-2">
        <Sunrise className="w-5 h-5 text-[var(--accent-color)]" />
        <div>
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider block">
            {t.sunrise}
          </span>
          <span className="text-lg font-display font-bold text-[var(--text-primary)]">
            {sunrise || '--:--'}
          </span>
        </div>
      </div>

      {/* Sunset */}
      <div className="flex items-center gap-3 glass rounded-xl px-4 py-2">
        <Sunset className="w-5 h-5 text-[var(--accent-color)]" />
        <div>
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider block">
            {t.sunset}
          </span>
          <span className="text-lg font-display font-bold text-[var(--text-primary)]">
            {sunset || '--:--'}
          </span>
        </div>
      </div>

      {/* Air Quality */}
      {airQuality && (
        <div className="flex items-center gap-3 glass rounded-xl px-4 py-2">
          <Wind className="w-5 h-5 text-[var(--accent-color)]" />
          <div>
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider block">
              {t.airQuality}
            </span>
            <span className={`text-lg font-display font-bold ${getAQIColor(airQuality)}`}>
              {getAQILabel(airQuality)}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SunInfo;
