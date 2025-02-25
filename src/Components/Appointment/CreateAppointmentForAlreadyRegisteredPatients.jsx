import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "../../Theme/Colors";
import InternalHeader from "../General/InternalHeader";
import {
  addPatientsAppointment,
  createAppointment,
  getAllPatientsList,
} from "../../API_Services/Auth_API";
import { BallIndicator } from "react-native-indicators";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import CustomTextInputBox from "../General/CustomTextInputBox";
import CustomBottomModal from "../General/CustomBottomModal";
import Ionicons from "react-native-vector-icons/Ionicons";
import images from "../../Theme/Image";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDateAndTime } from "../../utils/HelperFunction";
import { useNavigation } from "@react-navigation/native";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import CustomBottomSheet from "../General/CustomBottomModal";
import RBSheet from "react-native-raw-bottom-sheet";
const CreateAppointmentForAlreadyRegisteredPatients = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [allPatientsList, setAllPatientsList] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState("");
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [bloodGroupError, setBloodGroupError] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentModeError, setPaymentModeError] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [paid, setPaid] = useState("");
  const [selectedCheckup, setSelectedCheckup] = useState("Regular");
  const [paymentStatusError, setPaymentStatusError] = useState("");
  const [selectDoctor, setSelectDoctor] = useState("");
  const [doctorSelectError, setDoctorError] = useState("");
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [doctorID, setDoctorID] = useState();
  const [clinicId, setClinicId] = useState();
  const [mNumberError, setMNumberError] = useState("");
  const [dateTimeError, setDateTimeError] = useState("");
  const [isPatientSelected, setIsPatientSelected] = useState(false);
  const [selectedPatientID, setSelectedPatientID] = useState(null);
  const genderRbSheetRef = useRef();
  const bloodRbSheetRef = useRef();
  const paymentRbSheetRef = useRef();
  const paymentStatusRbSheetRef = useRef();
  const DoctorListRbSheetRef = useRef();

  async function getLocalData() {
    try {
      const res = await AsyncStorage.getItem("loginData");
      if (res !== null) {
        let data = JSON.parse(res);
        console.log(data, "line 185");
        setDoctorList(data?.doctor_list);
        console.log("Line 180", data?.doctor_list);

        // setDoctorID(data["clinic_staff"]["role"]["id"]);
        // setClinicId(data?.clinic_staff?.clinic_id);
        // clinicID = await data["clinic_staff"]["clinic_id"];
        setPatientID(data["clinic_staff"]["role_id"]);

        // await getPatientsByClinicID();
      }
    } catch (e) {
      console.log(e);
    }
  }

  const genderData = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 3, name: "Other" },
  ];

  const bloodGroupData = [
    { id: 1, name: "A+" },
    { id: 2, name: "A-" },
    { id: 3, name: "B+" },
    { id: 4, name: "B-" },
    { id: 5, name: "O+" },
    { id: 6, name: "O-" },
    { id: 7, name: "AB+" },
    { id: 8, name: "AB-" },
  ];

  const paymentData = [
    { id: 1, name: "Online" },
    { id: 2, name: "Offline" },
  ];

  const feeStatus = [
    { id: 1, name: "Paid" },
    { id: 2, name: "Not paid" },
  ];

  useEffect(() => {
    fetchAllPatientsList();
    getLocalData();
  }, []);
  useEffect(() => {
    if (name.length > 0) {
      setNameError("");
    }
    if (mobile.length > 0) {
      setMNumberError("");
    }
    if (age.length > 0) {
      setAgeError("");
    }
    if (gender.length > 0) {
      setGenderError("");
    }
    if (message.length > 0) {
      setMessageError("");
    }
    if (address.length > 0) {
      setAddressError("");
    }
    if (bloodGroup.length > 0) {
      setBloodGroupError("");
    }
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
      setDateTimeError("");
    }
  }, [
    name,
    mobile,
    age,
    gender,
    message,
    address,
    bloodGroup,
    amount,
    paymentMode,
    paid,
    selectDoctor,
    selectedDateTime,
  ]);

  const toggleGenderModal = () => {
    if (genderRbSheetRef.current) {
      genderRbSheetRef.current.open();
    }
  };
  const toggleBloodGroupModal = () => {
    if (bloodRbSheetRef.current) {
      bloodRbSheetRef.current.open();
    }
  };

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

  const toggleCalendar = () => {
    setTimePickerVisible(!isTimePickerVisible);
  };

  const handleConfirm = (date) => {
    console.log(date, "Line 191");
    const { formattedDate, formattedTime } = formatDateAndTime(date);
    setSelectedDateTime(`${formattedDate},${formattedTime}`);
    console.log(formattedDate, formattedTime, "Line 194");
    setTimePickerVisible(false);
  };

  const hideDatePicker = () => {
    setTimePickerVisible(false);
  };
  const handleFeeStatusSelection = (selectedStatus) => {
    setPaid(selectedStatus);
    toggleFeeStatusModal();
  };
  const handlePaymentSelection = (selectedPayment) => {
    console.log(selectedPayment, "Line 211");
    setPaymentMode(selectedPayment);
    togglePaymentModal();
  };
  const handleDoctorSelection = (selectedDoctor) => {
    setSelectDoctor(selectedDoctor);
    toggleDoctorModal();
  };

  const fetchAllPatientsList = async () => {
    setLoading(true);
    const response = await getAllPatientsList();
    // console.log(response, "line 17");
    if (response != null) {
      setAllPatientsList(response?.allPatient);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  // Handle search input
  const handleNameChange = (text) => {
    setName(text);
    if (text.length > 0) {
      // Filter patients based on input text
      const filtered = allPatientsList.filter((patient) =>
        `${patient.first_name} ${patient.middle_name} ${patient.last_name}`
          .toLowerCase()
          .includes(text.toLowerCase())
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients([]);
    }
  };
  const handlePatientSelect = (patient) => {
    console.log(patient, "Line 239");
    setName(
      `${patient.first_name} ${patient.middle_name} ${patient.last_name}`
    );
    setMobile(patient.phone_number);
    setEmail(patient.email || "");
    setAge(patient.age.toString());
    setGender(patient.gender);
    setAddress(patient.address);
    setBloodGroup(patient.blood_group || "");
    setSelectedPatientID(patient.id);
    setIsPatientSelected(true);
    setFilteredPatients([]);
  };

  const validate = async () => {
    let isValid = true;
    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    }
    if (!mobile.trim()) {
      setMNumberError("Mobile number is required");
      isValid = false;
    }

    if (!age.trim()) {
      setAgeError("Age is required");
      isValid = false;
    }

    if (!address.trim()) {
      setAddressError("Address is required");
      isValid = false;
    }

    if (!message.trim()) {
      setMessageError("Message is required");
      isValid = false;
    }

    if (!bloodGroup) {
      setBloodGroupError("Blood group is required");
      isValid = false;
    }

    if (!gender) {
      setGenderError("Gender is required");
      isValid = false;
    }
    if (!amount.trim()) {
      setAmountError("Amount  is required");
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
    }
    if (!selectedDateTime.trim()) {
      setDateTimeError("Please Select the date and time");
      isValid = false;
    } else {
      createAppointmentAndPatient();
    }

    return isValid;
  };

  const createAppointmentAndPatient = async () => {
    console.log("appointment and patient create");
    setLoading(true);
    // Appointment data object
    const appointmentData = {
      doctor_id: doctorID,
      patient_id: isPatientSelected ? selectedPatientID : undefined,
      priority_level: selectedCheckup == "Regular" ? "1" : "0",
      fee_status: paid ? "1" : "0",
      amount: amount,
      appointment_date: selectedDateTime.split(",")[0],
      payment_mode: paymentMode === "Online" ? "1" : "2",
      time: selectedDateTime.split(",")[1],
      clinic_id: clinicId,
    };
    const newAppointmentPatientsData = {
      doctor_id: doctorID,
      check_up: selectedCheckup == "Regular" ? "1" : "0",
      fee_status: paid ? "1" : "0",
      amount: amount,
      appointment_date: selectedDateTime.split(",")[0],
      payment_mode: paymentMode === "Online" ? "1" : "2",
      time: selectedDateTime.split(",")[1],
      clinic_id: clinicId,
      address: address,
      gender: gender,
      age: age,
      mobile_no: mobile,
      last_name: name.split(" ")[2],
      middle_name: name.split(" ")[1],
      first_name: name.split(" ")[0],
    };
    console.log(newAppointmentPatientsData, "Line 397");
    try {
      let response;
      if (isPatientSelected && selectedPatientID) {
        console.log("Selected from the list", appointmentData);
        // Update appointment API (for selected patient)
        response = await createAppointment(appointmentData);
        console.log(response, "Line 375");
        if (response.message === "Appointment created successfully") {
          setLoading(false);
          Alert.alert("Success", "Appointment create successfully");
          navigation.navigate("Home");
        } else {
          Alert.alert("Error", response?.error);
          setSelectedDateTime("");
        }
      } else {
        // Create new patient and appointment API (for manually entered data)
        console.log("Not Selected from the list");
        response = await addPatientsAppointment(newAppointmentPatientsData);
        console.log(response, "Line 389");
        if (response?.status === true) {
          setLoading(false);
          Alert.alert("Success", "Appointment create successfully");
          navigation.navigate("Home");
        } else {
          setLoading(false);
          // Alert.alert("Error222", response?.error);
          setSelectedDateTime("");
        }
      }

      setLoading(false);
    } catch (error) {
      console.error("Error creating/updating appointment", error);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.main}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
    >
      <SafeAreaView style={{ backgroundColor: Colors.Secondary }} />
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.Secondary} />
      <InternalHeader title={"Create Appointment"} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Name */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Name</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Name"
            placeholderTextColor={Colors.MediumGrey}
            value={name}
            onChangeText={handleNameChange}
          />
          {nameError && <Text style={styles.errorText}>{nameError}</Text>}
        </View>
        {/* Show Filtered Search Results */}
        {filteredPatients.length > 0 && (
          <ScrollView style={styles.searchResults}>
            {filteredPatients.map((patient) => (
              <TouchableOpacity
                key={patient.id}
                style={styles.patientItem}
                onPress={() => handlePatientSelect(patient)}
              >
                <Text style={styles.patientText}>
                  {patient.first_name} {patient.middle_name} {patient.last_name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {/* Mobile Number */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Mobile Number</Text>
          <TextInput
            style={styles.inputBox}
            placeholder={"Mobile Number"}
            keyboardType={"phone-pad"}
            maxlength={10}
            placeholderTextColor={Colors.MediumGrey}
            value={mobile}
            onChangeText={(text) => setMobile(text)}
          />
          {mNumberError && <Text style={styles.errorText}>{mNumberError}</Text>}
        </View>
        {/* Email */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Email Id</Text>
          <TextInput
            style={styles.inputBox}
            placeholder={"Email Id"}
            placeholderTextColor={Colors.MediumGrey}
            value={email}
            keyboardType={"email-address"}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        {/* Age */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Age</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Age"
            placeholderTextColor={Colors.MediumGrey}
            value={age}
            maxlength={3}
            keyboardType={"number-pad"}
            onChangeText={(text) => setAge(text)}
          />
          {ageError && <Text style={styles.errorText}>{ageError}</Text>}
        </View>
        {/* Gender */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Gender</Text>
          <Pressable style={styles.inputBox} onPress={toggleGenderModal}>
            <Text
              style={{
                color: gender ? Colors.Black : Colors.MediumGrey,
                fontSize: textScale(15),
              }}
            >
              {gender ? gender : "Select Gender"}
            </Text>
            <Ionicons
              name="chevron-down"
              size={moderateScale(15)}
              color={Colors.MediumGrey}
            />
          </Pressable>
          {genderError && <Text style={styles.errorText}>{genderError}</Text>}
        </View>
        {/* Medical Message */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Medical Message</Text>
          <TextInput
            style={[styles.inputBox, { height: responsivePadding(100) }]}
            placeholder="Medical message"
            multiline={true}
            placeholderTextColor={Colors.MediumGrey}
            keyboardType="default"
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          {messageError && <Text style={styles.errorText}>{messageError}</Text>}
        </View>
        {/* Address */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Address</Text>
          <TextInput
            style={[styles.inputBox, { height: responsivePadding(100) }]}
            placeholder="Address"
            multiline={true}
            placeholderTextColor={Colors.MediumGrey}
            keyboardType="default"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          {addressError && <Text style={styles.errorText}>{addressError}</Text>}
        </View>
        {/* Blood Group */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Blood Group</Text>
          <Pressable style={styles.inputBox} onPress={toggleBloodGroupModal}>
            <Text
              style={{
                color: bloodGroup ? Colors.Black : Colors.MediumGrey,
                fontSize: textScale(15),
              }}
            >
              {bloodGroup ? bloodGroup : "Blood Group"}
            </Text>
            <Ionicons
              name="chevron-down"
              size={moderateScale(15)}
              color={Colors.MediumGrey}
            />
          </Pressable>
          {bloodGroupError && (
            <Text style={styles.errorText}>{bloodGroupError}</Text>
          )}
        </View>
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
              name="chevron-down"
              size={moderateScale(15)}
              color={Colors.MediumGrey}
            />
          </Pressable>
          {paymentModeError && (
            <Text style={styles.errorText}>{paymentModeError}</Text>
          )}
        </View>
        {/* Payment Status*/}
        <View style={styles.viewHolder}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>Payment Status</Text>
            <Pressable
              style={[styles.inputBox, { width: "55%" }]}
              onPress={toggleFeeStatusModal}
            >
              <Text
                style={{
                  color: paid ? Colors.Black : Colors.MediumGrey,
                  fontSize: textScale(15),
                }}
              >
                {paid ? paid : "Payment Status"}
              </Text>
              <Ionicons
                name="chevron-down"
                size={moderateScale(15)}
                color={Colors.MediumGrey}
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
          <Text style={styles.text}>Select Doctor</Text>

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
              name="chevron-down"
              size={moderateScale(15)}
              color={Colors.MediumGrey}
            />
          </Pressable>

          {doctorSelectError && (
            <Text style={styles.errorText}>{doctorSelectError}</Text>
          )}
        </View>
        {/* Select Date */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Select Date & Time</Text>
          <View style={styles.inputBox}>
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
          {dateTimeError && (
            <Text style={styles.errorText}>{dateTimeError}</Text>
          )}
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
        {loading && (
          <View style={styles.loaderContainer}>
            <View style={styles.loaderView}>
              <BallIndicator color={Colors.Primary} count={8} size={40} />
              <Text style={styles.loaderText}>Loading Please Wait...</Text>
            </View>
          </View>
        )}
      </ScrollView>
      {/* Gender */}
      <RBSheet
        ref={genderRbSheetRef}
        height={moderateScale(275)}
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
          rbSheetRef={genderRbSheetRef}
          message={"Choose Gender"}
          data={genderData}
          selectedValue={(text) => {
            setGender(text);
          }}
        />
      </RBSheet>
      {/* Blood Group */}
      <RBSheet
        ref={bloodRbSheetRef}
        height={moderateScale(550)}
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
          rbSheetRef={bloodRbSheetRef}
          message={"Choose Blood Group"}
          data={bloodGroupData}
          selectedValue={(text) => {
            setBloodGroup(text);
          }}
        />
      </RBSheet>
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
          message={"Select Doctor from list"}
          incoming={"doctorList"}
          data={doctorList}
          selectedValue={(text) => {
            console.log(text, "line 864");
            handleDoctorSelection(text?.staff_name);
            setClinicId(text?.clinic_id);
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
    </KeyboardAvoidingView>
  );
};

export default CreateAppointmentForAlreadyRegisteredPatients;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: Colors.Secondary,
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
    width: "90%",
    borderRadius: moderateScale(10),
    borderColor: Colors.Secondary,
    padding: moderateScale(10),
    backgroundColor: Colors.Secondary,
    elevation: 10,
    shadowColor: "#000",
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
  text: {
    fontSize: textScale(15),
    fontWeight: "400",
    color: Colors.Grey,
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
    borderColor: Colors.Green,
    fontSize: textScale(15),
    color: Colors.Black,
    backgroundColor: Colors.White,
    alignItems: "center",
  },
  viewHolder: {
    marginTop: moderateScaleVertical(10),
    padding: moderateScale(10),
    width: "95%",
    alignSelf: "center",
    gap: moderateScale(10),
  },
  ageGenderHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(10),
  },
  errorText: {
    fontSize: textScale(15),
    color: Colors.CrimsonRed,
    fontWeight: "500",
    width: "100%",
    textTransform: "capitalize",
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
  buttonHolder: {
    padding: moderateScale(10),
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(10),
    width: "100%",
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
    alignItems: "center",
    marginVertical: moderateScaleVertical(10),
  },
  buttonText: {
    fontSize: textScale(16),
    color: Colors.White,
    fontWeight: "600",
    textAlign: "center",
  },
  ageHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: moderateScale(20),
    width: "95%",
    alignSelf: "center",
  },
  errorHolder: {
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "500",
    fontSize: textScale(16),
  },
  searchResults: {
    maxHeight: 150,
    width: "90%",
    alignSelf: "center",
    padding: moderateScale(10),
    backgroundColor: Colors.White,
    borderRadius: moderateScale(10),
    marginBottom: 10,
  },
  patientItem: {
    borderWidth: 2,
    marginVertical: 5,
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: Colors.Secondary,
    borderColor: Colors.Secondary,
  },
  patientText: {
    color: Colors.Black,
    fontSize: textScale(16),
  },
  rbSheetContainer: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    elevation: 5,
  },
});
