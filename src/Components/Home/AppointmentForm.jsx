import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "../../Theme/Colors";
import images from "../../Theme/Image";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { BallIndicator } from "react-native-indicators";
import {
  ADD_PATIENT_APPOINTMENT,
  GET_PATIENTS_BY_CLINIC_ID,
} from "../../API_Services/API_service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Service from "../../Service/Service";
import InternalHeader from "../General/InternalHeader";
import CustomTextInputBox from "../General/CustomTextInputBox";
import {
  formatDateAndTime,
  getPatientDetails,
} from "../../utils/HelperFunction";
import CustomBottomModal from "../General/CustomBottomModal";
import { updatePaymentStatus } from "../../API_Services/Auth_API";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";

const AppointmentForm = ({ route }) => {
  const { incoming, patientsData } = route.params;
  const navigation = useNavigation();
  const isfocused = useIsFocused();
  const [doctorList, setDoctorList] = useState([]);
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [isFeeStatusModalVisible, setIsFeeStatusModalVisible] = useState(false);
  const [paid, setPaid] = useState("");
  const [selectedCheckup, setSelectedCheckup] = useState("Regular");
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isDoctorModalVisible, setDoctorModalVisible] = useState(false);
  const [isNameVisible, setIsNameVisible] = useState(false);
  const [amountError, setAmountError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [doctorSelectError, setDoctorError] = useState("");
  const [paymentModeError, setPaymentModeError] = useState("");
  const [paymentStatusError, setPaymentStatusError] = useState("");
  const [doctorID, setDoctorID] = useState();
  const [patientID, setPatientID] = useState();
  const [appointmentID, setAppointmentID] = useState();
  const [selectDoctor, setSelectDoctor] = useState("");
  const [patientNames, setPatientNames] = useState([]);
  const [dateTimeError, setDateTimeError] = useState(null);
  const[clinicID, setClinicID] = useState(null)
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const paymentRbSheetRef = useRef();
  const paymentStatusRbSheetRef = useRef();
  const DoctorListRbSheetRef = useRef();

  const feeStatus = [
    { id: 1, name: "Paid" },
    { id: 2, name: "Not paid" },
  ];

  const togglePaymentModal = () => {
    if (paymentRbSheetRef.current) {
      paymentRbSheetRef.current.open();
    }
  };

  const toggleFeeStatusModal = () => {
    if (paymentStatusRbSheetRef.current) {
      paymentStatusRbSheetRef.current.open();
    }
  };

  const toggleDoctorModal = () => {
    if (DoctorListRbSheetRef.current) {
      DoctorListRbSheetRef.current.open();
    }
  };

  useEffect(() => {
    if (amount.length > 0) {
      setAmountError("");
    }
    if (paymentMode.length > 0) {
      setPaymentModeError("");
    }
    if (paid.length > 0) {
      setPaymentStatusError("");
    }
    if (selectDoctor.length > 0) {
      setDoctorError("");
    }
    if (selectedDateTime.length > 0) {
      setTimeError("");
    }
  }, [amount, paymentMode, paid, selectDoctor, selectedDateTime]);

  useEffect(() => {
    getLocalData();
    Service.selectedDate = null;
    Service.selectedTime = null;
  }, [isfocused]);

  async function getLocalData() {
    try {
      const res = await AsyncStorage.getItem("loginData");
      if (res !== null) {
        let data = JSON.parse(res);
        console.log(data, "line 185");
        setDoctorList(data?.doctor_list);
        console.log("Line 180", data?.doctor_list);

        setDoctorID(data["clinic_staff"]["role"]["id"]);
        clinicID = await data["clinic_staff"]["clinic_id"];
        setPatientID(data["clinic_staff"]["role_id"]);

        // await getPatientsByClinicID();
      }
    } catch (e) {
      console.log(e);
    }
  }

  // const getPatientsByClinicID = async () => {
  //   let data = {
  //     clinic_id: clinicID,
  //   };
  //   console.log("obje====", data);

  //   try {
  //     const query = queryString.stringify(data);
  //     const response = await GET_PATIENTS_BY_CLINIC_ID(query);

  //     if (!response) {
  //       return `Can't connect to server`;
  //     } else if (response?.error === true) {
  //       return response;
  //     } else {
  //       patients = response?.allPatient;

  //       let newArray = patients.map((item) => ({
  //         value: item.first_name || "", // Assuming the Dropdown expects `label` and `value`
  //         key: item.first_name || "",
  //       }));
  //       // Update the state with the new array
  //       // Make sure this logs the correct array format
  //       // console.log("111111", newArray);
  //       await setPatientNames(newArray);

  //       // console.log("aaabbcbs:", patients);
  //     }
  //   } catch (error) {
  //     return error?.message;
  //   }
  // };

  const toggleCalendar = () => {
    setTimePickerVisible(!isTimePickerVisible);
  };

  const paymentData = [
    { id: 1, name: "Online" },
    { id: 2, name: "Offline" },
  ];

  // const togglePaymentModal = () => {
  //   setPaymentModalVisible(!isPaymentModalVisible);
  // };

  // const toggleDoctorModal = () => {
  //   setDoctorModalVisible(!isDoctorModalVisible);
  // };
  const toggleNameModal = () => {
    setIsNameVisible(!isNameVisible);
  };

  // const toggleFeeStatusModal = () => {
  //   setIsFeeStatusModalVisible(!isFeeStatusModalVisible);
  // };

  const handlePaymentSelection = (selectedPayment) => {
    setPaymentMode(selectedPayment);
    togglePaymentModal();
  };

  const handleDoctorSelection = (selectedDoctor) => {
    setSelectDoctor(selectedDoctor);
    toggleDoctorModal();
  };

  const handleFeeStatusSelection = (selectedStatus) => {
    setPaid(selectedStatus);
    toggleFeeStatusModal();
  };

  const hideDatePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirm = (date) => {
    const { formattedDate, formattedTime } = formatDateAndTime(date);
    setSelectedDateTime(`${formattedDate},${formattedTime}`);
    setTimePickerVisible(false);
  };

  const validate = async () => {
    let isValid = true;

    if (!amount.trim()) {
      setAmountError("Amount  is required");
      isValid = false;
    }
    if (!selectedDateTime.trim()) {
      setTimeError("Date and time is required");
      isValid = false;
    }

    if (!selectedCheckup.trim()) {
      setCheckupError("Checkup is required");
      isValid = false;
    }

    if (!paymentMode.trim()) {
      setPaymentModeError("Mode is required");
      isValid = false;
    }

    if (!paid.trim()) {
      setPaymentStatusError("Payment Status is required");
      isValid = false;
    }

    if (!selectDoctor.trim()) {
      setDoctorError("Please select a doctor!");
      isValid = false;
    } else {
      createAppointmentAndPatient();
    }

    return isValid;
  };

  const createAppointmentAndPatient = async () => {
    console.log("appointment and patient create");
    let data = {
      first_name: getPatientDetails(patientsData).fullName.split(" ")[0],
      middle_name: getPatientDetails(patientsData).fullName.split(" ")[1],
      last_name: getPatientDetails(patientsData).fullName.split(" ")[2],
      doctor_id: doctorID,
      mobile_no: getPatientDetails(patientsData).phoneNumber,
      age: getPatientDetails(patientsData).age,
      gender: getPatientDetails(patientsData).gender,
      check_up: selectedCheckup == "Regular" ? "0" : "1",
      address: getPatientDetails(patientsData).address,
      appointment_date: selectedDateTime.split(",")[0],
      time: selectedDateTime.split(",")[1],
      clinic_id: clinicID,
      amount: amount,
      payment_mode: paymentMode == "Paid" ? "0" : "1",
    };
    console.log(data, "line 412");
    try {
      setLoading(true);
      const response = await ADD_PATIENT_APPOINTMENT(data);
      console.log(response, "Line 418");
      console.log(response.appointment_id, "Appointment Id");
      setAppointmentID(response.appointment_id);

      if (response.status) {
        setLoading(false);
        setShowAlert(true);
        setAmount("");
        setPaymentMode("");
        setPaid("");
        setSelectDoctor("");
      } else {
        setLoading(false);
        console.log(response?.error, "line 405");
      }
    } catch (e) {
      console.log(e, "Line 422");
      setLoading(false);
    }
  };

  const handlePaymentStatusUpdate = async (appointmentID) => {
    console.log(appointmentID, "Line 263");
    const response = await updatePaymentStatus(appointmentID);
    console.log(response, "Line 435");
    if (response?.message) {
      setShowAlert(false);
      navigation.navigate("Home");
    } else {
      console.log("Error", response?.message, "Line 443");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.Secondary }}>
      <SafeAreaView />
      <InternalHeader title={"Schedule New Appointment"} />
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        {/* Patients Name Selection */}
        <CustomTextInputBox
          placeholder={"Name"}
          value={getPatientDetails(patientsData).fullName}
          onChangeText={(text) => setPatientNames(text)}
          keyboardType={"default"}
          multiLine={false}
          editable={false}
        />
        {/* Patients Mobile Number */}
        <CustomTextInputBox
          placeholder={"Mobile Number"}
          value={getPatientDetails(patientsData).phoneNumber}
          keyboardType={"phone-pad"}
          editable={false}
          multiLine={false}
        />
        {/* Age and Gender */}
        <View style={styles.ageHolder}>
          <View style={{ width: "45%", gap: 10 }}>
            <CustomTextInputBox
              placeholder={"Age"}
              value={getPatientDetails(patientsData).age}
              keyboardType={"number-pad"}
              multiLine={false}
              maxlength={3}
              editable={false}
            />
          </View>
          <View style={[styles.viewHolder, { width: "45%", padding: 0 }]}>
            <CustomTextInputBox
              placeholder={"Gender"}
              value={getPatientDetails(patientsData).gender}
              editable={false}
            />
          </View>
        </View>
        {/* Address */}
        <CustomTextInputBox
          placeholder={"Address"}
          value={getPatientDetails(patientsData).address}
          editable={false}
        />
        {/* Amount and Payment Modal */}
        {/* <View style={styles.ageHolder}>
          <View style={{ width: "45%", gap: 10 }}>
            <CustomTextInputBox
              placeholder={"Amount"}
              value={amount}
              onChangeText={(text) => setAmount(text)}
              keyboardType={"phone-pad"}
              multiLine={false}
              maxlength={5}
            />
            {amountError && <Text style={styles.errorText}>{amountError}</Text>}
          </View>

          <View style={{ width: "45%", gap: 10 }}>
            <Text style={styles.text}>Payment Mode</Text>
            <Pressable style={styles.inputBox} onPress={togglePaymentModal}>
              <Text
                style={{
                  color: paymentMode ? Colors.Black : Colors.MediumGrey,
                  fontSize: textScale(16),
                }}
              >
                {paymentMode ? paymentMode : "Payment Mode"}
              </Text>
              <Ionicons
                style={{ alignSelf: "flex-end" }}
                name="chevron-down"
                size={moderateScale(15)}
                color={Colors.Grey}
              />
            </Pressable>
            {paymentModeError && (
              <Text style={styles.errorText}>{paymentModeError}</Text>
            )}
          </View>
        </View> */}

        {/* Amount */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Amount</Text>
          <TextInput
            style={styles.inputBox}
            placeholder={"Amount"}
            keyboardType={"phone-pad"}
            maxlength={5}
            placeholderTextColor={Colors.MediumGrey}
            value={amount}
            onChangeText={(text) => setAmount(text)}
          />
          {amountError && <Text style={styles.errorText}>{amountError}</Text>}
        </View>
        {/*  Payment Mode */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Payment Mode</Text>
          <Pressable style={styles.inputBox} onPress={togglePaymentModal}>
            <Text
              style={{
                color: paymentMode ? Colors.Black : Colors.MediumGrey,
                fontSize: textScale(15),
              }}
            >
              {paymentMode ? paymentMode : "Payment Mode"}
            </Text>
            <Ionicons
              style={{ alignSelf: "flex-end" }}
              name="chevron-down"
              size={moderateScale(15)}
              color={Colors.Grey}
            />
          </Pressable>
          {paymentModeError && (
            <Text style={styles.errorText}>{paymentModeError}</Text>
          )}
        </View>

        <View style={styles.viewHolder}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={[styles.text]}>Payment Status</Text>
            <Pressable
              style={[styles.inputBox, { width: "50%" }]}
              onPress={toggleFeeStatusModal}
            >
              <Text
                style={{
                  color: paid ? Colors.Black : Colors.MediumGrey,
                  fontSize: textScale(14),
                }}
              >
                {paid ? paid : "Payment Status"}
              </Text>
              <Ionicons
                style={{ alignSelf: "flex-end" }}
                name="chevron-down"
                size={moderateScale(15)}
                color={Colors.Grey}
              />
            </Pressable>
          </View>

          {paymentStatusError && (
            <Text style={styles.errorText}>{paymentStatusError}</Text>
          )}
        </View>

        {/* Checkup */}
        <View style={styles.checkup}>
          <Text style={styles.text}>Check-up</Text>
          <View style={styles.checkupHolder}>
            <TouchableOpacity
              activeOpacity={0.9}
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
              activeOpacity={0.9}
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

        {/* Select Doctor's */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>
            Select Doctor
            <Text style={{ color: Colors.CrimsonRed }}>*</Text>
          </Text>

          <Pressable style={styles.inputBox} onPress={toggleDoctorModal}>
            <Text
              style={{
                color: selectDoctor ? Colors.Black : Colors.MediumGrey,
                fontSize: textScale(15),
              }}
            >
              {selectDoctor ? selectDoctor : "Select Doctor"}
            </Text>
            <Ionicons
              style={{ alignSelf: "flex-end" }}
              name="chevron-down"
              size={moderateScale(15)}
              color={Colors.Grey}
            />
          </Pressable>

          {doctorSelectError && (
            <Text style={styles.errorText}>{doctorSelectError}</Text>
          )}
        </View>
        {/* Select Date */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Select Date & Time</Text>
          <View style={styles.dateHolder}>
            <TextInput
              editable={false}
              placeholder="Date and Time"
              placeholderTextColor={Colors.MediumGrey}
              style={styles.DateInput}
              value={selectedDateTime}
            />
            <TouchableOpacity onPress={toggleCalendar}>
              <Image
                source={images.calender}
                resizeMode="contain"
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
          {timeError && <Text style={styles.errorText}>{timeError}</Text>}
          <DateTimePickerModal
            isVisible={isCalendarVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        {/* Button */}
        <View style={{ width: "80%", alignSelf: "center", marginBottom: 20 }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => validate()}
            style={styles.buttonHolder}
          >
            <Text style={styles.buttonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loaderContainer}>
          <View style={styles.loaderView}>
            <BallIndicator color={Colors.Primary} count={8} size={40} />
            <Text style={styles.loaderText}>Please Wait...</Text>
          </View>
        </View>
      )}

      {/* Payment Mode */}
      <RBSheet
        ref={paymentRbSheetRef}
        height={moderateScale(250)}
        openDuration={250}
        closeOnDragDown
        customStyles={{
          container: styles.rbSheetContainer,
          draggableIcon: {
            backgroundColor: Colors.MediumGrey,
          },
        }}
      >
        <CustomBottomModal
          rbSheetRef={paymentRbSheetRef}
          message={"Select Payment Mode"}
          data={paymentData}
          selectedValue={(text) => {
            //
            handlePaymentSelection(text);
          }}
        />
      </RBSheet>
      {/* Payment Status */}
      <RBSheet
        ref={paymentStatusRbSheetRef}
        height={moderateScale(250)}
        openDuration={250}
        closeOnDragDown
        customStyles={{
          container: styles.rbSheetContainer,
          draggableIcon: {
            backgroundColor: Colors.MediumGrey,
          },
        }}
      >
        <CustomBottomModal
          rbSheetRef={paymentStatusRbSheetRef}
          message={"Select Payment Status"}
          data={feeStatus}
          selectedValue={(text) => {
            handleFeeStatusSelection(text);
          }}
        />
      </RBSheet>
      {/* Doctor List */}
      <RBSheet
        ref={DoctorListRbSheetRef}
        height={moderateScale(250)}
        openDuration={250}
        closeOnDragDown
        customStyles={{
          container: styles.rbSheetContainer,
          draggableIcon: {
            backgroundColor: Colors.MediumGrey,
          },
        }}
      >
        <CustomBottomModal
          rbSheetRef={DoctorListRbSheetRef}
          incoming={"doctorList"}
          message={"Select Doctor from list"}
          data={doctorList}
          selectedValue={(text) => {
            // handleDoctorSelection(text);
            handleDoctorSelection(text?.staff_name);
            setClinicID(text?.clinic_id);
            setDoctorID(text?.id);
          }}
        />
      </RBSheet>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {/* patient Name modal */}
      <Modal isVisible={isNameVisible} onBackdropPress={toggleNameModal}>
        <View style={styles.genderModalView}>
          {doctorList.map((item) => (
            <TouchableOpacity
              key={item.role_id}
              onPress={() => handleDoctorSelection(item.staff_name)}
              style={styles.genderModalItem}
            >
              <Text style={styles.genderModalText}>{item.staff_name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <Modal isVisible={showAlert}>
        <View
          style={{ alignSelf: "center", backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Appointment Booked</Text>
            <Text style={styles.title}>Payment Status</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handlePaymentStatusUpdate(appointmentID)}
                style={styles.button}
              >
                <Text style={[styles.paidButtonText, { color: Colors.White }]}>
                  Paid
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowAlert(false);
                  navigation.navigate("Home");
                }}
                style={[
                  styles.button,
                  {
                    backgroundColor: "transparent",
                    borderWidth: 1,
                    borderColor: Colors.MediumGrey,
                  },
                ]}
              >
                <Text
                  style={[styles.paidButtonText, { color: Colors.MediumGrey }]}
                >
                  Not Paid
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AppointmentForm;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  viewHolder: {
    marginVertical: moderateScaleVertical(10),
    padding: moderateScale(10),
    width: "95%",
    alignSelf: "center",
    gap: moderateScale(10),
  },
  text: {
    fontSize: textScale(16),
    fontWeight: "400",
    color: Colors.Grey,
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    borderColor: Colors.White,
    fontSize: textScale(15),
    color: Colors.Black,
    backgroundColor: Colors.White,
  },
  ageHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: moderateScale(20),
    width: "95%",
    // alignSelf: "center",
  },
  checkup: {
    width: "95%",
    marginTop: moderateScaleVertical(5),
    padding: moderateScale(10),
    alignSelf: "center",
  },
  checkupHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: moderateScale(10),
    marginVertical: moderateScaleVertical(10),
  },
  Button: {
    width: "45%",
    borderWidth: moderateScale(2),
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: Colors.MediumGrey,
  },
  selectedButton: {
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
  buttontext: {
    color: Colors.Black,
    fontWeight: "600",
    fontSize: textScale(16),
  },
  selectedButtonText: {
    color: Colors.White,
  },
  DateInput: {
    fontSize: textScale(15),
    color: Colors.Black,
    flex: 1,
  },
  imageStyle: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  dateHolder: {
    flexDirection: "row",
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(10),
    padding: moderateScale(5),
    borderColor: Colors.White,
    backgroundColor: Colors.White,
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorHolder: {
    justifyContent: "center",
    alignItems: "center",
  },
  genderModalView: {
    backgroundColor: Colors.White,

    padding: moderateScale(20),
    borderRadius: moderateScale(10),
  },
  genderModalItem: {
    padding: moderateScale(10),
    marginVertical: moderateScaleVertical(5),
    flexDirection: "row",
    justifyContent: "space-between",
    gap: moderateScale(5),
    alignItems: "center",
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(5),
  },
  genderModalText: {
    fontSize: textScale(18),
    color: Colors.Black,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    width: "95%",
    backgroundColor: Colors.White,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    color: Colors.Black,
    left: 22,
    top: 8,
    fontSize: 18,
  },
  placeholderStyle: {
    fontSize: textScale(16),
    color: "black",
  },
  selectedTextStyle: {
    fontSize: textScale(16),
    color: "black",
  },
  iconStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  errorText: {
    fontSize: textScale(15),
    color: Colors.CrimsonRed,
    fontWeight: "500",
    textTransform: "capitalize",
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "90%",
  },
  title: {
    fontSize: textScale(18),
    color: Colors.MediumGrey,
    fontWeight: "600",
    marginTop: moderateScaleVertical(10),
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: moderateScaleVertical(20),
  },
  button: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScaleVertical(10),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: Colors.Primary,
    width: "40%",
    alignItems: "center",
    borderRadius: moderateScale(10),
  },
  buttonHolder: {
    padding: moderateScale(10),
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(10),
    width: "100%",
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
    alignItems: "center",
    marginTop: moderateScaleVertical(10),
  },
  buttonText: {
    fontSize: textScale(16),
    color: Colors.White,
    fontWeight: "600",
    textAlign: "center",
  },
  paidButtonText: {
    fontSize: textScale(16),
    fontWeight: "600",
    textAlign: "center",
  },

  placeholderStyle: {
    fontSize: textScale(16),
    color: "black",
  },
  selectedTextStyle: {
    fontSize: textScale(16),
    color: "black",
  },
  iconStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  loaderContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderView: {
    borderWidth: 2,
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(10),
    width: "35%",
    borderRadius: moderateScale(10),
    borderColor: Colors.Secondary,
    padding: moderateScale(10),
    backgroundColor: Colors.Secondary,
    elevation: 10,
    shadowColor: "#000", // shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loaderText: {
    fontSize: textScale(16),
    color: Colors.Black,
    textAlign: "center",
    fontWeight: "400",
  },
});
