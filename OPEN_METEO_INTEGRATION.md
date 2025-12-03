# Open Meteo API Integration

The Weather Forest app now uses the **Open Meteo API** for real-time weather data. Open Meteo is a free, open-source weather API that provides accurate forecasts without requiring an API key.

## Features Integrated

### ✅ Current Weather
- Temperature (2m above ground)
- Humidity
- Wind speed and direction
- Atmospheric pressure
- UV index
- Weather condition (from WMO weather codes)
- Sunrise and sunset times

### ✅ Hourly Forecast
- 24-hour detailed forecast
- Temperature for each hour
- Precipitation probability
- Wind speed
- Humidity
- Weather conditions

### ✅ Daily Forecast
- 7-day extended forecast
- Daily high and low temperatures
- Maximum precipitation probability
- Maximum wind speed
- Average humidity
- Sunrise and sunset times
- Weather conditions

## API Endpoint

The app uses the Open Meteo Forecast API:
```
https://api.open-meteo.com/v1/forecast
```

### Parameters Used:
- `latitude` & `longitude`: User's current location
- `current`: Current weather parameters
- `hourly`: Hourly forecast parameters
- `daily`: Daily forecast parameters
- `timezone`: Auto-detected from location
- `forecast_days`: 7 days

## Weather Code Mapping

Open Meteo uses WMO (World Meteorological Organization) weather codes (0-99). The app converts these codes to readable conditions:

- **0-1**: Clear Sky / Mainly Clear → ☀️
- **2**: Partly Cloudy → ⛅
- **3**: Overcast → ☁️
- **45-48**: Foggy → 🌫️
- **51-57**: Drizzle → 🌦️
- **61-67**: Rain → 🌧️
- **71-77**: Snow → ❄️
- **80-82**: Rain Showers → 🌧️
- **85-86**: Snow Showers → 🌨️
- **95-99**: Thunderstorm → ⛈️

## Implementation Details

### Files Modified/Created:

1. **`src/utils/openMeteoApi.ts`** (NEW)
   - Fetches weather data from Open Meteo API
   - Transforms API response to app's data models
   - Handles location-based requests

2. **`src/utils/formatters.ts`** (UPDATED)
   - Added `getConditionFromCode()`: Converts WMO codes to condition strings
   - Updated `getConditionIcon()`: Handles Open Meteo weather codes
   - Added `getIconFromWeatherCode()`: Maps codes to emoji icons

3. **`src/providers/WeatherProvider.tsx`** (UPDATED)
   - Now uses `fetchWeatherFromOpenMeteo()` instead of sample data
   - Fetches weather when location is available
   - Handles API errors gracefully

4. **`src/providers/LocationProvider.tsx`** (UPDATED)
   - Switched from `@react-native-community/geolocation` to `expo-location`
   - Uses Expo's location API for better compatibility
   - Includes reverse geocoding for city/country names

## Data Flow

1. **Location Request**: App requests user's location using Expo Location API
2. **Reverse Geocoding**: Converts coordinates to city/country names
3. **Weather Fetch**: Uses coordinates to fetch from Open Meteo API
4. **Data Transformation**: Converts API response to app's data models
5. **UI Update**: Components display the weather data

## Error Handling

The app handles various error scenarios:
- Location permission denied
- Location unavailable
- API request failures
- Network errors
- Invalid responses

All errors are displayed to the user with retry options.

## Limitations

### Open Meteo API Limitations:
- **No Weather Alerts**: Open Meteo doesn't provide severe weather alerts
- **No "Feels Like" Temperature**: Uses actual temperature as feels-like
- **No Visibility Data**: Visibility is set to a default value (10 km)
- **No Historical Data**: Only current and forecast data

### Workarounds:
- Weather alerts are still available from sample data (can be integrated with another API)
- "Feels like" uses the same as actual temperature
- Visibility defaults to 10 km

## Future Enhancements

Possible improvements:
1. Integrate a separate alerts API (e.g., National Weather Service)
2. Calculate "feels like" temperature using wind chill/heat index formulas
3. Add weather maps integration
4. Cache weather data for offline use
5. Add multiple location support
6. Implement weather data refresh intervals

## Testing

To test the integration:
1. Ensure location permissions are granted
2. The app will automatically fetch weather for your current location
3. Pull down to refresh weather data
4. Check all screens (Home, Hourly, Weekly) for data

## API Documentation

For more information about Open Meteo API:
- Official Docs: https://open-meteo.com/en/docs
- API Reference: https://open-meteo.com/en/docs#api-documentation
- Weather Codes: https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM

## Free Usage

Open Meteo is completely free for non-commercial use. No API key required, no rate limits for reasonable usage.


