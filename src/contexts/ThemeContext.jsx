import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [weatherType, setWeatherType] = useState('clear');
  const [theme, setTheme] = useState('theme-clear');

  const weatherThemes = {
    clear: 'theme-clear',
    clouds: 'theme-clouds',
    rain: 'theme-rain',
    snow: 'theme-snow',
    storm: 'theme-storm',
    drizzle: 'theme-rain',
    thunderstorm: 'theme-storm',
  };

  const updateWeatherType = (type) => {
    const normalizedType = type?.toLowerCase() || 'clear';
    
    // Map various weather conditions to our themes
    let mappedType = 'clear';
    if (normalizedType.includes('cloud')) mappedType = 'clouds';
    else if (normalizedType.includes('rain')) mappedType = 'rain';
    else if (normalizedType.includes('snow')) mappedType = 'snow';
    else if (normalizedType.includes('storm') || normalizedType.includes('thunder')) mappedType = 'storm';
    else if (normalizedType.includes('drizzle')) mappedType = 'rain';
    
    setWeatherType(mappedType);
    setTheme(weatherThemes[mappedType] || 'theme-clear');
  };

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.className = theme;
  }, [theme]);

  const value = {
    weatherType,
    theme,
    updateWeatherType,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
