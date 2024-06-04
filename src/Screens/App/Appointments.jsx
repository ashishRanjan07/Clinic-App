import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import Colors from "../../Theme/Colors";
import AppointmnetHeader from "../../Components/Appointment/AppointmnetHeader";
import AppointmentSlider from "../../Components/Appointment/AppointmentSlider";
import AppointmentCard from "../../Components/Appointment/AppointmentCard";
import PatientsFilter from "../../Components/Patient/PatientsFilter";

const Appointments = () => {
  const [activeSection, setActiveSection] = useState("Upcoming");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  const handleCloseFilter = () => {  
    setIsFilterOpen(false);
  };

  const handleSectionChange = (sectionName) => {
    setActiveSection(sectionName);
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.Secondary }} />
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.Secondary} />
      <View style={styles.main}>
        <AppointmnetHeader toggleFilter={toggleFilter} />
        <AppointmentSlider
          onSectionChange={handleSectionChange}
          activeSection={activeSection}
        />
        <AppointmentCard activeSection={activeSection} />
        {isFilterOpen && <PatientsFilter onClose={handleCloseFilter} />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
});

export default Appointments;
