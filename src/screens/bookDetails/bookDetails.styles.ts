import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

const bookDetails = StyleSheet.create({
  safeView: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  bookView: {
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    margin: 10,
  },
  aboutView: {
    borderColor: COLORS.almostWhite,
    borderWidth: 1,
    height: 'auto',
    margin: 10,
    padding: 10,
  },
  aboutTextView: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  aboutTitleText: {
    color: COLORS.black,
    paddingRight: 10,
    fontSize: 14,
    fontWeight: '800',
  },
  aboutDescriptionText: {
    color: COLORS.black,
    fontSize: 12,
    fontWeight: '400',
    paddingRight: 10,
  },
  favoriteAndBuyView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  favoriteImage: {
    width: 20,
    height: 20,
  },
});

export default bookDetails;
