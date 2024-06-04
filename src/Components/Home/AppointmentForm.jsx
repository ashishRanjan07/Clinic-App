import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../Theme/Colors";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import images from "../../Theme/Image";
import Button from "../General/Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
import Entypo from "react-native-vector-icons/Entypo";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AppointmentForm = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [isFeeStatusModalVisible, setIsFeeStatusModalVisible] = useState(false);
  const [paid, setPaid] = useState("");
  const [selectedShift, setSelectedShift] = useState("Morning");
  const [selectedCheckup, setSelectedCheckup] = useState("Regular");
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setTimePickerVisible(false);
  };

  // Function to toggle the visibility of the time picker
  const toggleTimePicker = () => {
    setTimePickerVisible(!isTimePickerVisible);
  };


  const feeStatus = [
    { id: 1, name: "Paid" },
    { id: 2, name: "Not paid" },
  ];
  

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const paymentData = [
    { id: 1, name: "Online" },
    { id: 2, name: "Offline" },
  ];

  const togglePaymentModal = () => {
    setPaymentModalVisible(!isPaymentModalVisible);
  };

  const toggleFeeStatusModal = () => {
    setIsFeeStatusModalVisible(!isFeeStatusModalVisible);
  };

  const handlePaymentSelection = (selectedPayment) => {
    setPaymentMode(selectedPayment);
    togglePaymentModal();
  };

  const handleFeeStatusSelection = (selectedStatus) => {
    setPaid(selectedStatus);
    toggleFeeStatusModal();
  };

  const handleAppointment = async () => {};

  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.Secondary }} />
      <View style={styles.main2}>
        <TouchableOpacity
          style={styles.headerHolder}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={responsiveFontSize(30)}
            color={Colors.Black}
          />
          <Text style={styles.text2}>Schedule New Appointment</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        {/* Amount and Payment Modal */}
        <View style={styles.ageHolder}>
          <View style={{ width: "45%", gap: 10 }}>
            <Text style={styles.text}>Amount</Text>
            <TextInput
              style={[styles.inputBox]}
              placeholder="Amount"
              placeholderTextColor={Colors.MediumGrey}
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
          </View>
          {amount && (
            <View style={{ width: "45%", gap: 10 }}>
              <Text style={styles.text}>Payment Mode</Text>
              <TouchableOpacity onPress={togglePaymentModal}>
                <Text style={styles.inputBox}>
                  {paymentMode ? paymentMode : "Payment Mode"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {amount && paymentMode && (
          <View style={styles.ageHolder}>
            <Text style={styles.text}>Payment Status</Text>
            <TouchableOpacity
              style={{ width: "45%" }}
              onPress={toggleFeeStatusModal}
            >
              <Text style={styles.inputBox}>
                {paid ? paid : "Payment Mode"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Shift */}
        <View style={styles.checkup}>
          <Text style={styles.text}>Choose Shift</Text>
          <View style={styles.checkupHolder}>
            <TouchableOpacity
              style={[
                styles.Button,
                selectedShift === "Morning" && styles.selectedButton,
              ]}
              onPress={() => setSelectedShift("Morning")}
            >
              <Text
                style={[
                  styles.buttontext,
                  selectedShift === "Morning" && styles.selectedButtonText,
                ]}
              >
                Morning
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.Button,
                selectedShift === "Evening" && styles.selectedButton,
              ]}
              onPress={() => setSelectedShift("Evening")}
            >
              <Text
                style={[
                  styles.buttontext,
                  selectedShift === "Evening" && styles.selectedButtonText,
                ]}
              >
                Evening
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Checkup */}
        <View style={styles.checkup}>
          <Text style={styles.text}>Check-up</Text>
          <View style={styles.checkupHolder}>
            <TouchableOpacity
              style={[
                styles.Button,
                selectedCheckup === "Regular" && styles.selectedButton,
              ]}
              onPress={() => setSelectedCheckup("Regular")}
            >
              <Text
                style={[
                  styles.buttontext,
                  selectedCheckup === "Regular" && styles.selectedButtonText,
                ]}
              >
                Regular
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.Button,
                selectedCheckup === "Emergency" && styles.selectedButton,
              ]}
              onPress={() => setSelectedCheckup("Emergency")}
            >
              <Text
                style={[
                  styles.buttontext,
                  selectedCheckup === "Emergency" && styles.selectedButtonText,
                ]}
              >
                Emergency
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Select Date */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Select Date</Text>
          <View style={styles.dateHolder}>
            <TextInput
              placeholder="Date"
              placeholderTextColor={Colors.MediumGrey}
              style={styles.DateInput}
              value={selectedDate}
              onChangeText={(text) => setSelectedDate(text)}
            />
            <TouchableOpacity onPress={toggleCalendar}>
              <Image
                source={images.calender}
                resizeMode="contain"
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
          {isCalendarVisible && (
            <View style={{ marginTop: 10 }}>
              <Calendar
                onDayPress={(day) => {
                  setSelectedDate(day.dateString);
                  toggleCalendar();
                }}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: Colors.Primary,
                  },
                }}
              />
            </View>
          )}
        </View>
        {/* Select Time */}
        <View style={styles.viewHolder}>
        <Text style={styles.text}>Select Time</Text>
        <View style={styles.dateHolder}>
          <TextInput
            placeholder="Time"
            placeholderTextColor={Colors.MediumGrey}
            style={styles.DateInput}
            value={selectedTime}
            onChangeText={(text) => setSelectedTime(text)}
          />
          <TouchableOpacity onPress={toggleTimePicker}>
            <Entypo
              name="time-slot"
              size={responsiveFontSize(30)}
              color={Colors.Primary}
            />
          </TouchableOpacity>
        </View>
      </View>

        {/* Button */}
        <View style={{ width: "80%", alignSelf: "center", marginBottom: 20 }}>
          <Button title={"Book Appointment"} handleAction={handleAppointment} />
        </View>
      </ScrollView>

      <Modal
        isVisible={isPaymentModalVisible}
        onBackdropPress={togglePaymentModal}
      >
        <View style={styles.genderModalView}>
          {paymentData.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handlePaymentSelection(item.name)}
              style={styles.genderModalItem}
            >
              <Text style={styles.genderModalText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <Modal
        isVisible={isFeeStatusModalVisible}
        onBackdropPress={toggleFeeStatusModal}
      >
        <View style={styles.genderModalView}>
          {feeStatus.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleFeeStatusSelection(item.name)}
              style={styles.genderModalItem}
            >
              <Text style={styles.genderModalText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeSelection}
        onCancel={toggleTimePicker}
      />
    </>
  );
};

