import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "../../Theme/Colors";
import AppointmnetHeader from "../../Components/Appointment/AppointmnetHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BallIndicator } from "react-native-indicators";
import { getFilterAppointment } from "../../API_Services/Auth_API";
import AppointmentSlider from "../../Components/Appointment/AppointmentSlider";
import AppointmentCard from "../../Components/Appointment/AppointmentCard";
import CalendarPicker from "react-native-calendar-picker";
import DateFilter from "../../Components/Appointment/DateFilter";
import moment from "moment";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import RBSheet from "react-native-raw-bottom-sheet";
import PatientsFilter from "../../Components/Patient/PatientsFilter";
import { useIsFocused } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import Button from "../../Components/General/Button";
import FontFamily from "../../utils/FontFamily";

const Appointments = () => {
  const [searchText, setSearchText] = useState("");
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("upcoming");
  const [allAppointments, setAllAppointments] = useState([]);
  const [tempAppointments, setTempAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [previousFilters, setPreviousFilters] = useState({
    checkupType: "",
    ageRange: "",
  });
  const minDate = new Date();
  const dateFilterSheetRef = useRef();

  const rbSheetRef = useRef();

  const openFilter = () => {
    rbSheetRef.current?.open();
  };

  const openDateFilter = () => {
    dateFilterSheetRef.current?.open();
  };

  const closeDateFilter = () => {
    dateFilterSheetRef.current?.close();
  };

  useEffect(() => {
    fetchLoggedInUserData();
  }, [activeSection]);

  useEffect(() => {
    // Reset filters whenever the active section changes
    setPreviousFilters({
      checkupType: "",
      ageRange: "",
    });
  }, [activeSection]);

  const fetchLoggedInUserData = async () => {
    setLoading(true);
    try {
      const res = await AsyncStorage.getItem("loginData");
      console.log(res, "Line 46");
      if (res !== null) {
        let data = JSON.parse(res);
        setUserData(data);
        await fetchFilterWiseAppointment(
          (doctorID = data?.doctor_list[0]?.id),
          (clinicID = data?.clinic_staff?.clinic_id)
        );
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const fetchFilterWiseAppointment = async (doctorID, clinicID) => {
    const data = {
      status: activeSection,
      doctor_id: doctorID,
      clinic_id: clinicID,
    };
    console.log(data, "Line 47");
    const response = await getFilterAppointment(data);
    if (response != null) {
      setAllAppointments(response?.appointment);
      setTempAppointments(response?.appointment);
    }
  };

  const handleSearch = async (text) => {
    setSearchText(text);

    if (text) {
      const filteredAppointments = tempAppointments.filter((appointment) => {
        const fullName = [
          appointment.patient?.first_name,
          appointment.patient?.middle_name,
          appointment.patient?.last_name,
        ]
          .filter(Boolean) // Remove null or undefined values
          .join(" "); // Combine names with spaces

        return fullName.toLowerCase().includes(text.toLowerCase());
      });

      setAllAppointments(filteredAppointments);
    } else {
      // Reset to original appointments if search text is cleared
      setAllAppointments(tempAppointments);
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const filteredAppointments = tempAppointments.filter((appointment) =>
        moment(appointment.appointment_date).isSame(moment(date), "day")
      );
      setAllAppointments(filteredAppointments);
      console.log(filteredAppointments, "Line 99");
    } else {
      setAllAppointments(tempAppointments);
      closeDateFilter()
    }
  };

  const applyFilters = (filters) => {
    let filteredAppointments = [...tempAppointments];

    console.log(filters, "Filters Applied");

    // Filter by Checkup Type (Regular or Emergency)
    if (filters.checkupType !== null && filters.checkupType !== "") {
      filteredAppointments = filteredAppointments.filter(
        (appointment) =>
          appointment.priority_level.toString() === filters.checkupType
      );
    }

    // Filter by Age Range
    if (filters.ageRange) {
      const [startAge, endAge] = filters.ageRange.split("-").map(Number);
      filteredAppointments = filteredAppointments.filter((appointment) => {
        const age = appointment?.patient?.age;
        return age >= startAge && age <= endAge;
      });
    }

    setAllAppointments(filteredAppointments);
    setPreviousFilters(filters);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    setPreviousFilters({
      ...previousFilters,
      checkupType: "",
      ageRange: "",
    });
  }, [isFocused]);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.Secondary }} />
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={Colors.searchBackground}
      />
      <View style={styles.main}>
        <AppointmnetHeader
          handleSearch={(text) => handleSearch(text)}
          searchText={searchText}
          userData={userData}
          toggleFilter={openFilter}
        />
        <AppointmentSlider
          onSectionChange={(text) => setActiveSection(text)}
          activeSection={activeSection}
        />
        {/* Button to open DateFilter */}
        <View style={styles.dateHolder}>
          <Text style={styles.dateText}>
            {selectedDate
              ? moment(selectedDate).format("MMMM D, YYYY")
              : moment().format("LLLL")}
          </Text>
          <TouchableOpacity
            style={styles.filterHolder}
            onPress={openDateFilter}
          >
            <Feather
              name="calendar"
              size={moderateScale(28)}
              color={Colors.White}
            />
          </TouchableOpacity>
        </View>
        <AppointmentCard
          allAppointments={allAppointments}
          setAllAppointments={setAllAppointments}
          activeSection={activeSection}
        />
        <RBSheet
          ref={rbSheetRef}
          height={moderateScale(500)}
          openDuration={250}
          closeOnDragDown
          closeOnPressMask={true}
          customStyles={{
            container: {
              backgroundColor: Colors.White,
              borderTopLeftRadius: moderateScale(20),
              borderTopRightRadius: moderateScale(20),
              elevation: 10,
            },
            draggableIcon: {
              backgroundColor: Colors.MediumGrey,
              width: moderateScale(50),
            },
          }}
        >
          <PatientsFilter
            rbSheetRef={rbSheetRef}
            applyFilters={applyFilters}
            initialFilters={previousFilters}
            comingFrom={"appointment"}
          />
        </RBSheet>
        <RBSheet
          ref={dateFilterSheetRef}
          height={moderateScale(425)}
          openDuration={250}
          closeOnDragDown
          closeOnPressMask={true}
          customStyles={{
            container: {
              backgroundColor: Colors.White,
              borderTopLeftRadius: moderateScale(20),
              borderTopRightRadius: moderateScale(20),
              elevation: 10,
            },
            draggableIcon: {
              backgroundColor: Colors.MediumGrey,
              width: moderateScale(50),
            },
          }}
        >
          <View style={styles.modalContainer}>
            <CalendarPicker
              // minDate={minDate}
              onDateChange={(text) => {
                console.log(text, "Line12");
                handleDateChange(text);
              }}
              startFromMonday
              previousTitleStyle={styles.dateStyle}
              nextTitleStyle={styles.dateStyle}
              selectedDayColor={Colors.Primary}
            />
            <View style={styles.buttonHolder}>
              <View style={{ width: "40%" }}>
                <Button
                  title={"Confirm"}
                  handleAction={() => closeDateFilter()}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.button}
                onPress={()=>handleDateChange()}
              >
                <Text style={styles.buttontext}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </View>
      {loading && (
        <View style={styles.loaderContainer}>
          <View style={styles.loaderView}>
            <BallIndicator color={Colors.Primary} count={8} size={40} />
            <Text style={styles.loaderText}>loading Please Wait...</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default Appointments;

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
  dateFilterButton: {
    backgroundColor: Colors.Primary,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    alignItems: "center",
    marginVertical: moderateScale(10),
    marginHorizontal: moderateScale(20),
  },
  dateFilterText: {
    color: Colors.White,
    fontSize: textScale(16),
  },
  dateHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScaleVertical(10),
    width: "95%",
    alignSelf: "center",
    paddingHorizontal: moderateScale(10),
  },
  dateText: {
    fontSize: textScale(14),
    color: Colors.Black,
    fontWeight: "600",
    width: "80%",
  },
  filterHolder: {
    borderColor: Colors.Primary,
    borderWidth: moderateScale(2),
    padding: moderateScale(8),
    borderRadius: moderateScale(10),
    backgroundColor: Colors.Primary,
  },
  dateStyle: {
    color: Colors.Black,
    fontSize: textScale(18),
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: moderateScale(10),
    flex: 1,
    backgroundColor: Colors.White,
  },
  buttonHolder: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    borderWidth: moderateScale(2),
    width: "40%",
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    alignItems: "center",

    backgroundColor: Colors.White,
    borderColor: Colors.MediumGrey,
  },
  buttontext: {
    fontSize: textScale(14),
    color: Colors.Black,
    fontFamily: FontFamily.P_400,
  },
});
