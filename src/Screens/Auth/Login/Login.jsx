import {
  Image,
  KeyboardAvoidingView,
  Platform,
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
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../../../Components/Login/LoginForm";
import { moderateScaleVertical } from "../../../utils/ResponsiveSize";

const Login = () => {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={styles.safeView} />
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.White} />
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardAvoidingView}
        >
        <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
          <View style={{ marginVertical: moderateScaleVertical(50) }}>
            <HeaderImage />
          </View>
          <LoginTitle />
          <LoginForm />
        </ScrollView>
     </KeyboardAvoidingView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: Colors.White,
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor:Colors.White
  },
});
