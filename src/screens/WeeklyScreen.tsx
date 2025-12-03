import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useWeather} from '../providers/WeatherProvider';
import {DailyForecastCard} from '../components/DailyForecastCard';
import {LoadingSpinner} from '../components/LoadingSpinner';
import {COLORS} from '../utils/colors';
import {SPACING, FONT_SIZE, BORDER_RADIUS} from '../utils/constants';
import {formatTime} from '../utils/formatters';

export const WeeklyScreen: React.FC = () => {
  const {weatherData, loading, temperatureUnit} = useWeather();

  if (loading && !weatherData) {
    return <LoadingSpinner message="Đang tải dự báo theo tuần..." />;
  }

  if (!weatherData || weatherData.daily.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không có dự báo theo tuần</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Dự báo 7 ngày</Text>
      {weatherData.daily.map((forecast, index) => (
        <View key={index}>
          <DailyForecastCard
            forecast={forecast}
            temperatureUnit={temperatureUnit}
          />
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mặt trời mọc</Text>
              <Text style={styles.detailValue}>🌅 {formatTime(forecast.sunrise)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mặt trời lặn</Text>
              <Text style={styles.detailValue}>🌇 {formatTime(forecast.sunset)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Khả năng mưa</Text>
              <Text style={styles.detailValue}>
                💧 {Math.round(forecast.precipitation * 100)}%
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tốc độ gió</Text>
              <Text style={styles.detailValue}>💨 {Math.round(forecast.windSpeed)} km/h</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Độ ẩm</Text>
              <Text style={styles.detailValue}>{forecast.humidity}%</Text>
            </View>
          </View>
        </View>
      ))}
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
  detailsCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  detailLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    fontWeight: '700',
  },
});

