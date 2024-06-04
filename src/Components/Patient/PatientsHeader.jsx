import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../../Theme/Colors';
import {responsiveFontSize, responsivePadding} from '../../Theme/Responsive';

const PatientsHeader = ({toggleFilter}) => {
  const [showSearchbar, setShowSearchBar] = useState(false);
  return (
    <>
      <View style={styles.headerHolder}>
        <TouchableOpacity style={styles.touchHolder}>
          <AntDesign name="arrowleft" size={30} color={Colors.Tertiary} />
          <Text style={styles.text}>Patients List</Text>
        </TouchableOpacity>
        <View style={styles.searchView}>
          <TouchableOpacity onPress={() => setShowSearchBar(!showSearchbar)}>
            <AntDesign
              name="search1"
              size={responsiveFontSize(30)}
              color={Colors.Black}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFilter}>
            <Fontisto
              name="equalizer"
              size={responsiveFontSize(20)}
              color={Colors.Black}
            />
          </TouchableOpacity>
        </View>
      </View>
      {showSearchbar && (
        <View style={styles.searchHolder}>
          <TextInput
            placeholder="Search Patinets by name and No"
            placeholderTextColor={Colors.MediumGrey}
            style={styles.textInputHolder}
          />
          <AntDesign
            name="search1"
            size={responsiveFontSize(30)}
            color={Colors.MediumGrey}
          />
        </View>
      )}
    </>
  );
};

export default PatientsHeader;

const styles = StyleSheet.create({
  touchHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsivePadding(20),
  },
  headerHolder: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: responsivePadding(10),
  },
  searchView: {
    flexDirection: 'row',
    gap: responsivePadding(30),
    alignItems: 'center',
    marginRight: responsivePadding(10),
  },
  text: {
    fontSize: responsiveFontSize(20),
    fontWeight: '600',
    color: Colors.Tertiary,
  },
  textInputHolder: {
    fontSize: responsiveFontSize(18),
    fontVariant: '600',
    color: Colors.Black,
    width: '90%',
  },
  searchHolder: {
    borderWidth: 2,
    width: '95%',
    alignSelf: 'center',
    marginTop: responsivePadding(10),
    paddingLeft: responsivePadding(10),
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderColor: Colors.White,
  },
});
