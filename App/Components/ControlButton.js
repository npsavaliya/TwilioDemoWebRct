import React from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './Styles/ControlButtonStyle';

const ControlButton = (props) => {
  const uri = { uri: props.icon }
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.isLoading}
      style={[styles.container, {
        height: props.size,
        width: props.size,
        backgroundColor: props.color
      }]}>
      <Image
        source={uri}
        style={props.iconStyle}
      />
    </TouchableOpacity>
  )
}

// Prop type warnings
ControlButton.propTypes = {
  onPress: PropTypes.func,
  isLoading: PropTypes.bool,
  size: PropTypes.number,
  color: PropTypes.string,
  iconStyle: PropTypes.object,
  icon: PropTypes.string,
}
//
// Defaults for props
ControlButton.defaultProps = {
  size: 50,
  isLoading: false,
  color: 'orange',
  iconStyle: { width: 30, height: 30 },
}

export default ControlButton
