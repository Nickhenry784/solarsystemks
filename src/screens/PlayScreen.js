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


var whoosh = new Sound('nhacnen.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }

});

var chuong = new Sound('tiengchuong.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }

});

chuong.setVolume(1);

var tiengmo = new Sound('tiengmo.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }

});

tiengmo.setVolume(1);

// Reduce the volume by half
whoosh.setVolume(1);


const PlayScreen = ({navigation, route}) => {

  useEffect(() => {
    whoosh.play();
    whoosh.setNumberOfLoops(-1);
  },[]);

  const onClickHomeBtn = () => {
    navigation.goBack();
    whoosh.stop();
  }

  const onClickChuongBtn = () => {
    chuong.stop();
    chuong.play();
  }

  const onClickMoBtn = () => {
    tiengmo.stop();
    tiengmo.play();
  }
  return (
    <ImageBackground style={appStyle.homeView} source={images.bg1}>
      <View style={appStyle.closeView}>
        <TouchableOpacity onPress={onClickHomeBtn}>
          <Image source={images.home} style={appStyle.btnClose}/>
        </TouchableOpacity>
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickChuongBtn()} style={appStyle.btnPlay}>
          <Image source={images.chuong} style={appStyle.buaImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickMoBtn()} style={appStyle.btnPlay}>
          <Image source={images.mo} style={appStyle.buaImage} />
        </TouchableOpacity>
      </View>
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
  bottomView: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: '0%',
  },
  btnClose: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  buaImage: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
  },
});

export default PlayScreen;