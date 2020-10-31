import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'
import metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.transparent
  },
  screenshot: {
    height: 100,
    width: '100%',
    marginBottom: 15
  }
})
