import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "../../Theme/Colors";
import Feather from "react-native-vector-icons/Feather";
import Button from "../General/Button";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { validateLogin } from "../../API_Services/Auth_API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Service from "../../Service/Service";
import { useDispatch } from "react-redux";
import { login, saveData } from "../../redux/action/Action";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import { showErrorMessage } from "../../Constants/HelperFunction";
const LoginForm = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailValidationText, setEmailValidationText] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordValidationText, setPasswordValidationText] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    emailInputRef.current?.focus();
  }, [isFocused]);

  const dispatch = useDispatch();

  // Email Validation Function
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  useEffect(() => {
    if (validateEmail(email)) {
      setEmailError(false);
      setEmailValidationText("");
    }

    if (password.length > 0) {
      setPasswordError(false);
      setPasswordValidationText("");
    }

    if (email.length > 0) {
      if (!validateEmail(email)) {
        setEmailError(true);
        setEmailValidationText("Please enter a valid email!");
        return;
      }
      if ((email.length = 0)) {
        setEmailError(false);
        setEmailValidationText("");
      }
    }
  }, [email, password]);

  const handleLoginPress = async () => {
    if (email.trim() === "" && password.trim() === "") {
      setEmailError(true);
      setPasswordError(true);
      setEmailValidationText("Please enter  email!");
      setPasswordValidationText("Please enter password!");
      return;
    }
    if (email.trim() === "") {
      setEmailError(true);
      setEmailValidationText("Please enter registered email!");
      return;
    }
    if (password.trim() === "") {
      setPasswordError(true);
      setPasswordValidationText("Please enter password!");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError(true);
      setEmailValidationText("Please enter a valid email!");
      return;
    }
    setLoading(true);
    const loginDetails = {
      email_address: email,
      password: password,
    };
    console.log(loginDetails);

    try {
      const response = await validateLogin(loginDetails);
      console.log("Server Response:", response);
      if (response?.success) {
        try {
          await AsyncStorage.setItem("isLoggedIn", "Yes");
          const jsonValue = JSON.stringify(response);
          await AsyncStorage.setItem("loginData", jsonValue);
          dispatch(login("Yes"));
          dispatch(saveData("Yes"));
          setLoading(false);
          Service.LoginDetails = await response["clinic_staff"];
          navigation.navigate("AppStack");
        } catch (error) {
          console.error("Error saving login data:", error);
        }
      } else {
        emailInputRef.current?.focus();
        showErrorMessage("Invalid Credentials!!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };
  const handleEmojiForEmail = (value) => {
    const emojiRegex =
      /(?:[\u2700-\u27BF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF])/g;
    const filteredText = value.replace(emojiRegex, "");
    setEmail(filteredText);
  };

  const handleTextChange = (value) => {
    const emojiRegex =
      /(?:[\u2700-\u27BF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF])/g;
    const filteredText = value.replace(emojiRegex, "");
    setPassword(filteredText);
  };
  return (
    <View style={styles.loginFormHolder}>
      <View>
        <TextInput
          autoFocus={true}
          ref={emailInputRef}
          placeholder="Enter Email"
          autoCapitalize="none"
          placeholderTextColor={Colors.MediumGrey}
          keyboardType={"email-address"}
          style={[
            styles.textInput,
            {
              borderColor: emailError ? Colors.CrimsonRed : Colors?.MediumGrey,
            },
          ]}
          onChangeText={(text) => handleEmojiForEmail(text)}
          value={email}
        />
      </View>
      {emailError && (
        <View style={styles.errorHolder}>
          <Text style={styles.errorText}>{emailValidationText}</Text>
        </View>
      )}
      <View
        style={[
          styles.passwordHolder,
          {
            borderColor: passwordError ? Colors.CrimsonRed : Colors.MediumGrey,
          },
        ]}
      >
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor={Colors.MediumGrey}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.passwordInput}
          secureTextEntry={!showPassword}
          value={password}
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
      {passwordError && (
        <View style={styles.errorHolder}>
          <Text style={styles.errorText}>{passwordValidationText}</Text>
        </View>
      )}
      {/* Forget Password Sections */}
      <TouchableOpacity
        style={styles.forgetPasswordHolder}
        onPress={() => navigation.push("ForgetPassword")}
      >
        <Text style={styles.fpText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={moderateScale(40)} color={Colors.Primary} />
        </View>
      ) : (
        <Button title={"Login"} handleAction={handleLoginPress} />
      )}
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  loginFormHolder: {
    marginVertical: moderateScaleVertical(10),
    width: "95%",
    alignSelf: "center",
    padding: moderateScale(10),
    gap: moderateScale(20),
  },
  textInput: {
    width: "100%",
    alignItems: "center",
    fontSize: textScale(16),
    fontFamily: FontFamily.P_400,
    color: Colors.Black,
    borderWidth: moderateScale(1.5),
    height: moderateScale(55),
    borderRadius: moderateScale(10),
    paddingLeft: moderateScale(10),
    borderColor: Colors.MediumGrey,
  },
  passwordHolder: {
    borderWidth: moderateScale(1.5),
    borderRadius: moderateScale(10),
    borderColor: Colors.MediumGrey,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
  },
  passwordInput: {
    width: "90%",
    fontSize: textScale(16),
    fontFamily: FontFamily.P_400,
    color: Colors.Black,
    height: moderateScale(55),
  },
  forgetPasswordHolder: {
    marginTop: moderateScaleVertical(5),
    alignSelf: "flex-end",
  },
  fpText: {
    fontSize: textScale(15),
    fontFamily: FontFamily.P_500,
    color: Colors.Tertiary,
  },
  errorHolder: {
    marginTop: moderateScaleVertical(-15),
    paddingLeft: moderateScale(10),
  },
  errorText: {
    fontSize: textScale(16),
    fontWeight: "500",
    // fontFamily: FontFamily.P_500,
    color: Colors.CrimsonRed,
    textTransform: "capitalize",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0)",
    alignItems: "center",
  },
  loading: {
    backgroundColor: "white",
    padding: moderateScale(20),
    borderRadius: moderateScale(10),
    alignItems: "center",
    borderColor: Colors.Primary,
    borderWidth: moderateScale(1),
    elevation: moderateScale(5),
    position: "absolute",
    marginVertical: moderateScaleVertical(50),
  },
  loadingText: {
    marginTop: moderateScaleVertical(10),
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
