import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {WeatherAlert} from '../models/Weather';
import {sampleAlerts} from '../utils/sampleData';

interface AlertContextType {
  alerts: WeatherAlert[];
  activeAlerts: WeatherAlert[];
  loading: boolean;
  error: string | null;
  refreshAlerts: () => Promise<void>;
  dismissAlert: (alertId: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({children}) => {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // In a real app, you would fetch from a weather API here
      // For now, we'll use sample data
      setAlerts(sampleAlerts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải cảnh báo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const refreshAlerts = async () => {
    await fetchAlerts();
  };

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
  };

  const activeAlerts = alerts.filter(
    alert => !dismissedAlerts.has(alert.id) && new Date(alert.endTime) > new Date(),
  );

  return (
    <AlertContext.Provider
      value={{
        alerts,
        activeAlerts,
        loading,
        error,
        refreshAlerts,
        dismissAlert,
      }}>
      {children}
    </AlertContext.Provider>
  );
};

