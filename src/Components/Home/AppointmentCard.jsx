import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import Colors from "../../Theme/Colors";
import Data from "../../Assets/Json/Home.json";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
const AppointmentCard = () => {
  const navigation = useNavigation();
  const staticImageURL = "https://picsum.photos/300";
  const [expandedCard, setExpandedCard] = useState(null);

  const handleDelete = () => {
    Alert.alert(
      "Delete ?",
      "are you sure you want to delete the appointment?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => console.log("Confirm Pressed"),
        },
      ],
      { cancelable: false }
    );
  };
  const reschedule = () => {
    Alert.alert(
      "Reschedule ?",
      "are you sure you want to reschedule the appointment?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Reschedule",
          onPress: () => console.log("Confirm Pressed"),
        },
      ],
      { cancelable: false }
    );
  }
  const renderItem = ({ item, index }) => {
    const isExpanded = expandedCard === index;
    const handleCardPress = () => {
      if (isExpanded) {
        setExpandedCard(null);
      } else {
        setExpandedCard(index);
      }
    };
    return (
      <TouchableOpacity style={styles.renderTouch} onPress={handleCardPress}>
        {/* Content View */}
        <View style={styles.dataHolder}>
          <Image
            source={{ uri: staticImageURL }}
            resizeMode="cover"
            style={styles.imageStyle}
          />
          <View style={{ justifyContent: "space-around" }}>
            <View style={styles.contentHolder}>
              <Text style={styles.nameText}>{item?.name}</Text>
              <Text style={styles.visittext}>
                {item?.no_of_past_appointment} Visits
              </Text>
            </View>
            <View style={styles.lowerContentHolder}>
              <Text style={styles.descriptionText}>{item?.age} years</Text>
              <Text style={styles.seprator}>|</Text>
              <Text style={styles.descriptionText}>{item?.gender}</Text>
              <Text style={styles.seprator}>|</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="call-outline"
                  size={responsiveFontSize(20)}
                  color={Colors.MediumGrey}
                />
                <Text style={styles.descriptionText}>{item?.mobile}</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Button View */}
        {isExpanded && (
          <View style={styles.upperButton}>
            <TouchableOpacity
              style={styles.buttonHolder}
              onPress={() => navigation.navigate("Medical Details")}
            >
              <Ionicons
                name="person-add-outline"
                size={responsiveFontSize(25)}
                color={Colors.White}
              />
              <Text style={styles.text}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={[
                styles.buttonHolder,
                {
                  backgroundColor: Colors.White,
                  borderColor: Colors.MediumGrey,
                  width: "30%",
                },
              ]}
            >
              <AntDesign
                name="delete"
                size={responsiveFontSize(25)}
                color={Colors.Black}
              />
              <Text style={[styles.text, { color: Colors.Black }]}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={reschedule}
              style={[
                styles.buttonHolder,
                {
                  backgroundColor: Colors.White,
                  borderColor: Colors.MediumGrey,
                  width: "45%",
                },
              ]}
            >
              <MaterialIcons
                name="history"
                size={responsiveFontSize(25)}
                color={Colors.Black}
              />
              <Text style={[styles.text, { color: Colors.Black }]}>
                Reschedule
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Lower details */}
        {isExpanded && (
          <View style={styles.expandedDetails}>
            {/* Address Details */}
            <View style={styles.addressHolder}>
              <Text style={styles.nameText}>Patients Details</Text>
              <View style={styles.innerView}>
                <Text style={styles.addressText}>Address</Text>
                <Text style={styles.addressText2}>{item?.address}</Text>
              </View>
              <View style={styles.innerView}>
                <Text style={styles.addressText}>Medical History</Text>
                <Text style={styles.addressText2}>{item?.medical_history}</Text>
              </View>
            </View>
            <View style={{ marginVertical: 10, alignItems: "center" }}>
              <Text style={styles.nameText}>Appointment History</Text>
            </View>
            {item.appointment_history.map((appointment, appointmentIndex) => (
              <View key={appointmentIndex} style={styles.paymentDetails}>
                <View style={styles.detailsHolder}>
                  <Text style={styles.amountText}>
                    {appointment.date_of_appointment}
                  </Text>
                  <View style={styles.timeHolder}>
                    <Ionicons
                      name="time-outline"
                      size={responsiveFontSize(15)}
                      color={Colors.Black}
                    />
                    <Text style={styles.text2}>
                      {appointment.timing_of_visit}
                    </Text>
                  </View>
                </View>
                <View style={styles.detailsHolder}>
                  <Text style={styles.amountText}>Disease</Text>
                  <Text style={styles.text2}>
                    {appointment?.main_regions_for_visit}
                  </Text>
                </View>
                <View style={[styles.detailsHolder, { borderEndWidth: 0 }]}>
                  <Text style={styles.amountText}>Prescription</Text>
                  <TouchableOpacity style={styles.print}>
                    <Ionicons
                      name="print-outline"
                      size={responsiveFontSize(20)}
                      color={Colors.White}
                    />
                    <Text style={styles.printText}>Print</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={Data?.patients}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
    />
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  renderTouch: {
    borderWidth: responsivePadding(2),
    width: "95%",
    alignSelf: "center",
    padding: responsivePadding(10),
    marginVertical: responsivePadding(10),
    borderRadius: responsivePadding(10),
    backgroundColor: Colors.White,
    borderColor: Colors.White,
  },
  imageStyle: {
    width: responsiveFontSize(75),
    height: responsivePadding(100),
  },
  dataHolder: {
    flexDirection: "row",
    gap: responsivePadding(10),
    // alignItems: 'center',
  },
  nameText: {
    color: Colors.Tertiary,
    fontSize: responsiveFontSize(18),
    fontWeight: "600",
  },
  visittext: {
    color: Colors.Primary,
    fontSize: responsiveFontSize(18),
    fontWeight: "600",
  },
  contentHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
  },
  lowerContentHolder: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // gap:responsivePadding(10),
  },
  descriptionText: {
    fontSize: responsiveFontSize(14),
    color: Colors.MediumGrey,
    fontWeight: "500",
  },
  seprator: {
    color: Colors.Tertiary,
    fontSize: responsiveFontSize(18),
    fontWeight: "600",
  },
  expandedDetails: {
    marginTop: responsivePadding(10),
    padding: responsivePadding(10),
    backgroundColor: Colors.White,
    borderRadius: responsivePadding(10),
    width: "100%",
    alignSelf: "center",
    marginBottom: responsivePadding(10),
  },
  paymentDetails: {
    padding: responsivePadding(10),
    marginVertical: responsivePadding(10),
    borderRadius: responsivePadding(10),
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: Colors.Secondary,
  },
  detailsHolder: {
    // borderEndWidth: 2,
    gap: responsivePadding(20),
    // borderColor: Colors.MediumGrey,
    alignItems: "center",
    paddingRight: responsivePadding(10),
    // backgroundColor:Colors.White
  },
  amountText: {
    color: Colors.Primary,
    fontSize: responsiveFontSize(16),
    fontWeight: "600",
  },
  text2: {
    textAlign: "center",
  },
  timeHolder: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsivePadding(5),
  },
  buttonHolder: {
    borderWidth: responsivePadding(2),
    padding: responsivePadding(10),
    width: "25%",
    alignItems: "center",
    borderRadius: responsivePadding(10),
    borderColor: Colors.Primary,
    backgroundColor: Colors.Primary,
    flexDirection: "row",
    gap: responsivePadding(10),
    justifyContent: "space-around",
  },
  text: {
    color: Colors.White,
    fontSize: responsiveFontSize(18),
    fontWeight: "600",
  },
  upperButton: {
    marginVertical: responsivePadding(10),
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: responsivePadding(10),
  },
  addressHolder: {
    borderWidth: 1,
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    alignItems: "center",
    gap: responsivePadding(10),
    backgroundColor: Colors.Secondary,
    borderColor: Colors.White,
    width: "100%",
  },
  addressText: {
    color: Colors.MediumGrey,
    fontSize: responsiveFontSize(16),
    fontWeight: "600",
    width: "30%",
  },
  addressText2: {
    color: Colors.MediumGrey,
    fontSize: responsiveFontSize(16),
    fontWeight: "600",
    width: "80%",
  },
  innerView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  print: {
    borderWidth: responsivePadding(2),
    padding: responsivePadding(5),
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: responsivePadding(5),
    gap: responsivePadding(5),
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
  printText: {
    color: Colors.White,
    fontWeight: "600",
    fontSize: responsiveFontSize(16),
  },
});
