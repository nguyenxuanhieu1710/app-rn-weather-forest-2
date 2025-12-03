import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import {HomeScreen} from '../screens/HomeScreen';
import {HourlyScreen} from '../screens/HourlyScreen';
import {WeeklyScreen} from '../screens/WeeklyScreen';
import {AlertsScreen} from '../screens/AlertsScreen';
import {useAlerts} from '../providers/AlertProvider';
import {COLORS} from '../utils/colors';
import {FONT_SIZE} from '../utils/constants';

const Tab = createBottomTabNavigator();

export const AppNavigator: React.FC = () => {
  const {activeAlerts} = useAlerts();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textSecondary,
          tabBarStyle: {
            backgroundColor: COLORS.cardBackground,
            borderTopColor: COLORS.border,
            borderTopWidth: 0.5,
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: FONT_SIZE.xs,
            fontWeight: '500',
            marginTop: 4,
          },
          tabBarIconStyle: {
            marginTop: 4,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            tabBarLabel: 'Trang chủ',
          }}
        />
        <Tab.Screen
          name="Hourly"
          component={HourlyScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="time-outline" size={size} color={color} />
            ),
            tabBarLabel: 'Theo giờ',
          }}
        />
        <Tab.Screen
          name="Weekly"
          component={WeeklyScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
            tabBarLabel: 'Theo tuần',
          }}
        />
        <Tab.Screen
          name="Alerts"
          component={AlertsScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="warning-outline" size={size} color={color} />
            ),
            tabBarLabel: 'Cảnh báo',
            tabBarBadge: activeAlerts.length > 0 ? activeAlerts.length : undefined,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

