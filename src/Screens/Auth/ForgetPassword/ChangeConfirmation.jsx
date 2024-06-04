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
import {
  responsiveFontSize,
  responsivePadding,
} from "../../../Theme/Responsive";
import LottieView from "lottie-react-native";
import Button from "../../../Components/General/Button";
import { useNavigation } from "@react-navigation/native";
const ChangeConfirmation = () => {
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <>
      <SafeAreaView style={styles.safeView} />
      <StatusBar backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View style={{ backgroundColor: Colors.White, flex: 1 }}>
        <TouchableOpacity
          style={{ marginTop: 50, marginHorizontal: 30 }}
          onPress={() => navigation.replace("Login")}
        >
          <AntDesign
            name="arrowleft"
            size={responsiveFontSize(30)}
            color={Colors.Black}
          />
        </TouchableOpacity>
        <View style={styles.main}>
          <View style={styles.confirmationHolder}>
            <LottieView
              source={require("../../../Assets/Animation/Animation - 1712573495942.json")}
              resizeMode="cover"
              style={{ height: responsivePadding(200), width: "90%" }}
              autoPlay={true}
              loop
            />
            <Text style={styles.heading}>Password Changed!</Text>
            <Text style={styles.subHeading}>
              Your password has been changed successfully.
            </Text>
            <View style={{ marginVertical: 20 }}>
              <Button title={"Login"} handleAction={handleLogin} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ChangeConfirmation;

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: Colors.White,
  },
  main: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmationHolder: {
    width: "80%",
    height: "auto",
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    elevation: responsivePadding(10),
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
    shadowRadius: responsivePadding(3),
    backgroundColor: Colors.White,
  },
  heading: {
    fontSize: responsiveFontSize(18),
    fontWeight: "bold",
    color: Colors.Black,
    textAlign: "center",
    marginVertical: responsivePadding(10),
  },
  subHeading: {
    color: Colors.MediumGrey,
    fontSize: responsiveFontSize(18),
    fontWeight: "600",
    textAlign: "center",
  },
});
