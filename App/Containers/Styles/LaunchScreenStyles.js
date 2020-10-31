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
    paddingHorizontal: 20
  },
  nextScreenButton: {
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.eggplant,
    marginBottom: 20,
    width: '100%'
  },
  buttonText: {
    color: Colors.eggplant,
    ...Fonts.style.normal,
    margin: 20
  },
})
