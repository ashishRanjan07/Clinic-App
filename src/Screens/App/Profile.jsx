import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../Theme/Colors';
import {responsiveFontSize, responsivePadding} from '../../Theme/Responsive';
import UpperView from '../../Components/Profile/UpperView';
import LowerView from '../../Components/Profile/LowerView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [UserLoginData,setUserLoginData] = useState();
  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        const loginData = await AsyncStorage.getItem('loginData');
        if (loginData !== null) {
          console.log('Login data:', JSON.parse(loginData));
          setUserLoginData(JSON.parse(loginData))
        } else {
          console.log('No login data found.');
        }
      } catch (error) {
        console.error('Error fetching login data:', error);
      }
    };

    fetchLoginData(); 
  }, []); 

  return (
    <>
      <SafeAreaView style={{backgroundColor: Colors.Primary}} />
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.Primary} />
      <View style={styles.main}>
        {/* {console.log(UserLoginData,"Line 40")} */}
        <UpperView userData={UserLoginData}/>
        <LowerView userData={UserLoginData}/>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.White,
  },
});
