import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../../Theme/Colors";
import { useNavigation } from "@react-navigation/native";
const GeneralHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          style={{ width: "20%" }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign
            name="arrowleft"
            size={responsiveFontSize(40)}
            color={Colors.Black}
          />
        </TouchableOpacity>
        <View style={{ width: "80%" }}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

export default GeneralHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: responsivePadding(15),
  },
  text: {
    width: "80%",
    textAlign: "center",
    fontSize: responsiveFontSize(24),
    color: Colors.Black,
    fontWeight: "500",
  },
});
