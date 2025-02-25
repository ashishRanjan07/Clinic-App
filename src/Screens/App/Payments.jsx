import { BackHandler, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../Theme/Colors";
import HeaderView from "../../Components/Payment/HeaderView";
import SearchFilter from "../../Components/Payment/SearchFilter";
import Data from "../../Assets/Json/PaymentRecord.json";
import PaymentDetails from "../../Components/Payment/PaymentDetails";
import PatientsFilter from "../../Components/Patient/PatientsFilter";
const Payments = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [paymementList, setPaymentsList] = useState([])

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };
  
  const handleSearch = value=>{
     if(value.length>2)
      {
        var filteredData = Data.payment_details.filter(item=>{
          return item.sender_name.toLowerCase().includes(value.toLowerCase())
        })
      }
     if(filteredData){
      setPaymentsList(filteredData)
     }else{
      setPaymentsList(Data?.payment_details)
     }
  }


  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.Secondary }} />
      <StatusBar backgroundColor={Colors.Secondary} barStyle={"dark-content"} />
      <View style={styles.main}>
        <HeaderView />
        <SearchFilter handleSearch={handleSearch} toggleFilter={toggleFilter} />
        <PaymentDetails paymementList={paymementList} />
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
