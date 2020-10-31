import { createAppContainer } from 'react-navigation'
import Screenshots from '../Containers/Screenshots'
import TwilioVideo from '../Containers/TwilioVideo'
import { createStackNavigator } from 'react-navigation-stack';
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  Screenshots: { screen: Screenshots },
  TwilioVideo: { screen: TwilioVideo },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
