import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../../Theme/Colors";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import InternalHeader from "../General/InternalHeader";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
const AddmedicalDetails = () => {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.Secondary }} />
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.Secondary} />

      <View style={styles.main}>
        {/* HeaderView */}
        <InternalHeader title={"Medical Details"} />
        {/* Content Holder */}
        <ScrollView
          style={styles.contentHolder}
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          {/* Symptoms */}
          <View style={styles.symptoms}>
            <TextInput
              placeholder="Symptoms:"
              multiline={true}
              style={styles.inputHolder}
              placeholderTextColor={Colors.MediumGrey}
            />
          </View>
          {/*Diagonsis */}
          <View style={styles.symptoms}>
            <TextInput
              placeholder="Diagnosis:"
              multiline={true}
              style={styles.inputHolder}
              placeholderTextColor={Colors.MediumGrey}
            />
          </View>
          {/* Button  */}
          <View style={styles.buttonHolder}>
            {/* Add Prescription */}
            <TouchableOpacity
              onPress={() => navigation.navigate("CreatePrescription")}
              style={[
                styles.buttonContentHolder,
                { backgroundColor: Colors.Primary, fontWeight: "600" },
              ]}
            >
              <Ionicons
                name="add"
                size={moderateScale(30)}
                color={Colors.White}
              />
              <Text style={styles.buttontext}>Prescription</Text>
            </TouchableOpacity>
            {/* Cancle  */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.buttonContentHolder,
                {
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: Colors.Grey,
                },
              ]}
            >
              {/* <Entypo
                name="minus"
                size={moderateScale(30)}
                color={Colors.White}
              /> */}
              <Text style={[styles.buttontext, { color: Colors.Black }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>

          {/* Lower Button */}
          <View style={styles.buttonHolder2}>
            <TouchableOpacity style={styles.button2}>
              <Text style={styles.buttonText2}>Save </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.button2}
            >
              <Text style={styles.buttonText2}>Cancel </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default AddmedicalDetails;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
  contentHolder: {
    borderWidth: moderateScale(2),
    flex: 1,
    width: "95%",
    // height:'90%'
    alignSelf: "center",
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    borderColor: Colors.White,
    backgroundColor: Colors.White,
  },
  symptoms: {
    borderWidth: moderateScale(2),
    borderColor: Colors.Secondary,
    marginVertical: moderateScaleVertical(5),
    backgroundColor: Colors.Secondary,
    borderRadius: moderateScale(10),
  },
  inputHolder: {
    fontSize: textScale(18),
    color: Colors.Black,
    paddingLeft: moderateScale(10),
    height: moderateScale(150),
  },
  buttonHolder: {
    marginVertical: moderateScaleVertical(5),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttontext: {
    color: Colors.White,
    // fontWeight: '600',
    fontSize: textScale(18),
  },
  buttonContentHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    //backgroundColor: Colors.Primary,
    gap: moderateScale(5),
    padding: moderateScale(10),
    width: "45%",
    borderRadius: moderateScale(10),
  },
  button2: {
    width: "45%",
    alignItems: "center",
    borderRadius: moderateScale(5),
    borderWidth: 1,
    padding: moderateScale(10),
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
  buttonText2: {
    color: Colors.White,
    fontSize: textScale(18),
    fontWeight: "600",
  },
  buttonHolder2: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    justifyContent: "space-around",
    width: "90%",
    alignSelf: "center",
    marginBottom: moderateScaleVertical(20),
  },
});
