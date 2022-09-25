import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/home/homeScreen';
import { Image, StyleSheet } from 'react-native';

import { HomeIcon } from '../assets/image';
import { RootStackParamList } from './types';

const Tab = createBottomTabNavigator<RootStackParamList>();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          switch (route.name) {
            case 'Home':
              return <Image source={HomeIcon} style={styles.homeIcon} />;
          }
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  homeIcon: {
    width: 55,
    height: 35,
  },
});

export default Tabs;
