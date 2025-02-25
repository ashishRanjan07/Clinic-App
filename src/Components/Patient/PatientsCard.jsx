import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState,useCallback } from "react";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import Colors from "../../Theme/Colors";
import { useNavigation } from "@react-navigation/native";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";

const PatientsCard = ({ allPatientsList }) => {
  const navigation = useNavigation();
  const staticImageURL = "https://picsum.photos/300";
  const [showModal, setShowModal] = useState(false);
  const renderItem = useCallback(
    ({ item, index }) => (
      <Pressable key={index} style={styles.renderTouch}>
        <View style={styles.innerView}>
          <View style={{ width: "25%" }}>
            <Image
              source={{ uri: staticImageURL }}
              resizeMode="cover"
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.dataHolder}>
            <View style={styles.dataInnerView}>
              <Text style={styles.nameText}>
                {item?.dataValues?.first_name || ""}{" "}
                {item?.dataValues?.middle_name || ""}{" "}
                {item?.dataValues?.last_name || ""}
              </Text>
              <Text style={styles.visitText}>
                {item?.dataValues?.no_of_visits || "0"}{" "}
                {item?.dataValues?.no_of_visits === 1 ? "Visit" : "Visits"}
              </Text>
            </View>
            <View style={styles.lowerContentHolder}>
              <View style={styles.lowerInnerView}>
                <Text style={styles.descriptionText}>
                  {item?.dataValues?.age ? `${item?.dataValues?.age} Years` : "N/A"}
                </Text>
              </View>
              <Text>|</Text>
              <View style={styles.lowerInnerView}>
                <FontAwesome
                  name={item?.dataValues?.gender === "Male" ? "male" : "female"}
                  color={Colors.MediumGrey}
                  size={responsiveFontSize(20)}
                />
                <Text style={styles.descriptionText}>
                  {item?.dataValues?.gender || "N/A"}
                </Text>
              </View>
              <Text>|</Text>
              <View style={styles.lowerInnerView}>
                <Feather
                  name={"smartphone"}
                  color={Colors.MediumGrey}
                  size={responsiveFontSize(20)}
                />
                <Text style={styles.descriptionText}>
                  {item?.dataValues?.phone_number || "N/A"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    ),
    [staticImageURL]
  )
  return (
    <>
      {allPatientsList?.length > 0 ? (
        <FlatList
          style={{ marginTop: responsivePadding(10) }}
          showsVerticalScrollIndicator={false}
          data={allPatientsList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      ) : (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>No Patients Founds</Text>
        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.addButton}
        onPress={() => navigation.navigate("Add Patients")}
      >
        <Entypo name="plus" size={moderateScale(30)} color={Colors.White} />
      </TouchableOpacity>
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setShowModal(false);
                navigation.push("Add Patients");
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
  renderTouch: {
    borderWidth: moderateScale(2),
    width: "95%",
    alignSelf: "center",
    marginVertical: moderateScale(5),
    borderRadius: moderateScale(5),
    backgroundColor: Colors.White,
    borderColor: Colors.White,
  },
  innerView: {
    width: "100%",
    alignSelf: "center",
    padding: moderateScale(10),
    flexDirection: "row",
    gap: moderateScale(5),
    elevation: moderateScale(5),
    backgroundColor: Colors.White,
    borderRadius: moderateScale(5),
  },
  imageStyle: {
    width: "100%",
    height: moderateScale(90),
  },
  dataHolder: {
    width: "73%",
    justifyContent: "space-around",
  },
  dataInnerView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lowerContentHolder: {
    marginTop: moderateScaleVertical(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lowerInnerView: {
    flexDirection: "row",
    gap: moderateScale(2),
  },
  nameText: {
    color: Colors.Tertiary,
    fontSize: textScale(14),
    fontFamily: FontFamily.P_500,
    textTransform:'capitalize'
  },
  visitText: {
    color: Colors.Primary,
    fontSize: textScale(12),
    fontFamily: FontFamily.P_400,
  },
  detailsHolder: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  ageHolder: {
    borderColor: Colors.MediumGrey,
    padding: moderateScale(10),
    width: "25%",
    alignItems: "center",
  },
  contentHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
  },
  bottomView: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.Primary,
    width: "95%",
    borderRadius: responsiveFontSize(5),
  },
  descriptionText: {
    fontSize: textScale(12),
    color: Colors.MediumGrey,
    fontFamily: FontFamily.P_400,
    textAlign: "center",
    textTransform:'capitalize'
  },
  addButton: {
    borderWidth: moderateScale(2),
    position: "absolute",
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(10),
    borderColor: Colors.Primary,
    backgroundColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
    bottom: moderateScale(40),
    right: moderateScale(40),
    elevation: moderateScale(20),
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: moderateScale(2),
    },
    shadowRadius: moderateScale(3),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.White,
    padding: moderateScale(20),
    borderRadius: moderateScale(10),
    alignItems: "center",
    width: "80%",
  },
  optionButton: {
    width: "100%",
    paddingVertical: moderateScaleVertical(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.Black,
  },
  optionText: {
    fontSize: textScale(18),
    color: Colors.Tertiary,
    textAlign: "center",
    fontFamily: FontFamily.P_500,
  },
  emptyView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: Colors.MediumGrey,
    fontSize: textScale(16),
    fontFamily: FontFamily.P_500,
  },
});
