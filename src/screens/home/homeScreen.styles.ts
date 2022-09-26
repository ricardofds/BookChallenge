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
  welcomeView: {
    marginRight: SIZES.padding,
  },
  welcomeText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  userText: {
    color: COLORS.black,
    fontSize: 14,
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
    height: 50,
  },
  searchView: {
    flex: 1,
  },
  searchInfoView: {
    paddingHorizontal: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  underlineText: {
    color: COLORS.lightBlue,
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
  },
  searchResultView: {
    flex: 1,
    marginTop: SIZES.padding,
    marginLeft: 10,
  },
  favoriteContainer: {
    flex: 1,
    margin: 10,
  },
  favoriteView: {
    paddingHorizontal: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  favoriteText: {
    color: COLORS.black,
  },
  favoriteListView: {
    flex: 1,
    marginTop: SIZES.padding,
  },
  emptyStateView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateImage: {
    width: 100,
    height: 100,
  },
});

export default homeStyle;
