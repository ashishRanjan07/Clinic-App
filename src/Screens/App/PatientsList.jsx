import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Colors from '../../Theme/Colors';
import PatientsHeader from '../../Components/Patient/PatientsHeader';
import PatientsCard from '../../Components/Patient/PatientsCard';
import PatientsFilter from '../../Components/Patient/PatientsFilter';

const PatientsList = () => {
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
      <StatusBar backgroundColor={Colors.Secondary} barStyle={'dark-content'} />
      <View style={styles.main}>
        <PatientsHeader toggleFilter={toggleFilter} />
        <PatientsCard />
        {isFilterOpen && <PatientsFilter onClose={handleCloseFilter} />}
      </View>
    </>
  );
};

export default PatientsList;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
});

