export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  address?: string;
}

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionCode: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  sunrise?: string;
  sunset?: string;
  icon: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  conditionCode: string;
  icon: string;
  precipitation: number;
  windSpeed: number;
  humidity: number;
}

export interface DailyForecast {
  date: string;
  dayName: string;
  high: number;
  low: number;
  condition: string;
  conditionCode: string;
  icon: string;
  precipitation: number;
  windSpeed: number;
  humidity: number;
  sunrise: string;
  sunset: string;
  hourly: HourlyForecast[];
}

export interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  type: 'thunderstorm' | 'rain' | 'snow' | 'wind' | 'fog' | 'heat' | 'cold' | 'other';
  startTime: string;
  endTime: string;
  area: string;
  urgency: 'immediate' | 'expected' | 'future' | 'past';
}

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  alerts: WeatherAlert[];
  lastUpdated: string;
}


