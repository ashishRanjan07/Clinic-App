import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from '../stackNavigation/AuthStack';
import AppStack from '../stackNavigation/AppStack';

const Routes = () => {
  const isLoggedInRedux = useSelector(state => state.isLoggedIn);
  console.log(isLoggedInRedux, 'Line 10');
  const isSaveData = useSelector(state => state.saveData);
  console.log(isSaveData, 'Line 12');
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  console.log(isLoggedIn, 'Line 14');
  useEffect(() => {
    const fetchLoggedInData = async () => {
      const response = await AsyncStorage.getItem('isLoggedIn');
      console.log(response, 'Line 19');
      setIsLoggedIn(response);
    };
    fetchLoggedInData();
  }, [isSaveData, isLoggedIn, isLoggedInRedux]);
  return <>{isLoggedIn === null ? <AuthStack /> : <AppStack />}</>;
};

export default Routes;

const styles = StyleSheet.create({});
