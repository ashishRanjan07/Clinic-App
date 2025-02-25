import {
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
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../../Theme/Colors";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import InternalHeader from "../General/InternalHeader";
const CreatePrescription = () => {
  const navigation = useNavigation();
  const savePrescription = () => {
    console.log("Prescription Saved..");
  };
  const cancel = () => {
    navigation.goBack();
  };
  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.Secondary }} />
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.Secondary} />

      <View style={styles.main}>
        {/* HeaderView */}
        <InternalHeader title={"Create Prescription"} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Medicine Name */}
          <View style={styles.viewHolder}>
            <Text style={styles.text}>Medicine Name</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Medicine Name"
              placeholderTextColor={Colors.MediumGrey}
            />
          </View>
          {/* Doges */}
          <View style={styles.ageHolder}>
            <View style={{ width: "45%", gap: 10 }}>
              <Text style={styles.text}>Medicine Amount</Text>
              <TextInput
                style={[styles.inputBox, { textAlign: "center" }]}
                placeholder="100 g"
                placeholderTextColor={Colors.MediumGrey}
              />
            </View>
            <View style={{ width: "45%", gap: 10 }}>
              <Text style={styles.text}>Duration</Text>
              <TextInput
                style={[styles.inputBox, { textAlign: "center" }]}
                placeholder="15"
                placeholderTextColor={Colors.MediumGrey}
              />
            </View>
          </View>
          {/* Medication Time */}
          <View style={styles.medicationHolder}>
            <Text style={styles.text}>Medication Time</Text>
            <View style={styles.medicationContentHolder}>
              <TouchableOpacity style={styles.buttonTouch}>
                <Text style={styles.buttonText}>Morning</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonTouch}>
                <Text style={styles.buttonText}>Afternoon</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonTouch}>
                <Text style={styles.buttonText}>Evening</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonTouch}>
                <Text style={styles.buttonText}>Night</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* To Be Take*/}
          <View style={styles.medicationHolder}>
            <Text style={styles.text}>To be Taken</Text>
            <View style={styles.medicationContentHolder}>
              <TouchableOpacity style={styles.buttonTouch}>
                <Text style={styles.buttonText}>After Meal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonTouch}>
                <Text style={styles.buttonText}>Before Meal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonTouch}>
                <Text style={styles.buttonText}>With Meal</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Important Notes */}
          <View style={styles.viewHolder}>
            <Text style={styles.text}>Important Notes</Text>
            <View style={styles.symptoms}>
              <TextInput
                placeholder="Important Notes:"
                multiline={true}
                style={styles.inputHolder}
                placeholderTextColor={Colors.MediumGrey}
              />
            </View>
          </View>
          {/* Upload Prescriptions */}
          <TouchableOpacity style={styles.prescriptionHolder}>
            <Feather
              name="upload"
              size={responsiveFontSize(30)}
              color={Colors.Black}
            />
            <Text style={styles.uploadButton}>Upload Presciption</Text>
          </TouchableOpacity>
          {/* Button */}
          <View style={styles.buttonHolder}>
            <TouchableOpacity onPress={savePrescription} style={styles.button}>
              <Text style={styles.buttonText2}>Save </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancel} style={styles.button}>
              <Text style={styles.buttonText2}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default CreatePrescription;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
  headerHolder: {
    marginVertical: responsivePadding(10),
    padding: responsivePadding(10),
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    gap: responsivePadding(30),
    alignItems: "center",
  },
  HeaderText: {
    fontSize: responsiveFontSize(20),
    color: Colors.Tertiary,
    fontWeight: "600",
  },
  viewHolder: {
    marginVertical: responsivePadding(10),
    padding: responsivePadding(10),
    width: "95%",
    alignSelf: "center",
    gap: responsivePadding(10),
  },
  text: {
    fontSize: responsiveFontSize(18),
    fontWeight: "400",
    color: Colors.Grey,
  },
  inputBox: {
    borderWidth: 1,
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    borderColor: Colors.White,
    fontSize: responsiveFontSize(18),
    color: Colors.Black,
    backgroundColor: Colors.White,
  },
  ageHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: responsivePadding(10),
    gap: responsivePadding(20),
    width: "95%",
    alignSelf: "center",
  },
  medicationHolder: {
    width: "95%",
    alignSelf: "center",
    padding: responsivePadding(10),
  },
  medicationContentHolder: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: responsivePadding(20),
    marginVertical: responsivePadding(10),
    alignSelf: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: responsiveFontSize(16),
    color: Colors.Tertiary,
    fontWeight: "600",
  },
  buttonTouch: {
    borderWidth: 1,
    padding: responsivePadding(10),
    width: "45%",
    alignItems: "center",
    borderColor: Colors.MediumGrey,
    borderRadius: 5,
  },
  inputHolder: {
    fontSize: responsiveFontSize(18),
    color: Colors.Black,
    paddingLeft: responsivePadding(10),
    height: responsivePadding(150),
  },
  symptoms: {
    borderWidth: 2,
    borderColor: Colors.White,
    marginVertical: responsivePadding(5),
    backgroundColor: Colors.White,
    borderRadius: responsivePadding(10),
  },
  uploadButton: {
    fontSize: responsiveFontSize(18),
    color: Colors.Tertiary,
    fontWeight: "600",
  },
  prescriptionHolder: {
    borderWidth: 2,
    marginVertical: responsivePadding(10),
    width: "85%",
    padding: responsivePadding(10),
    alignSelf: "center",
    flexDirection: "row",
    gap: responsivePadding(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: responsivePadding(10),
    backgroundColor: Colors.White,
    marginBottom: responsivePadding(20),
  },
  button: {
    width: "45%",
    alignItems: "center",
    borderRadius: responsivePadding(5),
    borderWidth: 1,
    padding: responsivePadding(10),
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
  buttonText2: {
    color: Colors.White,
    fontSize: responsiveFontSize(18),
    fontWeight: "600",
  },
  buttonHolder: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    alignSelf: "center",
    marginBottom: responsivePadding(20),
  },
});
