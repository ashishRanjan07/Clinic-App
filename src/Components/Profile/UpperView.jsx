import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import images from '../../Theme/Image';
import {responsiveFontSize, responsivePadding} from '../../Theme/Responsive';
import Colors from '../../Theme/Colors';

const UpperView = ({ userData }) => {

  return (
    <View style={styles.upperProfile}>
      <Image
        source={images.user}
        resizeMode="contain"
        style={styles.imageStyle}
      />
      <Text style={styles.text}>{userData?.clinic_staff?.staff_name}</Text>
    </View>
  );
};

export default UpperView;

const styles = StyleSheet.create({
  upperProfile: {
    width: '100%',
    height: responsivePadding(200),
    backgroundColor: Colors.Primary,
    alignItems: 'center',
  },
  imageStyle: {
    height: responsivePadding(100),
    width: responsivePadding(100),
    position: 'absolute',
    top: responsivePadding(50),
  },
  text: {
    position: 'absolute',
    top: responsivePadding(160),
    color: Colors.White,
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
  },
});
