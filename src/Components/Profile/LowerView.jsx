import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../../Theme/Colors";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LowerView = ({ userData }) => {
  const navigation = useNavigation();
  const [todayAvaibilityEnabled, setTodayAvaibilityEnabled] =
    React.useState(true);
  const toggleTodayAvaibility = () => {
    setTodayAvaibilityEnabled((previousState) => !previousState);
  };
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            navigation.replace("Login");
            AsyncStorage.removeItem('loginData')
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.lowerView}>
      {/* Today Availability */}
      <View style={styles.option}>
        <Text style={styles.optionLabel}>Today Availability</Text>
        <Switch
          trackColor={{ false: "#767577", true: Colors.Primary }}
          thumbColor={todayAvaibilityEnabled ? Colors.White : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTodayAvaibility}
          value={todayAvaibilityEnabled}
        />
      </View>
      <View style={styles.seprateLine} />
      {/* Upcoming Availability */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("Doctor availability")}
      >
        <Text style={styles.optionLabel}>Upcoming Availability</Text>
        <AntDesign
          name="right"
          size={responsiveFontSize(25)}
          color={Colors.Grey}
        />
      </TouchableOpacity>
      <View style={styles.seprateLine} />
      {/* Upcoming Availability */}
      <TouchableOpacity
        style={styles.option}
        onPress={() =>
          navigation.navigate("Edit Profile", { userData: userData })
        }
      >
        <Text style={styles.optionLabel}>Edit Profile</Text>
        <AntDesign
          name="right"
          size={responsiveFontSize(25)}
          color={Colors.Grey}
        />
      </TouchableOpacity>
      <View style={styles.seprateLine} />
      {/* Logout */}
      <TouchableOpacity style={styles.option} onPress={handleLogout}>
        <Text style={[styles.optionLabel, { color: Colors.CrimsonRed }]}>
          Logout
        </Text>
        <AntDesign
          name="right"
          size={responsiveFontSize(25)}
          color={Colors.Grey}
        />
      </TouchableOpacity>
      <View style={styles.seprateLine} />
    </View>
  );
};

export default LowerView;

const styles = StyleSheet.create({
  lowerView: {
    backgroundColor: Colors.Secondary,
    flex: 1,
  },
  optionLabel: {
    fontSize: responsiveFontSize(18),
    color: Colors.Grey,
    fontWeight: "600",
  },
  option: {
    marginVertical: responsivePadding(10),
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsivePadding(10),
    padding: responsivePadding(10),
  },
  seprateLine: {
    borderWidth: responsivePadding(1),
    borderColor: Colors.MediumGrey,
  },
});
