import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

const loaderStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.loading,
  },
});

export default loaderStyles;
