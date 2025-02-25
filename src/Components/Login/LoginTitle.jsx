import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {responsiveFontSize, responsivePadding} from '../../Theme/Responsive';
import Colors from '../../Theme/Colors';
import { moderateScaleVertical, textScale } from '../../utils/ResponsiveSize';
import FontFamily from '../../utils/FontFamily';

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
    marginVertical: moderateScaleVertical(10),
  },
  text: {
    color: Colors.Tertiary,
    fontSize: textScale(18),
   fontFamily:FontFamily.P_500,
  },
});
