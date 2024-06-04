import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../../Theme/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  responsiveFontSize,
  responsivePadding,
} from "../../../Theme/Responsive";
import Title from "../../../Components/ForgetPassword/Title";
import Button from "../../../Components/General/Button";
import { useNavigation } from "@react-navigation/native";
const ForgetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [errorText, SetShowErrorText] = useState("");
  const [showError, SetShowError] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  useEffect(() => {
    if(email.length > 0){
      SetShowErrorText("")
      SetShowError(false);
      if (validateEmail(email)) {
        SetShowError(false);
        SetShowErrorText("");
      }
    }
   
  }, [email]);
  const handleCode = () => {
    if (email.trim() === "") {
      SetShowErrorText("Please enter email!");
      SetShowError(true);
      return;
    }
    if (!validateEmail(email)) {
      SetShowErrorText("Please enter a valid email!");
      SetShowError(true);
      return;
    }
    navigation.push("OTP");
  };
  return (
    <>
      <SafeAreaView style={styles.safeView} />
      <StatusBar backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View style={styles.main}>
        <TouchableOpacity
          style={{ marginTop: 50, marginHorizontal: 30 }}
          onPress={() => navigation.push("Login")}
        >
          <AntDesign
            name="arrowleft"
            size={responsiveFontSize(30)}
            color={Colors.Black}
          />
        </TouchableOpacity>
        <Title
          heading={"Forgot Password?"}
          subHeading={
            "Don't worry! It occurs. Please enter the email address linked with your account."
          }
        />
        <TextInput
          placeholder="Enter Your Email"
          placeholderTextColor={Colors.MediumGrey}
          style={[styles.textInput,{borderColor:showError ? Colors.CrimsonRed:Colors.MediumGrey}]}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {showError && (
          <View style={styles.errorHolder}>
            <Text style={styles.errorText}>{errorText}</Text>
          </View>
        )}
        <View style={styles.buttonHolder}>
          <Button title={"Send Code"} handleAction={handleCode} />
        </View>
      </View>
    </>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: Colors.White,
  },
  main: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  textInput: {
    color: Colors.Black,
    borderWidth: responsivePadding(2),
    width: "90%",
    alignSelf: "center",
    borderRadius: responsivePadding(10),
    borderColor: Colors.MediumGrey,
    height: responsivePadding(50),
    paddingLeft: responsivePadding(20),
    fontSize: responsiveFontSize(18),
  },
  buttonHolder: {
    marginVertical: responsivePadding(20),
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
  },
  errorHolder: {
    padding: responsivePadding(10),
    marginHorizontal: responsivePadding(10),
  },
  errorText: {
    fontSize: responsiveFontSize(16),
    fontWeight: "400",
    color: Colors.CrimsonRed,
  },
});
