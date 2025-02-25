import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
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
import Feather from "react-native-vector-icons/Feather";
import Title from "../../../Components/ForgetPassword/Title";
import Button from "../../../Components/General/Button";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { serverAddress } from "../../../API_Services/API_service";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../../utils/ResponsiveSize";
import AuthHeader from "../../../Components/General/AuthHeader";
const CreateNewPassword = (props) => {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [showErrorText, setShowErrorText] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (newPassword === confirmPassword) {
      setShowErrorText(false);
      setErrorText("");
    }
  }, [newPassword, confirmPassword]);
  const handlePasswordChange = async () => {
    if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      setShowErrorText(true);
      setErrorText("Passwords must not be empty!");
      return;
    }
    if (newPassword.length <= 5) {
      setShowErrorText(true);
      setErrorText("Password must be greater and equal to 6 digit!");
      return;
    }
    if (!(newPassword === confirmPassword)) {
      setShowErrorText(true);
      setErrorText("New password and confirm password must be same!");
      return;
    }
    await resetPassword();
  };

  const resetPassword = async () => {
    // navigation.navigate("Change Confirmation");
    const payload = {
      email_address: props.route.params.passedEmail,
      new_password: newPassword,
    };
    console.log(payload);
    try {
      const response = await axios.post(
        `${serverAddress}login/reset-password`,
        {
          email_address: props.route.params.passedEmail,
          new_password: newPassword,
        }
      );
      console.log("Server Response:", response?.data);
      if (response?.data?.success) {
        navigation.navigate("Change Confirmation");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setNewPassword("");
        setConfirmPassword("");
        setShowErrorText(true);
        setErrorText("New Password must be different from current one!");
      }
    } catch (e) {
      setNewPassword("");
      setConfirmPassword("");
      setShowErrorText(true);
      setErrorText("New Password must be different from current one!");
      console.log(e);
    }
  };

  const handleTextChange = (value) => {
    const emojiRegex =
      /(?:[\u2700-\u27BF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF])/g;
    const filteredText = value.replace(emojiRegex, "");
    setNewPassword(filteredText);
  };

  const handleConfirmTextChange = (value) => {
    const emojiRegex =
      /(?:[\u2700-\u27BF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF])/g;
    const filteredText = value.replace(emojiRegex, "");
    setConfirmPassword(filteredText);
  };
  return (
    <>
      <SafeAreaView style={styles.safeView} />
      <StatusBar backgroundColor={Colors.White} barStyle={"dark-content"} />
      <AuthHeader title={"Create New Password"} />
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            gap: moderateScaleVertical(20),
            width: "95%",
            alignSelf: "center",
          }}
        >
          <View style={{ marginTop: moderateScaleVertical(25) }}>
            <Title
              heading={"Create New Password"}
              subHeading={"Start By creating an Account"}
            />
          </View>
          <View
            style={[
              styles.passwordHolder,
              {
                borderColor: passwordError
                  ? Colors.CrimsonRed
                  : Colors.MediumGrey,
              },
            ]}
          >
            <TextInput
              autoFocus={true}
              placeholder="New Password"
              placeholderTextColor={Colors.MediumGrey}
              style={styles.textInput}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={newPassword}
              onChangeText={(text) => handleTextChange(text)}
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={textScale(20)}
                color={Colors.MediumGrey}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.passwordHolder,
              {
                borderColor: passwordError
                  ? Colors.CrimsonRed
                  : Colors.MediumGrey,
              },
            ]}
          >
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={Colors.MediumGrey}
              style={styles.textInput}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={(text) => handleConfirmTextChange(text)}
            />

            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Feather
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={textScale(20)}
                color={Colors.MediumGrey}
              />
            </TouchableOpacity>
          </View>
          {showErrorText && (
            <View style={styles.errorHolder}>
              <Text style={styles.errorText}>{errorText}</Text>
            </View>
          )}
          <View style={styles.buttonHolder}>
            <Button title={"Sign Up"} handleAction={handlePasswordChange} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default CreateNewPassword;

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
    fontSize: textScale(18),
    width: "90%",
    alignSelf: "center",
    borderRadius: moderateScale(10),
    paddingLeft: moderateScale(5),
  },
  buttonHolder: {
    marginVertical: moderateScaleVertical(20),
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
  },
  errorHolder: {
    width: "90%",
    alignSelf: "center",
  },
  errorText: {
    fontSize: textScale(16),
    fontWeight: "500",
    color: Colors.CrimsonRed,
    textTransform: "capitalize",
  },
  passwordHolder: {
    width: "90%",
    borderWidth: moderateScale(1.5),
    padding: moderateScale(Platform.OS === "android" ? 5 : 15),
    borderRadius: moderateScale(10),
    borderColor: Colors.MediumGrey,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    // justifyContent: "space-between",
  },
});
