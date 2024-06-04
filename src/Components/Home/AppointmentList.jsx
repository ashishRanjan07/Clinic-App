import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import React, { useState } from 'react';
import {responsiveFontSize, responsivePadding} from '../../Theme/Responsive';
import Colors from '../../Theme/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import NoAppointmentList from './NoAppointmentList';
import AppointmentCard from './AppointmentCard';

const AppointmentList = () => {
  const navigation = useNavigation();
  const [showModal,setShowModal] = useState(false)

  return (
    <View style={styles.main}>
      {/* <NoAppointmentList/> */}
      <AppointmentCard/>
      <TouchableOpacity
        style={styles.addButton}
        onPress={()=> setShowModal(!showModal)}
        >
        <Entypo
          name="plus"
          size={responsiveFontSize(30)}
          color={Colors.White}
        />
      </TouchableOpacity>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setShowModal(false);
                navigation.push('Add Patients');
              }}
            >
              <Text style={styles.optionText}>Add New Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setShowModal(false);
                navigation.push('Add Appointment By Patients Search');
              }}
            >
              <Text style={styles.optionText}>Search patients</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setShowModal(false);
                navigation.push('AppointmentForm');
              }}
            >
              <Text style={styles.optionText}>Ashish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.optionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AppointmentList;

const styles = StyleSheet.create({
  main: {
    marginTop: responsivePadding(10),
    width: '100%',
    padding: responsivePadding(10),
    flex: 1,
  },
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
  addButton: {
    borderWidth: responsivePadding(2),
    position: 'absolute',
    width: responsivePadding(50),
    height: responsivePadding(50),
    borderRadius: responsivePadding(5),
    borderColor: Colors.Primary,
    backgroundColor: Colors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: responsivePadding(40),
    right: responsivePadding(40),
    elevation: responsivePadding(20),
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
    shadowRadius: responsivePadding(3),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.White,
    padding: responsivePadding(20),
    borderRadius: responsivePadding(10),
    alignItems: 'center',
    width: '80%',
  },
  optionButton: {
    width: '100%',
    paddingVertical: responsivePadding(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.Black,
  },
  optionText: {
    fontSize: responsiveFontSize(18),
    color: Colors.Tertiary,
    textAlign: 'center',
    fontWeight:'500'
  },
});
