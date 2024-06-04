import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import Data from "../../Assets/Json/PatientsList.json";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Colors from "../../Theme/Colors";
import { useNavigation } from "@react-navigation/native";
const PatientsCard = () => {
  const navigation = useNavigation();
  const staticImageURL = "https://picsum.photos/300";
  const [showModal, setShowModal] = useState(false);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.rednerTocuh}>
        <View style={styles.dataHolder}>
          <Image
            source={{ uri: staticImageURL }}
            resizeMode="cover"
            style={styles.imageStyle}
          />
          <View style={{ justifyContent: "space-around" }}>
            <View style={styles.contentHolder}>
              <Text style={styles.nameText}>{item?.Name}</Text>
              <Text style={styles.visittext}>{item?.No_of_Visit} Visits</Text>
            </View>
            <View style={styles.lowerContentHolder}>
              <Text style={styles.descriptionText}>{item?.Age} years</Text>
              <Text style={styles.seprator}>|</Text>
              <Text style={styles.descriptionText}>{item?.Gender}</Text>
              <Text style={styles.seprator}>|</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="call-outline"
                  size={responsiveFontSize(20)}
                  color={Colors.MediumGrey}
                />
                <Text style={styles.descriptionText}>{item?.Mobile_No}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <FlatList
        style={{ marginTop: responsivePadding(10) }}
        showsVerticalScrollIndicator={false}
        data={Data?.patients}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowModal(!showModal)}
      >
        <Entypo
          name="plus"
          size={responsiveFontSize(30)}
          color={Colors.White}
        />
      </TouchableOpacity>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setShowModal(false);
                navigation.push('Add Patients');
              }}
            >
              <Text style={styles.optionText}>Add New Patients</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.optionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PatientsCard;

const styles = StyleSheet.create({
  rednerTocuh: {
    borderWidth: responsivePadding(2),
    width: "95%",
    alignSelf: "center",
    padding: responsivePadding(10),
    marginVertical: responsivePadding(10),
    borderRadius: responsivePadding(10),
    backgroundColor: Colors.White,
    borderColor: Colors.White,
  },
  imageStyle: {
    width: responsiveFontSize(75),
    height: responsivePadding(100),
  },
  dataHolder: {
    flexDirection: "row",
    gap: responsivePadding(10),
    // alignItems: 'center',
  },
  nameText: {
    color: Colors.Tertiary,
    fontSize: responsiveFontSize(18),
    fontWeight: "600",
  },
  visittext: {
    color: Colors.Primary,
    fontSize: responsiveFontSize(18),
    fontWeight: "600",
  },
  contentHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
  },
  lowerContentHolder: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // gap:responsivePadding(10),
  },
  descriptionText: {
    fontSize: responsiveFontSize(14),
    color: Colors.MediumGrey,
    fontWeight: "500",
  },
  seprator: {
    color: Colors.Tertiary,
    fontSize: responsiveFontSize(18),
    fontWeight: "600",
  },
  addButton: {
    borderWidth: responsivePadding(2),
    position: "absolute",
    width: responsivePadding(50),
    height: responsivePadding(50),
    borderRadius: responsivePadding(5),
    borderColor: Colors.Primary,
    backgroundColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
    bottom: responsivePadding(40),
    right: responsivePadding(40),
    elevation: responsivePadding(20),
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
    shadowRadius: responsivePadding(3),
  },modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.White,
    padding: responsivePadding(20),
    borderRadius: responsivePadding(10),
    alignItems: 'center',
    width: '80%',
  },
  optionButton: {
    width: '100%',
    paddingVertical: responsivePadding(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.Black,
  },
  optionText: {
    fontSize: responsiveFontSize(18),
    color: Colors.Tertiary,
    textAlign: 'center',
    fontWeight:'500'
  },
});
