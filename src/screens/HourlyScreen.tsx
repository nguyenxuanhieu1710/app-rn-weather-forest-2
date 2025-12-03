import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useWeather} from '../providers/WeatherProvider';
import {HourlyForecastCard} from '../components/HourlyForecastCard';
import {LoadingSpinner} from '../components/LoadingSpinner';
import {COLORS} from '../utils/colors';
import {SPACING, FONT_SIZE, BORDER_RADIUS} from '../utils/constants';

export const HourlyScreen: React.FC = () => {
  const {weatherData, loading, temperatureUnit} = useWeather();

  if (loading && !weatherData) {
    return <LoadingSpinner message="Đang tải dự báo theo giờ..." />;
  }

  if (!weatherData || weatherData.hourly.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không có dự báo theo giờ</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Dự báo 24 giờ</Text>
      <HourlyForecastCard
        forecasts={weatherData.hourly}
        temperatureUnit={temperatureUnit}
      />
      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Chi tiết theo giờ</Text>
        {weatherData.hourly.map((forecast, index) => (
          <View key={index} style={styles.detailItem}>
            <View style={styles.detailLeft}>
              <Text style={styles.detailTime}>
                {new Date(forecast.time).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </Text>
              <Text style={styles.detailIcon}>{forecast.icon}</Text>
            </View>
            <View style={styles.detailMiddle}>
              <Text style={styles.detailCondition}>{forecast.condition}</Text>
              {forecast.precipitation > 0 && (
                <Text style={styles.detailPrecipitation}>
                  💧 {Math.round(forecast.precipitation * 100)}% khả năng
                </Text>
              )}
            </View>
            <View style={styles.detailRight}>
              <Text style={styles.detailTemp}>
                {Math.round(forecast.temperature)}°{temperatureUnit}
              </Text>
              <Text style={styles.detailWind}>💨 {Math.round(forecast.windSpeed)} km/h</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xxxl,
    color: COLORS.text,
    fontWeight: '800',
    marginHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
    letterSpacing: -1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
  detailsSection: {
    marginTop: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.text,
    fontWeight: '700',
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
    letterSpacing: -0.5,
  },
  detailItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  detailLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  detailTime: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  detailIcon: {
    fontSize: FONT_SIZE.xl,
  },
  detailMiddle: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: SPACING.sm,
  },
  detailCondition: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  detailPrecipitation: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
  },
  detailRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  detailTemp: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  detailWind: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
});

