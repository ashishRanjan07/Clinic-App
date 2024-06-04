import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../Theme/Colors";
import UpperHeader from "../../Components/Home/UpperHeader";
import Search from "../../Components/Home/Search";
import AppointmentList from "../../Components/Home/AppointmentList";
import PatientsFilter from "../../Components/Patient/PatientsFilter";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [UserLoginData, setUserLoginData] = useState();
  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        const loginData = await AsyncStorage.getItem("loginData");
        if (loginData !== null) {
          console.log("Login data:", JSON.parse(loginData));
          setUserLoginData(JSON.parse(loginData));
        } else {
          console.log("No login data found.");
        }
      } catch (error) {
        console.error("Error fetching login data:", error);
      }
    };

    fetchLoginData();
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };
  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.Secondary }} />
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.Secondary} />
      <View style={styles.main}>
        <UpperHeader userData={UserLoginData} />
        <Search toggleFilter={toggleFilter} />
        <AppointmentList />
        {isFilterOpen && <PatientsFilter onClose={handleCloseFilter} />}
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
});
