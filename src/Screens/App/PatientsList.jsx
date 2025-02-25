import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "../../Theme/Colors";
import PatientsHeader from "../../Components/Patient/PatientsHeader";
import PatientsCard from "../../Components/Patient/PatientsCard";
import PatientsFilter from "../../Components/Patient/PatientsFilter";
import { useIsFocused } from "@react-navigation/native";
import { getPatientsByClinicId } from "../../API_Services/Auth_API";
import { BallIndicator } from "react-native-indicators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RBSheet from "react-native-raw-bottom-sheet";
import { moderateScale, textScale } from "../../utils/ResponsiveSize";

const PatientsList = () => {
  const [showSearchbar, setShowSearchBar] = useState(false);
  const [allPatientsList, setAllPatientsList] = useState([]);
  const [tempPatientList, setTempPatientList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
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
    fetchLoginData();
    setPreviousFilters({
      ...previousFilters,
      sortOrder: "",
      gender: "",
      ageRange: "",
    });
  }, [isFocused]);

  const fetchLoginData = async () => {
    try {
      const loginData = await AsyncStorage.getItem("loginData");
      if (loginData !== null) {
        const data = JSON.parse(loginData);
        await fetchPatientsList(data?.clinic_staff?.clinic_id);
      } else {
        console.log("No login data found.");
      }
    } catch (error) {
      console.error("Error fetching login data:", error);
    }
  };

  const fetchPatientsList = async (clinicId) => {
    try {
      setLoading(true);
      const response = await getPatientsByClinicId(clinicId);
      if (response != null) {
        setAllPatientsList(response?.allPatient);
        setTempPatientList(response?.allPatient);
        setLoading(false);
      } else {
        Alert.alert("No Data Found");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return error?.message;
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    if (value) {
      const filteredPatients = allPatientsList.filter((patient) => {
        const fullName =
          `${patient?.dataValues?.first_name} ${patient?.dataValues?.middle_name} ${patient?.dataValues?.last_name}`.toLowerCase();
        const phoneNumber = patient?.dataValues?.phone_number || "";
        return (
          fullName.includes(value.toLowerCase()) || phoneNumber.includes(value)
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
      console.log(filters.gender, "line 109");
      filteredPatients = filteredPatients.filter(
        (patient) => patient?.dataValues?.gender === filters.gender
      );
    }

    if (filters.ageRange) {
      console.log(filters.ageRange, "line 116");
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
        <PatientsHeader
          showSearchbar={showSearchbar}
          setShowSearchBar={setShowSearchBar}
          handleSearch={handleSearch}
          toggleFilter={openFilter}
        />
        <PatientsCard allPatientsList={tempPatientList} />
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
              Patients List loading Please Wait...
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default PatientsList;

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
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    elevation: 5,
  },
});
