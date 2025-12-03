# Location Selection Feature

The Weather Forest app now supports manual location selection! You can search for any city and get weather data for that location.

## How It Works

### Flow:
1. **App Starts**: Automatically detects your current location using GPS
2. **Weather Fetched**: Gets weather data for your current location
3. **Select New Location**: Tap the location button at the top of the Home screen
4. **Search**: Type a city name in the search box
5. **Select**: Choose a location from the search results
6. **Weather Updates**: App automatically fetches weather for the selected location

## Features

### Location Search Modal
- **Search Bar**: Type to search for cities worldwide
- **Real-time Results**: Shows up to 10 matching locations
- **Location Details**: Displays city, state/province, and country
- **Current Location Option**: Quick button to use your GPS location
- **Debounced Search**: Waits 500ms after typing stops before searching

### Location Button
- **Top Header**: Always visible location selector button
- **Current Location Display**: Shows current city and country
- **Tap to Change**: Opens location search modal

## API Integration

### Open Meteo Geocoding API
The app uses Open Meteo's free geocoding API for location search:
```
https://geocoding-api.open-meteo.com/v1/search
```

**Features:**
- No API key required
- Free to use
- Global city database
- Returns coordinates for weather API

### Weather API Call
After selecting a location:
1. Location coordinates are stored
2. WeatherProvider detects location change
3. Fetches weather from Open Meteo Forecast API
4. Updates all screens with new weather data

## User Experience

### Automatic Location
- On first launch, requests GPS permission
- Uses your current location automatically
- Shows weather for where you are

### Manual Selection
- Tap location button anytime
- Search for any city
- Switch between locations easily
- Weather updates automatically

### Location Persistence
- Selected location is stored in app state
- Remains selected until changed
- Can switch back to current location anytime

## Components

### LocationSearchModal
- Full-screen modal for location search
- Search input with loading indicator
- List of search results
- Current location quick access

### LocationSearch Utility
- `searchLocations()`: Searches cities by name
- `formatLocationName()`: Formats location display
- Uses Open Meteo Geocoding API

## Code Structure

### Files Created/Modified:

1. **`src/utils/locationSearch.ts`** (NEW)
   - Location search functionality
   - Open Meteo geocoding integration
   - Location formatting utilities

2. **`src/components/LocationSearchModal.tsx`** (NEW)
   - Location search UI component
   - Search input and results list
   - Current location option

3. **`src/screens/HomeScreen.tsx`** (UPDATED)
   - Added location selector button
   - Integrated LocationSearchModal
   - Location selection handler

## Usage Example

```typescript
// User taps location button
setShowLocationModal(true);

// User searches for "Paris"
// Results show: Paris, Île-de-France, France

// User selects Paris
handleLocationSelect({
  latitude: 48.8566,
  longitude: 2.3522,
  city: "Paris",
  country: "France",
  address: "Paris, Île-de-France, France"
});

// WeatherProvider automatically fetches weather for Paris
// All screens update with Paris weather data
```

## Benefits

1. **Flexibility**: Check weather for any location
2. **No GPS Required**: Works even if location services are off
3. **Quick Switching**: Easy to change locations
4. **Global Coverage**: Search any city worldwide
5. **Free API**: No API keys or costs

## Future Enhancements

Possible improvements:
- Save favorite locations
- Recent locations list
- Location history
- Multiple location tracking
- Location-based alerts
- Offline location search cache


