import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import * as Location from 'expo-location';
import {Location as LocationType} from '../models/Weather';

interface LocationContextType {
  location: LocationType | null;
  loading: boolean;
  error: string | null;
  requestLocation: () => Promise<void>;
  updateLocation: (location: LocationType) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({children}) => {
  // Set default location immediately so app doesn't get stuck
  const [location, setLocation] = useState<LocationType | null>({
    latitude: 21.0285, // Hà Nội default
    longitude: 105.8542,
    city: 'Hà Nội',
    country: 'Việt Nam',
    address: 'Hà Nội, Việt Nam',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      // Request permissions
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Quyền truy cập vị trí bị từ chối. Đang dùng vị trí mặc định. Bạn có thể chọn tỉnh thành thủ công.');
        setLoading(false);
        // Keep default location (Hà Nội)
        return;
      }

      // Get current position with timeout
      const position = await Promise.race([
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced, // Use Balanced instead of High for faster response
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Hết thời gian chờ vị trí')), 10000)
        ),
      ]);

      const {latitude, longitude} = position.coords;

      // Reverse geocode to get address
      try {
        const [address] = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        setLocation({
          latitude,
          longitude,
          city: address.city || address.region || address.district || 'Unknown',
          country: address.country || 'Unknown',
          address: `${address.city || address.region || ''}, ${address.country || ''}`.trim() || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        });
      } catch {
        // If reverse geocoding fails, use coordinates
        setLocation({
          latitude,
          longitude,
          city: 'Unknown',
          country: 'Unknown',
          address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        });
      }

      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể lấy vị trí');
      setLoading(false);
    }
  };

  const updateLocation = (newLocation: LocationType) => {
    setLocation(newLocation);
  };

  useEffect(() => {
    // Request location on mount
    requestLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        loading,
        error,
        requestLocation,
        updateLocation,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

