import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../../Theme/Colors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { login, saveData } from "../../redux/action/Action";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";

const { width } = Dimensions.get("window");

const LowerView = ({ userData }) => {
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [todayAvailabilityEnabled, setTodayAvailabilityEnabled] =
    useState(true);
  const toggleTodayAvailability = () => {
    setTodayAvailabilityEnabled((prevState) => !prevState);
  };

  const logoutFunction = async () => {
    await AsyncStorage.removeItem("loginData");
    await AsyncStorage.removeItem("isLoggedIn");
    dispatch(login("No"));
    dispatch(saveData("No"));
    navigation.navigate("Login");
    closeLogoutBottomSheet();
  };

  const openLogoutBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const closeLogoutBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const handleSheetChanges = useCallback((index) => {
    // console.log("BottomSheet index:", index);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.lowerView}>
        {/* Today Availability */}
        <View style={styles.option}>
          <Text style={styles.optionLabel}>Today Availability</Text>
          <Switch
            trackColor={{ false: "#767577", true: Colors.Primary }}
            thumbColor={todayAvailabilityEnabled ? Colors.White : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTodayAvailability}
            value={todayAvailabilityEnabled}
          />
        </View>
        <View style={styles.separateLine} />

        {/* Upcoming Availability */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Doctor availability",{incoming:'Doctor Availability'})}
        >
          <Text style={styles.optionLabel}>Upcoming Availability</Text>
          <AntDesign
            name="right"
            size={moderateScale(25)}
            color={Colors.Grey}
          />
        </TouchableOpacity>
        <View style={styles.separateLine} />

        {/* Logout */}
        <View style={styles.separateLine}>
          <TouchableOpacity
            style={styles.option}
            onPress={openLogoutBottomSheet}
          >
            <Text style={[styles.optionLabel, { color: Colors.CrimsonRed }]}>
              Logout
            </Text>
            <AntDesign
              name="right"
              size={moderateScale(25)}
              color={Colors.Grey}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.separateLine} />

        {/* Bottom Sheet for Logout */}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={["5%", "40%"]}
          initialSnapIndex={0} 
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
        >
          <BottomSheetView style={styles.bottomSheetView}>
            <Text style={styles.bottomSheetTitle}>Logout Confirmation</Text>
            <Text style={styles.bottomSheetSubTitle}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.bottomSheetButtonContainer}>
              <TouchableOpacity
                onPress={logoutFunction}
                style={[styles.bottomSheetButton, styles.confirmButton]}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeLogoutBottomSheet}
                style={[styles.bottomSheetButton, styles.cancelButton]}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default LowerView;

const styles = StyleSheet.create({
  lowerView: {
    backgroundColor: Colors.Secondary,
    flex: 1,
  },
  optionLabel: {
    fontSize: textScale(16),
    color: Colors.Grey,
    fontWeight: "400",
  },
  option: {
    marginVertical: moderateScaleVertical(10),
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(10),
  },
  separateLine: {
    borderWidth: moderateScale(0.3),
    borderColor: Colors.LightGrey,
  },
  bottomSheetView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheetTitle: {
    fontSize: textScale(18),
    fontWeight: "600",
    color: Colors.Black,
    marginBottom: moderateScaleVertical(10),
  },
  bottomSheetSubTitle: {
    fontSize: textScale(14),
    color: Colors.DarkGrey,
    textAlign: "center",
    marginBottom: moderateScaleVertical(20),
  },
  bottomSheetButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width * 0.8,
  },
  bottomSheetButton: {
    width: "45%",
    paddingVertical: moderateScaleVertical(15),
    alignItems: "center",
    borderRadius: moderateScale(10),
  },
  confirmButton: {
    backgroundColor: Colors.Primary,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: Colors.Black,
  },
  buttonText: {
    color: Colors.White,
    fontSize: textScale(16),
    fontWeight: "600",
  },
  cancelText: {
    color: Colors.Black,
    fontSize: textScale(16),
    fontWeight: "600",
  },
});
