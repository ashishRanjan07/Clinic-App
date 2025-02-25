import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../Theme/Colors";
import { Calendar } from "react-native-calendars";
import Button from "../General/Button";
import { useNavigation } from "@react-navigation/native";
import Popup from "../General/Popup";
import Service from "../../Service/Service";
const DoctorAvailability = ({ route }) => {
  const { incoming } = route.params;
  console.log(incoming, "Line 21");
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("morning");
  const [selectedTime, setSelectedTime] = useState(null);
  const [visible, setIsVisible] = useState(false);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setSelectedSlot("morning");
  };

  const selectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  const sendData = () => {
    Service.selectedDate = selectedDate;
    Service.selectedTime = selectedTime;
    navigation.goBack();
  };
  // Generate time slots at 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    let startTime, endTime;

    if (selectedSlot === "morning") {
      startTime = 10 * 60;
      endTime = 15.5 * 60;
    } else {
      startTime = 16 * 60;
      endTime = 21 * 60;
    }

    let currentTime = startTime;

    while (currentTime < endTime) {
      const hours = Math.floor(currentTime / 60);
      const minutes = currentTime % 60;
      const time = `${hours < 10 ? "0" + hours : hours}:${
        minutes === 0 ? "00" : minutes
      } ${hours < 12 ? "am" : "pm"}`;

      slots.push(time);
      currentTime += 30;
    }

    return slots;
  };

  const handleSlotSelection = (item) => {
    setSelectedTime(item);
  };

  function formatDate(inputDate) {
    // Parse input date string into a Date object
    const date = new Date(inputDate);

    // Define months array for month name conversion
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth(); // Get month index (0-11)
    const year = date.getFullYear(); // Get full year (YYYY)

    // Create formatted date string in 'DD MMM YYYY' format
    const formattedDate = `${day} ${months[monthIndex]} ${year}`;
    // console.log(formattedDate)

    return formattedDate;
  }

  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.Secondary }} />
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.Secondary} />
      <View style={styles.main}>
        <TouchableOpacity
          style={styles.headerHolder}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={responsiveFontSize(30)}
            color={Colors.Black}
          />
          <Text style={styles.text}>Select Date & Time</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Calendar */}
        <View style={styles.calendarHolder}>
          <Calendar
            minDate={new Date()}
            current={new Date().toISOString().split("T")[0]}
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: Colors.Primary },
            }}
          />
        </View>
        {/* Appointment Timing */}
        <View style={styles.checkup}>
          <Text style={styles.text}>Appointment Timing</Text>
          <View style={styles.checkupHolder}>
            <TouchableOpacity
              style={[
                styles.Button,
                selectedSlot === "morning"
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => selectSlot("morning")}
            >
              <Text
                style={[
                  styles.buttontext,
                  selectedSlot === "morning"
                    ? styles.activeButtonText
                    : styles.inactiveButtonText,
                ]}
              >
                Morning
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.Button,
                selectedSlot === "evening"
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => selectSlot("evening")}
            >
              <Text
                style={[
                  styles.buttontext,
                  selectedSlot === "evening"
                    ? styles.activeButtonText
                    : styles.inactiveButtonText,
                ]}
              >
                Evening
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Slots */}

        <Text style={styles.text1}>Slots</Text>

        <View style={styles.slotContainer}>
          {generateTimeSlots().map((slot, index) => (
            <TouchableOpacity
              onPress={() => handleSlotSelection(slot)}
              key={index}
              style={[
                styles.slotButton,
                selectedTime === slot
                  ? styles.selectedSlot
                  : styles.nonSelectedSlot,
              ]}
            >
              <Text
                style={
                  selectedTime === slot
                    ? styles.slotText
                    : styles.inactiveButtonText
                }
              >
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Button */}
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            marginVertical: responsivePadding(10),
          }}
        >
          <Button title={"Confirm"} handleAction={() => setIsVisible(true)} />
        </View>

        <Popup
          visible={visible}
          title="Success"
          description={`Appointment Scheduled ${`\n`} Successfully For:`}
          subtitle={!selectedDate ? "" : formatDate(selectedDate)}
          subtitle1={selectedTime}
          text="Close"
          onPress={() => sendData()}
        />
      </ScrollView>
    </>
  );
};

export default DoctorAvailability;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    padding: responsivePadding(10),
    backgroundColor: Colors.Secondary,
  },
  headerHolder: {
    margin: responsivePadding(10),
    flexDirection: "row",
    gap: responsivePadding(20),
    alignItems: "center",
  },
  text: {
    fontSize: responsiveFontSize(20),
    color: Colors.Black,
    fontWeight: "600",
  },
  text1: {
    fontSize: responsiveFontSize(20),
    padding: responsiveFontSize(10),
    color: Colors.Black,
    fontWeight: "600",
  },
  calendarHolder: {
    borderWidth: responsivePadding(2),
    width: "95%",
    alignSelf: "center",
    borderRadius: responsivePadding(10),
    overflow: "hidden",
    borderColor: Colors.White,
    backgroundColor: Colors.White,
    elevation: responsivePadding(10),
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
    shadowRadius: responsivePadding(3),
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
  checkup: {
    width: "95%",
    padding: responsivePadding(10),
    alignSelf: "center",
    marginVertical: responsivePadding(10),
    gap: responsivePadding(10),
  },
  checkupHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: responsivePadding(10),
    marginVertical: responsivePadding(10),
  },
  Button: {
    width: "45%",
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderColor: Colors.MediumGrey,
    borderWidth: responsivePadding(2),
  },
  buttontext: {
    color: Colors.White,
    fontWeight: "600",
    fontSize: responsiveFontSize(18),
  },
  slotContainer: {
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: responsivePadding(20),
  },

  slotButton: {
    width: "30%",
    borderWidth: responsivePadding(2),
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    alignItems: "center",

    borderColor: Colors.MediumGrey,
    marginTop: responsivePadding(10),
  },
  slotText: {
    color: Colors.White,
    fontWeight: "600",
    fontSize: responsiveFontSize(16),
  },
  activeButton: {
    backgroundColor: Colors.Primary,
  },
  activeButtonText: {
    color: Colors.White,
  },
  inactiveButton: {
    backgroundColor: "transparent",
  },
  inactiveButtonText: {
    color: Colors.Tertiary,
  },
  selectedSlot: {
    backgroundColor: Colors.Primary,
    color: Colors.Grey,
  },
  nonSelectedSlot: {
    backgroundColor: "transparent",
    color: Colors.Grey,
  },
});
