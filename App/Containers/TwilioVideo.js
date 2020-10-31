import React, { useState, useRef, useEffect } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from "react-native";
import { connect } from 'react-redux'
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from "react-native-twilio-video-webrtc";
import { TwilioVideoConst } from "../Fixtures/Strings";
import metrics from "../Themes/Metrics";

import styles from "./Styles/TwilioVideoStyle";

import { captureScreen } from "react-native-view-shot";
import ScreenShotActions from "../Redux/ScreenShotsRedux";

const TwilioVideoScreen = (props) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [status, setStatus] = useState("disconnected");
  const [participants, setParticipants] = useState(new Map());
  const [videoTracks, setVideoTracks] = useState(new Map());
  const [token, setToken] = useState(TwilioVideoConst.accessToken);
  const [roomName, setRoomName] = useState(TwilioVideoConst.roomName.value);
  const [accessTokenUrl, setAccessTokenUrl] = useState(TwilioVideoConst.accessTokenUrl);
  const twilioVideo = useRef(null);

  const onFetchAccessToken = (onSuccess, createRoomFlag) => {
    if (!accessTokenUrl) return;
    fetch(accessTokenUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        [TwilioVideoConst.userIdentity.fieldName]: ((Math.random() * 10000) + new Date().getTime()).toFixed(0) + Platform.OS,
        platform: Platform.OS,
        [TwilioVideoConst.passcode.fieldName]: TwilioVideoConst.passcode.value,
        [TwilioVideoConst.roomName.fieldName]: TwilioVideoConst.roomName.value,
        [TwilioVideoConst.createRoom.fieldName]: createRoomFlag
      })
    }).then(response => {
      return response.json();
    }).then((data) => {
      console.log('accessTokenData =>', data)
      const { token: _token } = data
      console.log('accessToken =>', _token)
      setToken(_token);
      onSuccess(_token);
    }).catch((error) => {
      console.log('getAccessTokenError =>', error)
    }).then(() => {
      console.log('getAccessTocken Success')
      // this.setState({ status: "DONE" })
    })
  }

  const captureScreenshot = () => captureScreen({
    format: "jpg",
    quality: 0.8
  }).then(

    uri => {
      props.addScreenshot(uri);
    },
    error => console.error("Oops, snapshot failed", error)
  );

  useEffect(() => {
    return _onEndButtonPress;
  }, [])



  const _onConnectWithAccessTockenButtonPress = async () => {
    if (Platform.OS === "android") {
      await _requestAudioPermission();
      await _requestCameraPermission();
    }
    // https://video-app-6683-4543-dev.twil.io/token

    if (!accessTokenUrl) return;
    onFetchAccessToken((_token) => {
      twilioVideo.current.connect({ accessToken: _token });
      setStatus("connecting");
    }, true)
  };



  const _onConnectWithRoomButtonPress = async () => {
    if (Platform.OS === "android") {
      await _requestAudioPermission();
      await _requestCameraPermission();
    }
    onFetchAccessToken((_token) => {
      twilioVideo.current.connect({ accessToken: _token });
      setStatus("connecting");
    }, false)
  };

  const _onEndButtonPress = () => {
    twilioVideo.current.disconnect();
  };

  const _onMuteButtonPress = () => {
    twilioVideo.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then((isEnabled) => setIsAudioEnabled(isEnabled));
  };

  const _onFlipButtonPress = () => {
    twilioVideo.current.flipCamera();
  };

  const _onRoomDidConnect = () => {
    console.log('RoomDidConnect');
    setStatus("connected");
  };

  const _onRoomDidDisconnect = ({ error }) => {
    console.log("ERROR: ", error);

    setStatus("disconnected");
  };

  const _onRoomDidFailToConnect = (error) => {
    console.log("ERROR: ", error);

    setStatus("disconnected");
  };

  const _onParticipantAddedVideoTrack = ({ participant, track }) => {
    console.log("onParticipantAddedVideoTrack: ", participant, track);

    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ])
    );
  };

  const _onParticipantRemovedVideoTrack = ({ participant, track }) => {
    console.log("onParticipantRemovedVideoTrack: ", participant, track);

    const videoTracks = new Map(videoTracks);
    videoTracks.delete(track.trackSid);

    setVideoTracks(videoTracks);
  };

  const _requestAudioPermission = () => {
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "Need permission to access microphone",
        message:
          "To run this demo we need permission to access your microphone",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
  };

  const _requestCameraPermission = () => {
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: "Need permission to access camera",
      message: "To run this demo we need permission to access your camera",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    });
  };

  console.log('videoTracks', videoTracks)
  console.log('status', status)

  return (
    <View style={styles.container}>
      {status === "disconnected" && (
        <View style={styles.subContainer}>
          <Text style={styles.welcome}>React Native Twilio Video</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={accessTokenUrl}
            placeholder="Access Token Fetch URL"
            onChangeText={(text) => setAccessTokenUrl(text)}
          ></TextInput>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              title="Create Room"
              style={styles.nextScreenButton}
              onPress={_onConnectWithAccessTockenButtonPress}
            ><Text style={styles.buttonText}>Create Room</Text></TouchableOpacity>
            <TouchableOpacity
              style={styles.nextScreenButton}
              onPress={_onConnectWithRoomButtonPress}
            ><Text style={styles.buttonText}>Join Room</Text></TouchableOpacity>
          </View>
        </View>
      )}

      {(status === "connected" || status === "connecting") && (
        <View style={styles.callContainer}>
          {status === "connected" && (
            <View style={videoTracks.size === 1 ? styles.singleVideoContainer : styles.remoteGrid}>
              {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                return (
                  <TwilioVideoParticipantView
                    style={videoTracks.size === 1 ? styles.singleRemoteVideo : styles.remoteVideo}
                    key={trackSid}
                    trackIdentifier={trackIdentifier}
                  />
                );
              })}
            </View>
          )}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={captureScreenshot}
            >
              <Text style={{ fontSize: 12 }}>Shot</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={_onEndButtonPress}
            >
              <Text style={{ fontSize: 12 }}>End</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={_onMuteButtonPress}
            >
              <Text style={{ fontSize: 12 }}>
                {isAudioEnabled ? "Mute" : "Unmute"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={_onFlipButtonPress}
            >
              <Text style={{ fontSize: 12 }}>Flip</Text>
            </TouchableOpacity>
            <TwilioVideoLocalView enabled={true} style={styles.localVideo} />
          </View>
        </View>
      )}

      <TwilioVideo
        ref={twilioVideo}
        onRoomDidConnect={_onRoomDidConnect}
        onRoomDidDisconnect={_onRoomDidDisconnect}
        onRoomDidFailToConnect={_onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
      />
    </View>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addScreenshot: (screenShot) => dispatch(ScreenShotActions.addScreenshot(screenShot))
})

export default connect(null, mapDispatchToProps)(TwilioVideoScreen)
