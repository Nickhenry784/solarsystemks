import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

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

const ItemScreen = ({navigation, route}) => {

  const [index, setIndex] = useState(0);

  const onClickNextBtn = () => {
    if(index !== 9){
      setIndex(index + 1);
    }else{
      navigation.goBack();
    }
  }

  const onClickBackBtn = () => {
    if(index !== 0){
      setIndex(index - 1);
    }else{
      navigation.goBack();
    }
  }

  return (
    <ImageBackground style={appStyle.homeView} source={dataBg[index].bg}>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickBackBtn()}>
          <Image source={images.back} style={appStyle.btn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickNextBtn()}>
          <Image source={images.next} style={appStyle.btn} />
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
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  closeView: {
    position: 'absolute',
    top: '3%',
    left: '3%',
  },
  btnClose: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  btn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default ItemScreen;