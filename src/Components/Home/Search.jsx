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
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import { tempServerAddress } from "../../API_Services/API_service";

const Search = ({ handleSearch, toggleFilter, title }) => {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.searchHolder}>
        <View style={styles.search}>
          <TextInput
            placeholder="Search for Patients"
            placeholderTextColor={Colors.MediumGrey}
            style={styles.TextINputField}
            onChangeText={handleSearch}
          />
          <AntDesign
            name="search1"
            size={moderateScale(20)}
            color={Colors.MediumGrey}
          />
        </View>
        <TouchableOpacity style={styles.filterHolder} onPress={toggleFilter}>
          <SimpleLineIcons
            name="equalizer"
            size={moderateScale(30)}
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
    marginTop: moderateScaleVertical(10),
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
    backgroundColor: Colors.White,

    borderRadius: moderateScale(10),
    borderColor: Colors.MediumGrey,
    width: "80%",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(10),
  },
  TextINputField: {
    padding: moderateScale(10),
    flex: 1,
    fontSize: textScale(17),
    color: Colors.MediumGrey,
  },
  image: {
    height: moderateScale(40),
    width: moderateScale(40),
  },
  iconStyle: {
    transform: [{ rotate: "90deg" }],
  },
  filterHolder: {
    borderColor: Colors.Primary,
    borderWidth: moderateScale(2),
    padding: moderateScale(8),
    borderRadius: moderateScale(10),
    backgroundColor: Colors.Primary,
  },
  text: {
    color: Colors.Tertiary,
    fontSize: textScale(14),
    fontWeight: "600",
    width: "90%",
    marginHorizontal: moderateScale(10),
    marginBottom: moderateScaleVertical(10),
  },
});
