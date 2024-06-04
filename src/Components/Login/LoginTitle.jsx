import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {responsiveFontSize, responsivePadding} from '../../Theme/Responsive';
import Colors from '../../Theme/Colors';

const LoginTitle = () => {
  return (
    <View style={styles.titleHolder}>
      <Text style={styles.text}>Welcome back!</Text>
    </View>
  );
};

export default LoginTitle;

const styles = StyleSheet.create({
  titleHolder: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: responsivePadding(10),
  },
  text: {
    color: Colors.Black,
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
  },
});
