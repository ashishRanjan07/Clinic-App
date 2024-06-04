import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Colors from "../../Theme/Colors";
import HeaderView from "../../Components/Payment/HeaderView";
import SearchFilter from "../../Components/Payment/SearchFilter";
import PaymentDetails from "../../Components/Payment/PaymentDetails";
import PatientsFilter from "../../Components/Patient/PatientsFilter";
const Payments = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };
  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.Secondary }} />
      <StatusBar backgroundColor={Colors.Secondary} barStyle={"dark-content"} />
      <View style={styles.main}>
        <HeaderView />
        <SearchFilter toggleFilter={toggleFilter} />
        <PaymentDetails />
        {isFilterOpen && <PatientsFilter onClose={handleCloseFilter} />}
      </View>
    </>
  );
};

export default Payments;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
});
