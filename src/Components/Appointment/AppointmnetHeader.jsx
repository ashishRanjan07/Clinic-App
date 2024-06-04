import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {responsiveFontSize, responsivePadding} from '../../Theme/Responsive';
import Colors from '../../Theme/Colors';
import Fontisto from 'react-native-vector-icons/Fontisto';

const AppointmnetHeader = ({toggleFilter}) => {
  const [showSearchbar, setShowSearchBar] = useState(false);
  return (
    <>
      <View style={styles.main}>
        <View style={styles.viewHolder}>
          <TouchableOpacity style={styles.backTouch}>
            <AntDesign
              name="arrowleft"
              size={responsiveFontSize(30)}
              color={Colors.Tertiary}
            />
            <Text style={styles.text}>Appointments</Text>
          </TouchableOpacity>
          <View style={styles.searchText}>
            <TouchableOpacity onPress={() => setShowSearchBar(!showSearchbar)}>
              <AntDesign
                name="search1"
                color={Colors.Tertiary}
                size={responsiveFontSize(25)}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFilter}>
              <Fontisto
                name="equalizer"
                color={Colors.Tertiary}
                size={responsiveFontSize(25)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showSearchbar && (
        <View style={styles.searchHolder}>
          <TextInput
            placeholder="Search Patinets by name"
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

export default AppointmnetHeader;

const styles = StyleSheet.create({
  main: {
    padding: responsivePadding(10),
  },

  text: {
    fontSize: responsiveFontSize(20),
    fontWeight: '600',
    color: Colors.Tertiary,
  },
  viewHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsivePadding(30),
    justifyContent: 'space-between',
  },
  backTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsivePadding(20),
  },
  searchText: {
    flexDirection: 'row',
    gap: responsivePadding(40),
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
  textInputHolder: {
    fontSize: responsiveFontSize(18),
    fontVariant: '600',
    color: Colors.Black,
    width: '90%',
  },
});
