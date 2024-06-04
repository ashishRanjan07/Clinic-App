import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import Colors from "../../Theme/Colors";
import Feather from "react-native-vector-icons/Feather";
import Button from "../General/Button";
import images from "../../Theme/Image";
import { useNavigation } from "@react-navigation/native";
import { validateLogin } from "../../API_Services/Auth_API";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginForm = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailValidationText, setEmailValidationText] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordValidationText, setPasswordValidationText] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginFaledText, setLoginFailedText] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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
  }, [email, password]);
  // Handle login Button
  const handleLoginPress = async () => {
    if (email.trim() === "" && password.trim() === "") {
      setEmailError(true);
      setPasswordError(true);
      setEmailValidationText("Please enter registered email!");
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
    const loginDetails = {
      user_name: email,
      password: password,
    };
    setShowAlert(true);
    try {
      const response = await validateLogin(loginDetails);
      if (response?.success) {
        try {
          await AsyncStorage.setItem("loginData", JSON.stringify(response));
          console.log("Login data saved successfully.");
        } catch (error) {
          console.error("Error saving login data:", error);
        }
        navigation.replace("Bottom Navigation");
      } else {
        // console.log(response, "Line 83");
        setLoginFailed(true);
        setLoginFailedText(response?.errorMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowAlert(false);
      setEmail("");
      setPassword("");
    }
  };
  return (
    <View style={styles.loginFormHolder}>
      <View>
        <TextInput
          placeholder="Enter Email"
          placeholderTextColor={Colors.MediumGrey}
          style={[
            styles.textInput,
            {
              borderColor: emailError ? Colors.CrimsonRed : Colors?.MediumGrey,
            },
          ]}
          onChangeText={(text) => setEmail(text)}
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
          style={styles.passwordInput}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={responsiveFontSize(20)}
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
        style={styles.forgetPassworedHolder}
        onPress={() => navigation.push("ForgetPassword")}
      >
        <Text style={styles.fpText}>Forget Password ?</Text>
        <View style={{ borderWidth: 0.5, borderColor: Colors.Tertiary }} />
      </TouchableOpacity>
      {/* Login Button */}
      <Button title={"Login"} handleAction={handleLoginPress} />
      {loginFailed && (
        <View style={styles.errorHolder}>
          <Text style={styles.errorText}>{loginFaledText}</Text>
        </View>
      )}
      {showAlert && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={Colors.Black} />
            <Text style={styles.loadingText}>Logging in...</Text>
          </View>
        </View>
      )}
      {/* Lower View */}
      {/* <View style={styles.lowerView}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.line} />
      </View> */}
      {/* Social Login */}
      {/* <View style={styles.socialLoginView}>
        <View style={styles.itemHolder}>
          <Image
            source={images.google}
            resizeMode="cover"
            style={styles.image}
          />
          <Text style={styles.signingText}>Sign in with Google</Text>
        </View>
        <View style={styles.itemHolder}>
          <Image
            source={images.facebook}
            resizeMode="cover"
            style={styles.image}
          />
          <Text style={styles.signingText}>Sign in with Facebook</Text>
        </View>
      </View> */}
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  loginFormHolder: {
    marginVertical: responsivePadding(10),
    width: "95%",
    alignSelf: "center",
    padding: responsivePadding(10),
    gap: responsivePadding(20),
  },
  textInput: {
    width: "100%",
    fontSize: responsiveFontSize(18),
    fontWeight: "600",
    color: Colors.Black,
    borderWidth: responsivePadding(1.5),
    padding: responsivePadding(15),
    borderRadius: responsivePadding(10),
    paddingLeft: responsivePadding(10),
    borderColor: Colors.MediumGrey,
  },
  passwordHolder: {
    borderWidth: responsivePadding(1.5),
    padding: responsivePadding(Platform.OS === "android" ? 5 : 15),
    borderRadius: responsivePadding(10),
    borderColor: Colors.MediumGrey,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  passwordInput: {
    width: "80%",
    fontSize: responsiveFontSize(18),
    color: Colors.Black,
    fontWeight: "600",
  },
  forgetPassworedHolder: {
    alignSelf: "flex-end",
  },
  fpText: {
    fontSize: responsiveFontSize(18),
    fontWeight: "600",
    color: Colors.Tertiary,
  },
  lowerView: {
    marginVertical: responsivePadding(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    borderWidth: 1,
    borderColor: Colors.MediumGrey,
    width: "45%",
  },
  orText: {
    fontSize: responsiveFontSize(18),
    color: Colors.Black,
  },
  socialLoginView: {
    marginBottom: responsivePadding(20),
    gap: responsivePadding(10),
    alignSelf: "center",
  },
  itemHolder: {
    borderWidth: responsivePadding(2),
    padding: responsivePadding(10),
    width: "80%",
    borderRadius: responsivePadding(10),
    elevation: responsivePadding(5),
    backgroundColor: Colors.White,
    borderColor: Colors.MediumGrey,
    flexDirection: "row",
    alignItems: "center",
  },
  signingText: {
    fontSize: responsiveFontSize(18),
    textAlign: "center",
    width: "100%",
    color: Colors.Black,
    fontWeight: "400",
  },
  image: {
    width: responsivePadding(25),
    height: responsivePadding(25),
  },
  errorHolder: {
    marginTop: responsivePadding(-15),
    paddingLeft: responsivePadding(10),
  },
  errorText: {
    fontSize: responsiveFontSize(16),
    fontWeight: "400",
    color: Colors.CrimsonRed,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0)",
    alignItems: "center",
  },
  loading: {
    backgroundColor: "white",
    padding: responsivePadding(20),
    borderRadius: responsivePadding(10),
    alignItems: "center",
    borderColor: Colors.Primary,
    borderWidth: responsivePadding(1),
    elevation: responsivePadding(5),
    position: "absolute",
    marginVertical: responsivePadding(50),
  },
  loadingText: {
    marginTop: responsivePadding(10),
    fontWeight: "bold",
    color:Colors.Primary
  },
});
