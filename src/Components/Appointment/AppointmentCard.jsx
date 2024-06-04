import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../Theme/Image';
import {responsiveFontSize, responsivePadding} from '../../Theme/Responsive';
import Colors from '../../Theme/Colors';
import Data from '../../Assets/Json/AppointmentsData.json';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import Button from '../General/Button';
import {Swipeable,GestureHandlerRootView} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

// auth commit
const AppointmentCard = ({activeSection}) => {
  const navigation = useNavigation();
  const staticImageURL = 'https://picsum.photos/300';
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedDay, setSelectedDay] = useState(null);
  

  const filterAppointmentsByStatus = status => {
    return Data.filter(appointment => appointment.Status === status);
  };

  const handleCheckCircle = () => {
    Alert.alert(
      "Mark Appointment Completed",
      "Do you want to mark this appointment completed?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: () => {
            console.log("Marked as complete Appointment")
          }
        }
      ]
    );
  };
  
  const handleCloseIcon = (item) => {
    Alert.alert(
      "Edit Appointment",
      "Do you want to edit this appointment?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: () => {
            console.log("Edit Appointment")
            navigation.push('Edit Appointment',{item})
          }
        }
      ]
    );
  };
  const leftSwipe = () => {
    return (
        <TouchableOpacity style={styles.swipleft} onPress={handleCheckCircle}>
          <AntDesign
            name="checkcircle"
            size={responsiveFontSize(24)}
            color={Colors.White}
          />
        </TouchableOpacity>
    );
  };
  const rightSwipe = (item) => {
    console.log(item,"Line 85")
    return (
        <TouchableOpacity style={[styles.swipleft, { backgroundColor: Colors.CrimsonRed }]} onPress={() => handleCloseIcon(item)}>
          <Entypo
            name="cross"
            size={responsiveFontSize(24)}
            color={Colors.White}
          />
        </TouchableOpacity>
    );
  };


  const filteredAppointments = (() => {
    switch (activeSection) {
      case 'Upcoming':
        return filterAppointmentsByStatus('Confirmed');
      case 'Missed':
        return filterAppointmentsByStatus('Missed');
      case 'Completed':
        return filterAppointmentsByStatus('Completed');
      default:
        return [];
    }
  })();
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onDayPress = day => {
    setSelectedDay(day.dateString);
    toggleModal();
  };

  const renderItem = ({item}) => {
    return (
      <Swipeable renderLeftActions={leftSwipe} renderRightActions={() =>rightSwipe(item)}>
      <TouchableOpacity style={styles.renderTouch}>
        <View style={styles.upperView}>
          <Image
            source={{uri: staticImageURL}}
            resizeMode="cover"
            style={styles.imageStyle}
          />
          <View style={styles.contentHolder}>
            <Text style={styles.text}>{item?.Name}</Text>
            <View style={styles.innerView}>
              <Text style={styles.ageText}>{item?.Age} Years</Text>
              <Text style={styles.ageText}>|</Text>
              <View style={styles.secondaryInnerView}>
                <Image
                  source={images.regular}
                  resizeMode="contain"
                  style={styles.secondaryImageStyle}
                />
                <Text style={styles.ageText}>{item?.Type_of_Visit}</Text>
              </View>
            </View>
            <View style={styles.view}>
              <View style={styles.view}>
                <AntDesign
                  name="calendar"
                  size={responsiveFontSize(14)}
                  color={Colors.MediumGrey}
                />
                <Text style={styles.text2}>{item?.Date}</Text>
              </View>
              <View style={styles.view}>
                <AntDesign
                  name="clockcircleo"
                  size={responsiveFontSize(14)}
                  color={Colors.MediumGrey}
                />
                <Text style={styles.text2}>{item?.Time}</Text>
              </View>
              <View style={[styles.view, {gap: 0}]}>
                <Entypo
                  name="dot-single"
                  size={responsiveFontSize(18)}
                  color={Colors.Primary}
                />
                <Text style={styles.text2}>{item?.Status}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView> 
    <View style={styles.main}>
      {/* Date Holder */}
      <View style={styles.dateHolder}>
        <Text style={styles.dateText}>Today 9 Apr 2024</Text>
        <TouchableOpacity style={styles.filterHolder} onPress={toggleModal}>
        <AntDesign
            name="calendar"
            size={responsiveFontSize(30)}
            color={Colors.White}
          />
          {/* <Image
            source={images.calender}
            resizeMode="contain"
            style={styles.icon}
          /> */}
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={showModal}
        onBackdropPress={toggleModal}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        avoidKeyboard={true}
        style={styles.modal}>
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={onDayPress}
            theme={{
              textSectionTitleColor: '#b6c1cd',
              todayTextColor: '#00adf5',
              arrowColor: 'orange',
            }}
            markedDates={{
              [selectedDay]: {
                selected: true,
                marked: true,
                selectedColor: 'blue',
              },
            }}
          />
          <View style={styles.buttonHolder}>
            <View style={{width: '40%'}}>
              <Button title={'Cancle'} handleAction={toggleModal} />
            </View>
            <View style={{width: '40%'}}>
              <Button title={'Apply'} handleAction={toggleModal} />
            </View>
          </View>
        </View>
      </Modal>
      {/* Render Appointments */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredAppointments}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: responsivePadding(10),
  },
  dateHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsivePadding(10),
  },
  icon: {
    width: responsivePadding(50),
    height: responsivePadding(50),
  },
  dateText: {
    fontSize: responsiveFontSize(18),
    color: Colors.Black,
    fontWeight: '600',
    width: '80%',
  },
  renderTouch: {
    marginBottom: responsivePadding(10),
    padding: responsivePadding(10),
    borderRadius: responsivePadding(5),
    backgroundColor: Colors.White,
  },
  imageStyle: {
    width: responsivePadding(75),
    height: responsivePadding(90),
  },
  contentHolder: {
    flex: 1,
    marginLeft: responsivePadding(10),
    justifyContent: 'center',
  },
  text: {
    color: Colors.Tertiary,
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
    paddingBottom: responsivePadding(5),
  },
  ageText: {
    fontSize: responsiveFontSize(16),
    color: Colors.MediumGrey,
    fontWeight: '600',
  },
  upperView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsivePadding(5),
    marginBottom: responsivePadding(13),
    gap: responsivePadding(20),
  },
  secondaryInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsivePadding(5),
  },
  secondaryImageStyle: {
    width: responsivePadding(20),
    height: responsivePadding(20),
    marginRight: responsivePadding(5),
  },
  text2: {
    fontSize: responsiveFontSize(12),
    color: Colors.MediumGrey,
    fontWeight: '400',
  },
  view: {
    flexDirection: 'row',
    gap: responsivePadding(5),
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.White,
    borderRadius: responsivePadding(5),
    padding: responsivePadding(10),
  },
  buttonHolder: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: responsivePadding(10),
  },
  swipleft: {
    marginVertical: responsivePadding(10),
    padding: responsivePadding(15),
    borderWidth: 0,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.Green,
    justifyContent: "center",
    borderRadius: 10,
    gap: 20,
  },
  filterHolder:{
    borderColor:Colors.Primary,
    borderWidth:responsivePadding(2),
    padding:responsivePadding(8),
    borderRadius:responsivePadding(10),
    backgroundColor:Colors.Primary
  }
});

export default AppointmentCard;
