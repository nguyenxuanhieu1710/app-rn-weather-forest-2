# Quick Start Guide

Get up and running with Weather Forest in minutes!

## Installation

```bash
# Install dependencies
npm install

# iOS (macOS only)
cd ios && pod install && cd ..

# Run the app
npm run ios    # for iOS
npm run android # for Android
```

## App Overview

### Main Screens

1. **Home Screen** 🏠
   - Current weather with beautiful gradient card
   - Weather statistics (wind, humidity, pressure, etc.)
   - Hourly forecast preview
   - 7-day forecast preview
   - Active weather alerts

2. **Hourly Screen** ⏰
   - 24-hour detailed forecast
   - Hour-by-hour weather conditions
   - Precipitation chances
   - Wind speeds

3. **Weekly Screen** 📅
   - 7-day weather forecast
   - Daily high/low temperatures
   - Sunrise/sunset times
   - Detailed daily weather information

4. **Alerts Screen** ⚠️
   - Active severe weather alerts
   - Alert severity indicators
   - Alert details and timing
   - Dismiss alerts

## Key Features

### Pull to Refresh
- Pull down on any screen to refresh weather data

### Temperature Units
- Currently supports Celsius and Fahrenheit
- Unit preference can be added to settings

### Weather Alerts
- Color-coded by severity:
  - 🟡 Minor (Yellow)
  - 🟠 Moderate (Orange)
  - 🔴 Severe (Red)
  - ⚫ Extreme (Dark Red)

### Weather Statistics
- Wind Speed
- Humidity
- Feels Like Temperature
- Visibility
- Pressure
- UV Index

## Using the App

### Viewing Current Weather
1. Open the app (starts on Home screen)
2. See current temperature and conditions
3. Scroll to view statistics and forecasts

### Checking Hourly Forecast
1. Tap the "Hourly" tab at the bottom
2. Scroll horizontally to see all 24 hours
3. View detailed hourly information below

### Viewing Weekly Forecast
1. Tap the "Weekly" tab
2. Scroll through 7 days of forecasts
3. Tap any day to see detailed information

### Managing Alerts
1. Tap the "Alerts" tab
2. View all active weather alerts
3. Tap ✕ to dismiss an alert
4. Pull down to refresh alerts

## Sample Data

The app currently uses sample weather data for demonstration. To use real weather data:

1. Sign up for a weather API (OpenWeatherMap, WeatherAPI, etc.)
2. Get your API key
3. Update `src/providers/WeatherProvider.tsx`
4. Update `src/providers/AlertProvider.tsx`
5. Add API key to environment variables

## Customization

### Change Colors
Edit `src/utils/colors.ts`:
```typescript
export const COLORS = {
  primary: '#007AFF', // Change this to your preferred color
  // ... other colors
};
```

### Modify Sample Data
Edit `src/utils/sampleData.ts` to change default weather data.

### Adjust Spacing
Edit `src/utils/constants.ts`:
```typescript
export const SPACING = {
  xs: 4,
  sm: 8,
  // ... adjust as needed
};
```

## Troubleshooting

### App won't start
```bash
# Clear cache and restart
npm start -- --reset-cache
```

### Build errors
```bash
# Clean and reinstall
rm -rf node_modules
npm install
```

### Location not working
- Check device permissions
- Ensure location services are enabled
- See SETUP.md for permission configuration

## Next Steps

- Read [README.md](./README.md) for full documentation
- Check [SETUP.md](./SETUP.md) for detailed setup instructions
- Explore the codebase to understand the architecture
- Integrate a real weather API for production use

Enjoy using Weather Forest! 🌤️



