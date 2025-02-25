import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Welcome from '../../screens/Auth/Welcome/Welcome';
import Login from '../../screens/Auth/Login/Login';
import Splash from '../../screens/Auth/Splash/Splash';
import ForgetPassword from '../../screens/Auth/ForgetPassword/ForgetPassword';
import OTP from '../../screens/Auth/ForgetPassword/OTP';
import CreateNewPassword from '../../screens/Auth/ForgetPassword/CreateNewPassword';
import ChangeConfirmation from '../../screens/Auth/ForgetPassword/ChangeConfirmation';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="Create Password" component={CreateNewPassword} />
        <Stack.Screen
          name="Change Confirmation"
          component={ChangeConfirmation}
        />
        <Stack.Screen name="AppStack" component={AppStack}/>
      </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
