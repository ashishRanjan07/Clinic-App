import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Colors from "../../Theme/Colors";
import { useNavigation } from "@react-navigation/native";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";

const PatientsHeader = ({
  toggleFilter,
  handleSearch,
  setShowSearchBar,
  showSearchbar,
}) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.headerHolder}>
        <View style={styles.touchHolder}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name="arrowleft"
              size={textScale(30)}
              color={Colors.Tertiary}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Patients List</Text>
        </View>

        <View style={styles.searchView}>
          <TouchableOpacity onPress={() => setShowSearchBar(!showSearchbar)}>
            <AntDesign
              name="search1"
              size={moderateScale(30)}
              color={Colors.Black}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFilter}>
            <SimpleLineIcons
              name="equalizer"
              size={moderateScale(30)}
              color={Colors.Black}
            />
          </TouchableOpacity>
        </View>
      </View>
      {showSearchbar && (
        <View style={styles.searchHolder}>
          <TextInput
          autoFocus={true}
            placeholder="Search Patients by name and No"
            placeholderTextColor={Colors.MediumGrey}
            style={styles.textInputHolder}
            onChangeText={handleSearch}
          />
          <AntDesign
            name="search1"
            size={moderateScale(30)}
            color={Colors.MediumGrey}
          />
        </View>
      )}
    </>
  );
};

export default PatientsHeader;

const styles = StyleSheet.create({
  touchHolder: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
    paddingTop: moderateScaleVertical(10),
  },
  headerHolder: {
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: moderateScaleVertical(10),
  },
  searchView: {
    flexDirection: "row",
    gap: moderateScale(30),
    alignItems: "center",
    marginRight: moderateScale(10),
  },
  text: {
    fontSize: textScale(16),
    fontFamily: FontFamily.P_600,
    color: Colors.Tertiary,
  },
  textInputHolder: {
    fontSize: textScale(12),
    fontFamily: FontFamily.P_400,
    color: Colors.MediumGrey,
    width: "90%",
  },
  searchHolder: {
    borderWidth: 2,
    width: "95%",
    alignSelf: "center",
    marginTop: moderateScaleVertical(10),
    paddingLeft: moderateScale(10),
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.White,
    borderColor: Colors.White,
  },
});
