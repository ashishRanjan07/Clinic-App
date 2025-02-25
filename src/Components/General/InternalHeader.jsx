import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../Theme/Colors";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import { moderateScale } from "../../utils/ResponsiveSize";

const InternalHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.main2}>
      <TouchableOpacity
        style={styles.headerHolder}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="chevron-back"
          size={moderateScale(30)}
          color={Colors.Grey}
        />
        <Text style={styles.text2}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InternalHeader;

const styles = StyleSheet.create({
  main2: {
    width: "100%",
    paddingTop: responsivePadding(10),
    // backgroundColor: Colors.Secondary,
  },
  headerHolder: {
    margin: responsivePadding(10),
    flexDirection: "row",
    gap: responsivePadding(20),
    alignItems: "center",
  },
  text2: {
    fontSize: responsiveFontSize(20),
    color: Colors.Grey,
    fontWeight: "600",
  },
});
