import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";
import Colors from "../../Theme/Colors";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";

const LotifileAlert = ({ visible, onClose, onYes }) => {
  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <LottieView
            source={require("../../Assets/Animation/Animation - 1713844963044.json")}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.title}>Patient created successfully</Text>
          <Text style={styles.title}>Add Appointment</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onYes}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: "#ffffff",
                  borderWidth: 1,
                  borderColor: Colors.MediumGrey,
                },
              ]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: Colors.Black }]}>
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LotifileAlert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    alignItems: "center",
    width: "90%",
  },
  animation: {
    width: moderateScale(150),
    height: moderateScale(150),
  },
  title: {
    fontSize: textScale(16),
    color: Colors.Black,
    fontWeight: "600",
    marginTop: moderateScaleVertical(10),
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: moderateScaleVertical(20),
  },
  button: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScaleVertical(10),
    marginHorizontal: moderateScaleVertical(10),
    borderRadius: moderateScale(5),
    backgroundColor: Colors.Primary,
    width: "40%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
