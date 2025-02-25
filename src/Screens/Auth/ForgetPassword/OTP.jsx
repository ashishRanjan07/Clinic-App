import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "../../../Theme/Colors";
import Title from "../../../Components/ForgetPassword/Title";
import Button from "../../../Components/General/Button";
import { useNavigation } from "@react-navigation/native";
import {
  SEND_CODE_ON_EMAIL,
  VERIFY_OTP,
} from "../../../API_Services/API_service";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../../utils/ResponsiveSize";
import AuthHeader from "../../../Components/General/AuthHeader";
const OTP = (props) => {
  const navigation = useNavigation();
  const otpLength = 6;
  const [otpArray, setOtpArray] = useState(Array(otpLength).fill(""));
  const [remainingTime, setRemainingTime] = useState(30);
  const [showResendButton, setShowResendButton] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showErrorText, setShowErrorText] = useState("");

  const refArray = useRef(Array(otpLength).fill(null).map(() => React.createRef()));

  useEffect(() => {
    refArray.current[0]?.current.focus();
  }, []);

  const VerifyOtp = () => {
    const otp = otpArray?.join("") || "";
    if (!otp.trim()) {
      setShowError(true);
      setShowErrorText("Please enter 6 digit code!");
      return;
    }
    if (otp.length < otpLength) {
      setShowError(true);
      setShowErrorText("Enter exact 6 digit code!");
      return;
    }
    verifyOtpOnEmail();
  };

  const verifyOtpOnEmail = async () => {
    const otpDetails = {
      email_address: props.route.params.email,
      otp: otpArray.join(""),
    };
    try {
      const response = await VERIFY_OTP(otpDetails);
      if (response?.success) {
        setOtpArray(Array(otpLength).fill(""));
        navigation.navigate("Create Password", {
          passedEmail: props.route.params.email,
        });
      } else {
        setShowError(true);
        setShowErrorText("Invalid OTP");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const verifyOtpOnEmail = async () => {
  //   // navigation.navigate("Create Password", {
  //   //   passedEmail: props.route.params.email,
  //   // });
  //   const otpDetails = {
  //     email_address: props.route.params.email,
  //     otp: otpSet,
  //   };
  //   console.log(otpDetails);
  //   try {
  //     const response = await VERIFY_OTP(otpDetails);
  //     console.log("Server Response:", response);
  //     if (response?.success) {
  //       setOtpArray('')
  //       navigation.navigate("Create Password", {
  //         passedEmail: props.route.params.email,
  //       });
  //     } else {
  //       setShowError(true);
  //       setShowErrorText("Invalid OTP");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }finally{
  //     setOtpArray(Array(otpLength).fill(""));
  //   }
  // };

  useEffect(() => {
    const otp = otpArray.join("");
    if (otp.length === 6) {
      setShowError(false);
      setShowErrorText("");
    }
  }, [otpArray]);

  const resendOtp = async () => {
    try {
      const response = await SEND_CODE_ON_EMAIL({
        email_address: props.route.params.email,
      });
      console.log("Server Response:", response);
      if (response && response?.data) {
        Alert.alert("Success!", "OTP resend Successfully!!");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setShowError(false);
      setShowErrorText("");
      setOtpArray(Array(otpLength).fill(""));
      refArray.current[0].current.focus();
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
      <AuthHeader title={"OTP Verification"} />
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            gap: moderateScaleVertical(10),
            width: "95%",
            alignSelf: "center",
          }}
        >
          <View style={styles.main}>
            <View style={{ marginTop: moderateScaleVertical(25) }}>
              <Title
                heading={"OTP Verification"}
                subHeading={
                  "Enter the verification code we just sent on your email address.."
                }
              />
            </View>
            <View style={styles.otpContainer}>{renderInputs()}</View>
            {showError && (
              <View style={styles.errorHolder}>
                <Text style={styles.errorText}>{showErrorText}</Text>
              </View>
            )}
            <View style={{ marginTop: moderateScaleVertical(20) }}>
              {showResendButton ? (
                <TouchableOpacity
                  onPress={resendOtp}
                  style={styles.resendButton}
                >
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
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginTop: moderateScaleVertical(10),
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: moderateScaleVertical(20),
  },
  otpBox: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderWidth: moderateScale(1),
    textAlign: "center",
    fontSize: textScale(18),
    color: Colors.MediumGrey,
    borderRadius: moderateScale(5),
  },
  timerText: {
    textAlign: "center",
    color: Colors.LightGrey,
    fontSize: textScale(16),
  },
  resendButton: {
    backgroundColor: Colors.LightGrey,
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    width: "90%",
    alignSelf: "center",
  },
  resendButtonText: {
    color: Colors.iconColor,
    textAlign: "center",
    fontSize: textScale(16),
    fontWeight: "600",
  },
  errorHolder: {
    padding: moderateScale(10),
    marginTop: moderateScaleVertical(10),
  },
  errorText: {
    fontSize: textScale(16),
    fontWeight: "500",
    color: Colors.CrimsonRed,
    textTransform: "capitalize",
  },
});
