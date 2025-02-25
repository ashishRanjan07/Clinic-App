import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "../../../Theme/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

import Title from "../../../Components/ForgetPassword/Title";
import Button from "../../../Components/General/Button";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { serverAddress } from "../../../API_Services/API_service";
import axios from "axios";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../../utils/ResponsiveSize";
import FontFamily from "../../../utils/FontFamily";
import AuthHeader from "../../../Components/General/AuthHeader";
const ForgetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [errorText, SetShowErrorText] = useState("");
  const [showError, SetShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  useEffect(() => {
    if (email.length > 0) {
      SetShowErrorText("");
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
      SetShowError(true);
      SetShowErrorText("Please enter a valid email!");
      return;
    }
    sendCodeOnEmail(email);
  };

  const sendCodeOnEmail = async (email) => {
    setLoading(true);
    // navigation.push("OTP", { email: email });
    try {
      const response = await axios.post(
        `${serverAddress}login/forgot-password`,
        {
          email_address: email,
        }
      );
      console.log("Server Response:", response?.data);
      if (response && response?.data) {
        navigation.push("OTP", { email: email });
        setEmail("");
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      SetShowErrorText("Invalid Email");
      SetShowError(true);
    }
  };
  return (
    <>
      <SafeAreaView style={styles.safeView} />
      <StatusBar backgroundColor={Colors.White} barStyle={"dark-content"} />
      <AuthHeader title={"Forget Password"} />
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            gap: moderateScaleVertical(10),
            width: "95%",
            alignSelf: "center",
          }}
        >
          <View style={{ marginTop: moderateScaleVertical(25) }}>
            <Title
              heading={"Forgot Password?"}
              subHeading={
                "Don't worry! It occurs. Please enter the email address linked with your account."
              }
            />
          </View>
          <TextInput
            autoFocus={true}
            placeholder="Enter Register Email"
            placeholderTextColor={Colors.MediumGrey}
            autoCapitalize="none"
            keyboardType={"email-address"}
            style={[
              styles.textInput,
              {
                borderColor: showError ? Colors.CrimsonRed : Colors.MediumGrey,
              },
            ]}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          {showError && (
            <View style={styles.errorHolder}>
              <Text style={styles.errorText}>{errorText}</Text>
            </View>
          )}

          <View style={styles.buttonHolder}>
            {loading ? (
              <ActivityIndicator size={textScale(30)} color={Colors.Primary} />
            ) : (
              <Button title={"Send OTP"} handleAction={handleCode} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    borderWidth: moderateScale(1),
    width: "90%",
    alignSelf: "center",
    borderRadius: moderateScale(10),
    borderColor: Colors.MediumGrey,
    height: moderateScale(50),
    paddingLeft: moderateScale(20),
    fontSize: textScale(18),
  },
  buttonHolder: {
    marginVertical: moderateScaleVertical(20),
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
  },
  errorHolder: {
    padding: moderateScale(10),
    marginHorizontal: moderateScale(10),
  },
  errorText: {
    fontSize: textScale(16),
    fontWeight: "500",
    color: Colors.CrimsonRed,
    textTransform: "capitalize",
  },
  headerText: {
    fontFamily: FontFamily.P_500,
    fontSize: textScale(16),
    color: Colors.Grey,
  },
});
