import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "../bottomNavigation/BottomNavigation";
import AppointmentForm from "../../Components/Home/AppointmentForm";
import DoctorAvailability from "../../Components/Profile/DoctorAvailability";
import EditProfile from "../../Components/Profile/EditProfile";
import AddNewPatient from "../../Components/Patient/AddNewPatient";
import CreateAppointmentForAlreadyRegisteredPatients from "../../Components/Appointment/CreateAppointmentForAlreadyRegisteredPatients";
import CreatePrescription from "../../Components/Home/CreatePrescription";
import AddmedicalDetails from "../../Components/Home/AddmedicalDetails";

const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="AppointmentForm" component={AppointmentForm} />
      <Stack.Screen name="Add Patients" component={AddNewPatient} />
      <Stack.Screen name="Edit Profile" component={EditProfile} />
      <Stack.Screen name="Doctor availability" component={DoctorAvailability} />
      <Stack.Screen
        name="AppointmentFormForAlreadyRegistered"
        component={CreateAppointmentForAlreadyRegisteredPatients}
      />
      <Stack.Screen name="CreatePrescription" component={CreatePrescription} />
      <Stack.Screen name="AddmedicalDetails" component={AddmedicalDetails} />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
