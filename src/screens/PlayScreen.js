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

const dataBg = [
  {id: 1, bg: images.img1},
  {id: 2, bg: images.img2},
  {id: 3, bg: images.img3},
  {id: 4, bg: images.img4},
  {id: 5, bg: images.img5},
  {id: 6, bg: images.img6},
  {id: 7, bg: images.img7},
  {id: 8, bg: images.img8},
  {id: 9, bg: images.img9},
  {id: 10, bg: images.img10},
]

var whoosh = new Sound('tieng.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

// Reduce the volume by half
whoosh.setVolume(1);

// Position the sound to the full right in a stereo field
whoosh.setPan(1);

// Loop indefinitely until stop() is called
whoosh.setNumberOfLoops(-1);

const PlayScreen = ({navigation, route}) => {

  const [start, setStart] = useState(false);

  useEffect(() => {
    const timeInval = setInterval(() => {
      if(start === true){
        whoosh.play();
      }else{
        whoosh.stop();
      }
    }, 100);
    
    return () => {
      clearInterval(timeInval);
    }
  },[start]);

  const onClickHomeBtn = () => {
    navigation.goBack();
    whoosh.release();
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg1}>
      <View style={appStyle.closeView}>
        <TouchableOpacity onPress={onClickHomeBtn}>
          <Image source={images.home} style={appStyle.btnClose}/>
        </TouchableOpacity>
      </View>
      <ImageBackground source={images.maycat} style={[appStyle.buaImage]}>
        <TouchableOpacity onPress={() => setStart(!start)}>
          <Image source={images.buttonon} style={appStyle.btnClose} />
        </TouchableOpacity>
      </ImageBackground>
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
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.07,
    backgroundColor: 'white',
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
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default PlayScreen;