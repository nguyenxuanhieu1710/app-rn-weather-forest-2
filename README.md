# 🌤️ Weather Forest

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-9cf?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A beautiful, iOS-style Weather Forecast App built with **React Native** and **TypeScript**. Designed to provide accurate location-based forecasts, real-time alerts, and a smooth user experience similar to native iOS applications.

---

## 📸 Screenshots

| Home Screen | Flood Risk | Hourly Forecast | Daily Forecast | Overview |
|:---:|:---:|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/22fce7a9-071a-4e28-a0db-1725c097e00a" width="200" /> | <img src="https://github.com/user-attachments/assets/ad461b89-e3da-4c3f-9383-19e77282e44e" width="200" /> | <img src="https://github.com/user-attachments/assets/7ca55038-ae7e-46ad-8f8c-79f7c729613e" width="200" /> | <img src="https://github.com/user-attachments/assets/02f1a94c-4f63-4285-852f-827aef74c5cc" width="200" /> | <img src="https://github.com/user-attachments/assets/c2a7df5a-f4ed-4714-96d4-34138fc69f3d" width="200" /> |




---

## ✨ Key Features

* 🌍 **Location-Based**: Auto-detects current location for precise data.
* ⏰ **24h & 7-Day Forecast**: Detailed hourly and weekly predictions.
* ⚠️ **Severe Alerts**: Real-time warnings for dangerous weather.
* 🎨 **iOS Design System**: Smooth animations, blurry gradients, and Cupertino-style UI.
* 📊 **Deep Stats**: Humidity, UV Index, Wind Speed, Pressure, and more.
* 🔄 **Interactive**: Pull-to-refresh and smooth gestures.
* 🌡️ **Unit Conversion**: Toggle between Celsius and Fahrenheit.

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Core** | React Native (>=0.70), TypeScript |
| **Navigation** | React Navigation (Bottom Tabs) |
| **State Management** | React Context API |
| **UI & Animations** | React Native Reanimated, Linear Gradient, Safe Area Context |
| **Services** | React Native Geolocation |

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
* Node.js (>= 16)
* React Native development environment (Android Studio / Xcode)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/nguyenxuanhieu1710/app-rn-weather-forest-2.git](https://github.com/nguyenxuanhieu1710/app-rn-weather-forest-2.git)
    cd app-rn-weather-forest-2
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **iOS Setup (Mac only)**
    ```bash
    cd ios && pod install && cd ..
    ```

4.  **Run the App**
    ```bash
    # For iOS
    npm run ios

    # For Android
    npm run android
    ```

---

## 📂 Project Structure

```bash
app-weather-forest/
├── src/
│   ├── components/      # Reusable UI (Cards, Spinners)
│   ├── models/          # TypeScript Interfaces
│   ├── navigation/      # App Routing
│   ├── providers/       # Context API (Weather, Location, Alert)
│   ├── screens/         # Main Views (Home, Hourly, Weekly)
│   └── utils/           # Helpers, Constants, Mock Data
├── App.tsx              # Root Component
└── package.json
