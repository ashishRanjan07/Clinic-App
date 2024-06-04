import {
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../Theme/Colors";
import GeneralHeader from "../General/GeneralHeader";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import images from "../../Theme/Image";
import Feather from "react-native-vector-icons/Feather";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { addPatients } from "../../API_Services/Auth_API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from 'lottie-react-native';
import LotifileAlert from "../General/LotifileAlert";

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

  const toggleGenderModal = () => {
    setGenderModalVisible(!isGenderModalVisible);
  };

  const toggleBloodGroupModal = () => {
    setIsBloodModalVisible(!isBloodModalVisible);
  };

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

  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
    toggleGenderModal();
  };

  const handleBloodGroupSelection = (selectedBloodGroup) => {
    setBloodGroup(selectedBloodGroup);
    toggleBloodGroupModal();
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
          setIsModalVisible(false);
          setProfileImage(imageUri);
          console.log(imageUri, "Line 31");

          // Now send the image to the server
          //   await updateProfilePicture(imageUri);
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

  // Function to open camera (iOS)
  const openCameraIOS = () => {
    openCamera();
  };

  // Generic function to open camera
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

          //   await updateProfilePicture(imageUri);
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
    console.log(response?.clinic_staff?.clinic_id, "Line 221");
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
      userData.append("clinic_id", clinicId);
      if (profileImage) {
        userData.append("file", {
          uri: profileImage,
          type: "image/png",
          name: "patient.jpg",
        });
      }
      console.log(userData, "Line 305");

      const response = await addPatients(userData);
      console.log(response,"Line 308");
      if(response.status){
        console.log("Success");
        setFName('');
        setMName('');
        setLName('');
        setMNumber('');
        setEmail('');
        setAge('');
        setGender('');
        setAddress('');
        setMessage('');
        setBloodGroup('');
        setProfileImage(null)
        setShowAlert(true);
      }
      // Proceed with form submission
    }
  };
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.Secondary }}>
      <SafeAreaView style={{ backgroundColor: Colors.Secondary }} />
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.Secondary} />
      <GeneralHeader title="Add Patient" />
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

          <TouchableOpacity
            style={styles.icon}
            onPress={() => setIsModalVisible(true)}
          >
            <Feather
              name="camera"
              size={responsiveFontSize(30)}
              color={Colors.White}
            />
          </TouchableOpacity>
        </View>
        {/*First Name */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>First Name</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="First Name"
            placeholderTextColor={Colors.MediumGrey}
            keyboardType="default"
            value={fName}
            onChangeText={(text) => setFName(text)}
          />
          {fNameError && <Text style={styles.errorText}>{fNameError}</Text>}
        </View>
        {/*Middle Name */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Middle Name</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Middle Name"
            placeholderTextColor={Colors.MediumGrey}
            keyboardType="default"
            value={mName}
            onChangeText={(text) => setMName(text)}
          />
        </View>
        {/*last Name */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Last Name</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Last Name"
            placeholderTextColor={Colors.MediumGrey}
            keyboardType="default"
            value={lName}
            onChangeText={(text) => setLName(text)}
          />
          {lNameError && <Text style={styles.errorText}>{lNameError}</Text>}
        </View>
        {/*Phone Number */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Mobile Number</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Mobile Number"
            placeholderTextColor={Colors.MediumGrey}
            keyboardType="number-pad"
            maxLength={10}
            value={mNumber}
            onChangeText={(text) => setMNumber(text)}
          />
          {mNumberError && <Text style={styles.errorText}>{mNumberError}</Text>}
        </View>
        {/*Email Id */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Email Id</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Email Id"
            placeholderTextColor={Colors.MediumGrey}
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        {/* Age and Gender */}
        <View style={styles.ageGenderHolder}>
          {/* Age */}
          <View style={[styles.viewHolder, { width: "45%", padding: 0 }]}>
            <Text style={styles.text}>Age</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Age"
              placeholderTextColor={Colors.MediumGrey}
              maxLength={3}
              keyboardType="number-pad"
              value={age}
              onChangeText={(text) => setAge(text)}
            />
            {ageError && <Text style={styles.errorText}>{ageError}</Text>}
          </View>
          {/* Gender */}
          <View style={[styles.viewHolder, { width: "45%", padding: 0 }]}>
            <Text style={styles.text}>Gender</Text>
            <TouchableOpacity onPress={toggleGenderModal}>
              <Text style={styles.inputBox}>
                {Gender ? Gender : "Select Gender"}
              </Text>
            </TouchableOpacity>
            {genderError && <Text style={styles.errorText}>{genderError}</Text>}
          </View>
        </View>
        {/*Address */}
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
        {/*Message */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Message</Text>
          <TextInput
            style={[styles.inputBox, { height: responsivePadding(100) }]}
            placeholder="Medical message"
            multiline
            placeholderTextColor={Colors.MediumGrey}
            keyboardType="default"
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          {messageError && <Text style={styles.errorText}>{messageError}</Text>}
        </View>
        {/* Patients Code and Blood group */}
        <View style={styles.ageGenderHolder}>
          {/* Age */}
          <View style={[styles.viewHolder, { width: "45%", padding: 0 }]}>
            <Text style={styles.text}>Patients Code</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Patients Code"
              placeholderTextColor={Colors.MediumGrey}
              value={`${Math.random() * 100}`}
              editable={false}
            />
          </View>
          {/* Gender */}
          <View style={[styles.viewHolder, { width: "45%", padding: 0 }]}>
            <Text style={styles.text}>Blood Group</Text>
            <TouchableOpacity onPress={toggleBloodGroupModal}>
              <Text style={styles.inputBox}>
                {bloodGroup ? bloodGroup : "Blood Group"}
              </Text>
            </TouchableOpacity>
            {bloodGroupError && (
              <Text style={styles.errorText}>{bloodGroupError}</Text>
            )}
          </View>
        </View>

        {/* Save and Cancel Button */}
        <View style={styles.buttonHolder2}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText2}>Cancel </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={handleSubmit}>
            <Text style={styles.buttonText2}>Create </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        isVisible={isGenderModalVisible}
        onBackdropPress={toggleGenderModal}
      >
        <View style={styles.genderModalView}>
          {genderData.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleGenderSelection(item.name)}
              style={styles.genderModalItem}
            >
              <Text style={styles.genderModalText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <Modal
        isVisible={isBloodModalVisible}
        onBackdropPress={toggleBloodGroupModal}
      >
        <View style={styles.genderModalView}>
          {bloodGroupData.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleBloodGroupSelection(item.name)}
              style={styles.genderModalItem}
            >
              <Text style={styles.genderModalText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <Modal isVisible={isModalVisible} onBackdropPress={handleModal}>
        <View style={styles.genderModalView}>
          <TouchableOpacity
            onPress={openCameraPlatform}
            style={styles.genderModalItem}
          >
            <Text style={styles.genderModalText}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={galleryOpen}
            style={styles.genderModalItem}
          >
            <Text style={styles.genderModalText}>Open Gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <LotifileAlert
        visible={showAlert}
        onClose={() => {
          setShowAlert(false);
          navigation.push('Bottom Navigation');
        }}
        onYes={() => {
          // Handle Yes action here
          navigation.push('AppointmentForm');
          setShowAlert(false);
        }}
      />
    </View>
  );
};

export default AddNewPatient;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  viewHolder: {
    marginTop: responsivePadding(10),
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
  inputHolder: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    borderWidth: 2,
    borderColor: Colors.MediumGrey,
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    marginVertical: responsivePadding(5),
  },
  textInputView: {
    fontSize: responsiveFontSize(18),
    width: "100%",
    padding: responsivePadding(10),
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
  ageGenderHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsivePadding(20),
    paddingTop: responsivePadding(10),
  },
  button2: {
    width: "45%",
    alignItems: "center",
    borderRadius: responsivePadding(5),
    borderWidth: responsivePadding(1),
    padding: responsivePadding(10),
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
  buttonText2: {
    color: Colors.White,
    fontSize: responsiveFontSize(18),
    fontWeight: "600",
  },
  buttonHolder2: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "95%",
    alignSelf: "center",
    marginVertical: responsivePadding(20),
  },
  imageHolder: {
    alignItems: "center",
    marginBottom: responsivePadding(10),
  },
  imageStyle: {
    height: responsivePadding(150),
    width: responsivePadding(150),
    borderWidth: responsivePadding(2),
    borderRadius: responsivePadding(75),
    borderColor: Colors.Primary,
  },
  icon: {
    position: "absolute",
    top: responsivePadding(110),
    right: responsivePadding(150),
    borderWidth: responsivePadding(1),
    borderRadius: responsivePadding(15),
    backgroundColor: Colors.Primary,
    overflow: "hidden",
    padding: responsivePadding(10),
    borderColor: Colors.Primary,
  },
  modalButtonText: {
    fontSize: responsiveFontSize(18),
    fontWeight: "500",
    color: Colors.Black,
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.CrimsonRed,
    borderRadius: responsivePadding(15),
  },
  modalText: {
    color: Colors.Black,
    fontWeight: "bold",
    fontSize: responsiveFontSize(20),
    marginVertical: responsivePadding(15),
  },
  errorText: {
    fontSize: responsiveFontSize(16),
    color: Colors.CrimsonRed,
    fontWeight: "500",
  },
});
