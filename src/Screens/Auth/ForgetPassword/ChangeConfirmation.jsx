import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../../../Theme/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import LottieView from "lottie-react-native";
import Button from "../../../Components/General/Button";
import { useNavigation } from "@react-navigation/native";
import ConfirmationText from "./ConfirmationText";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../../utils/ResponsiveSize";
import AuthHeader from "../../../Components/General/AuthHeader";
import Title from "../../../Components/ForgetPassword/Title";
const ChangeConfirmation = () => {
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <StatusBar backgroundColor={Colors.White} barStyle={"dark-content"} />
      <AuthHeader title={"Account Recovery"} />
      <View style={{ marginTop: moderateScaleVertical(25), flex: 0.15 }}>
        <Title
          heading={"Account Recovery Confirmation"}
          subHeading={"Your password is changed"}
        />
      </View>

      <View style={{ flex: 0.85, alignItems: "center" }}>
        <View style={styles.confirmationHolder}>
          <LottieView
            source={require("../../../Assets/Animation/Animation - 1712573495942.json")}
            resizeMode="cover"
            style={{ height: moderateScale(200), width: "90%" }}
            autoPlay={true}
            loop
          />
          <Text style={styles.heading}>Password Changed!</Text>
          <Text style={styles.subHeading}>
            Your password has been changed successfully.
          </Text>
          <View style={{ marginVertical: moderateScaleVertical(20) }}>
            <Button title={"Login"} handleAction={handleLogin} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangeConfirmation;

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  main: {
    // flex: 0.7,
    // backgroundColor: Colors.White,
    // justifyContent: "center",
    // alignItems: "center",
  },
  confirmationHolder: {
    width: "80%",
    height: "auto",
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    // shadowColor: "#000",
    // shadowOpacity: 0.2,
    // shadowOffset: {
    //   width: 0,
    //   height: moderateScale(2),
    // },
    // shadowRadius: moderateScale(3),
    // backgroundColor: Colors.White,
  },
  heading: {
    fontSize: textScale(22),
    fontWeight: "600",
    color: Colors.Black,
    textAlign: "center",
    marginVertical: moderateScaleVertical(10),
  },
  subHeading: {
    color: Colors.MediumGrey,
    fontSize: moderateScale(18),
    fontWeight: "400",
    textAlign: "center",
  },
});
