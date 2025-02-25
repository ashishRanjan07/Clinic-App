import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../utils/ResponsiveSize";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../Theme/Colors";
import FontFamily from "../../utils/FontFamily";

const AuthHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        padding: moderateScale(10),
        flexDirection: "row",
        alignItems: "center",
        gap: moderateScale(10),
        backgroundColor:Colors.White
      }}
      onPress={() => navigation.goBack()}
    >
      <Ionicons
        name="chevron-back"
        size={moderateScale(30)}
        color={Colors.Grey}
      />
      <Text style={styles.headerText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FontFamily.P_500,
    fontSize: textScale(16),
    color: Colors.Grey,
  },
});
