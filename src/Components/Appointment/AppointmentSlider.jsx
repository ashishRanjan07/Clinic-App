import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import Colors from '../../Theme/Colors';
import {responsiveFontSize, responsivePadding} from '../../Theme/Responsive';

const AppointmentSlider = ({activeSection, onSectionChange}) => {
  const handleSectionPress = sectionName => {
    onSectionChange(sectionName);
  };

  const getSectionStyle = sectionName => {
    return activeSection === sectionName
      ? styles.activeSection
      : styles.inactiveSection;
  };

  const getSectionTextStyle = sectionName => {
    return activeSection === sectionName
      ? styles.activeText
      : styles.inactiveText;
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={[styles.sectionHolder, getSectionStyle('Upcoming')]}
        onPress={() => handleSectionPress('Upcoming')}>
        <Text style={[styles.text, getSectionTextStyle('Upcoming')]}>
          Upcoming
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.sectionHolder, getSectionStyle('Missed')]}
        onPress={() => handleSectionPress('Missed')}>
        <Text style={[styles.text, getSectionTextStyle('Missed')]}>Missed</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.sectionHolder, getSectionStyle('Completed')]}
        onPress={() => handleSectionPress('Completed')}>
        <Text style={[styles.text, getSectionTextStyle('Completed')]}>
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.White,
    width: '95%',
    alignSelf: 'center',
    marginVertical: responsivePadding(20),
    borderRadius: responsivePadding(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHolder: {
    width: '33%',
    padding: responsivePadding(15),
    borderRadius: responsivePadding(5),
    alignItems: 'center',
    height: responsivePadding(50),
  },
  activeSection: {
    backgroundColor: Colors.Primary,
  },
  inactiveSection: {
    backgroundColor: Colors.White,
  },
  text: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
  },
  activeText: {
    color: Colors.White,
  },
  inactiveText: {
    color: Colors.Black,
  },
});

export default AppointmentSlider;
