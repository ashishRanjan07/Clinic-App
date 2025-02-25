import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../Theme/Colors'
import CreateAppointmentHeader from './CreateAppointmentHeader'
import AppointmentForm from './AppointmentForm'

const CreateAppointment = () => {
  return (
    <>
    <SafeAreaView style={{backgroundColor:Colors.Secondary}}/>
    <StatusBar barStyle={"dark-content"} backgroundColor={Colors.Secondary}/>
     <View style={styles.main}>
      <CreateAppointmentHeader/>
      <AppointmentForm/>
    </View>
    </>
   
  )
}

export default CreateAppointment

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:Colors.Secondary
    }
})