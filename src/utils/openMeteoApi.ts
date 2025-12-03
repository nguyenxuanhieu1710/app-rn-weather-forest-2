import {WeatherData, CurrentWeather, HourlyForecast, DailyForecast, Location} from '../models/Weather';
import {getConditionIcon, getConditionFromCode} from './formatters';

interface OpenMeteoCurrent {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  surface_pressure: number;
  weather_code: number;
  uv_index?: number;
}

interface OpenMeteoHourly {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  wind_speed_10m: number[];
  precipitation_probability: number[];
  weather_code: number[];
}

interface OpenMeteoDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  relative_humidity_2m_max: number[];
  sunrise: string[];
  sunset: string[];
}

interface OpenMeteoResponse {
  current: OpenMeteoCurrent;
  hourly: OpenMeteoHourly;
  daily: OpenMeteoDaily;
}

export const fetchWeatherFromOpenMeteo = async (
  location: Location,
): Promise<WeatherData> => {
  const {latitude, longitude} = location;

  // Open Meteo API endpoint
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,surface_pressure,weather_code,uv_index&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max,wind_speed_10m_max,relative_humidity_2m_max,sunrise,sunset&timezone=auto&forecast_days=7`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  let response: Response;
  try {
    response = await fetch(url, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Lỗi API thời tiết: ${response.statusText}`);
    }
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout. Vui lòng kiểm tra kết nối mạng.');
    }
    throw error;
  }

  const data: OpenMeteoResponse = await response.json();

  // Get today's sunrise and sunset from daily data
  const todaySunrise = data.daily.sunrise[0] || '';
  const todaySunset = data.daily.sunset[0] || '';

  // Transform current weather
  const current: CurrentWeather = {
    temperature: Math.round(data.current.temperature_2m),
    feelsLike: Math.round(data.current.temperature_2m), // Open Meteo doesn't provide feels like, use same as temp
    condition: getConditionFromCode(data.current.weather_code),
    conditionCode: `weathercode-${data.current.weather_code}`,
    humidity: Math.round(data.current.relative_humidity_2m),
    windSpeed: Math.round(data.current.wind_speed_10m),
    windDirection: Math.round(data.current.wind_direction_10m),
    pressure: Math.round(data.current.surface_pressure),
    visibility: 10, // Open Meteo doesn't provide visibility
    uvIndex: Math.round(data.current.uv_index || 0),
    sunrise: todaySunrise,
    sunset: todaySunset,
    icon: getConditionIcon(`weathercode-${data.current.weather_code}`),
  };

  // Transform hourly forecast (next 24 hours)
  const hourly: HourlyForecast[] = data.hourly.time.slice(0, 24).map((time, index) => ({
    time,
    temperature: Math.round(data.hourly.temperature_2m[index]),
    condition: getConditionFromCode(data.hourly.weather_code[index]),
    conditionCode: `weathercode-${data.hourly.weather_code[index]}`,
    icon: getConditionIcon(`weathercode-${data.hourly.weather_code[index]}`),
    precipitation: data.hourly.precipitation_probability[index] / 100,
    windSpeed: Math.round(data.hourly.wind_speed_10m[index]),
    humidity: Math.round(data.hourly.relative_humidity_2m[index]),
  }));

  // Transform daily forecast
  const daily: DailyForecast[] = data.daily.time.map((date, index) => {
    const dateObj = new Date(date);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[dateObj.getDay()];

    // Get hourly data for this day (if available)
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const dayHourly: HourlyForecast[] = data.hourly.time
      .map((time, idx) => {
        const timeObj = new Date(time);
        if (timeObj >= dayStart && timeObj <= dayEnd) {
          return {
            time,
            temperature: Math.round(data.hourly.temperature_2m[idx]),
            condition: getConditionFromCode(data.hourly.weather_code[idx]),
            conditionCode: `weathercode-${data.hourly.weather_code[idx]}`,
            icon: getConditionIcon(`weathercode-${data.hourly.weather_code[idx]}`),
            precipitation: data.hourly.precipitation_probability[idx] / 100,
            windSpeed: Math.round(data.hourly.wind_speed_10m[idx]),
            humidity: Math.round(data.hourly.relative_humidity_2m[idx]),
          };
        }
        return null;
      })
      .filter((item): item is HourlyForecast => item !== null)
      .slice(0, 24);

    return {
      date,
      dayName: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : dayName,
      high: Math.round(data.daily.temperature_2m_max[index]),
      low: Math.round(data.daily.temperature_2m_min[index]),
      condition: getConditionFromCode(data.daily.weather_code[index]),
      conditionCode: `weathercode-${data.daily.weather_code[index]}`,
      icon: getConditionIcon(`weathercode-${data.daily.weather_code[index]}`),
      precipitation: data.daily.precipitation_probability_max[index] / 100,
      windSpeed: Math.round(data.daily.wind_speed_10m_max[index]),
      humidity: Math.round(data.daily.relative_humidity_2m_max[index]),
      sunrise: data.daily.sunrise[index] || '',
      sunset: data.daily.sunset[index] || '',
      hourly: dayHourly,
    };
  });

  return {
    location,
    current,
    hourly,
    daily,
    alerts: [], // Open Meteo doesn't provide alerts
    lastUpdated: new Date().toISOString(),
  };
};

