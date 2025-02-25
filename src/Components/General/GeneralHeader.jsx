import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../../Theme/Colors";
import { useNavigation } from "@react-navigation/native";
import { moderateScale, textScale } from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
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
            size={textScale(35)}
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
    padding: moderateScale(15),
  },
  text: {
    width: "80%",
    textAlign: "center",
    fontSize: textScale(20),
    color: Colors.Black,
   fontFamily:FontFamily.P_500
  },
});
