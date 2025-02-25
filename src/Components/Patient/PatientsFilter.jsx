import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import Colors from "../../Theme/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import RBSheet from "react-native-raw-bottom-sheet";

const PatientsFilter = ({
  rbSheetRef,
  applyFilters,
  initialFilters,
  comingFrom,
}) => {
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedCheckUp, setSelectedCheckup] = useState(null);

  const CHECKUP_TYPES = [
    { label: "Regular", value: "1" },
    { label: "Emergency", value: "0" },
  ];

  useEffect(() => {
    if (initialFilters) {
      setSelectedSort(initialFilters.sortOrder || "");
      setSelectedGender(initialFilters.gender || "");
      setSelectedAge(initialFilters.ageRange || "");
      setSelectedCheckup(initialFilters.checkupType || "");
    }
  }, [initialFilters]);

  const handleApplyFilter = () => {
    const filters = {
      sortOrder: selectedSort,
      gender: selectedGender,
      ageRange: selectedAge,
      checkupType: selectedCheckUp,
    };

    applyFilters(filters);
    rbSheetRef.current.close();
  };

  const handleClearFilter = () => {
    setSelectedSort("");
    setSelectedGender("");
    setSelectedAge("");
    setSelectedCheckup(null);

    applyFilters({
      sortOrder: "",
      gender: "",
      ageRange: "",
      checkupType: "",
    });

    rbSheetRef.current.close();
  };

  const renderButtons = (data, selectedValue, setSelectedValue) =>
    data.map((item) => (
      <TouchableOpacity
        key={item.value || item}
        onPress={() => setSelectedValue(item?.value)}
        style={[
          styles.filterButton,
          selectedValue === (item.value || item)
            ? styles.activeButton
            : styles.inactiveButton,
        ]}
      >
        <Text
          style={[
            styles.filterOptionText,
            selectedValue === (item.value || item) && styles.activeButtonText,
          ]}
        >
          {item.label || `${item} Years`}
        </Text>
      </TouchableOpacity>
    ));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.innerView}>
        <Text></Text>
        <Text style={styles.headerText}>Filter</Text>
        <TouchableOpacity onPress={() => rbSheetRef.current.close()}>
          <AntDesign
            name="close"
            size={moderateScale(25)}
            color={Colors.Black}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Check-Up Type */}
        {comingFrom === "appointment" && (
          <View style={styles.contentHolder}>
            <Text style={styles.text}>Check-Up</Text>
            <View style={styles.filterOptionHolder}>
              {renderButtons(
                CHECKUP_TYPES,
                selectedCheckUp,
                setSelectedCheckup
              )}
            </View>
          </View>
        )}
        {/* Sort */}
        {comingFrom != "appointment" && (
          <View style={styles.contentHolder}>
            <Text style={styles.text}>Sort</Text>
            <View style={styles.filterOptionHolder}>
              <TouchableOpacity
                onPress={() => setSelectedSort("DESC")}
                style={[
                  styles.filterButton,
                  selectedSort === "DESC"
                    ? styles.activeButton
                    : styles.inactiveButton,
                ]}
              >
                <Text
                  style={
                    selectedSort === "DESC"
                      ? styles.activeButtonText
                      : styles.filterOptionText
                  }
                >
                  Z-A
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedSort("ASC")}
                style={[
                  styles.filterButton,
                  selectedSort === "ASC"
                    ? styles.activeButton
                    : styles.inactiveButton,
                ]}
              >
                <Text
                  style={
                    selectedSort === "ASC"
                      ? styles.activeButtonText
                      : styles.filterOptionText
                  }
                >
                  A-Z
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Gender */}
        {comingFrom != "appointment" && (
          <View style={styles.contentHolder}>
            <Text style={styles.text}>Gender</Text>
            <View style={styles.filterOptionHolder}>
              <TouchableOpacity
                onPress={() => setSelectedGender("female")}
                style={[
                  styles.filterButton,
                  selectedGender === "female"
                    ? styles.activeButton
                    : styles.inactiveButton,
                  { width: "30%" },
                ]}
              >
                <Text
                  style={
                    selectedGender === "female"
                      ? styles.activeButtonText
                      : styles.filterOptionText
                  }
                >
                  Female
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedGender("male")}
                style={[
                  styles.filterButton,
                  selectedGender === "male"
                    ? styles.activeButton
                    : styles.inactiveButton,
                  { width: "30%" },
                ]}
              >
                <Text
                  style={
                    selectedGender === "male"
                      ? styles.activeButtonText
                      : styles.filterOptionText
                  }
                >
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedGender("Kid")}
                style={[
                  styles.filterButton,
                  selectedGender === "Kid"
                    ? styles.activeButton
                    : styles.inactiveButton,
                  { width: "30%" },
                ]}
              >
                <Text
                  style={
                    selectedGender === "Kid"
                      ? styles.activeButtonText
                      : styles.filterOptionText
                  }
                >
                  Kid
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Age Range */}
        <View style={styles.contentHolder}>
          <Text style={styles.text}>Age Range</Text>
          <View
            style={[styles.filterOptionHolder, { flexWrap: "wrap", gap: 10 }]}
          >
            {[
              "0-10",
              "10-20",
              "20-30",
              "30-40",
              "40-50",
              "50-60",
              "60-70",
              "70-100",
            ].map((range) => (
              <TouchableOpacity
                key={range}
                onPress={() => setSelectedAge(range)}
                style={[
                  styles.filterButton,
                  selectedAge === range
                    ? styles.activeButton
                    : styles.inactiveButton,
                  { width: "30%" },
                ]}
              >
                <Text
                  style={[
                    selectedAge === range
                      ? styles.activeButtonText
                      : styles.filterOptionText,
                    { fontSize: textScale(14) },
                  ]}
                >
                  {range} Yr
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.separator} />

      {/* Lower Buttons */}
      <View style={styles.buttonHolder}>
        <TouchableOpacity
          onPress={handleApplyFilter}
          activeOpacity={0.9}
          style={styles.button}
        >
          <Text style={styles.buttontext}>Apply</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.button,
            {
              backgroundColor: Colors.White,
              borderColor: Colors.MediumGrey,
            },
          ]}
          onPress={handleClearFilter}
        >
          <Text
            style={[
              styles.buttontext,
              { color: Colors.Black, fontFamily: FontFamily.P_400 },
            ]}
          >
            Clear
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PatientsFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  innerView: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(10),
  },
  headerText: {
    fontSize: textScale(18),
    color: Colors.Tertiary,
    alignSelf: "center",
  },
  separator: {
    width: "100%",
    borderWidth: 0.3,
    borderColor: Colors.MediumGrey,
  },
  scrollView: {
    width: "100%",
    flex: 1,
  },
  text: {
    fontSize: textScale(14),
    fontFamily: FontFamily.P_500,
    color: Colors.MediumGrey,
  },
  contentHolder: {
    width: "95%",
    padding: moderateScale(10),
    alignSelf: "center",
  },
  filterOptionHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: moderateScaleVertical(10),
  },
  filterButton: {
    borderWidth: moderateScale(2),
    width: "45%",
    alignItems: "center",
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  button: {
    borderWidth: moderateScale(2),
    width: "40%",
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    alignItems: "center",
    borderColor: Colors.Primary,
    backgroundColor: Colors.Primary,
  },
  buttontext: {
    color: Colors.White,
    fontFamily: FontFamily.P_600,
    fontSize: textScale(14),
  },
  buttonHolder: {
    padding: moderateScale(10),
    width: "95%",
    marginVertical: moderateScaleVertical(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: Colors.LightGrey,
    borderColor: Colors.Primary,
  },
  activeButtonText: {
    color: Colors.Primary,
    fontSize: textScale(14),
    fontFamily: FontFamily.P_400,
  },
  inactiveButton: {
    backgroundColor: Colors.LightGrey,
    borderColor: Colors.LightGrey,
  },
  filterOptionText: {
    fontSize: textScale(14),
    color: Colors.Black,
    fontFamily: FontFamily.P_400,
  },
});
