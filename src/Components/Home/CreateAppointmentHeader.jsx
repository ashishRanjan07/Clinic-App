import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {responsiveFontSize, responsivePadding} from '../../Theme/Responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../Theme/Colors';
const CreateAppointmentHeader = () => {
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.headerHolder}>
        <Ionicons
          name="arrow-back"
          size={responsiveFontSize(30)}
          color={Colors.Black}
        />
        <Text style={styles.text}>Schedule New Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAppointmentHeader;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    padding: responsivePadding(10),
  },
  headerHolder:{
    margin:responsivePadding(10),
    flexDirection:'row',
    gap:responsivePadding(20),
    alignItems:'center'
  },
  text:{
    fontSize:responsiveFontSize(20),
    color:Colors.Black,
    fontWeight:'600'
  }
});
