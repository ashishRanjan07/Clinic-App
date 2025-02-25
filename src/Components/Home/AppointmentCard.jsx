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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import Colors from "../../Theme/Colors";
import Data from "../../Assets/Json/Home.json";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import MapProgress from "../../Components/General/ProgressBar";
import axios from "axios";
import {
  GET_ALL_PATIENTS_LIST,
  GET_APPOINTMENT_HISTORY,
  serverAddress,
} from "../../API_Services/API_service";
import ButtonWithIcon from "../General/ButtonWithIcon";

const AppointmentCard = ({ allPatients, setAllPatientsList, newArray }) => {
  const navigation = useNavigation();
  const staticImageURL = "https://picsum.photos/300";
  const [expandedCard, setExpandedCard] = useState(null);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [markCompleted, setMarkCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAllPatientsList = async () => {
    setLoading(true);
    try {
      const response = await GET_ALL_PATIENTS_LIST();
      if (!response) {
        return `Can't connect to server`;
      } else if (response?.error === true) {
        return response;
      } else {
        setAllPatientsList(response.allPatient);
      }
    } catch (error) {
      return error?.message;
    }
  };

  const handleDelete = (item) => {
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
          onPress: async () => await deletePatient(item),
        },
      ],
      { cancelable: false }
    );
  };

  const deletePatient = async (item) => {
    let obj = new Object();
    obj["id"] = item.id;
    console.log("itemID", item.id);
    let url = `${serverAddress}patient/delete`;
    try {
      const response = await axios.delete(url, {
        params: {
          id: item.id,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Server Response:", response?.data);

      setExpandedCard(null);
      if (response?.data?.success) {
        Alert.alert("Success", "Patient Deleted Successfully!", [
          {
            text: "OK",
            onPress: async () => await getAllPatientsList(),
          },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
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
          onPress: () =>
            navigation.navigate("Doctor availability", {
              incoming: "Reschedule",
            }),
        },
      ],
      { cancelable: false }
    );
  };
  const renderItem = ({ item, index }) => {
    const isExpanded = expandedCard === index;
    const handleCardPress = (item) => {
      // console.log(item, "Line 122");
      if (isExpanded) {
        setExpandedCard(null);
      } else {
        setExpandedCard(index);
        getAppointmentHistory(index);
      }
    };

    const getAppointmentHistory = async (index) => {
      console.log(index, "Line 132");
      try {
        const response = await GET_APPOINTMENT_HISTORY(index);
        console.log("appointment history:", response);
        if (response && response.prescription) {
          setAppointmentHistory(response?.prescription);
        }
      } catch (e) {
        console.log(e?.message);
      }
    };
    return (
      <TouchableOpacity
        style={styles.renderTouch}
        onPress={() => handleCardPress(item)}
      >
        <View style={styles.itemHolder}>
          <View style={styles.imageHolder}>
            <Image
              source={{ uri: staticImageURL }}
              resizeMode="cover"
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.detailsHolder}>
            <View style={styles.nameHolder}>
              <Text style={styles.nameText}>
                {item?.dataValues?.first_name
                  ? item?.dataValues?.first_name
                  : ""}{" "}
                {item?.dataValues?.middle_name
                  ? item?.dataValues?.middle_name
                  : ""}{" "}
                {item?.dataValues?.last_name ? item?.dataValues?.last_name : ""}
              </Text>
              <Text style={styles.visitText}>
                {item?.dataValues?.no_of_visits
                  ? item?.dataValues?.no_of_visits + " Visits"
                  : "0 Visit"}
              </Text>
            </View>
            <View style={styles.patientsDetailsHolder}>
              <Text style={styles.descriptionText}>
                {item?.dataValues?.age
                  ? item?.dataValues?.age + " years"
                  : "N/A"}
              </Text>
              <Text style={styles.descriptionText}> |</Text>
              <View style={styles.patientsDetailsHolder}>
                <FontAwesome
                  name={item?.dataValues?.gender === "Male" ? "male" : "female"}
                  color={Colors.MediumGrey}
                  size={responsiveFontSize(20)}
                />
                <Text style={styles.descriptionText}>
                  {item?.dataValues?.gender ? item?.dataValues?.gender : "N/A"}
                </Text>
              </View>
              <Text style={styles.descriptionText}> |</Text>
              <Feather
                name={"smartphone"}
                color={Colors.MediumGrey}
                size={responsiveFontSize(20)}
              />
              <Text style={styles.descriptionText}>
                {item?.dataValues?.phone_number
                  ? item?.dataValues?.phone_number
                  : "N/A"}
              </Text>
            </View>
          </View>
        </View>
        {isExpanded && (
          <>
            <View style={styles.buttonHolder}>
              <View style={{ width: "30%" }}>
                <ButtonWithIcon
                  title={"Add"}
                  backgroundColor={Colors.Primary}
                  textColor={Colors.White}
                  Icon={MaterialIcons}
                  iconName={"person-add"}
                  borderColor={Colors.Primary}
                  iconColor={Colors.White}
                  handleAction={() => navigation.navigate('AddmedicalDetails')}
                />
              </View>
              <View style={{ width: "30%" }}>
                <ButtonWithIcon
                  title={"Delete"}
                  backgroundColor={Colors.White}
                  textColor={Colors.Black}
                  Icon={MaterialIcons}
                  iconName={"delete-outline"}
                  borderColor={Colors.Black}
                  iconColor={Colors.Black}
                  handleAction={handleDelete}
                />
              </View>
              <View style={{ width: "33%" }}>
                <ButtonWithIcon
                  title={"Reschedule"}
                  backgroundColor={Colors.White}
                  textColor={Colors.Black}
                  Icon={Octicons}
                  iconName={"issue-reopened"}
                  borderColor={Colors.Black}
                  iconColor={Colors.Black}
                  handleAction={reschedule}
                />
              </View>
            </View>
            <View style={styles.separateLine} />
            <View style={styles.addressHolder}>
              <Text style={styles.nameText}>Patients Details</Text>
              <View style={styles.innerView}>
                <Text style={styles.addressText}>Address</Text>
                <Text style={styles.addressText2}>
                  {item?.dataValues?.address || "N/A"}
                </Text>
              </View>
              <View style={styles.innerView}>
                <Text style={styles.addressText}>Medical History</Text>
                <Text style={styles.addressText2}>
                  {item?.dataValues?.medical_history || "N/A"}
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: 10, alignItems: "center" }}>
              <Text style={styles.nameText}>Appointment History</Text>
            </View>
            {appointmentHistory.length > 0 ? (
              <>
                {appointmentHistory.map((appointment, appointmentIndex) => (
                  <View key={appointmentIndex} style={styles.paymentDetails}>
                    <View
                      style={{
                        flexDirection: "row",
                        padding: responsivePadding(10),
                        width: "100%",
                        backgroundColor: Colors.White,
                        borderRadius: responsivePadding(5),
                      }}
                    >
                      <View style={styles.detailsHolder2}>
                        <Text style={styles.amountText}>
                          {
                            appointment.appointment.appointment_date.split(
                              "T"
                            )[0]
                          }
                        </Text>
                        <View style={styles.timeHolder}>
                          <Ionicons
                            name="time-outline"
                            size={responsiveFontSize(15)}
                            color={Colors.Black}
                          />
                          <Text style={styles.text2}>
                            {appointment.appointment.time || "N/A"}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.detailsHolder2}>
                        <Text style={styles.amountText}>Disease</Text>
                        <Text style={styles.text2}>
                          {appointment?.symptoms || "N/A"}
                        </Text>
                      </View>
                      <View
                        style={[styles.detailsHolder2, { borderEndWidth: 0 }]}
                      >
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
                  </View>
                ))}
              </>
            ) : (
              <View
                style={{
                  padding: responsiveFontSize(10),
                  alignItems: "center",
                }}
              >
                <Text style={styles.text2}>No Appointment History Found</Text>
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={allPatients}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
    />
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  renderTouch: {
    borderWidth: responsivePadding(2),
    width: "98%",
    alignSelf: "center",
    marginVertical: responsivePadding(10),
    borderRadius: responsivePadding(10),
    backgroundColor: Colors.White,
    borderColor: Colors.White,
    overflow: "hidden",
    elevation: responsiveFontSize(5),
    shadowColor: "#000", // shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemHolder: {
    width: "80%",
    padding: responsivePadding(5),
    borderRadius: responsivePadding(5),
    flexDirection: "row",
    gap: responsivePadding(5),
  },
  imageHolder: {
    width: "25%",
    borderRadius: responsiveFontSize(5),
    overflow: "hidden",
    backgroundColor: Colors.White,
    alignItems: "center",
  },
  imageStyle: {
    width: "100%",
    height: responsivePadding(90),
    borderRadius: responsivePadding(5),
  },
  nameHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  patientsDetailsHolder: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveFontSize(5),
  },
  dataHolder: {
    flexDirection: "row",
    gap: responsivePadding(10),
  },
  nameText: {
    color: Colors.Tertiary,
    marginLeft: responsivePadding(5),
    fontSize: responsiveFontSize(18),
    fontWeight: "500",
  },
  visitText: {
    color: Colors.Primary,
    fontSize: responsiveFontSize(15),
    fontWeight: "400",
    marginRight: 10,
  },
  contentHolder: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "75%",
  },
  lowerContentHolder: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  descriptionText: {
    fontSize: responsiveFontSize(13),
    color: Colors.Grey,
    fontWeight: "500",
  },
  separateLine: {
    borderWidth: 1,
    marginTop: responsivePadding(10),
    borderColor: Colors.MediumGrey,
    backgroundColor: Colors.MediumGrey,
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
    borderRadius: responsivePadding(5),
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: Colors.Secondary,
    borderWidth: 2,
    width: "95%",
    alignSelf: "center",
    borderColor: Colors.White,
    alignItems: "center",
  },
  detailsHolder: {
    width: "100%",
    backgroundColor: Colors.White,
    justifyContent: "space-around",
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
  },
  detailsHolder2: {
    gap: responsivePadding(20),
    alignItems: "center",
    paddingRight: responsivePadding(10),
    backgroundColor: Colors.White,
    width: "33%",
  },
  amountText: {
    color: Colors.Primary,
    fontSize: responsiveFontSize(14),
    fontWeight: "600",
  },
  text2: {
    textAlign: "center",
    color: "gray",
  },
  timeHolder: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsivePadding(5),
  },
  buttonHolder: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    color: Colors.White,
    fontSize: responsiveFontSize(18),
    fontWeight: "400",
  },
  upperButton: {
    marginVertical: responsivePadding(10),
    width: "100%",
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
    width: "95%",
    alignSelf: "center",
    marginVertical: responsiveFontSize(10),
  },
  addressText: {
    color: Colors.MediumGrey,
    fontSize: responsiveFontSize(16),
    fontWeight: "600",
    width: "40%",
  },
  addressText2: {
    color: Colors.MediumGrey,
    fontSize: responsiveFontSize(16),
    fontWeight: "600",
    width: "65%",
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
