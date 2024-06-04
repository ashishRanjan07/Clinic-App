import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import Colors from '../../Theme/Colors';
import { responsiveFontSize, responsivePadding } from '../../Theme/Responsive';

const LotifileAlert = ({ visible, onClose, onYes }) => {
return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <LottieView
            source={require('../../Assets/Animation/Animation - 1713844963044.json')}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.title}>Patient created successfully</Text>
          <Text style={styles.title}>Add Appointment</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onYes}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{backgroundColor:"#ffffff",borderWidth:1,borderColor:Colors.MediumGrey}]} onPress={onClose}>
              <Text style={[styles.buttonText,{color:Colors.Black}]}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LotifileAlert


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