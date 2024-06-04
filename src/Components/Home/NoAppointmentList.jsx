import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '../../Theme/Image'
import { responsiveFontSize, responsivePadding } from '../../Theme/Responsive'
import Colors from '../../Theme/Colors'

const NoAppointmentList = () => {
  return (
    <View style={styles.noAppointment}>
    <Image
      source={images.list}
      resizeMode="contain"
      style={styles.imageStyle}
    />
    <Text style={styles.text}>No appointment yet!!</Text>
  </View>
  )
}

export default NoAppointmentList

const styles = StyleSheet.create({
    noAppointment: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        // height:'100%'
      },
      imageStyle: {
        height: responsivePadding(200),
        width: responsivePadding(200),
      },
      text: {
        fontSize: responsiveFontSize(18),
        color: Colors.MediumGrey,
        fontWeight: '600',
      },
})