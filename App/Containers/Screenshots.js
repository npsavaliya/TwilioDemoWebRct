import React from 'react'
import { ScrollView, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import metrics from '../Themes/Metrics'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ScreenshotsStyle'

const Screenshots = (props) => {
  console.log('props.screenshots', JSON.stringify(props?.screenshots));
  return (
    <ScrollView style={styles.container}>
      {
        Array.isArray(props?.screenshots) && props.screenshots.map((e, idx) => {
          // const uri = `${e}`;
          return e && <Image key={String(idx)} source={{uri: e}}
          style={{
            width: metrics.screenWidth,
            height: 300,
            resizeMode: 'contain',
            marginTop: 15
          }}/>
        })
      }
    </ScrollView>
  )
}

const mapStateToProps = ({screenshots}) => {
  // console.log('state', JSON.stringify(state));
  return {
    screenshots: screenshots.screenshots
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screenshots)
