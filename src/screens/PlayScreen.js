import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  Animated} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";
import Sound from "react-native-sound";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

Sound.setCategory('Playback');


var whoosh = new Sound('voice.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }

});

// Reduce the volume by half
whoosh.setVolume(1);


const PlayScreen = ({navigation, route}) => {

  const [start, setStart] = useState(false);
  const [deg, setDeg] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeInval = setInterval(() => {
      if(start === true && deg !== 30){
        whoosh.play();
        setDeg(30);
        setIndex(1);
      }
      if(start === true && deg === 30){
        setStart(false);
        setTimeout(() => {
          setDeg(0);
          setIndex(0);
          whoosh.stop();
        }, 2000);
      }
    }, 500);
    
    return () => {
      clearInterval(timeInval);
    }
  },[start, deg]);

  const onClickHomeBtn = () => {
    navigation.goBack();
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg}>
      <View style={appStyle.closeView}>
        <TouchableOpacity onPress={onClickHomeBtn}>
          <Image source={images.back} style={appStyle.btnClose}/>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setStart(true)} style={appStyle.btnPlay}>
        <View style={appStyle.playView}>
          <Animated.Image source={images.gay} style={[appStyle.gayImage,{
            transform: [{
              rotate: `${deg} deg`,
            }]
          }]} />
          <Image source={index === 0 ? images.dog2 : images.dog1} style={appStyle.dogImage} />
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  closeView: {
    position: 'absolute',
    top: '3%',
    left: '3%',
  },
  gayImage: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.5,
    resizeMode: 'contain',
  },
  dogImage: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.7,
    resizeMode: 'contain',
  },
  playView: {
    width: '80%',
    height: windowHeight * 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnClose: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  buaImage: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.7,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPlay: {
    width: '100%',
    height: windowHeight * 0.8,
    bottom: '0%',
    left: '0%',
    right: '0%',
    marginTop: windowHeight * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlayScreen;