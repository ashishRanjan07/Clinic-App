import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {responsiveFontSize, responsivePadding} from '../../Theme/Responsive';
import Colors from '../../Theme/Colors';

const Title = ({heading, subHeading}) => {
  return (
    <View style={styles.titleHolder}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.subHeading}>{subHeading}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  titleHolder: {
    margin: responsivePadding(15),
    gap: responsivePadding(10),
  },
  heading: {
    fontSize: responsiveFontSize(25),
    fontWeight: '600',
    color: Colors.Black,
  },
  subHeading: {
    fontSize: responsiveFontSize(16),
    color: Colors.MediumGrey,
    fontWeight: '400',
  },
});
