import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../../Theme/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";
import images from "../../Theme/Image";
import { moderateScale, moderateScaleVertical, textScale } from "../../utils/ResponsiveSize";

const AppointmnetHeader = ({ handleSearch, toggleFilter, userData,searchText }) => {
  const [showSearchbar, setShowSearchBar] = useState(false);
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.main}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.text}>
            Hi {userData?.clinic_staff?.staff_name}!
          </Text>
          <Image source={images.user} style={styles.image} />
        </View>
        <View style={styles.viewHolder}>
          <View style={styles.backTouch}>
            <Text style={styles.text}>Appointments</Text>
          </View>

          <View style={styles.searchText}>
            <TouchableOpacity onPress={() => setShowSearchBar(!showSearchbar)}>
              <AntDesign
                name="search1"
                color={Colors.Tertiary}
                size={moderateScale(25)}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFilter}>
              <Fontisto
                name="equalizer"
                color={Colors.Tertiary}
                size={moderateScale(25)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showSearchbar && (
        <View style={styles.searchHolder}>
          <TextInput
          autoFocus={true}
            placeholder="Search Patients by name"
            placeholderTextColor={Colors.MediumGrey}
            style={styles.textInputHolder}
            value={searchText}
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

export default AppointmnetHeader;

const styles = StyleSheet.create({
  main: {
    padding: moderateScale(10),
  },

  text: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: Colors.Tertiary,
  },
  viewHolder: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(30),
  },
  backTouch: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
  },
  searchText: {
    flexDirection: "row",
    gap: moderateScale(40),
    padding: moderateScale(10),
    width: "30%",
    justifyContent: "space-between",
  },
  searchHolder: {
    borderWidth: 2,
    width: "95%",
    alignSelf: "center",
    marginTop: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(10),
    padding:
      Platform.OS === "android" ? moderateScale(2) : moderateScale(5),
    borderRadius: moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.White,
    borderColor: Colors.White,
  },
  textInputHolder: {
    fontSize: textScale(18),
    fontVariant: "600",
    color: Colors.Black,
    width: "90%",
  },
  image: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderWidth: 1,
    borderRadius: moderateScale(50),
    borderColor: Colors.MediumGrey,
    marginBottom: moderateScaleVertical(10),
  },
});
