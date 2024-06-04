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
const CreateNewPassword = () => {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [showErrorText, setShowErrorText] = useState(false);

  useEffect(() => {
    if (newPassword === confirmPassword) {
      setShowErrorText(false);
      setErrorText("");
    }
  }, [newPassword, confirmPassword]);
  const handlePasswordChange = () => {
    if (newPassword.trim() === "") {
      setShowErrorText(true);
      setErrorText("New password must not be empty!");
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
    navigation.replace("Change Confirmation");
  };
  return (
    <>
      <SafeAreaView style={styles.safeView} />
      <StatusBar backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View style={{ backgroundColor: Colors.White,flex:1 }}>
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
        <View style={styles.main}>
        <Title
          heading={"Create New Password"}
          subHeading={"Make check of New and Confirm Password will be same"}
        />
        <TextInput
          placeholder="New Password"
          placeholderTextColor={Colors.MediumGrey}
          style={styles.textInput}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={Colors.MediumGrey}
          style={styles.textInput}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        {showErrorText && (
          <View style={styles.errorHolder}>
            <Text style={styles.errorText}>{errorText}</Text>
          </View>
        )}
        <View style={styles.buttonHolder}>
          <Button title={"Sign Up"} handleAction={handlePasswordChange} />
        </View>
      </View>
      </View>
    
    </>
  );
};

export default CreateNewPassword;

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: Colors.White,
  },
  main: {
    // flex: 1,
    backgroundColor: Colors.White,
    gap: responsivePadding(20),
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    color: Colors.Black,
    borderWidth: responsivePadding(2),
    width: "80%",
    alignSelf: "center",
    borderRadius: responsivePadding(10),
    borderColor: Colors.MediumGrey,
    height: responsivePadding(50),
    paddingLeft: responsivePadding(20),
    fontSize: responsiveFontSize(18),
  },
  buttonHolder: {
    marginVertical: responsivePadding(20),
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
  },
  errorHolder: {
    marginHorizontal: responsivePadding(25),
    padding: responsivePadding(10),
    marginTop: responsivePadding(10),
    width: "80%",
  },
  errorText: {
    fontSize: responsiveFontSize(16),
    fontWeight: "400",
    color: Colors.CrimsonRed,
  },
});
