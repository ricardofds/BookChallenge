import React from 'react';

import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants/theme';

import styles from './loader.styles';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.lightBlue} animating />
    </View>
  );
};

export default Loader;
