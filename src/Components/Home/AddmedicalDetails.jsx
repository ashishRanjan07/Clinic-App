import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {responsiveFontSize, responsivePadding} from '../../Theme/Responsive';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
const AddmedicalDetails = () => {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={{backgroundColor: Colors.Secondary}} />
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.Secondary} />

      <View style={styles.main}>
        {/* HeaderView */}
        <View style={styles.headerHolder}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name="arrowleft"
              size={responsiveFontSize(30)}
              color={Colors.Black}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Medical Details</Text>
        </View>
        {/* Content Holder */}
        <ScrollView style={styles.contentHolder}>
          {/* Symptoms */}
          <View style={styles.symptoms}>
            <TextInput
              placeholder="Symptoms:"
              multiline={true}
              style={styles.inputHolder}
              placeholderTextColor={Colors.MediumGrey}
            />
          </View>
          {/*Diagonsis */}
          <View style={styles.symptoms}>
            <TextInput
              placeholder="Diagnosis:"
              multiline={true}
              style={styles.inputHolder}
              placeholderTextColor={Colors.MediumGrey}
            />
          </View>
          {/* Button  */}
          <View style={styles.buttonHolder}>
            {/* Add Prescription */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Create Prescription')}
              style={styles.buttonContentHolder}>
              <Ionicons
                name="add"
                size={responsiveFontSize(30)}
                color={Colors.White}
              />
              <Text style={styles.buttontext}>Prescriptions</Text>
            </TouchableOpacity>
            {/* Cancle  */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.buttonContentHolder}>
              <Entypo
                name="minus"
                size={responsiveFontSize(30)}
                color={Colors.White}
              />
              <Text style={styles.buttontext}>Cancle</Text>
            </TouchableOpacity>
          </View>
          
        </ScrollView>
        {/* Lower Button */}
        <View
            style={styles.buttonHolder2}>
            <TouchableOpacity style={styles.button2}>
              <Text style={styles.buttonText2}>Save </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2}>
              <Text style={styles.buttonText2}>Cancle </Text>
            </TouchableOpacity>
          </View>
      </View>
    </>
  );
};

export default AddmedicalDetails;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
  headerHolder: {
    marginVertical: responsivePadding(10),
    padding: responsivePadding(10),
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    gap: responsivePadding(30),
    alignItems: 'center',
  },
  HeaderText: {
    fontSize: responsiveFontSize(20),
    color: Colors.Tertiary,
    fontWeight: '600',
  },
  contentHolder: {
    borderWidth: 2,
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    borderColor: Colors.White,
    backgroundColor: Colors.White,
  },
  symptoms: {
    borderWidth: 2,
    borderColor: Colors.Secondary,
    marginVertical: 5,
    backgroundColor: Colors.Secondary,
    borderRadius: 10,
  },
  inputHolder: {
    fontSize: responsiveFontSize(18),
    color: Colors.Black,
    paddingLeft: responsivePadding(10),
    height: responsivePadding(150),
  },
  buttonHolder: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttontext: {
    color: Colors.White,
    fontWeight: '600',
    fontSize: responsiveFontSize(18),
  },
  buttonContentHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.Primary,
    gap: 5,
    padding: 10,
    width: '45%',
    borderRadius: 10,
  },
  button2: {
    width: '45%',
    alignItems: 'center',
    borderRadius: responsivePadding(5),
    borderWidth: 1,
    padding: responsivePadding(10),
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
  buttonText2: {
    color: Colors.White,
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
  },
  buttonHolder2:{
    
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    alignSelf: 'center',
    marginBottom: responsivePadding(20),
  }
});
