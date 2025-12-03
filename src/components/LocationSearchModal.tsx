import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {vietnamProvinces, searchVietnamProvinces, VietnamProvince} from '../utils/vietnamProvinces';
import {Location} from '../models/Weather';
import {COLORS} from '../utils/colors';
import {SPACING, BORDER_RADIUS, FONT_SIZE} from '../utils/constants';

interface LocationSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectLocation: (location: Location) => void;
  currentLocation: Location | null;
}

export const LocationSearchModal: React.FC<LocationSearchModalProps> = ({
  visible,
  onClose,
  onSelectLocation,
  currentLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [vietnamResults, setVietnamResults] = useState<VietnamProvince[]>([]);

  useEffect(() => {
    // Only search Vietnam provinces
    if (searchQuery.length >= 1) {
      const vnResults = searchVietnamProvinces(searchQuery);
      setVietnamResults(vnResults);
    } else {
      setVietnamResults([]);
    }
  }, [searchQuery]);

  const handleSelectVietnamProvince = (province: VietnamProvince) => {
    const location: Location = {
      latitude: province.latitude,
      longitude: province.longitude,
      city: province.name,
      country: 'Việt Nam',
      address: `${province.name}, Việt Nam`,
    };
    onSelectLocation(location);
    setSearchQuery('');
    setVietnamResults([]);
    onClose();
  };

  const handleUseCurrentLocation = () => {
    if (currentLocation) {
      onSelectLocation(currentLocation);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Chọn địa điểm</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm tỉnh thành..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>

        {/* Only Vietnam provinces - no tabs needed */}

        {currentLocation && (
          <TouchableOpacity
            style={styles.currentLocationButton}
            onPress={handleUseCurrentLocation}>
            <Text style={styles.currentLocationIcon}>📍</Text>
            <View style={styles.currentLocationText}>
              <Text style={styles.currentLocationTitle}>Dùng vị trí hiện tại</Text>
              <Text style={styles.currentLocationSubtitle}>
                {currentLocation.city}, {currentLocation.country}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <FlatList
          data={searchQuery.length > 0 ? vietnamResults : vietnamProvinces}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleSelectVietnamProvince(item)}>
              <Text style={styles.resultIcon}>🇻🇳</Text>
              <View style={styles.resultText}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultDetails}>{item.region}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            searchQuery.length > 0 && vietnamResults.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Không tìm thấy tỉnh thành</Text>
              </View>
            ) : null
          }
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  loadingIndicator: {
    marginLeft: SPACING.sm,
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.sm,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  currentLocationIcon: {
    fontSize: FONT_SIZE.lg,
    marginRight: SPACING.sm,
  },
  currentLocationText: {
    flex: 1,
  },
  currentLocationTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.text,
  },
  currentLocationSubtitle: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  resultIcon: {
    fontSize: FONT_SIZE.md,
    marginRight: SPACING.sm,
  },
  resultText: {
    flex: 1,
  },
  resultName: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.text,
  },
  resultDetails: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginHorizontal: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
    fontWeight: '600',
  },
  activeTabText: {
    color: COLORS.textDark,
  },
});

