import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import images from '../../Theme/Image';
import {responsiveFontSize, responsivePadding} from '../../Theme/Responsive';
import Colors from '../../Theme/Colors';

const UpperHeader = ({ userData }) => {
  console.log(userData,"Line 8")
  return (
    <View style={styles.main}>
      <View style={styles.innerView}>
        <View style={styles.textHolder}>
          <Text style={styles.text}>Hi {userData?.clinic_staff?.staff_name}!</Text>
          <Text style={styles.text}>Create Appointments</Text>
        </View>
        <Image source={images.user} style={styles.image} />
      </View>
    </View>
  );
};

export default UpperHeader;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    alignSelf: 'center',
    marginTop: responsivePadding(10),
    padding: responsivePadding(10),
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: responsivePadding(50),
    width: responsivePadding(50),
  },
  textHolder: {
    width: '80%',
    gap: responsivePadding(15),
  },
  text: {
    color: Colors.Tertiary,
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
  },
});
