import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {WeatherData} from '../models/Weather';
import {fetchWeatherFromJson} from '../utils/weatherDataApi';
import {useLocation} from './LocationProvider';

interface WeatherContextType {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  refreshWeather: () => Promise<void>;
  temperatureUnit: 'C' | 'F';
  setTemperatureUnit: (unit: 'C' | 'F') => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({children}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');
  const {location} = useLocation();

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!location) {
        setError('Vị trí không khả dụng. Vui lòng chọn vị trí thủ công.');
        setLoading(false);
        return;
      }

      // Fetch from JSON files dựa trên location_id (sẽ fallback về mặc định nếu không có)
      // Default provider là XGBoost
      const data = await fetchWeatherFromJson(location, 'XGBoost');
      
      setWeatherData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Không thể tải dữ liệu thời tiết';
      setError(errorMessage);
      console.error('Weather fetch error:', err);
      // Đảm bảo loading được set về false ngay cả khi có lỗi
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  const refreshWeather = async () => {
    await fetchWeatherData();
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        error,
        refreshWeather,
        temperatureUnit,
        setTemperatureUnit,
      }}>
      {children}
    </WeatherContext.Provider>
  );
};

