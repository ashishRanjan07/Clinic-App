import { View, Text, Modal, Touchable, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../Theme/Colors';
import { responsiveFontSize, responsivePadding } from '../../Theme/Responsive';

export default function Alert({ visible}) {
  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Appointment Booked</Text>
          <Text style={styles.title}>Payment Status</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Paid</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{backgroundColor:"#ffffff",borderWidth:1,borderColor:Colors.MediumGrey}]}>
              <Text style={[styles.buttonText,{color:Colors.Black}]}>Not Paid</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      width:'90%'
    },
    animation: {
      width: 150,
      height: 150,
    },
    title: {
      fontSize: responsiveFontSize(18),
      color:Colors.Black,
      fontWeight: '600',
      marginTop: responsivePadding(10),
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: responsivePadding(20),
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginHorizontal: 10,
      borderRadius: 5,
      backgroundColor: '#F7A81B',
      width:'40%',
      alignItems:'center'
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });