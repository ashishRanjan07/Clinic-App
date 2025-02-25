// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   ScrollView,
// } from "react-native";
// import Colors from "../../Theme/Colors";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import {
//   moderateScale,
//   moderateScaleVertical,
//   textScale,
// } from "../../utils/ResponsiveSize";
// import FontFamily from "../../utils/FontFamily";

// const AGE_RANGES = [
//   "0-10",
//   "10-20",
//   "20-30",
//   "30-40",
//   "40-50",
//   "50-60",
//   "60-70",
//   "70-100",
// ];
// const CHECKUP_TYPES = [
//   { label: "Regular", value: 1 },
//   { label: "Emergency", value: 0 },
// ];

// const AppointmentFilter = ({ rbSheetRef, applyFilters, initialFilters }) => {
//   const [selectedCheckUp, setSelectedCheckup] = useState(null);
//   const [selectedAgeRange, setSelectedAgeRange] = useState(null);

//   useEffect(() => {
//     if (initialFilters) {
//       setSelectedCheckup(initialFilters.checkupType || "");
//       setSelectedAgeRange(initialFilters.ageRange || "");
//     }
//   }, [initialFilters]);

//   const applyFilter = () => {
//     const filter = {
//       checkupType: selectedCheckUp,
//       ageRange: selectedAgeRange,
//     };
//     applyFilters(filter);
//     rbSheetRef.current.close();
//   };

//   const clearFilter = () => {
//     setSelectedCheckup(null);
//     setSelectedAgeRange(null);
//     applyFilters({
//       checkupType: "",
//       ageRange: "",
//     });
//     onClose();
//   };

//   const renderButtons = (data, selectedValue, setSelectedValue) =>
//     data.map((item) => (
//       <TouchableOpacity
//         key={item.value || item}
//         onPress={() => setSelectedValue(item.value || item)}
//         style={[
//           styles.filterButton,
//           selectedValue === (item.value || item)
//             ? styles.activeButton
//             : styles.inactiveButton,
//         ]}
//       >
//         <Text
//           style={[
//             styles.filterOptionText,
//             selectedValue === (item.value || item) && styles.activeButtonText,
//           ]}
//         >
//           {item.label || `${item} Years`}
//         </Text>
//       </TouchableOpacity>
//     ));

//   return (
//     <>
//       <View style={styles.overlay} />
//       <View style={styles.filterContainer}>
//         <View style={styles.innerView}>
//           <Text></Text>
//           <Text style={styles.headerText}>Filter</Text>
//           <TouchableOpacity onPress={() => rbSheetRef.current.close()}>
//             <AntDesign
//               name="close"
//               size={textScale(30)}
//               color={Colors.Black}
//             />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.separator} />
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           style={styles.scrollView}
//         >
//           <View style={styles.contentHolder}>
//             <Text style={styles.text}>Check-Up</Text>
//             <View style={styles.filterOptionHolder}>
//               {renderButtons(
//                 CHECKUP_TYPES,
//                 selectedCheckUp,
//                 setSelectedCheckup
//               )}
//             </View>
//           </View>
//           <View style={styles.contentHolder}>
//             <Text style={styles.text}>Age Range</Text>
//             <View style={[styles.filterOptionHolder, styles.wrapHolder]}>
//               {renderButtons(AGE_RANGES, selectedAgeRange, setSelectedAgeRange)}
//             </View>
//           </View>
//           <View style={styles.separator} />
//           <View style={styles.buttonHolder}>
//             <TouchableOpacity onPress={applyFilter} style={styles.button}>
//               <Text style={[styles.buttontext, { color: Colors.White }]}>
//                 Apply
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={clearFilter} style={styles.button}>
//               <Text style={[styles.buttontext, { color: Colors.Black }]}>
//                 Reset
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </View>
//     </>
//   );
// };

// export default AppointmentFilter;

// const styles = StyleSheet.create({
//   overlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   filterContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: Colors.White,
//     borderTopLeftRadius: moderateScale(10),
//     borderTopRightRadius: moderateScale(10),
//     elevation: moderateScale(5),
//     alignItems: "center",
//     maxHeight: "60%",
//     overflow: "hidden",
//   },
//   innerView: {
//     width: "90%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: moderateScale(10),
//   },
//   headerText: {
//     fontSize: textScale(18),
//     color: Colors.Tertiary,
//     alignSelf: "center",
//   },
//   separator: {
//     width: "100%",
//     borderWidth: 0.3,
//     borderColor: Colors.MediumGrey,
//   },
//   scrollView: {
//     width: "100%",
//     flex: 1,
//   },
//   text: {
//     fontSize: textScale(14),
//     fontFamily: FontFamily.P_500,
//     color: Colors.MediumGrey,
//   },
//   contentHolder: {
//     width: "95%",
//     padding: moderateScale(10),
//     alignSelf: "center",
//   },
//   filterOptionHolder: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginVertical: moderateScaleVertical(10),
//   },
//   wrapHolder: {
//     flexWrap: "wrap",
//     gap: 10,
//   },
//   filterButton: {
//     borderWidth: moderateScale(2),
//     width: "45%",
//     alignItems: "center",
//     padding: moderateScale(10),
//     borderRadius: moderateScale(10),
//   },
//   button: {
//     borderWidth: moderateScale(2),
//     width: "40%",
//     padding: moderateScale(10),
//     borderRadius: moderateScale(10),
//     alignItems: "center",
//     borderColor: Colors.Primary,
//     backgroundColor: Colors.Primary,
//   },
//   buttontext: {
//     color: Colors.White,
//     fontFamily: FontFamily.P_600,
//     fontSize: textScale(14),
//   },
//   buttonHolder: {
//     padding: moderateScale(10),
//     width: "95%",
//     marginVertical: moderateScaleVertical(10),
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   activeButton: {},
//   activeButtonText: {
//     color: Colors.Primary,
//     fontSize: textScale(14),
//     fontFamily: FontFamily.P_400,
//   },
//   inactiveButton: {
//     backgroundColor: Colors.LightGrey,
//     borderColor: Colors.LightGrey,
//   },
//   filterOptionText: {
//     fontSize: textScale(14),
//     color: Colors.Black,
//     fontFamily: FontFamily.P_400,
//   },
// });


import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Colors from "../../Theme/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";

const AGE_RANGES = [
  "0-10",
  "10-20",
  "20-30",
  "30-40",
  "40-50",
  "50-60",
  "60-70",
  "70-100",
];
const CHECKUP_TYPES = [
  { label: "Regular", value: 1 },
  { label: "Emergency", value: 0 },
];

const AppointmentFilter = ({ rbSheetRef, applyFilters, initialFilters }) => {
  const [selectedCheckUp, setSelectedCheckup] = useState(null);
  const [selectedAgeRange, setSelectedAgeRange] = useState(null);

  useEffect(() => {
    if (initialFilters) {
      setSelectedCheckup(initialFilters.checkupType || null);
      setSelectedAgeRange(initialFilters.ageRange || null);
    }
  }, [initialFilters]);

  const handleApplyFilter = () => {
    const filter = {
      checkupType: selectedCheckUp,
      ageRange: selectedAgeRange,
    };
    applyFilters(filter);
    rbSheetRef.current?.close(); // Close RBSheet
  };

  const handleClearFilter = () => {
    setSelectedCheckup(null);
    setSelectedAgeRange(null);
    applyFilters({ checkupType: null, ageRange: null });
    rbSheetRef.current?.close(); // Close RBSheet
  };

  const renderButtons = (data, selectedValue, setSelectedValue) =>
    data.map((item) => (
      <TouchableOpacity
        key={item.value || item}
        onPress={() => setSelectedValue(item.value || item)}
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
    <View style={styles.filterContainer}>
      {/* Header */}
      <View style={styles.innerView}>
        <Text></Text>
        <Text style={styles.headerText}>Filter</Text>
        <TouchableOpacity onPress={() => rbSheetRef.current?.close()}>
          <AntDesign
            name="close"
            size={textScale(25)}
            color={Colors.Black}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Check-Up Type */}
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

        {/* Age Range */}
        <View style={styles.contentHolder}>
          <Text style={styles.text}>Age Range</Text>
          <View style={[styles.filterOptionHolder, styles.wrapHolder]}>
            {renderButtons(AGE_RANGES, selectedAgeRange, setSelectedAgeRange)}
          </View>
        </View>
      </ScrollView>

      {/* Actions */}
      <View style={styles.separator} />
      <View style={styles.buttonHolder}>
        <TouchableOpacity onPress={handleApplyFilter} style={styles.button}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClearFilter} style={styles.resetButton}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppointmentFilter;

// const styles = StyleSheet.create({
//   filterContainer: {
//     flex: 1,
//     backgroundColor: Colors.White,
//     borderTopLeftRadius: moderateScale(10),
//     borderTopRightRadius: moderateScale(10),
//   },
//   innerView: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: moderateScale(10),
//   },
//   headerText: {
//     fontSize: textScale(18),
//     color: Colors.Tertiary,
//     fontFamily: FontFamily.P_600,
//   },
//   separator: {
//     width: "100%",
//     height: 1,
//     backgroundColor: Colors.MediumGrey,
//   },
//   scrollView: {
//     flex: 1,
//     padding: moderateScale(10),
//   },
//   contentHolder: {
//     marginBottom: moderateScaleVertical(20),
//   },
//   text: {
//     fontSize: textScale(16),
//     fontFamily: FontFamily.P_500,
//     color: Colors.MediumGrey,
//     marginBottom: moderateScaleVertical(10),
//   },
//   filterOptionHolder: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: moderateScale(10),
//   },
//   filterButton: {
//     borderWidth: 1,
//     borderColor: Colors.LightGrey,
//     borderRadius: moderateScale(8),
//     paddingVertical: moderateScaleVertical(8),
//     paddingHorizontal: moderateScale(12),
//     alignItems: "center",
//   },
//   activeButton: {
//     borderColor: Colors.Primary,
//     backgroundColor: Colors.LightGrey,
//   },
//   activeButtonText: {
//     color: Colors.Primary,
//     fontFamily: FontFamily.P_500,
//   },
//   inactiveButton: {
//     borderColor: Colors.LightGrey,
//     backgroundColor: Colors.White,
//   },
//   filterOptionText: {
//     color: Colors.Black,
//     fontFamily: FontFamily.P_400,
//     fontSize: textScale(14),
//   },
//   buttonHolder: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: moderateScale(15),
//   },
//   button: {
//     backgroundColor: Colors.Primary,
//     paddingVertical: moderateScaleVertical(10),
//     paddingHorizontal: moderateScale(20),
//     borderRadius: moderateScale(8),
//     alignItems: "center",
//   },
//   buttonText: {
//     color: Colors.White,
//     fontSize: textScale(14),
//     fontFamily: FontFamily.P_600,
//   },
//   resetButton: {
//     borderWidth: 1,
//     borderColor: Colors.LightGrey,
//     paddingVertical: moderateScaleVertical(10),
//     paddingHorizontal: moderateScale(20),
//     borderRadius: moderateScale(8),
//     alignItems: "center",
//   },
//   resetText: {
//     color: Colors.Black,
//     fontSize: textScale(14),
//     fontFamily: FontFamily.P_400,
//   },
// });

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
    backgroundColor: Colors.White,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    paddingHorizontal: moderateScale(20), // Add padding for better spacing
    paddingTop: moderateScaleVertical(10), // Slight top padding
  },
  innerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: moderateScaleVertical(10),
  },
  headerText: {
    fontSize: textScale(18),
    color: Colors.Tertiary,
    fontFamily: FontFamily.P_600,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.MediumGrey,
    marginVertical: moderateScaleVertical(10),
  },
  scrollView: {
    flex: 1,
  },
  contentHolder: {
    marginBottom: moderateScaleVertical(20),
  },
  text: {
    fontSize: textScale(16),
    fontFamily: FontFamily.P_500,
    color: Colors.MediumGrey,
    marginBottom: moderateScaleVertical(10),
  },
  filterOptionHolder: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: moderateScale(10),
    justifyContent: "space-between", // Align buttons properly
  },
  filterButton: {
    borderWidth: 1,
    borderColor: Colors.LightGrey,
    borderRadius: moderateScale(8),
    paddingVertical: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(12),
    alignItems: "center",
    minWidth: "30%", // Set a minimum width for consistent alignment
  },
  activeButton: {
    borderColor: Colors.Primary,
    backgroundColor: Colors.LightGrey,
  },
  activeButtonText: {
    color: Colors.Primary,
    fontFamily: FontFamily.P_500,
  },
  inactiveButton: {
    borderColor: Colors.LightGrey,
    backgroundColor: Colors.White,
  },
  filterOptionText: {
    color: Colors.Black,
    fontFamily: FontFamily.P_400,
    fontSize: textScale(14),
  },
  buttonHolder: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: moderateScale(15),
  },
  button: {
    backgroundColor: Colors.Primary,
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(8),
    alignItems: "center",
  },
  buttonText: {
    color: Colors.White,
    fontSize: textScale(14),
    fontFamily: FontFamily.P_600,
  },
  resetButton: {
    borderWidth: 1,
    borderColor: Colors.LightGrey,
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(8),
    alignItems: "center",
  },
  resetText: {
    color: Colors.Black,
    fontSize: textScale(14),
    fontFamily: FontFamily.P_400,
  },
});
