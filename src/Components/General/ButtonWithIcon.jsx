import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import Colors from "../../Theme/Colors";

const ButtonWithIcon = ({
  title,
  Icon,
  iconName,
  backgroundColor,
  borderColor,
  textColor,
  iconColor,
  handleAction
}) => {
  return (
    <TouchableOpacity onPress={handleAction} style={[styles.buttonHolder,{backgroundColor:backgroundColor,borderColor:borderColor}]}>
      <Icon name={iconName} color={iconColor} size={responsiveFontSize(20)}/>
      <Text style={[styles.text,{color:textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonWithIcon;

const styles = StyleSheet.create({
  buttonHolder: {
    width: "100%",
    padding: responsivePadding(10),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: responsivePadding(10),
    borderRadius: responsivePadding(10),
    borderWidth:1,
    
  },
  text:{
    fontSize:responsivePadding(14),
    fontWeight:'500'
  }
});
