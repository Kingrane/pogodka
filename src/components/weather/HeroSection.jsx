import { Wind, Droplets, Eye, Sun, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';
import WeatherCard from '../ui/WeatherCard';
import SunInfo from '../ui/SunInfo';
import TimeScrubber from './TimeScrubber';
import WeatherIcon from '../ui/WeatherIcon';

const HeroSection = ({ weatherData, selectedHour, hourlyForecast, onTimeChange, lang = 'ru' }) => {
  const t = {
    ru: {
      feelsLike: 'ощущается как',
      humidity: 'Влажность',
      wind: 'Ветер',
      visibility: 'Видимость',
      uvIndex: 'УФ-индекс',
      currentWeather: 'Текущая погода',
      forecast: 'Прогноз',
      loading: 'Загрузка...',
      units: { speed: 'км/ч', distance: 'км' }
    },
    en: {
      feelsLike: 'feels like',
      humidity: 'Humidity',
      wind: 'Wind',
      visibility: 'Visibility',
      uvIndex: 'UV Index',
      currentWeather: 'Current Weather',
      forecast: 'Forecast',
      loading: 'Loading...',
      units: { speed: 'km/h', distance: 'km' }
    }
  }[lang];

  // Wind directions
  const windDirs = {
    ru: { 'С': 'С', 'СВ': 'СВ', 'В': 'В', 'ЮВ': 'ЮВ', 'Ю': 'Ю', 'ЮЗ': 'ЮЗ', 'З': 'З', 'СЗ': 'СЗ' },
    en: { 'С': 'N', 'СВ': 'NE', 'В': 'E', 'ЮВ': 'SE', 'Ю': 'S', 'ЮЗ': 'SW', 'З': 'W', 'СЗ': 'NW' }
  };

  // Если нет данных - показываем загрузку
  if (!weatherData) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-[var(--accent-color)] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-[var(--text-secondary)] font-accent">{t.loading}</p>
        </div>
      </section>
    );
  }

  // Определяем данные для отображения (текущие или выбранный час)
  const displayData = selectedHour ? {
    ...weatherData,
    temperature: selectedHour.temp,
    feelsLike: selectedHour.temp - 2, // Примерно
    humidity: selectedHour.humidity,
    windSpeed: selectedHour.windSpeed,
    description: selectedHour.description,
    icon: selectedHour.icon,
    isDay: selectedHour.isDay,
  } : weatherData;

  const getWindDir = (dir) => windDirs[lang][dir] || dir;

  const getWeatherIconType = () => {
    if (selectedHour) return selectedHour.icon;
    const type = weatherData.weatherType?.toLowerCase();
    if (type?.includes('rain')) return 'rain';
    if (type?.includes('snow')) return 'snow';
    if (type?.includes('storm')) return 'storm';
    if (type?.includes('cloud')) return displayData.isDay ? 'partlyCloudy' : 'moon';
    return displayData.isDay ? 'sun' : 'moon';
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-12 overflow-hidden">
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end max-w-7xl mx-auto w-full">
        
        {/* Left: Location & Description */}
        <div className="lg:col-span-5 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="font-accent text-sm text-[var(--text-muted)] uppercase tracking-widest mb-2 block">
              {selectedHour ? `${t.forecast}: ${String(selectedHour.hour).padStart(2, '0')}:00` : t.currentWeather}
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--text-primary)] uppercase tracking-tight" style={{ lineHeight: 1 }}>
              {weatherData.location}
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-1 w-24 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-secondary)] rounded-full"
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <WeatherIcon type={getWeatherIconType()} className="w-12 h-12 text-[var(--accent-color)]" />
            <p className="text-lg md:text-xl text-[var(--text-secondary)] uppercase tracking-[0.15em] font-accent">
              {displayData.description}
            </p>
          </motion.div>
        </div>

        {/* Right: Temperature */}
        <div className="lg:col-span-7 flex flex-col items-start lg:items-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <span className="font-display font-black gradient-text tabular-nums" style={{ fontSize: 'clamp(100px, 18vw, 240px)', lineHeight: 0.9, letterSpacing: '-0.03em' }}>
              {Math.round(displayData.temperature)}°
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center gap-2 mt-4"
          >
            <Thermometer className="w-5 h-5 text-[var(--accent-color)]" />
            <span className="text-[var(--text-secondary)] text-lg font-accent">
              {t.feelsLike} {Math.round(displayData.feelsLike)}°
            </span>
          </motion.div>
          
          {/* Sun info */}
          <SunInfo 
            sunrise={weatherData.sunrise} 
            sunset={weatherData.sunset} 
            airQuality={weatherData.airQuality}
            lang={lang}
          />
        </div>
      </div>

      {/* Bottom: Details cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-12 max-w-7xl mx-auto w-full">
        <WeatherCard label={t.humidity} value={displayData.humidity} unit="%" icon={Droplets} humidity={displayData.humidity} lang={lang} delay={0.8} />
        <WeatherCard label={t.wind} value={`${displayData.windSpeed} ${getWindDir(displayData.windDirection)}`} unit={t.units.speed} windDirection={displayData.windDirection} windSpeed={displayData.windSpeed} lang={lang} delay={0.9} />
        <WeatherCard label={t.visibility} value={displayData.visibility} unit={t.units.distance} icon={Eye} lang={lang} delay={1.0} />
        <WeatherCard label={t.uvIndex} value={displayData.uvIndex} icon={Sun} lang={lang} delay={1.1} />
      </div>

      {/* Time Scrubber */}
      {hourlyForecast && hourlyForecast.length > 0 && (
        <div className="max-w-7xl mx-auto w-full mt-8">
          <TimeScrubber 
            hourlyData={hourlyForecast}
            onTimeChange={onTimeChange}
            currentHour={selectedHour}
            lang={lang}
          />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
