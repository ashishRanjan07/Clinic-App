import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../../Theme/Colors";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Appointments from "../../screens/App/Appointments";
import Home from "../../screens/App/Home";
import PatientsList from "../../screens/App/PatientsList";
import Profile from "../../screens/App/Profile";
import { moderateScale, moderateScaleVertical } from "../../utils/ResponsiveSize";
import Payments from "../../screens/App/Payments";

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Appointment"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: Colors.White,
          height: moderateScale(80),
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: moderateScaleVertical(5),
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Payment") {
            iconName = "payment";
            return (
              <View
                style={{
                  backgroundColor: focused ? Colors.active : Colors.Secondary,
                  padding: moderateScale(5),
                  borderRadius: moderateScale(10),
                }}
              >
                <MaterialIcons
                  name={iconName}
                  size={moderateScale(30)}
                  color={focused ? Colors.White : Colors.MediumGrey}
                />
              </View>
            );
          } else if (route.name === "Profile") {
            iconName = "person-outline";
            return (
              <View
                style={[
                  styles.iconHolder,
                  {
                    backgroundColor: focused ? Colors.active : Colors.Secondary,
                  },
                ]}
              >
                <MaterialIcons
                  name={iconName}
                  size={moderateScale(30)}
                  color={focused ? Colors.White : Colors.MediumGrey}
                />
              </View>
            );
          } else if (route.name === "Home") {
            iconName = "home";
            return (
              <View
                style={[
                  styles.iconHolder,
                  {
                    backgroundColor: focused ? Colors.active : Colors.Secondary,
                  },
                ]}
              >
                <AntDesign
                  name={iconName}
                  size={moderateScale(30)}
                  color={focused ? Colors.White : Colors.MediumGrey}
                />
              </View>
            );
          } else if (route.name === "Appointment") {
            iconName = "calendar-clock-outline";
            return (
              <View
                style={[
                  styles.iconHolder,
                  {
                    backgroundColor: focused ? Colors.active : Colors.Secondary,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={iconName}
                  size={moderateScale(30)}
                  color={focused ? Colors.White : Colors.MediumGrey}
                />
              </View>
            );
          } else if (route.name === "PatientsList") {
            iconName = "list-alt";
            return (
              <View
                style={[
                  styles.iconHolder,
                  {
                    backgroundColor: focused ? Colors.active : Colors.Secondary,
                  },
                ]}
              >
                <MaterialIcons
                  name={iconName}
                  size={moderateScale(30)}
                  color={focused ? Colors.White : Colors.MediumGrey}
                />
              </View>
            );
          }
        },
      })}
    >
      {/* <Tab.Screen name="Payment" component={Payments} /> */}
      <Tab.Screen name="Appointment" component={Appointments} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="PatientsList" component={PatientsList} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  iconHolder: {
    width: moderateScale(50),
    height: moderateScale(50),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(10),
    // marginTop:moderateScaleVertical(15)
  },
});
