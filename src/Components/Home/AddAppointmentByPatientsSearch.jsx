import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../Theme/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import Data from "../../Assets/Json/PatientsList.json";

const AddAppointmentByPatientsSearch = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.renderTouch}>
        <Text style={styles.nameText}>{item.Name}</Text>
        <View style={styles.lowerDetailsHolder}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={styles.ageText}>{item?.Age} y.o</Text>
            <Text style={styles.ageText}>{item?.Gender}</Text>
          </View>
          <Text style={styles.ageText}>{Math.random() * 100}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <SafeAreaView style={{ backgroundColor: Colors.Secondary }} />
      <StatusBar backgroundColor={Colors.Secondary} barStyle={"dark-content"} />
      <TouchableOpacity
        style={styles.upperHolder}
        onPress={() => navigation.goBack()}
      >
        <AntDesign
          name="arrowleft"
          size={responsiveFontSize(40)}
          color={Colors.Black}
        />
        <Text style={styles.headerText}>Appointment</Text>
      </TouchableOpacity>
      {/* Search view Holder */}
      <View style={styles.searchHolder}>
        <View style={styles.search}>
          <TextInput
            placeholder="Search for Patients"
            placeholderTextColor={Colors.MediumGrey}
            style={styles.TextINputField}
          />
          <AntDesign
            name="search1"
            size={responsiveFontSize(20)}
            color={Colors.MediumGrey}
          />
        </View>
      </View>
      {/* Flat list for patients  */}
      <View style={{ flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Data.patients}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
};

export default AddAppointmentByPatientsSearch;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
  upperHolder: {
    padding: responsivePadding(10),
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  headerText: {
    fontSize: responsiveFontSize(25),
    fontWeight: "600",
    color: Colors.Black,
  },
  searchHolder: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
    marginVertical: responsivePadding(10),
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: responsivePadding(2),
    borderRadius: responsivePadding(10),
    borderColor: Colors.MediumGrey,
    width: "90%",
    justifyContent: "space-between",
    paddingHorizontal: responsivePadding(10),
  },
  TextINputField: {
    padding: responsivePadding(10),
    fontSize: responsiveFontSize(18),
    color: Colors.Black,
    fontWeight: "600",
  },
  renderTouch: {
    borderWidth: 2,
    width: "95%",
    alignSelf: "center",
    marginVertical: 10,
    padding: responsivePadding(10),
    borderRadius: responsivePadding(5),
    borderColor: Colors.LightGrey,
    gap: 5,
  },
  nameText: {
    fontSize: responsiveFontSize(18),
    color: Colors.Black,
    fontWeight: "600",
  },
  lowerDetailsHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ageText: {
    color: Colors.Tertiary,
    fontSize: responsiveFontSize(18),
    fontWeight: "500",
  },
});

// d2d4d8
