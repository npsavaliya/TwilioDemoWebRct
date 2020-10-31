import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'
import metrics from '../../Themes/Metrics';
var { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  callContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  subContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    paddingTop: 40,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    textAlign: "center",
    backgroundColor: "white",
  },
  button: {
    marginTop: 100,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20
  },
  nextScreenButton: {
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.eggplant,
    marginRight: 15,
    flex: 0.4
  },
  buttonText: {
    color: Colors.eggplant,
    ...Fonts.style.normal,
    margin: 10
  },
  localVideo: {
    flex: 1,
    width: 150,
    height: 250,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  remoteGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  singleVideoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  remoteVideo: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    height: 120,
  },
  singleRemoteVideo: {
    // marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    width: metrics.screenWidth * 0.9,
    height: metrics.screenHeight * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain'
  },
  optionsContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    // height: 100,
    backgroundColor: "blue",
    flexDirection: "row",
    alignItems: "center",
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
})
