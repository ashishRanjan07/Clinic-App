import {
  Image,
  KeyboardAvoidingView,
  PermissionsAndroid,
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
import GeneralHeader from "../General/GeneralHeader";
import { useNavigation } from "@react-navigation/native";
import images from "../../Theme/Image";
import Feather from "react-native-vector-icons/Feather";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LotifileAlert from "../General/LotifileAlert";
import { addPatients } from "../../API_Services/Auth_API";
import CustomTextInputBox from "../General/CustomTextInputBox";
import CustomBottomModal from "../General/CustomBottomModal";
import { BallIndicator } from "react-native-indicators";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import RBSheet from "react-native-raw-bottom-sheet";
import InternalHeader from "../General/InternalHeader";
import Ionicons from 'react-native-vector-icons/Ionicons'

const AddNewPatient = () => {
  const navigation = useNavigation();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [mName, setMName] = useState("");
  const [mNumber, setMNumber] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isGenderModalVisible, setGenderModalVisible] = useState(false);
  const [isBloodModalVisible, setIsBloodModalVisible] = useState(false);
  const [bloodGroup, setBloodGroup] = useState("");
  const [Gender, setGender] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const [fNameError, setFNameError] = useState("");
  const [lNameError, setLNameError] = useState("");
  const [mNumberError, setMNumberError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [bloodGroupError, setBloodGroupError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [clinicId, setClinicId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patientsData, setPatientsData] = useState();
  const genderRbSheetRef = useRef();
  const bloodRbSheetRef = useRef();
  const imageUploadRbSheetRef = useRef();
 

  const genderData = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 3, name: "Other" },
  ];

  const imageUploadMethod = [
    { id: 1, name: "Camera" },
    { id: 2, name: "Gallery" },
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

  const toggleImageUpload = () => {
    if (imageUploadRbSheetRef.current) {
      imageUploadRbSheetRef.current.open();
    }
  };

  const galleryOpen = async () => {
    try {
      const options = {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };

      launchImageLibrary(options, async (response) => {
        if (response.didCancel) {
          console.log("User Cancel Image Picker");
        } else if (response.error) {
          console.log("Image Picker Error:", response.error);
        } else {
          let imageUri = response.uri || response.assets[0]?.uri;
          setProfileImage(imageUri);
          console.log(imageUri, "Line 31");
          imageUploadRbSheetRef.current.close();
        }
      });
    } catch (error) {
      console.log("Error in Open Image Picker:", error.message);
    }
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "App needs access to your camera.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission granted");
        return true;
      } else {
        console.log("Camera permission denied");
        return false;
      }
    } catch (error) {
      console.warn("Error requesting camera permission:", error);
      return false;
    }
  };

  const openCameraPlatform = () => {
    if (Platform.OS === "ios") {
      openCameraIOS();
    } else {
      openCameraAndroid();
    }
  };

  const openCameraAndroid = async () => {
    console.log("Camera Opening");
    const permissionGranted = await requestCameraPermission();
    if (permissionGranted) {
      openCamera();
    } else {
      console.log("Camera permission denied, cannot open camera.");
    }
  };

  const openCameraIOS = () => {
    openCamera();
  };

  const openCamera = () => {
    try {
      const options = {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        cameraType: "front",
        saveToPhotos: true,
        quality: 0.7,
      };
      launchCamera(options, async (response) => {
        if (response.didCancel) {
          console.log("User cancel Camera");
        } else if (response.error) {
          console.log("Camera Error:", response.error);
        } else {
          let imageUri = response.uri || response.assets[0]?.uri;
          setIsModalVisible(false);
          setProfileImage(imageUri);
          imageUploadRbSheetRef.current.close();
          // await updateProfilePicture(imageUri);
        }
      });
    } catch (error) {
      console.log("Error in Opening camera", error.message);
    }
  };

  useEffect(() => {
    if (fName.length != 0) {
      setFNameError("");
    }
    if (lName.length != 0) {
      setLNameError("");
    }
    if (mNumber.length != 0) {
      setMNumberError("");
    }
    if (address.length != 0) {
      setAddressError("");
    }
    if (age.length != 0) {
      setAgeError("");
    }
    if (Gender.length != 0) {
      setGenderError("");
    }
    if (message.length != 0) {
      setMessageError("");
    }
    if (bloodGroup.length != 0) {
      setBloodGroupError("");
    }
  }, [fName, lName, mNumber, address, age, Gender, message, bloodGroup]);

  useEffect(() => {
    fetchUserLoginData();
  }, []);

  const fetchUserLoginData = async () => {
    const response = JSON.parse(await AsyncStorage.getItem("loginData"));
    setClinicId(response?.clinic_staff?.clinic_id);
  };

  const validate = () => {
    let isValid = true;
    if (!fName.trim()) {
      setFNameError("First name is required");
      isValid = false;
    }

    if (!lName.trim()) {
      setLNameError("Last name is required");
      isValid = false;
    }

    if (!mNumber.trim()) {
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

    if (!Gender) {
      setGenderError("Gender is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    const loginUserData = await AsyncStorage.getItem("loginData");
    const parsedLoginData = JSON.parse(loginUserData);

    if (validate()) {
      const userData = new FormData();
      userData.append("first_name", fName);
      userData.append("middle_name", mName);
      userData.append("last_name", lName);
      userData.append("phone_number", mNumber);
      userData.append("gender", Gender);
      userData.append("email", email);
      userData.append("age", age);
      userData.append("address", address);
      userData.append("medical_history", message);
      userData.append("blood_group", bloodGroup);
      userData.append("clinic_id", parsedLoginData?.clinic_staff?.clinic_id);
      setPatientsData(userData);
      console.log(userData, "Line 286");
      const response = await addPatients(userData);
      console.log(response, "Success Line 289");
      if (response.status) {
        // console.log(response, "Success Line 289");
        // setFName("");
        // setMName("");
        // setLName("");
        // setMNumber("");
        // setEmail("");
        // setAge("");
        // setGender("");
        // setAddress("");
        // setMessage("");
        // setBloodGroup("");
        // setProfileImage(null);
        setLoading(false);
        setShowAlert(true);
      }
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
      <InternalHeader title="Add Patient" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Image */}
        <View style={styles.imageHolder}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.imageStyle} />
          ) : (
            <Image source={images.user} style={styles.imageStyle} />
          )}

          <TouchableOpacity style={styles.icon} onPress={toggleImageUpload}>
            <Feather
              name="camera"
              size={moderateScale(30)}
              color={Colors.White}
            />
          </TouchableOpacity>
        </View>
        {/* First Number */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>First Name</Text>
          <TextInput
            style={styles.inputBox}
            placeholder={"First Name"}
            keyboardType={"default"}
            autoFocus={true}
            placeholderTextColor={Colors.MediumGrey}
            value={fName}
            onChangeText={(text) => setFName(text)}
          />
          {fNameError && <Text style={styles.errorText}>{fNameError}</Text>}
        </View>
        {/*Middle Name */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Middle Name</Text>
          <TextInput
            multiLine={false}
            style={styles.inputBox}
            placeholder={"Middle Name"}
            keyboardType={"default"}
            placeholderTextColor={Colors.MediumGrey}
            value={mName}
            onChangeText={(text) => setMName(text)}
          />
        </View>
        {/*last Name */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Last Name</Text>
          <TextInput
            style={styles.inputBox}
            placeholder={"Last Name"}
            keyboardType={"default"}
            placeholderTextColor={Colors.MediumGrey}
            value={lName}
            onChangeText={(text) => setLName(text)}
          />
          {lNameError && <Text style={styles.errorText}>{lNameError}</Text>}
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
          <Pressable style={styles.inputBox2} onPress={toggleGenderModal}>
            <Text
              style={{
                color: Gender ? Colors.Black : Colors.MediumGrey,
                fontSize: textScale(15),
              }}
            >
              {Gender ? Gender : "Select Gender"}
            </Text>
            <Ionicons
              name="chevron-down"
              size={moderateScale(15)}
              color={Colors.MediumGrey}
            />
          </Pressable>
          {genderError && <Text style={styles.errorText}>{genderError}</Text>}
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
        {/* Mobile Number */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Mobile Number</Text>
          <TextInput
            style={styles.inputBox}
            placeholder={"Mobile Number"}
            keyboardType={"phone-pad"}
           maxLength={10}
            placeholderTextColor={Colors.MediumGrey}
            value={mNumber}
            onChangeText={(text) => setMNumber(text)}
          />
          {mNumberError && <Text style={styles.errorText}>{mNumberError}</Text>}
        </View>

        {/*Message */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Medical Message</Text>
          <TextInput
            style={[styles.inputBox, { height: moderateScale(100) }]}
            placeholder="Medical message"
            multiline
            placeholderTextColor={Colors.MediumGrey}
            keyboardType="default"
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          {messageError && <Text style={styles.errorText}>{messageError}</Text>}
        </View>
        {/*Address */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Address</Text>
          <TextInput
            style={[styles.inputBox, { height: moderateScale(100) }]}
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
          <Pressable style={styles.inputBox2} onPress={toggleBloodGroupModal}>
            <Text
              style={{
                color: bloodGroup ? Colors.Black : Colors.MediumGrey,
                fontSize: textScale(15),
              }}
            >
              {bloodGroup ? bloodGroup : "Select Blood Group"}
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
        {/* Save and Cancel Button */}
        <View style={styles.buttonHolder2}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.button2}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText2}>Cancel </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.button2}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText2}>Create </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <LotifileAlert
        visible={showAlert}
        onClose={() => {
          setShowAlert(false);
          console.log("Hii");
          navigation.navigate("PatientsList");
        }}
        onYes={() => {
          // Handle Yes action here
          navigation.push("AppointmentForm", {
            incoming: "Add Patients",
            patientsData: patientsData,
          });
          setShowAlert(false);
        }}
      />
      {/* Upload Image Method */}
      <RBSheet
        ref={imageUploadRbSheetRef}
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
          rbSheetRef={imageUploadRbSheetRef}
          message={"Choose Image Upload Method"}
          data={imageUploadMethod}
          selectedValue={(text) => {
            if (text === "Camera") {
              openCameraPlatform();
            }
            if (text === "Gallery") {
              galleryOpen();
            }
          }}
        />
      </RBSheet>

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

      {loading && (
        <View style={styles.loaderContainer}>
          <View style={styles.loaderView}>
            <BallIndicator color={Colors.Primary} count={8} size={40} />
            <Text style={styles.loaderText}>Please Wait...</Text>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default AddNewPatient;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
  scrollView: {
    flex: 1,
  },
  viewHolder: {
    marginTop: moderateScaleVertical(10),
    padding: moderateScale(10),
    width: "95%",
    alignSelf: "center",
    gap: moderateScale(10),
  },
  text: {
    fontSize: textScale(15),
    fontFamily: FontFamily.P_400,
    color: Colors.Grey,
  },
  inputBox: {
    borderWidth: 1,
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    borderColor: Colors.White,
    fontSize: textScale(15),
    color: Colors.Black,
    backgroundColor: Colors.White,
  },
  inputBox2: {
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
  ageGenderHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(10),
  },
  button2: {
    width: "45%",
    alignItems: "center",
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(1),
    padding: moderateScale(10),
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
  buttonText2: {
    color: Colors.White,
    fontSize: textScale(16),
    fontFamily: FontFamily.P_600,
  },
  buttonHolder2: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "95%",
    alignSelf: "center",
    marginVertical: moderateScaleVertical(20),
  },
  imageHolder: {
    alignItems: "center",
    marginBottom: moderateScaleVertical(10),
  },
  imageStyle: {
    height: moderateScale(150),
    width: moderateScale(150),
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(75),
    borderColor: Colors.Primary,
  },
  icon: {
    position: "absolute",
    top: "80%",
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(15),
    backgroundColor: Colors.Primary,
    overflow: "hidden",
    padding: moderateScale(10),
    borderColor: Colors.Primary,
  },
  errorText: {
    fontSize: textScale(15),
    color: Colors.CrimsonRed,
    fontFamily: FontFamily.P_500,
    width: "100%",
    textTransform: "capitalize",
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
    gap: moderateScaleVertical(10),
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
    fontFamily: FontFamily.P_400,
  },
});
