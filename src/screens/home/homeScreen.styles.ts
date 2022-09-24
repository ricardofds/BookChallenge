import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS, SIZES } from '../../constants/theme';

const homeStyle = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerView: {
    height: 100,
  },
  userInfoView: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: COLORS.almostWhite,
    margin: 10,
    paddingLeft: 10,
  },
  searchView: {
    flex: 1,
  },
  searchInfoView: {
    paddingHorizontal: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  clearText: {
    color: COLORS.lightBlue,
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
  },
  searchResultView: {
    flex: 1,
    marginTop: SIZES.padding,
    marginLeft: 10,
  },
});

export default homeStyle;
