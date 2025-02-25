// import React from "react";
// import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
// import Colors from "../../Theme/Colors";
// import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";

// const AppointmentSlider = ({ activeSection, onSectionChange }) => {
//   const handleSectionPress = (sectionName) => {
//     onSectionChange(sectionName);
//   };

//   const getSectionStyle = (sectionName) => {
//     return activeSection === sectionName
//       ? styles.activeSection
//       : styles.inactiveSection;
//   };

//   const getSectionTextStyle = (sectionName) => {
//     return activeSection === sectionName
//       ? styles.activeText
//       : styles.inactiveText;
//   };

//   return (
//     <View style={styles.main}>
//       <TouchableOpacity
//         style={[styles.sectionHolder, getSectionStyle("upcoming")]}
//         onPress={() => handleSectionPress("upcoming")}
//       >
//         <Text style={[styles.text, getSectionTextStyle("upcoming")]}>
//           Upcoming
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.sectionHolder, getSectionStyle("missed")]}
//         onPress={() => handleSectionPress("missed")}
//       >
//         <Text style={[styles.text, getSectionTextStyle("missed")]}>Missed</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.sectionHolder, getSectionStyle("completed")]}
//         onPress={() => handleSectionPress("completed")}
//       >
//         <Text style={[styles.text, getSectionTextStyle("completed")]}>
//           Completed
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   main: {
//     backgroundColor: Colors.White,
//     width: "95%",
//     alignSelf: "center",
//     marginVertical: responsivePadding(20),
//     borderRadius: responsivePadding(10),
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   sectionHolder: {
//     width: "33%",
//     padding: responsivePadding(15),
//     borderRadius: responsivePadding(10),
//     alignItems: "center",
//     height: responsivePadding(50),
//   },
//   activeSection: {
//     backgroundColor: Colors.Primary,
//   },
//   inactiveSection: {
//     backgroundColor: Colors.White,
//   },
//   text: {
//     fontSize: responsiveFontSize(16),
//     fontWeight: "400",
//   },
//   activeText: {
//     color: Colors.White,
//   },
//   inactiveText: {
//     color: Colors.MediumGrey,
//   },
// });

// export default AppointmentSlider;


import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Colors from "../../Theme/Colors";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";

const AppointmentSlider = ({ activeSection, onSectionChange }) => {
  const handleSectionPress = (sectionName) => {
    onSectionChange(sectionName);
  };

  const getSectionStyle = (sectionName) => {
    return activeSection === sectionName
      ? styles.activeSection
      : styles.inactiveSection;
  };

  const getSectionTextStyle = (sectionName) => {
    return activeSection === sectionName
      ? styles.activeText
      : styles.inactiveText;
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={[styles.sectionHolder, getSectionStyle("upcoming")]}
        onPress={() => handleSectionPress("upcoming")}
      >
        <Text style={[styles.text, getSectionTextStyle("upcoming")]}>
          Upcoming
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.sectionHolder, getSectionStyle("missed")]}
        onPress={() => handleSectionPress("missed")}
      >
        <Text style={[styles.text, getSectionTextStyle("missed")]}>Missed</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.sectionHolder, getSectionStyle("completed")]}
        onPress={() => handleSectionPress("completed")}
      >
        <Text style={[styles.text, getSectionTextStyle("completed")]}>
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.White,
    width: "95%",
    alignSelf: "center",
    marginVertical: responsivePadding(20),
    borderRadius: responsivePadding(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionHolder: {
    width: "33%",
    padding: responsivePadding(15),
    borderRadius: responsivePadding(10),
    alignItems: "center",
    height: responsivePadding(50),
  },
  activeSection: {
    backgroundColor: Colors.Primary,
  },
  inactiveSection: {
    backgroundColor: Colors.White,
  },
  text: {
    fontSize: responsiveFontSize(16),
    fontWeight: "400",
  },
  activeText: {
    color: Colors.White,
  },
  inactiveText: {
    color: Colors.MediumGrey,
  },
});

export default AppointmentSlider;
