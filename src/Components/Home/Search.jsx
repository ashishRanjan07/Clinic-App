import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import Colors from "../../Theme/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import images from "../../Theme/Image";

const Search = ({ toggleFilter }) => {
  return (
    <View style={styles.main}>
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
        <TouchableOpacity style={styles.filterHolder} onPress={toggleFilter}>
          <SimpleLineIcons
            name="equalizer"
            size={responsiveFontSize(30)}
            color={Colors.White}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    marginTop: responsivePadding(10),
    alignSelf: "center",
  },
  searchHolder: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    justifyContent: "space-around",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: responsivePadding(2),
    borderRadius: responsivePadding(10),
    borderColor: Colors.MediumGrey,
    width: "80%",
    justifyContent: "space-between",
    paddingHorizontal: responsivePadding(10),
  },
  TextINputField: {
    padding: responsivePadding(10),
    fontSize: responsiveFontSize(18),
    color: Colors.Black,
    fontWeight: "600",
  },
  image: {
    height: responsivePadding(40),
    width: responsivePadding(40),
  },
  iconStyle: {
    transform: [{ rotate: "90deg" }],
  },
  filterHolder: {
    borderColor: Colors.Primary,
    borderWidth: responsivePadding(2),
    padding: responsivePadding(8),
    borderRadius: responsivePadding(10),
    backgroundColor: Colors.Primary,
  },
});
