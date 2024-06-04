import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Payments from "../Screens/App/Payments";
import Appointments from "../Screens/App/Appointments";
import Home from "../Screens/App/Home";
import Profile from "../Screens/App/Profile";
import PatientsList from "../Screens/App/PatientsList";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { responsiveFontSize, responsivePadding } from "../Theme/Responsive";
import Colors from "../Theme/Colors";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.White,
          height: responsivePadding(70),
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Payment") {
            iconName = "payment";
            return (
              <View
                style={{
                  backgroundColor: focused ? Colors.Primary : Colors.Secondary,
                  padding: responsivePadding(10),
                  borderRadius: responsivePadding(10),
                }}
              >
                <MaterialIcons
                  name={iconName}
                  size={responsiveFontSize(30)}
                  color={focused ? Colors.White : Colors.MediumGrey}
                />
              </View>
            );
          } else if (route.name === "Profile") {
            iconName = "person";
            return (
              <View
                style={{
                  backgroundColor: focused ? Colors.Primary : Colors.Secondary,
                  padding: responsivePadding(10),
                  borderRadius: responsivePadding(10),
                }}
              >
                <MaterialIcons
                  name={iconName}
                  size={responsiveFontSize(30)}
                  color={focused ? Colors.White : Colors.MediumGrey}
                />
              </View>
            );
          } else if (route.name === "Home") {
            iconName = "home";
            return (
              <View
                style={{
                  backgroundColor: focused ? Colors.Primary : Colors.Secondary,
                  padding: responsivePadding(10),
                  borderRadius: responsivePadding(10),
                }}
              >
                <AntDesign
                  name={iconName}
                  size={responsiveFontSize(30)}
                  color={focused ? Colors.White : Colors.MediumGrey}
                />
              </View>
            );
          } else if (route.name === "Appointment") {
            iconName = "calendar-clock-outline";
            return (
              <View
                style={{
                  backgroundColor: focused ? Colors.Primary : Colors.Secondary,
                  padding: responsivePadding(10),
                  borderRadius: responsivePadding(10),
                }}
              >
                <MaterialCommunityIcons
                  name={iconName}
                  size={responsiveFontSize(30)}
                  color={focused ? Colors.White : Colors.MediumGrey}
                />
              </View>
            );
          } else if (route.name === "PatientsList") {
            iconName = "list-alt";
            return (
              <View
                style={{
                  backgroundColor: focused ? Colors.Primary : Colors.Secondary,
                  padding: responsivePadding(10),
                  borderRadius: responsivePadding(10),
                }}
              >
                <MaterialIcons
                  name={iconName}
                  size={responsiveFontSize(30)}
                  color={focused ? Colors.White : Colors.MediumGrey}
                />
              </View>
            );
          }
        },
      })}
    >
      <Tab.Screen name="Payment" component={Payments} />
      <Tab.Screen name="Appointment" component={Appointments} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="PatientsList" component={PatientsList} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabStack;
const style = StyleSheet.create({
  main: {},
});
