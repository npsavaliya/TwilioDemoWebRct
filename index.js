import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'
import {LogBox} from 'react-native'
LogBox.ignoreAllLogs(true);

AppRegistry.registerComponent('TwilioDemo', () => App)