export default AppointmentForm;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
  viewHolder: {
    marginVertical: responsivePadding(10),
    padding: responsivePadding(10),
    width: "95%",
    alignSelf: "center",
    gap: responsivePadding(10),
  },
  text: {
    fontSize: responsiveFontSize(18),
    fontWeight: "400",
    color: Colors.Grey,
  },
  inputBox: {
    borderWidth: 1,
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    borderColor: Colors.White,
    fontSize: responsiveFontSize(18),
    color: Colors.Black,
    backgroundColor: Colors.White,
  },
  ageHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: responsivePadding(10),
    gap: responsivePadding(20),
    width: "95%",
    alignSelf: "center",
  },
  checkup: {
    width: "95%",
    padding: responsivePadding(10),
    alignSelf: "center",
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
    borderWidth: responsivePadding(2),
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    alignItems: "center",
    backgroundColor: Colors.White,
    borderColor: Colors.MediumGrey,
  },
  selectedButton: {
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
  buttontext: {
    color: Colors.Black,
    fontWeight: "600",
    fontSize: responsiveFontSize(18),
  },
  selectedButtonText: {
    color: Colors.White,
  },
  DateInput: {
    fontSize: responsiveFontSize(18),
    color: Colors.Black,
  },
  imageStyle: {
    width: responsivePadding(30),
    height: responsivePadding(30),
  },
  dateHolder: {
    flexDirection: "row",
    borderWidth: responsivePadding(2),
    borderRadius: responsivePadding(10),
    padding: responsivePadding(10),
    borderColor: Colors.White,
    backgroundColor: Colors.White,
    justifyContent: "space-between",
  },
  main2: {
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
  text2: {
    fontSize: responsiveFontSize(20),
    color: Colors.Black,
    fontWeight: "600",
  },
  genderModalView: {
    backgroundColor: Colors.White,
    padding: responsivePadding(20),
    borderRadius: responsivePadding(10),
  },
  genderModalItem: {
    padding: responsivePadding(10),
    marginVertical: responsivePadding(5),
    alignItems: "center",
    borderWidth: responsivePadding(1),
    borderRadius: responsivePadding(5),
  },
  genderModalText: {
    fontSize: responsiveFontSize(18),
    color: Colors.Black,
  },
});

