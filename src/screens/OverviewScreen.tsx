import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {LoadingSpinner} from '../components/LoadingSpinner';
import {COLORS} from '../utils/colors';
import {SPACING, FONT_SIZE, BORDER_RADIUS} from '../utils/constants';
import {API_ENDPOINTS, isApiEnabled, fetchWithTimeout} from '../utils/apiConfig';

interface OverviewData {
  obs_time: string;
  count_locations: number;
  temp: {
    avg_c: number;
    max_c: number;
    min_c: number;
    hottest: {
      id: string;
      name: string;
      lat: number;
      lon: number;
      temp_c: number;
    };
    coldest: {
      id: string;
      name: string;
      lat: number;
      lon: number;
      temp_c: number;
    };
    hot_count_ge_35: number;
    hot_count_ge_37: number;
  };
  rain: {
    raining_count: number;
    heavy_rain_count: number;
  };
  wind: {
    strong_wind_count: number;
  };
}

export const OverviewScreen: React.FC = () => {
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverviewData = async () => {
      try {
        setLoading(true);
        
        // Thử gọi API trước
        if (isApiEnabled()) {
          try {
            const response = await fetchWithTimeout(API_ENDPOINTS.overview());
            if (response.ok) {
              const overviewResponse = await response.json() as OverviewData;
              setOverviewData(overviewResponse);
              return;
            }
          } catch (apiError) {
            console.warn('API không phản hồi, sử dụng JSON file:', apiError);
          }
        }
        
        // Fallback về JSON file
        const overviewResponse = require('../data/overview.json') as OverviewData;
        setOverviewData(overviewResponse);
      } catch (error) {
        console.error('Error loading overview data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOverviewData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Đang tải tổng quan..." />;
  }

  if (!overviewData) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không có dữ liệu tổng quan</Text>
      </View>
    );
  }

  const obsDate = new Date(overviewData.obs_time);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Tổng quan</Text>
        <Text style={styles.subtitle}>
          Cập nhật: {obsDate.toLocaleString('vi-VN')}
        </Text>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>📍 Vị trí</Text>
            <Text style={styles.summaryValue}>{overviewData.count_locations}</Text>
            <Text style={styles.summaryUnit}>điểm</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>🌡️ Nhiệt độ TB</Text>
            <Text style={styles.summaryValue}>{overviewData.temp.avg_c.toFixed(1)}</Text>
            <Text style={styles.summaryUnit}>°C</Text>
          </View>
        </View>
      </View>

      {/* Temperature Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>🌡️ Nhiệt độ</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Cao nhất</Text>
            <Text style={[styles.statValue, styles.statValueHot]}>
              {overviewData.temp.max_c}°C
            </Text>
            <View style={styles.locationInfo}>
              <Text style={styles.locationText}>
                📍 {overviewData.temp.hottest.name}
              </Text>
              <Text style={styles.coordsText}>
                {overviewData.temp.hottest.lat}, {overviewData.temp.hottest.lon}
              </Text>
            </View>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Thấp nhất</Text>
            <Text style={[styles.statValue, styles.statValueCold]}>
              {overviewData.temp.min_c}°C
            </Text>
            <View style={styles.locationInfo}>
              <Text style={styles.locationText}>
                📍 {overviewData.temp.coldest.name}
              </Text>
              <Text style={styles.coordsText}>
                {overviewData.temp.coldest.lat}, {overviewData.temp.coldest.lon}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Trung bình</Text>
            <Text style={styles.detailValue}>{overviewData.temp.avg_c.toFixed(1)}°C</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>≥ 35°C</Text>
            <Text style={styles.detailValue}>{overviewData.temp.hot_count_ge_35} điểm</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>≥ 37°C</Text>
            <Text style={styles.detailValue}>{overviewData.temp.hot_count_ge_37} điểm</Text>
          </View>
        </View>
      </View>

      {/* Rain Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>🌧️ Mưa</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Đang mưa</Text>
            <Text style={[styles.statValue, styles.statValueRain]}>
              {overviewData.rain.raining_count}
            </Text>
            <Text style={styles.statUnit}>điểm</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Mưa lớn</Text>
            <Text style={[styles.statValue, styles.statValueHeavyRain]}>
              {overviewData.rain.heavy_rain_count}
            </Text>
            <Text style={styles.statUnit}>điểm</Text>
          </View>
        </View>
      </View>

      {/* Wind Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>💨 Gió</Text>
        
        <View style={styles.windCard}>
          <Text style={styles.windLabel}>Gió mạnh</Text>
          <Text style={[styles.windValue, styles.windValueStrong]}>
            {overviewData.wind.strong_wind_count}
          </Text>
          <Text style={styles.windUnit}>điểm</Text>
        </View>
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
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZE.xxxl,
    color: COLORS.text,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  summaryCard: {
    backgroundColor: COLORS.cardBackground,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  summaryValue: {
    fontSize: FONT_SIZE.xxl,
    color: COLORS.primary,
    fontWeight: '800',
    marginBottom: SPACING.xs,
  },
  summaryUnit: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  summaryDivider: {
    width: 1,
    height: 60,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  sectionCard: {
    backgroundColor: COLORS.cardBackground,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.text,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    marginBottom: SPACING.xs,
  },
  statValueHot: {
    color: COLORS.alertSevere,
  },
  statValueCold: {
    color: COLORS.primary,
  },
  statValueRain: {
    color: COLORS.primary,
  },
  statValueHeavyRain: {
    color: COLORS.alertSevere,
  },
  statUnit: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  locationInfo: {
    marginTop: SPACING.xs,
    alignItems: 'center',
  },
  locationText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  coordsText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  detailItem: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  detailValue: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    fontWeight: '700',
  },
  windCard: {
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  windLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginBottom: SPACING.sm,
  },
  windValue: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '800',
    marginBottom: SPACING.xs,
  },
  windValueStrong: {
    color: COLORS.warning,
  },
  windUnit: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
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
});

