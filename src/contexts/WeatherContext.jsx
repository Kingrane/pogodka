import { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Переводы погодных условий
const weatherTranslations = {
  'clear sky': 'ясно',
  'few clouds': 'малооблачно',
  'scattered clouds': 'переменная облачность',
  'broken clouds': 'облачно',
  'shower rain': 'ливень',
  'rain': 'дождь',
  'light rain': 'небольшой дождь',
  'moderate rain': 'умеренный дождь',
  'heavy rain': 'сильный дождь',
  'thunderstorm': 'гроза',
  'snow': 'снег',
  'light snow': 'небольшой снег',
  'mist': 'туман',
  'fog': 'туман'
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('Москва');

  const fetchWeather = async (city) => {
    console.log('Fetching weather for:', city);
    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const weatherRes = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`,
        { timeout: 10000 }
      );
      
      if (!weatherRes.ok) {
        if (weatherRes.status === 404) {
          throw new Error('Город не найден');
        }
        throw new Error('Ошибка загрузки данных');
      }
      
      const weather = await weatherRes.json();
      
      // Fetch forecast
      const forecastRes = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ru`,
        { timeout: 10000 }
      );
      
      const forecastData = await forecastRes.json();

      // Transform data with Russian translations
      const description = weatherTranslations[weather.weather[0].description] || 
                         weather.weather[0].description;

      // Format sunrise/sunset
      const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      };

      const transformedWeather = {
        location: weather.name.toUpperCase(),
        temperature: Math.round(weather.main.temp),
        feelsLike: Math.round(weather.main.feels_like),
        description: description.toUpperCase(),
        humidity: weather.main.humidity,
        windSpeed: Math.round(weather.wind.speed * 3.6),
        windDirection: getWindDirection(weather.wind.deg),
        visibility: Math.round((weather.visibility || 10000) / 1000),
        uvIndex: 5,
        weatherType: weather.weather[0].main,
        windDeg: weather.wind.deg,
        sunrise: formatTime(weather.sys.sunrise),
        sunset: formatTime(weather.sys.sunset),
        airQuality: Math.floor(Math.random() * 3) + 1,
        pressure: weather.main.pressure,
      };

      // Transform forecast (simplified - takes one per day)
      const dailyForecast = [];
      const dayNames = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
      
      // Get unique days from forecast
      const days = {};
      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toDateString();
        if (!days[dayKey]) {
          days[dayKey] = item;
        }
      });

      Object.values(days).slice(0, 7).forEach((item, idx) => {
        const date = new Date(item.dt * 1000);
        const dayIndex = date.getDay();
        const type = item.weather[0].main.toLowerCase();
        let icon = 'sun';
        if (type.includes('cloud')) icon = 'cloud';
        if (type.includes('rain')) icon = 'rain';
        if (type.includes('snow')) icon = 'snow';
        if (type.includes('storm') || type.includes('thunder')) icon = 'storm';

        dailyForecast.push({
          day: idx === 0 ? 'СЕГОДНЯ' : dayNames[dayIndex],
          temp: Math.round(item.main.temp),
          icon: icon,
          description: weatherTranslations[item.weather[0].description] || item.weather[0].description,
        });
      });

      // Generate hourly forecast from API data
      const hourly = [];
      const currentHour = new Date().getHours();
      
      forecastData.list.slice(0, 8).forEach((item, i) => {
        const hour = (currentHour + i * 3) % 24;
        const type = item.weather[0].main.toLowerCase();
        let icon = 'sun';
        if (type.includes('cloud')) icon = hour > 6 && hour < 20 ? 'partlyCloudy' : 'moon';
        if (type.includes('rain')) icon = 'rain';
        if (type.includes('snow')) icon = 'snow';
        if (type.includes('storm')) icon = 'storm';
        if (hour < 6 || hour > 20) icon = 'moon';

        hourly.push({
          hour: hour,
          temp: Math.round(item.main.temp),
          humidity: item.main.humidity,
          windSpeed: Math.round(item.wind.speed * 3.6),
          description: weatherTranslations[item.weather[0].description] || item.weather[0].description,
          icon: icon,
          isDay: hour >= 6 && hour <= 20,
        });
      });

      setWeatherData(transformedWeather);
      setHourlyForecast(hourly);
      setForecast(dailyForecast);
      setLocation(city);
      
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWindDirection = (deg) => {
    const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  // Load default city on mount
  useEffect(() => {
    fetchWeather('Москва');
  }, []);

  const value = {
    weatherData,
    hourlyForecast,
    forecast,
    loading,
    error,
    location,
    fetchWeather,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};
