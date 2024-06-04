import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "../../../Theme/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  responsiveFontSize,
  responsivePadding,
} from "../../../Theme/Responsive";
import Title from "../../../Components/ForgetPassword/Title";
import Button from "../../../Components/General/Button";
import { useNavigation } from "@react-navigation/native";
const OTP = () => {
  const navigation = useNavigation();
  const otpLength = 4;
  const [otpArray, setOtpArray] = useState(Array(otpLength).fill(""));
  const [remainingTime, setRemainingTime] = useState(30);
  const [showResendButton, setShowResendButton] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showErrorText, setShowErrorText] = useState("");

  const VerifyOtp = () => {
    const otp = otpArray.join("");
    if (otp.trim() === "") {
      setShowError(true);
      setShowErrorText("Please enter 4 digit code !");
      return;
    }
    if (otp.length < 4) {
      setShowError(true);
      setShowErrorText("Enter exact 4 digit code!");
      return;
    }
    navigation.navigate("Create Password");
  };

  useEffect(() => {
    const otp = otpArray.join("");
    if (otp.length === 4) {
      setShowError(false);
      setShowErrorText("");
    }
  }, [otpArray]);

  const onSubmit = async () => {
    const otp = otpArray.join("");
    if (
      otp.length === otpLength &&
      otpArray.every((element) => element.trim() !== "")
    ) {
      try {
        const formData = {
          otp: otp,
          email_address: email,
        };
        const response = await verifyOtp(formData);
        console.log(response, "Line 46");
        if (response.success) {
          Alert.alert("Success", response.message);
          navigation.replace("NewPassword", { email });
          setOtpArray(Array(otpLength).fill(""));
        } else {
          Alert.alert(
            "Error",
            response.message || "Failed to verify OTP. Please try again."
          );
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong. Please try again later.");
      }
    } else {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
    }
  };
  const resendOtp = async () => {
    try {
      const response = await fetch(`${serverAddress}/member/forgot/password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_address: email }),
      });

      const responseData = await response.json();
      if (response.ok && responseData.success) {
        Alert.alert("Success", "OTP resend successfully");
        setRemainingTime(30);
        setShowResendButton(false);
      } else {
        Alert.alert("Error", responseData.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong, please try again.");
    }
  };

  useEffect(() => {
    if (remainingTime <= 0) {
      setShowResendButton(true);
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const refArray = useRef(otpArray.map(() => React.createRef()));

  const handleOtpChange = (index, value) => {
    const otpCopy = [...otpArray];
    otpCopy[index] = value;
    setOtpArray(otpCopy);

    if (value && index < otpLength - 1) {
      refArray.current[index + 1].current.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && !otpArray[index] && index > 0) {
      refArray.current[index - 1].current.focus();
    }
  };

  const renderInputs = () => {
    return otpArray.map((item, index) => (
      <TextInput
        key={index}
        style={[
          styles.otpBox,
          { borderColor: showError ? Colors.CrimsonRed : Colors.MediumGrey },
        ]}
        keyboardType="number-pad"
        maxLength={1}
        onChangeText={(text) => handleOtpChange(index, text)}
        onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
        ref={refArray.current[index]}
        value={otpArray[index]}
      />
    ));
  };

  return (
    <>
      <SafeAreaView style={styles.safeView} />
      <StatusBar backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View style={styles.main}>
        <TouchableOpacity
          style={{
            marginTop: responsivePadding(50),
            marginHorizontal: responsivePadding(30),
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign
            name="arrowleft"
            size={responsiveFontSize(30)}
            color={Colors.Black}
          />
        </TouchableOpacity>
        <Title
          heading={"OTP Verification"}
          subHeading={
            "Enter the verification code we just sent on your email address.."
          }
        />
        <View style={styles.otpContainer}>{renderInputs()}</View>
        {showError && (
          <View style={styles.errorHolder}>
            <Text style={styles.errorText}>{showErrorText}</Text>
          </View>
        )}
        <View style={{ marginTop: responsivePadding(20) }}>
          {showResendButton ? (
            <TouchableOpacity onPress={resendOtp} style={styles.resendButton}>
              <Text style={styles.resendButtonText}>Resend OTP</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.timerText}>
              Resend OTP in {remainingTime} sec
            </Text>
          )}
        </View>
        <View style={styles.buttonHolder}>
          <Button title={"Verify"} handleAction={VerifyOtp} />
        </View>
      </View>
    </>
  );
};

export default OTP;

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: Colors.White,
  },
  main: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  buttonHolder: {
    marginTop: responsivePadding(10),
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: responsivePadding(20),
  },
  otpBox: {
    width: responsivePadding(40),
    height: responsivePadding(40),
    borderWidth: responsivePadding(1),
    textAlign: "center",
    fontSize: responsiveFontSize(18),
    color: Colors.Black,
    borderRadius: responsivePadding(5),
  },
  timerText: {
    textAlign: "center",
    color: Colors.LightGrey,
    fontSize: responsiveFontSize(16),
  },
  resendButton: {
    backgroundColor: Colors.LightGrey,
    padding: responsivePadding(15),
    borderRadius: responsivePadding(10),
    width: "90%",
    alignSelf: "center",
  },
  resendButtonText: {
    color: Colors.iconColor,
    textAlign: "center",
    fontSize: responsiveFontSize(16),
    fontWeight: "600",
  },
  errorHolder: {
    marginHorizontal: responsivePadding(25),
    padding: responsivePadding(10),
    marginTop: responsivePadding(10),
  },
  errorText: {
    fontSize: responsiveFontSize(16),
    fontWeight: "400",
    color: Colors.CrimsonRed,
  },
});
