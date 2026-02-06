import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { WeatherProvider, useWeather } from './contexts/WeatherContext';
import ParticleCanvas from './components/ui/ParticleCanvas';
import FilmGrain from './components/ui/FilmGrain';
import HeroSection from './components/weather/HeroSection';
import ForecastSection from './components/weather/ForecastSection';
import Header from './components/layout/Header';
import './index.css';

const WeatherApp = () => {
  const { weatherData, hourlyForecast, forecast, fetchWeather } = useWeather();
  const { updateWeatherType } = useTheme();
  
  // Theme state
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  
  // Language state
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('lang') || 'ru';
  });

  // Selected hour for time scrubbing
  const [selectedHour, setSelectedHour] = useState(null);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  // Apply language
  useEffect(() => {
    localStorage.setItem('lang', currentLang);
  }, [currentLang]);

  // Update weather theme
  useEffect(() => {
    if (weatherData?.weatherType) {
      updateWeatherType(weatherData.weatherType);
    }
  }, [weatherData, updateWeatherType]);

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleLang = () => {
    setCurrentLang(prev => prev === 'ru' ? 'en' : 'ru');
  };

  const handleSearch = (city) => {
    fetchWeather(city);
  };

  return (
    <div className="relative min-h-screen transition-colors duration-700">
      {/* Liquid gradient background */}
      <div className="liquid-bg">
        <div className="liquid-blob liquid-blob-1" />
        <div className="liquid-blob liquid-blob-2" />
      </div>
      
      {/* Background particles */}
      <ParticleCanvas 
        weatherType={weatherData?.weatherType?.toLowerCase() || 'clear'}
        windSpeed={weatherData?.windSpeed || 10}
        windDirection={weatherData?.windDeg || 45}
      />
      
      {/* Gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at top right, var(--accent-glow) 0%, transparent 60%)`,
          opacity: 0.4,
        }}
      />
      
      {/* Film grain effect */}
      <FilmGrain />

      {/* Header */}
      <Header 
        onSearch={handleSearch}
        currentTheme={currentTheme}
        onThemeToggle={toggleTheme}
        currentLang={currentLang}
        onLangToggle={toggleLang}
      />

      {/* Content */}
      <main className="relative z-10">
        <HeroSection 
          weatherData={weatherData} 
          selectedHour={selectedHour}
          hourlyForecast={hourlyForecast}
          onTimeChange={setSelectedHour}
          lang={currentLang} 
        />
        <ForecastSection forecast={forecast} lang={currentLang} />
      </main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <WeatherApp />
      </WeatherProvider>
      </ThemeProvider>
  );
}

export default App;
