import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "../../Theme/Colors";
import UpperHeader from "../../Components/Home/UpperHeader";
import Search from "../../Components/Home/Search";
import AppointmentList from "../../Components/Home/AppointmentList";
import PatientsFilter from "../../Components/Patient/PatientsFilter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GET_ALL_APPOINTMENTS,
  GET_ALL_PATIENTS_LIST,
  GET_APPOINTMENT_HISTORY,
  SEARCH_FORP_PATIENTS,
  serverAddress,
} from "../../API_Services/API_service";
import {
  getAllPatientsList,
  getPatientsByClinicId,
  getPrescriptionByPatientID,
} from "../../API_Services/Auth_API";
import { useIsFocused } from "@react-navigation/native";
import Service from "../../Service/Service";
import { BallIndicator } from "react-native-indicators";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import RBSheet from "react-native-raw-bottom-sheet";
import { moderateScale, textScale } from "../../utils/ResponsiveSize";

const Home = () => {
  const [UserLoginData, setUserLoginData] = useState();
  const [allPatientsList, setAllPatientsList] = useState([]);
  const [tempPatientList, setTempPatientList] = useState([]);
  const [patientName, setPatientName] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [previousFilters, setPreviousFilters] = useState({
    sortOrder: "",
    gender: "",
    ageRange: "",
  });
  const rbSheetRef = useRef();

  const openFilter = () => {
    rbSheetRef.current?.open();
  };

  useEffect(() => {
    setLoading(true);
    const fetchLoginData = async () => {
      try {
        const loginData = await AsyncStorage.getItem("loginData");
        if (loginData !== null) {
          const userData = JSON.parse(loginData);
          setUserLoginData(JSON.parse(loginData));
          await getAllPatientsListFunction(userData?.clinic_staff?.clinic_id);
        } else {
          console.log("No login data found.");
        }
      } catch (error) {
        console.error("Error fetching login data:", error);
      }
    };

    const getAllPatientsListFunction = async (id) => {
      try {
        console.log(id, "Line 54");
        const response = await getPatientsByClinicId(id);
        if (response) {
          setAllPatientsList(response.allPatient);
          setTempPatientList(response.allPatient);
          Service.patientList = await response.allPatient;
          setLoading(false);
        }
      } catch (error) {
        // setLoading(false);
        return error?.message;
      }
    };

    setPreviousFilters({
      ...previousFilters,
      sortOrder: "",
      gender: "",
      ageRange: "",
    });
    
    fetchLoginData();
  }, [isFocused]);

  const handleSearch = (value) => {
    if (value) {
      const filteredPatients = allPatientsList.filter(({ dataValues }) => {
        const {
          first_name = "",
          middle_name = "",
          last_name = "",
          phone_number = "",
        } = dataValues || {};
        const fullName = `${first_name}${first_name ? " " : ""}${middle_name}${
          middle_name ? " " : ""
        }${last_name}`.toLowerCase();
        return (
          fullName.includes(value.toLowerCase()) || phone_number.includes(value)
        );
      });
      setTempPatientList(filteredPatients);
    } else {
      setTempPatientList(allPatientsList);
    }
  };

  const applyFilters = (filters) => {
    let filteredPatients = [...allPatientsList];

    if (filters.sortOrder === "ASC") {
      filteredPatients.sort((a, b) =>
        (a?.dataValues?.first_name || "").localeCompare(
          b?.dataValues?.first_name || ""
        )
      );
    } else if (filters.sortOrder === "DESC") {
      filteredPatients.sort((a, b) =>
        (b?.dataValues?.first_name || "").localeCompare(
          a?.dataValues?.first_name || ""
        )
      );
    }

    if (filters.gender) {
      filteredPatients = filteredPatients.filter(
        (patient) => patient?.dataValues?.gender === filters.gender
      );
    }

    if (filters.ageRange) {
      const [startAge, endAge] = filters.ageRange.split("-").map(Number);
      filteredPatients = filteredPatients.filter((patient) => {
        const age = patient?.dataValues?.age;
        return age >= startAge && age <= endAge;
      });
    }

    setTempPatientList(filteredPatients);
    setPreviousFilters(filters);
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.Secondary }} />
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.searchBackground}/>
      <View style={styles.main}>
        <UpperHeader  userData={UserLoginData} />
        <Search title={"Create Appointments"} toggleFilter={openFilter} handleSearch={handleSearch} />
        <AppointmentList
          allPatients={tempPatientList}
          setAllPatientsList={setAllPatientsList}
          patientNames={patientName}
        />
        <RBSheet
          ref={rbSheetRef}
          height={moderateScale(500)}
          openDuration={250}
          closeOnDragDown
          customStyles={{
            container: styles.rbSheetContainer,
            draggableIcon: {
              backgroundColor: Colors.MediumGrey,
            },
          }}
        >
          <PatientsFilter
            rbSheetRef={rbSheetRef}
            applyFilters={applyFilters}
            initialFilters={previousFilters}
          />
        </RBSheet>
      </View>
      {loading && (
        <View style={styles.loaderContainer}>
          <View style={styles.loaderView}>
            <BallIndicator color={Colors.Primary} count={8} size={40} />
            <Text style={styles.loaderText}>
              Patients Appointment List loading Please Wait...
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
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
    borderWidth: moderateScale(2),
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(10),
    width: "90%",
    borderRadius: moderateScale(10),
    borderColor: Colors.Secondary,
    padding: moderateScale(10),
    backgroundColor: Colors.Secondary,
    elevation: moderateScale(10),
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
  rbSheetContainer: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: responsivePadding(10),
    borderTopRightRadius: responsivePadding(10),
    elevation: 5,
  },
});
