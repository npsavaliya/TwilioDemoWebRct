import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextScreenButton: {
    backgroundColor: Colors.eggplant,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  buttonText: {
    color: Colors.snow,
    ...Fonts.style.normal,
    margin: 20
  },
})
