import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import images from "../../Theme/Image";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import Colors from "../../Theme/Colors";
import Data from "../../Assets/Json/AppointmentsData.json";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

import Modal from "react-native-modal";
import Button from "../General/Button";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import EditAppointment from "./EditAppointment";
import Popup from "../General/Popup";
import moment from "moment";
import { dateWiseAppointment, markvisited } from "../../API_Services/Auth_API";
import NoAppointmentList from "../Home/NoAppointmentList";
import { GET_APPOINtMENT_BY_DATE } from "../../API_Services/API_service";
import queryString from "query-string";
import {
  moderateScale,
  moderateScaleVertical,
} from "../../utils/ResponsiveSize";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// auth commit
const AppointmentCard = ({
  activeSection,
  setAllAppointments,
  allAppointments,
  userdata,
  val,
}) => {
  const navigation = useNavigation();
  const staticImageURL = "https://picsum.photos/300";
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [appointmentEditModal, setEditAppointmentModal] = useState(false);
  const [appointmentMarkCompleteModal, setAppointmentMarkCompleteModal] =
    useState(false);
  const [markCompleted, setMarkCompleted] = useState(false);

  let isExpanded;

  const filterAppointmentsByStatus = (status) => {
    return allAppointments.filter(
      (appointment) => appointment.appointment_status === status
    );
  };

  const filterAppointmentByDate = async () => {
    let data = {
      date: selectedDay,
      clinic_id: userdata?.clinic_staff?.clinic_id,
    };
    console.log("1111==", data);
    const query = queryString.stringify(data);
    const response = await GET_APPOINtMENT_BY_DATE(query);
    console.log(response);
    if (response?.count > 0) {
      setAllAppointments(response?.appointments);
      setShowModal(false);
    } else {
      setAllAppointments([]);
    }
  };

  const formatDate = (inputDate) => {
    // Parse the input date string
    const dateObj = new Date(inputDate);

    // Define arrays for days and months
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Extract day of the week, month, and day of the month
    const dayOfWeek = daysOfWeek[dateObj.getDay()];
    const month = monthsOfYear[dateObj.getMonth()];
    const dayOfMonth = dateObj.getDate();

    // Format the date string as "Mon, Jul 05"
    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth
      .toString()
      .padStart(2, "0")}`;

    return formattedDate;
  };

  const handleCheckCircle = (item, index) => {
    Alert.alert(
      "Mark Appointment Completed",
      "Do you want to mark this appointment completed?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            markAppointmentCompleted(item?.id);
          },
        },
      ]
    );

    // setMarkCompleted(true)
  };

  // const markAppointmentCompleted = async(index)=>{

  //    const response = await markvisited(index)
  //    if(response?.success){
  //     console.log('Appointment Marked as Completed!!')
  //     const updateAppointments = [...allAppointments]
  //     updateAppointments.splice(index, 1)
  //     setAllAppointments(updateAppointments)

  //    }
  // }

  const markAppointmentCompleted = async (index) => {
    try {
      // Call the API to mark the appointment as completed
      const response = await markvisited(index);

      if (response?.success) {
        console.log("Appointment Marked as Completed!!");

        setAllAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== index)
        );
      } else {
        Alert.alert("Error", "Unable to mark appointment as completed.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "An error occurred while marking the appointment as completed."
      );
    }
  };
  const handleCancelAppointment = async (item, index) => {
    try {
      // Call API to update the appointment status to 'missed'
      const response = await markvisited(item.id); // Adjust if the API function name or parameters differ

      if (response?.success) {
        console.log("Appointment marked as missed!");

        // Update local state to reflect the change
        setAllAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === item.id
              ? { ...appointment, appointment_status: "missed" }
              : appointment
          )
        );

        // Optionally collapse the expanded card
        setExpandedCard(null);
      } else {
        Alert.alert("Error", "Unable to mark appointment as missed.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "An error occurred while marking the appointment as missed."
      );
    }
  };

  const handleCloseIcon = (item, index) => {
    Alert.alert("Edit Appointment", "Do you want to edit this appointment?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          console.log("Edit Appointment");
          handleCardPress(index);
        },
      },
    ]);
  };

  const handleCardPress = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };
  const leftSwipe = (item, index) => {
    if (item?.appointment_status === "completed") return null;
    return (
      <TouchableOpacity
        style={styles.swipleft}
        onPress={() => handleCheckCircle(item, index)}
      >
        <AntDesign
          name="checkcircleo"
          size={responsiveFontSize(24)}
          color={Colors.White}
        />
      </TouchableOpacity>
    );
  };
  const rightSwipe = (item, index) => {
    if (item?.appointment_status == "completed") return null;
    if (expandedCard === index) return null;
    return (
      <>
        {!expandedCard && (
          <TouchableOpacity
            style={[
              styles.swipleft,
              { backgroundColor: Colors.lightCrimsonRed },
            ]}
            onPress={() => handleCloseIcon(item, index)}
          >
            <AntDesign
              name="closecircleo"
              size={responsiveFontSize(24)}
              color={Colors.White}
            />
          </TouchableOpacity>
        )}
      </>
    );
  };

  const filteredAppointments = (() => {
    switch (activeSection) {
      case "Upcoming":
        return filterAppointmentsByStatus("upcoming");
      case "Missed":
        return filterAppointmentsByStatus("missed");
      case "Completed":
        return filterAppointmentsByStatus("completed");
      default:
        return [];
    }
  })();
  const toggleModal = async () => {
    console.log("toggle:", selectedDay);
    // const response = await dateWiseAppointment(selectedDay)
    // console.log("Date Response:",response)
    setShowModal(!showModal);
  };

  const toggleCompleteModal = () => {
    setAppointmentMarkCompleteModal(!appointmentMarkCompleteModal);
  };

  const onDayPress = (day) => {
    let d1 = day.dateString.split("-");
    // console.log(d1)
    let rearrangeDate = `${d1[2]}-${d1[1]}-${d1[0]}`;
    setSelectedDay(rearrangeDate);
  };

  let currentDate = new Date();

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Format the date string
  const formattedDate = dateFormatter.format(currentDate);

  const renderItem = ({ item, index }) => {
    return (
      <>
        <Swipeable
          renderLeftActions={() => leftSwipe(item, index)}
          renderRightActions={() => rightSwipe(item, index)}
        >
          <Pressable style={styles.renderTouch}>
            <View style={styles.upperView}>
              <Image
                source={{ uri: staticImageURL }}
                resizeMode="cover"
                style={styles.imageStyle}
              />
              <View style={styles.contentHolder}>
                <Text style={styles.text}>
                  {item?.patient?.first_name ? item?.patient?.first_name : ""}{" "}
                  {item?.patient?.middle_name ? item?.patient?.middle_name : ""}{" "}
                  {item?.patient?.last_name ? item?.patient?.last_name : ""}
                </Text>
                <View style={styles.innerView}>
                  <Text style={styles.ageText}>
                    {item?.patient?.age || "N/A"} Years
                  </Text>
                  <Text style={styles.ageText}>|</Text>
                  <View style={styles.secondaryInnerView}>
                    <Image
                      source={images.regular}
                      resizeMode="contain"
                      style={styles.secondaryImageStyle}
                    />
                    <Text style={styles.ageText}>
                      {item?.priority_level == 1 ? "Regular" : "Emergency"}
                    </Text>
                  </View>
                </View>
                <View style={styles.view}>
                  <View style={styles.view}>
                    <AntDesign
                      name="calendar"
                      size={responsiveFontSize(14)}
                      color={Colors.MediumGrey}
                    />
                    <Text style={styles.text2}>
                      {formatDate(item?.appointment_date)}
                    </Text>
                  </View>
                  <View style={styles.view}>
                    <AntDesign
                      name="clockcircleo"
                      size={responsiveFontSize(14)}
                      color={Colors.MediumGrey}
                    />
                    <Text style={styles.text2}>
                      {moment(item?.time, "HH:mm:ss").format("hh:mm A")}
                    </Text>
                  </View>
                  <View style={[styles.view, { gap: 0 }]}>
                    <Entypo
                      name="dot-single"
                      size={responsiveFontSize(18)}
                      color={
                        item?.appointment_status == "missed"
                          ? Colors.CrimsonRed
                          : item.appointment_status == "completed"
                          ? Colors.Green
                          : Colors.Primary
                      }
                    />
                    <Text style={styles.text2}>
                      {item?.appointment_status == "upcoming"
                        ? "Confirmed"
                        : item?.appointment_status == "missed"
                        ? "Missed"
                        : "Completed"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ alignSelf: "center", width: "100%" }}>
              {expandedCard == index && (
                <View style={styles.buttonHolder}>
                  <TouchableOpacity style={styles.buttonHolder1}>
                    <Feather
                      name="repeat"
                      size={moderateScale(20)}
                      color={Colors.White}
                    />
                    <Text style={styles.rescheduleText}>Reschedule</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.buttonHolder1,
                      {
                        backgroundColor: Colors.White,
                        borderWidth: 1.5,
                        borderColor: Colors.Black,
                      },
                    ]}
                  >
                    <MaterialIcons
                      name="cancel"
                      size={moderateScale(20)}
                      color={Colors.Primary}
                    />
                    <Text
                      style={[styles.rescheduleText, { color: Colors.Primary }]}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Pressable>
        </Swipeable>
        {/* Button View */}

        <Modal
          isVisible={appointmentEditModal}
          onBackdropPress={toggleModal}
          backdropOpacity={0.5}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          avoidKeyboard={true}
          style={styles.modal}
        >
          <View style={styles.modalContainer}>
            <View>
              <Text
                style={{
                  color: Colors.Black,
                  fontSize: responsiveFontSize(18),
                }}
              >{`Do You Want to Edit this`}</Text>
              <Text
                style={{
                  color: Colors.Black,
                  fontSize: responsiveFontSize(18),
                  textAlign: "center",
                }}
              >{`Appointment`}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleCardPress(item, index)}
                style={{
                  padding: responsivePadding(15),
                  backgroundColor: Colors.Primary,
                  borderRadius: responsivePadding(10),
                }}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setEditAppointmentModal(false)}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Popup
          visible={markCompleted}
          title="Mark Appointment Completed"
          description={`Do you want to mark this ${`\n`} Appointment as Complete?`}
          text="Close"
          onPress={() => sendData()}
        />
      </>
    );
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.main}>
        {/* Modal Popups */}
        <Modal
          isVisible={appointmentMarkCompleteModal}
          onBackdropPress={toggleCompleteModal}
          backdropOpacity={0.5}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          avoidKeyboard={true}
          style={styles.modal}
        >
          <View style={styles.modalContainer}>
            <View>
              <Text
                style={{
                  color: Colors.Black,
                  fontSize: responsiveFontSize(18),
                }}
              >{`Do You Want to Mark this Appointment Complete?`}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setAppointmentMarkCompleteModal(false)}
                style={{
                  padding: responsivePadding(15),
                  backgroundColor: Colors.Primary,
                  borderRadius: responsivePadding(10),
                }}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setAppointmentMarkCompleteModal(false)}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Render Appointments */}

        {allAppointments.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={allAppointments}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <NoAppointmentList title={"No Appointments yet!!"} />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: responsivePadding(10),
  },
  dateHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsivePadding(10),
  },
  icon: {
    width: responsivePadding(50),
    height: responsivePadding(50),
  },

  rescheduleText: {
    color: Colors.White,
    fontSize: responsivePadding(16),
  },
  cancelText: {
    color: Colors.Black,
    fontSize: responsivePadding(16),
  },
  renderTouch: {
    marginBottom: responsivePadding(10),
    padding: responsivePadding(10),
    borderRadius: responsivePadding(5),
    backgroundColor: Colors.White,
    elevation: 2,
  },
  imageStyle: {
    width: responsivePadding(75),
    height: responsivePadding(90),
    borderRadius: responsivePadding(10),
  },
  contentHolder: {
    flex: 1,
    marginLeft: responsivePadding(10),
    justifyContent: "center",
  },
  text: {
    color: Colors.Tertiary,
    fontSize: responsiveFontSize(18),
    fontWeight: "600",
    paddingBottom: responsivePadding(5),
  },
  ageText: {
    fontSize: responsiveFontSize(16),
    color: Colors.MediumGrey,
    fontWeight: "600",
  },
  upperView: {
    flexDirection: "row",
    alignItems: "center",
  },
  innerView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: responsivePadding(5),
    marginBottom: responsivePadding(13),
    gap: responsivePadding(20),
  },
  secondaryInnerView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: responsivePadding(5),
  },
  secondaryImageStyle: {
    width: responsivePadding(20),
    height: responsivePadding(20),
    marginRight: responsivePadding(5),
  },
  text2: {
    fontSize: responsiveFontSize(12),
    color: Colors.MediumGrey,
    fontWeight: "400",
  },
  view: {
    flexDirection: "row",
    gap: responsivePadding(5),
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: Colors.White,
    borderRadius: responsivePadding(10),
    padding: responsivePadding(25),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonHolder: {
    marginVertical: moderateScaleVertical(10),
    padding: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonHolder1: {
    width: "45%",
    borderRadius: moderateScale(10),
    backgroundColor: Colors.Primary,
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(20),
    justifyContent: "center",
    height: moderateScale(45),
  },
  swipleft: {
    marginBottom: responsivePadding(10),
    padding: responsivePadding(15),

    borderWidth: 0,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.Green,
    justifyContent: "center",
    borderRadius: 10,
    gap: 20,
  },

  upperButton: {
    marginVertical: responsivePadding(10),
    backgroundColor: Colors.White,
    padding: responsivePadding(10),
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: responsivePadding(40),
    borderWidth: 2,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 200,
    marginTop: 30,
  },
  buttonText: {
    color: Colors.White,
    fontSize: responsivePadding(16),
    fontWeight: "600",
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: Colors.Black,
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
  },
});

export default AppointmentCard;
