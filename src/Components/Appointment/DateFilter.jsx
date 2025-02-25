import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import CalendarPicker from "react-native-calendar-picker";
import Button from "../General/Button";
import Colors from "../../Theme/Colors";
import Modal from "react-native-modal";
import moment from "moment";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";

const DateFilter = ({ selectedDate, onChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState();
  const minDate = new Date();
  const toggleModal = () => {
    setShowModal(false);
  };

  const handleDateSelection = async () => {
    console.log("confirmed Button Clicked ", date);
    onChange(date);
    setShowModal(false);
  };
  return (
    <>
      <View style={styles.dateHolder}>
        <Text style={styles.dateText}>
          {selectedDate
            ? moment(selectedDate).format("MMMM D, YYYY")
            : moment().format("LLLL")}
        </Text>
        <TouchableOpacity
          style={styles.filterHolder}
          onPress={() => {
            console.log("clicked Line 21");
            setShowModal(true);
          }}
        >
          <Feather
            name="calendar"
            size={moderateScale(28)}
            color={Colors.White}
          />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={showModal}
        onBackdropPress={toggleModal}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        avoidKeyboard={true}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <CalendarPicker
            // minDate={minDate}
            onDateChange={(text) => {
              console.log(text, "Line12");
              setDate(text);
            }}
            startFromMonday
            previousTitleStyle={styles.dateStyle}
            nextTitleStyle={styles.dateStyle}
            selectedDayColor={Colors.Primary}
          />
          <View style={styles.buttonHolder}>
            <View style={{ width: "40%" }}>
              <Button title={"Confirm"} handleAction={handleDateSelection} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DateFilter;

const styles = StyleSheet.create({
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
  modalContainer: {
    backgroundColor: Colors.White,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  dateStyle: {
    color: Colors.Black,
    fontSize: textScale(18),
  },
  modal: {
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
  },
});
