import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const bookDesign = StyleSheet.create({
  cardTouch: {
    flex: 1,
    marginRight: SIZES.radius,
    marginBottom: 20,
  },
  cardImage: {
    width: 180,
    height: 250,
    borderRadius: 20,
  },
  cardTitleView: {
    marginTop: SIZES.radius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitleText: {
    marginLeft: 10,
    color: COLORS.black,
    fontSize: 12,
  },
});

export default bookDesign;
