import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../../Theme/Colors";
import { responsivePadding } from "../../../Theme/Responsive";
import HeaderImage from "../../../Components/Login/HeaderImage";
import LoginTitle from "../../../Components/Login/LoginTitle";
import LoginForm from "../../../Components/Login/LoginForm";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={styles.safeView} />
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.White} />
      <View style={styles.main}>
        <ScrollView style={styles.scrollArea}>
          <View style={{ marginVertical: responsivePadding(50) }}>
            <HeaderImage />
          </View>
          <LoginTitle />
          <LoginForm />
        </ScrollView>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  safeView: {
    backgroundColor: Colors.White,
  },
});
