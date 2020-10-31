import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.nextScreenButton} onPress={() => this.props.navigation.navigate('TwilioVideo')}>
          <Text style={styles.buttonText}>Go To Twilio Video Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextScreenButton} onPress={() => this.props.navigation.navigate('Screenshots')}>
          <Text style={styles.buttonText}>Go To ScreenShots</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
