import {
    Image,
    StyleSheet,
    Text,
    View,
    Linking,
    StatusBar,
  } from 'react-native';
  import React from 'react';
import Colors from '../../Theme/Colors';
import images from '../../Theme/Image';
import Button from '../../Components/General/Button';
import { responsiveFontSize } from '../../Theme/Responsive';
   
  const NoInternet = () => {
    const handleOpenSetting = async () => {
      console.log('Open Settings');
      await Linking.openSettings();
    };
    return (
      <View style={styles.contentHolder}>
        <StatusBar backgroundColor={Colors.White} barStyle={'dark-content'} />
        <Image
          source={images.login}
          resizeMode="contain"
          style={styles.imageStyle}
        />
        <Text style={styles.text}>
          Please check your internet connection again or connect to wifi
        </Text>
        <View style={styles.buttonHolder}>
          <Button title={'Open Setting'} handleAction={handleOpenSetting} />
        </View>
      </View>
    );
  };
   
  export default NoInternet;
   
  const styles = StyleSheet.create({
    contentHolder: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: Colors.White,
      justifyContent: 'center',
    },
    imageStyle: {
      height: responsiveFontSize(350),
      width: responsiveFontSize(350),
    },
    text: {
      width: '85%',
      textAlign: 'center',
      fontFamily: 'NotoSans-Medium',
      fontSize: responsiveFontSize(18),
      color: Colors.Primary,
      letterSpacing:responsiveFontSize(1)
    },
    buttonHolder: {
      marginVertical: responsiveFontSize(20),
      width: '90%',
    },
  });
  