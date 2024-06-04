import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../Theme/Colors';
import images from '../../../Theme/Image';
import {responsiveFontSize, responsivePadding} from '../../../Theme/Responsive';
import Button from '../../../Components/General/Button';
import {useNavigation} from '@react-navigation/native';
const Welcome = () => {
  const navigation = useNavigation();
  const LoginScreen = () => {
    navigation.replace('Login');
  };
  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={Colors.White} barStyle={'dark-content'} />
      <View style={styles.contentHolder}>
        <Image
          source={images.welcome}
          resizeMode="contain"
          style={styles.imageStyle}
        />
        <Text style={styles.title}>Keep patients record with you!</Text>
        <Text style={styles.description}>
          Create patient profile and keep all related documents.
        </Text>
        <View style={styles.buttonHolder}>
          <Button title={'Get Started'} handleAction={LoginScreen} />
        </View>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  contentHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: '90%',
    height: responsivePadding(300),
  },
  title: {
    alignSelf: 'center',
    width: '80%',
    marginVertical: responsivePadding(20),
    fontSize: responsiveFontSize(20),
    textAlign: 'center',
    color: Colors.Black,
    fontWeight: '400',
  },
  description: {
    alignSelf: 'center',
    width: '80%',
    marginVertical: responsivePadding(10),
    textAlign: 'center',
    fontSize: responsiveFontSize(14),
    color: Colors.MediumGrey,
    fontWeight: '500',
  },
  buttonHolder: {
    position: 'absolute',
    bottom: responsivePadding(40),
    width: '80%',
    alignItems: 'center',
  },
});
