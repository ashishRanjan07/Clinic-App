import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../Theme/Colors";
import Button from "./Button";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";

const CustomBottomModal = ({ rbSheetRef, message, data, selectedValue,incoming }) => {
  console.log(data,"Line 13")
  console.log(incoming,"line 14")
  return (
    <View style={styles.overlay}>
      <View style={[styles.modalContainer, { flex: 0 }]}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => rbSheetRef?.current?.close()}
        >
          <Feather name="x" size={textScale(25)} color={Colors.Black} />
        </TouchableOpacity>
        <Text style={styles.messageText}>{message}</Text>
        {data.map((item, index) => (
          <View key={index}>
            <Button
              title={item?.name ? item?.name : item?.staff_name}
              // handleAction={() => {
              //   selectedValue(item?.name ? item?.name : item?.staff_name);
              //   {
              //     message != "Choose Image Upload Method" &&
              //       rbSheetRef?.current?.close();
              //   }
              // }}
              handleAction={() => {
                if (incoming === "doctorList") {
                  // Pass the entire item when incoming is "doctorList"
                  selectedValue(item);
                } else {
                  // Default behavior for other cases
                  selectedValue(item?.name ? item?.name : item?.staff_name);
                }

                // Close the modal unless the message is "Choose Image Upload Method"
                if (message !== "Choose Image Upload Method") {
                  rbSheetRef?.current?.close();
                }
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CustomBottomModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  modalContainer: {
    backgroundColor: Colors.White,
    padding: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    gap: moderateScaleVertical(10),
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  messageText: {
    fontFamily: "NotoSans-Medium",
    fontSize: textScale(18),
    color: Colors.CrimsonRed,
    textAlign: "center",
  },
  buttonStyle: {},
});
