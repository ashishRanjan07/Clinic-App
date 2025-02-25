import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TabStack from './TabStack';
import Splash from '../screens/Auth/Splash/Splash';
import Welcome from '../screens/Auth/Welcome/Welcome';
import Login from '../screens/Auth/Login/Login';
import ForgetPassword from '../screens/Auth/ForgetPassword/ForgetPassword';
import OTP from '../screens/Auth/ForgetPassword/OTP';
import CreateNewPassword from '../screens/Auth/ForgetPassword/CreateNewPassword';
import ChangeConfirmation from '../screens/Auth/ForgetPassword/ChangeConfirmation';
import AppointmentForm from '../Components/Home/AppointmentForm';
import AddNewPatient from '../Components/Patient/AddNewPatient';
import EditProfile from '../Components/Profile/EditProfile';
import DoctorAvailability from '../Components/Profile/DoctorAvailability';
import AppointmentFormForAlreadyRegistered from '../Components/Appointment/AppointmentForm';


const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  return (
    <NavigationContainer>
       <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name='Splash' component={Splash}/>
          <Stack.Screen name='Welcome' component={Welcome}/>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='Bottom Navigation' component={TabStack}/>
          <Stack.Screen name='ForgetPassword' component={ForgetPassword}/>
          <Stack.Screen name='OTP' component={OTP}/>
          <Stack.Screen name='Create Password' component={CreateNewPassword} options={{headerShown:false}}/>
          <Stack.Screen name='Change Confirmation' component={ChangeConfirmation} options={{headerShown:false}}/>
          <Stack.Screen name='AppointmentForm' component={AppointmentForm} options={{headerShown:false}}/>
          <Stack.Screen name='Add Patients' component={AddNewPatient} options={{headerShown:false}}/>
          <Stack.Screen name='Edit Profile' component={EditProfile} options={{headerShown:false}}/>
          <Stack.Screen name='Doctor availability' component={DoctorAvailability} options={{headerShown:false}}/>
          <Stack.Screen name='AppointmentFormForAlreadyRegistered' component={AppointmentFormForAlreadyRegistered} options={{headerShown:false}}/>
           

       </Stack.Navigator>
    </NavigationContainer>
  )
}