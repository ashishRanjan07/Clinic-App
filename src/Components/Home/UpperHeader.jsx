import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import images from "../../Theme/Image";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import Colors from "../../Theme/Colors";
import { moderateScale, textScale } from "../../utils/ResponsiveSize";

const UpperHeader = ({ userData, title }) => {
  return (
    <View style={styles.main}>
      <View style={styles.innerView}>
        <View style={styles.textHolder}>
          <Text style={styles.text}>
            Hi {userData?.clinic_staff?.staff_name}!
          </Text>
          {/* <Text style={styles.text}>{title || ""}</Text> */}
        </View>
        <Image source={images.user} style={styles.image} />
      </View>
    </View>
  );
};

export default UpperHeader;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    alignSelf: "center",
    // marginTop: responsivePadding(10),
    padding: moderateScale(10),
  },
  innerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderWidth: 1,
    borderRadius: moderateScale(50),
    borderColor: Colors.MediumGrey,
  },
  textHolder: {
    width: "80%",
    gap: moderateScale(10),
  },
  text: {
    color: Colors.Tertiary,
    fontSize: textScale(14),
    fontWeight: "600",
  },
});
