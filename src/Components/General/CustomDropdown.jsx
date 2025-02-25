import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Theme/Colors';
import { responsiveFontSize, responsivePadding } from '../../Theme/Responsive';

export default function CustomDropdown({isVisible}) {

    const genderData = [
        { id: 1, name: "Male" },
        { id: 2, name: "Female" },
        { id: 3, name: "Other" },
      ];
    const handleGenderSelection = (selectedGender) => {
        setGender(selectedGender);
        toggleGenderModal();
      };
      const toggleGenderModal = () => {
        setGenderModalVisible(!isGenderModalVisible);
      };
  return (
    <Modal
        isVisible={isVisible}
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
  )
}

const styles = StyleSheet.create({
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
})