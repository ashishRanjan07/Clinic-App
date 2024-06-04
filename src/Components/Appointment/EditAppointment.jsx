import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../Theme/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import images from "../../Theme/Image";
import Button from "../General/Button";
const EditAppointment = ({ route }) => {
  const { item } = route.params;
  console.log(item, "Line 20");
  const navigation = useNavigation();
  const [name, setName] = useState(item?.Name);
  const [mobileNo,setMobileNo] = useState(item?.Mobile)
  const [age,setAge] = useState(item?.Age);
  const [gender,setGender] = useState(item?.Gender);
  const [address,setAddress] = useState(item?.Address);
  const [date,setDate]= useState(item?.Date);
  const [time,setTime] =useState(item?.Time)
  const handleAppointment = async () => {};
  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.Secondary }} />
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.Secondary} />
      <View style={styles.main}>
        <TouchableOpacity
          style={styles.headerHolder}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={responsiveFontSize(30)}
            color={Colors.Black}
          />
          <Text style={styles.text}>Edit Appointment</Text>
        </TouchableOpacity>
        {/* Form Section */}
        <ScrollView
          style={styles.scrollViewHolder}
          showsVerticalScrollIndicator={false}
        >
          {/* Name */}
          <View style={styles.viewHolder}>
            <Text style={styles.text}>Name</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Name"
              placeholderTextColor={Colors.MediumGrey}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          {/* Mobile No */}
          <View style={styles.viewHolder}>
            <Text style={styles.text}>Mobile No</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Mobile No"
              placeholderTextColor={Colors.MediumGrey}
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
            />
          </View>
          {/* Age and Gender */}
          <View style={styles.ageHolder}>
            <View style={{ width: "45%", gap: 10 }}>
              <Text style={styles.text}>Age</Text>
              <TextInput
                style={[styles.inputBox]}
                placeholder="Age"
                placeholderTextColor={Colors.MediumGrey}
                value={(age).toString()}
                onChangeText={(text) => setAge(text)}
              />
            </View>
            <View style={{ width: "45%", gap: 10 }}>
              <Text style={styles.text}>Gender</Text>
              <TextInput
                style={[styles.inputBox]}
                placeholder="Gender"
                placeholderTextColor={Colors.MediumGrey}
                value={gender}
                onChangeText={(text) => setGender(text)}
              />
            </View>
          </View>
          {/* Checkup */}
          <View style={styles.checkup}>
            <Text style={styles.text}>Check-up</Text>
            <View style={styles.checkupHolder}>
              <TouchableOpacity style={styles.Button}>
                <Text style={styles.buttontext}>Regular</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Button}>
                <Text style={styles.buttontext}>Emergency</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Address */}
          <View style={styles.viewHolder}>
            <Text style={styles.text}>Address</Text>
            <TextInput
              style={[styles.inputBox, { height: responsivePadding(150) }]}
              placeholder="Address"
              placeholderTextColor={Colors.MediumGrey}
              multiline={true}
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
          {/* Select Date and Time */}
          <View style={styles.viewHolder}>
            <Text style={styles.text}>Select Date & Time</Text>
            <View style={styles.dateHolder}>
              <TextInput
                placeholder="Date & Time"
                placeholderTextColor={Colors.MediumGrey}
                style={styles.DateInput}
                value={date + " "+ time}
                onChangeText={(text) => setDate(text)}
              />
              <Image
                source={images.calender}
                resizeMode="cover"
                style={styles.imageStyle}
              />
            </View>
          </View>
          {/* Button */}
          <View style={{ width: "80%", alignSelf: "center", marginBottom: 20 }}>
            <Button
              title={"Book Appointment"}
              handleAction={handleAppointment}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default EditAppointment;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    padding: responsivePadding(10),
    backgroundColor: Colors.Secondary,
  },
  headerHolder: {
    margin: responsivePadding(10),
    flexDirection: "row",
    gap: responsivePadding(20),
    alignItems: "center",
  },
  text: {
    fontSize: responsiveFontSize(20),
    color: Colors.Black,
    fontWeight: "600",
  },
  scrollViewHolder: {
    flex: 1,
    backgroundColor: Colors.Secondary,
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
  checkup: {
    width: "95%",
    padding: responsivePadding(10),
    alignSelf: "center",
  },
  checkupHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: responsivePadding(10),
    marginVertical: responsivePadding(10),
  },
  Button: {
    width: "45%",
    borderWidth: responsivePadding(2),
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
  buttontext: {
    color: Colors.White,
    fontWeight: "600",
    fontSize: responsiveFontSize(18),
  },
  DateInput: {
    fontSize: responsiveFontSize(18),
    color: Colors.Black,
  },
  imageStyle: {
    width: responsivePadding(30),
    height: responsivePadding(30),
  },
  dateHolder: {
    flexDirection: "row",
    borderWidth: responsivePadding(2),
    borderRadius: responsivePadding(10),
    padding: responsivePadding(10),
    borderColor: Colors.White,
    backgroundColor: Colors.White,
    justifyContent: "space-between",
  },
  main2: {
    width: "100%",
    padding: responsivePadding(10),
    backgroundColor: Colors.Secondary,
  },
  headerHolder: {
    margin: responsivePadding(10),
    flexDirection: "row",
    gap: responsivePadding(20),
    alignItems: "center",
  },
  text2: {
    fontSize: responsiveFontSize(20),
    color: Colors.Black,
    fontWeight: "600",
  },
});
