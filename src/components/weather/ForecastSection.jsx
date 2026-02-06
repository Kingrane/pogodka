import { motion } from 'framer-motion';
import WeatherIcon from '../ui/WeatherIcon';

const ForecastSection = ({ forecast, lang = 'ru' }) => {
  const translations = {
    ru: {
      title: 'Прогноз на 7 дней',
      today: 'СЕГОДНЯ'
    },
    en: {
      title: '7-Day Forecast',
      today: 'TODAY'
    }
  };

  const t = translations[lang];

  // Default mock data
  const defaultForecast = [
    { day: t.today, temp: -8, icon: 'cloud', description: 'Облачно' },
    { day: 'ЗАВТРА', temp: -10, icon: 'snow', description: 'Снег' },
    { day: 'СУБ', temp: -7, icon: 'partlyCloudy', description: 'Облачно' },
    { day: 'ВС', temp: -5, icon: 'sun', description: 'Ясно' },
    { day: 'ПН', temp: -9, icon: 'cloud', description: 'Облачно' },
    { day: 'ВТ', temp: -11, icon: 'snow', description: 'Снег' },
    { day: 'СР', temp: -6, icon: 'partlyCloudy', description: 'Облачно' },
  ];

  const data = forecast || defaultForecast;

  return (
    <section className="px-6 md:px-12 lg:px-24 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)] font-accent">
            {t.title}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent-color)]/30 to-transparent" />
        </div>

        {/* Forecast grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {data.map((dayData, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -12, 
                scale: 1.05,
                transition: { duration: 0.3 } 
              }}
              className="glass rounded-2xl p-6 flex flex-col items-center gap-4 cursor-pointer group relative overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/0 to-[var(--accent-color)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] font-accent relative z-10">
                {dayData.day}
              </span>
              
              <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                <WeatherIcon type={dayData.icon} className="w-10 h-10 text-[var(--accent-color)]" />
              </div>
              
              <span className="text-2xl font-display font-bold text-[var(--text-primary)] tabular-nums relative z-10">
                {dayData.temp}°
              </span>
              
              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ForecastSection;
