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
import React, { useState } from "react";
import Colors from "../../Theme/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import { useNavigation } from "@react-navigation/native";
import Button from "../General/Button";

const EditProfile = ({ route }) => {
  const { userData } = route.params;

  const navigation = useNavigation();
  const [name, setName] = useState(userData?.clinic_staff?.staff_name);
  const [userName, setUserName] = useState(userData?.clinic_staff?.user_name);
  const [mobileNumber, setMobileNumber] = useState(
    userData?.clinic_staff?.mobile_number
  );
  const [password, setPassword] = useState(userData?.clinic_staff?.password);

  const SaveProfile = () => {
    console.log("Save Profile");
  };
  const CancelProfile = () => {
    console.log("Cancel Profile");
  };
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
          <Text style={styles.text}>Edit Profile</Text>
        </TouchableOpacity>
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
          {/* User Name */}
          <View style={styles.viewHolder}>
            <Text style={styles.text}>User Name</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="User Name"
              placeholderTextColor={Colors.MediumGrey}
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
          </View>
          {/* Mobile No */}
          <View style={styles.viewHolder}>
            <Text style={styles.text}>Mobile No</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Mobile No"
              placeholderTextColor={Colors.MediumGrey}
              value={mobileNumber}
              onChangeText={(text) => setMobileNumber(text)}
            />
          </View>
          {/* Password No */}
          <View style={styles.viewHolder}>
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Password"
              placeholderTextColor={Colors.MediumGrey}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </ScrollView>
        <View
          style={{
            padding: 10,
            width: "95%",
            alignSelf: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={{ width: "45%" }}>
            <Button title={"Save Profile"} handleAction={SaveProfile} />
          </View>
          <View style={{ width: "45%" }}>
            <Button title={"Cancel"} handleAction={CancelProfile} />
          </View>
        </View>
      </View>
    </>
  );
};

export default EditProfile;

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
});
