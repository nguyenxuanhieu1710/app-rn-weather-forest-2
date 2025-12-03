// Simple location search using Open Meteo's geocoding API
export interface LocationSearchResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string; // State/Province
  admin2?: string; // County
}

export const searchLocations = async (query: string): Promise<LocationSearchResult[]> => {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    // Using Open Meteo's geocoding API
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Tìm kiếm vị trí thất bại');
    }

    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return [];
    }

    return data.results.map((result: any) => ({
      id: result.id,
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      country: result.country || '',
      admin1: result.admin1,
      admin2: result.admin2,
    }));
  } catch (error) {
    console.error('Location search error:', error);
    return [];
  }
};

export const formatLocationName = (location: LocationSearchResult): string => {
  const parts = [location.name];
  if (location.admin1) parts.push(location.admin1);
  if (location.country) parts.push(location.country);
  return parts.join(', ');
};

