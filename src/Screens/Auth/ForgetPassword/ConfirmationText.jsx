import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../../Theme/Colors";
import {
  moderateScaleVertical,
  textScale,
} from "../../../utils/ResponsiveSize";

const ConfirmationText = () => {
  return (
    <View style={styles.titleHolder}>
      <Text style={styles.text}>Create Account</Text>
      <Text style={styles.text1}>Start By Creating an Account</Text>
    </View>
  );
};

export default ConfirmationText;

const styles = StyleSheet.create({
  titleHolder: {
    width: "90%",
    alignSelf: "center",
    marginVertical: moderateScaleVertical(10),
  },
  text: {
    color: Colors.Black,
    fontSize: textScale(22),
    fontWeight: "600",
  },
  text1: {
    color: Colors.MediumGrey,
    marginTop: moderateScaleVertical(5),
    fontSize: textScale(15),
    fontWeight: "400",
  },
});
