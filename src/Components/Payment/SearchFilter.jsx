import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../../Theme/Colors";
import Feather from "react-native-vector-icons/Feather";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const SearchFilter = ({ handleSearch,toggleFilter }) => {
  return (
    <View style={styles.searchView}>
      <View style={styles.search}>
        <TextInput
          placeholder="Search by number, names"
          placeholderTextColor={Colors.MediumGrey}
          onChangeText={handleSearch}
          style={styles.textInput}
        />
        <Feather
          name="search"
          size={responsiveFontSize(25)}
          color={Colors.MediumGrey}
        />
      </View>
      <TouchableOpacity style={styles.filterHolder} onPress={toggleFilter}>
        <SimpleLineIcons
          name="equalizer"
          size={responsiveFontSize(30)}
          color={Colors.White}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({
  searchView: {
    width: "95%",
    alignSelf: "center",
    padding: responsivePadding(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: responsivePadding(10),
  },
  search: {
    // borderWidth:1,
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginVertical: responsivePadding(10),
    borderRadius: responsivePadding(10),
    height: responsivePadding(50),
    justifyContent: "space-evenly",
    backgroundColor: Colors.White,
  },
  textInput: {
    width: "80%",
    color: Colors.Black,
    
    fontSize: responsiveFontSize(16),
  },
  icon: {
    width: responsivePadding(60),
    height: responsivePadding(50),
  },
  iconStyle: {
    transform: [{ rotate: "90deg" }],
  },
  filterHolder: {
    borderColor: Colors.Primary,
    borderWidth: 2,
    padding: 8,
    borderRadius: 10,
    backgroundColor: Colors.Primary,
  },
});
