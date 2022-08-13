import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  Animated,
  Text,
  TextInput} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";
import Sound from "react-native-sound";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

Sound.setCategory('Playback');


var whoosh = new Sound('tieng.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }

});

// Reduce the volume by half
whoosh.setVolume(1);

whoosh.setNumberOfLoops(-1);


const PlayScreen = ({navigation, route}) => {

  const [start, setStart] = useState(false);
  const [popup, setPopup] = useState(true);
  const [popup1, setPopup1] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(start && minutes > 0 && seconds === 0){
        setMinutes(minutes - 1);
        setSeconds(60);
      }
      if(start &&  seconds > 0){
        setSeconds(seconds - 1);
      }
      if(start && minutes === 0 && seconds === 0){
        setStart(false);
        setPopup1(true);
        whoosh.play();
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    }
  },[start, minutes, seconds]);

  const onClickHomeBtn = () => {
    navigation.goBack();
    whoosh.stop();
  }

  const handleYes = () => {
    setPopup(false);
    setStart(true);
  }

  const handleReplay = () => {
    setPopup1(false);
    setPopup(true);
    whoosh.stop();
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg1}>
      <View style={appStyle.closeView}>
        <TouchableOpacity onPress={onClickHomeBtn}>
          <Image source={images.home} style={appStyle.btnClose}/>
        </TouchableOpacity>
      </View>
      <ImageBackground source={images.time} style={appStyle.timeImage}>
        <Text style={appStyle.timeText}>{`${minutes > 10 ? minutes : `0${minutes}`} : ${seconds > 10 ? seconds : `0${seconds}`}`}</Text>
      </ImageBackground>
      <Image source={images.xuong} style={appStyle.xuongImage} />
      <Image source={images.d1} style={appStyle.dogImage} />
      {popup && (
      <View style={appStyle.popupView}>
        <ImageBackground style={appStyle.popupImage} source={images.SetTime}>
          <View style={appStyle.centerView}>
            <TextInput
              style={appStyle.input}
              onChangeText={e => setMinutes(e)}
              value={minutes.toString()}
              keyboardType="numeric"
            />
            <Text style={appStyle.timeText}>:</Text>
            <TextInput
              style={appStyle.input}
              onChangeText={e => setSeconds(e)}
              value={seconds.toString()}
              keyboardType="numeric"
            />
          </View>
            
          <View style={appStyle.bottomView}>
            <TouchableOpacity onPress={() => setPopup(false)}>
              <Image source={images.back} style={appStyle.okBtn} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleYes()}>
              <Image source={images.yes} style={appStyle.okBtn} />
            </TouchableOpacity>
          </View>
          
        </ImageBackground>
      </View>)}
      {popup1 && (
      <View style={appStyle.popupView1}>
        <ImageBackground style={appStyle.popupImage1} source={images.done}>
          <View style={{position: 'absolute', bottom: '-50%'}}>
            <TouchableOpacity onPress={() => handleReplay()}>
              <Image source={images.replay} style={appStyle.okBtn} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>)}
    </ImageBackground>
  );
};

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  input: {
    height: 50,
    width: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  centerView: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bottomView: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '10%',
  },
  popupImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.51,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupImage1: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  okBtn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  popupView: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(1, 1, 1, 0.7)',
    position: 'absolute',
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
  },
  popupView1: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(1, 1, 1, 0.01)',
    position: 'absolute',
    top: '10%',
    left: '0%',
    right: '0%',
    bottom: '0%',
  },
  closeView: {
    width: '100%',
    height: windowHeight * 0.1,
    alignItems: 'center',
    flexDirection :'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  timeImage: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  timeText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  xuongImage: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
    marginVertical: 30,
  },
  dogImage: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
  },
  btnClose: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
});

export default PlayScreen;