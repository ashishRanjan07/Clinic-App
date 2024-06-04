import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import Colors from '../../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {responsiveFontSize, responsivePadding} from '../../Theme/Responsive';

const PatientsFilter = ({ onClose }) => {
  return (
    <>
    <View style={styles.overlay} />
    <View style={styles.filterContainer}>
      {/* Header */}
      <View style={styles.innerView}>
        <Text></Text>
        <Text style={styles.headerText}>Filter</Text>
        <TouchableOpacity onPress={onClose}>
          <AntDesign
            name="close"
            size={responsiveFontSize(30)}
            color={Colors.Black}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.seprator} />
      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Sort  */}
        <View style={styles.contentHolder}>
          <Text style={styles.text}>Sort</Text>
          <View style={styles.filterOptionHolder}>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterOptionText}>A-Z</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterOptionText}>Z-A</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Gender  */}
        <View style={styles.contentHolder}>
          <Text style={styles.text}>Gender</Text>
          <View style={styles.filterOptionHolder}>
            <TouchableOpacity style={[styles.filterButton, {width: '30%'}]}>
              <Text style={styles.filterOptionText}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, {width: '30%'}]}>
              <Text style={styles.filterOptionText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, {width: '30%'}]}>
              <Text style={styles.filterOptionText}>Kid</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Age Range  */}
        <View style={styles.contentHolder}>
          <Text style={styles.text}>Age Range</Text>
          <View
            style={[styles.filterOptionHolder, {flexWrap: 'wrap', gap: 10}]}>
            <TouchableOpacity style={[styles.filterButton, {width: '30%'}]}>
              <Text
                style={[
                  styles.filterOptionText,
                  {fontSize: responsiveFontSize(15)},
                ]}>
                0-10 Years
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, {width: '30%'}]}>
              <Text
                style={[
                  styles.filterOptionText,
                  {fontSize: responsiveFontSize(15)},
                ]}>
                10-20 Years
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, {width: '30%'}]}>
              <Text
                style={[
                  styles.filterOptionText,
                  {fontSize: responsiveFontSize(15)},
                ]}>
                20-30 Years
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, {width: '30%'}]}>
              <Text
                style={[
                  styles.filterOptionText,
                  {fontSize: responsiveFontSize(15)},
                ]}>
                30-40 Years
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, {width: '30%'}]}>
              <Text
                style={[
                  styles.filterOptionText,
                  {fontSize: responsiveFontSize(15)},
                ]}>
                40-50 Years
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, {width: '30%'}]}>
              <Text
                style={[
                  styles.filterOptionText,
                  {fontSize: responsiveFontSize(15)},
                ]}>
                50-60 Years
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, {width: '30%'}]}>
              <Text
                style={[
                  styles.filterOptionText,
                  {fontSize: responsiveFontSize(15)},
                ]}>
                60-70 Years
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, {width: '30%'}]}>
              <Text
                style={[
                  styles.filterOptionText,
                  {fontSize: responsiveFontSize(15)},
                ]}>
                70 Above
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.seprator} />
        {/* Lower Button */}
        <View style={styles.buttonHolder}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttontext}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: Colors.White, borderColor: Colors.MediumGrey},
            ]} onPress={onClose}>
            <Text style={[styles.buttontext, {color: Colors.Black}]}>
              Cancle
            </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </>
  );
};

export default PatientsFilter;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  filterContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.White,
    borderTopLeftRadius: responsivePadding(10),
    borderTopRightRadius: responsivePadding(10),
    elevation: responsivePadding(5),
    alignItems: 'center',
    height: '100%', // Set the height to 50% of the screen
    maxHeight: '75%', // Set the max height to 50% of the screen
    overflow: 'hidden', // Hide overflow content
  },
  innerView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsivePadding(10),
    paddingHorizontal: responsivePadding(10),
  },
  headerText: {
    fontSize: responsiveFontSize(24),
    color: Colors.Tertiary,
  },
  seprator: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.MediumGrey,
    backgroundColor: Colors.MediumGrey,
  },
  scrollView: {
    width: '100%',
    flex: 1, // Take remaining space
  },
  text: {
    fontSize: responsiveFontSize(20),
    fontWeight: '600',
    color: Colors.MediumGrey,
  },
  contentHolder: {
    marginTop: 0,
    width: '95%',
    padding: responsivePadding(10),
  },
  filterOptionText: {
    fontSize: responsiveFontSize(18),
    color: Colors.Tertiary,
    fontWeight: '400',
  },
  filterOptionHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: responsivePadding(10),
  },
  filterButton: {
    borderWidth: responsivePadding(2),
    width: '45%',
    alignItems: 'center',
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
  },
  button: {
    borderWidth: responsivePadding(2),
    width: '40%',
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    alignItems: 'center',
    borderColor: Colors.Primary,
    backgroundColor: Colors.Primary,
  },
  buttontext: {
    color: Colors.White,
    fontWeight: '600',
    fontSize: responsiveFontSize(20),
  },
  buttonHolder: {
    padding: responsivePadding(10),
    width: '95%',
    marginVertical: responsivePadding(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
