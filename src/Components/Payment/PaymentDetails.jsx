import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { responsiveFontSize, responsivePadding } from "../../Theme/Responsive";
import Colors from "../../Theme/Colors";
import images from "../../Theme/Image";
import Data from "../../Assets/Json/PaymentRecord.json";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
import Button from "../General/Button";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import AntDesign from "react-native-vector-icons/AntDesign";
import { dateWiseAppointment, getAppointmentByPatinetId } from "../../API_Services/Auth_API";
import Service from "../../Service/Service";

const PaymentDetails = ({paymentList}) => {
  let currentDate = new Date()
  // let rearrangedDate = null;
  let myDate = null;
  let patientId= null
  


  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });




  // Format the date string
  const formattedDate = dateFormatter.format(currentDate);

  let date1  = dateFormatter.format(selectedDate)

  const [expandedCard, setExpandedCard] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const staticImageURL = "https://picsum.photos/300";
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedDay, setSelectedDay] = useState(null);
  const [rearrangedDate, setRearrangeDate] = useState(null)


  const SaveToPdf = async (paymentDetails) => {
    const htmlContent = `
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .label { font-weight: bold; }
                    .value { color: ${Colors.MediumGrey}; }
                </style>
            </head>
            <body>
            <h2>Payment Details</h2>
            <p><span class="label">Sender Name:</span> <span class="value">${
              paymentDetails.sender_name
            }</span></p>
            <p><span class="label">Age:</span> <span class="value">${
              paymentDetails.age
            }</span></p>
            <p><span class="label">Mobile Number:</span> <span class="value">${
              paymentDetails.mobile_number
            }</span></p>
            <!-- Additional details for each payment -->
            ${paymentDetails.payments
              .map(
                (payment, index) => `
              <h3>Payment ${index + 1}</h3>
              <p><span class="label">Payment Method:</span> <span class="value">${
                payment.payment_method
              }</span></p>
              <p><span class="label">Amount:</span> <span class="value">Rs.${
                payment.amount
              }</span></p>
              <p><span class="label">Date:</span> <span class="value">${
                payment.date
              }</span></p>
              <p><span class="label">Time:</span> <span class="value">${
                payment.time
              }</span></p>
              <p><span class="label">Transaction ID:</span> <span class="value">${
                payment.transaction_id
              }</span></p>
              <!-- Additional details based on payment method -->
              ${
                payment.payment_method === "UPI"
                  ? `
                  <p><span class="label">UPI ID:</span> <span class="value">${payment.additional_details.UPI_ID}</span></p>
                  <p><span class="label">Remarks:</span> <span class="value">${payment.additional_details.remarks}</span></p>
                `
                  : payment.payment_method === "Credit Card"
                  ? `
                  <p><span class="label">Card Type:</span> <span class="value">${payment.additional_details.card_type}</span></p>
                  <p><span class="label">Card Number:</span> <span class="value">${payment.additional_details.card_number}</span></p>
                  <p><span class="label">Expiry Date:</span> <span class="value">${payment.additional_details.expiry_date}</span></p>
                `
                  : payment.payment_method === "Debit Card"
                  ? `
                  <p><span class="label">Card Type:</span> <span class="value">${payment.additional_details.card_type}</span></p>
                  <p><span class="label">Card Number:</span> <span class="value">${payment.additional_details.card_number}</span></p>
                  <p><span class="label">Expiry Date:</span> <span class="value">${payment.additional_details.expiry_date}</span></p>
                `
                  : `
                  <p><span class="label">Method Description:</span> <span class="value">${payment.additional_details.method_description}</span></p>
                `
              }
            `
              )
              .join("")}
            </body>
            
            </body>
        </html>
    `;

    try {
      const options = {
        html: htmlContent,
        fileName: `Payment-Details`,
        directory: "Invoices",
      };

      const file = await RNHTMLtoPDF.convert(options);

      // File is downloaded successfully

      console.log("File:",file);
      // setDownloadMessage(true);
      Alert.alert("PDF saved successfully at: " + file.filePath);
    } catch (error) {
      console.error("Error while saving PDF:", error);
      Alert.alert(
        "Error while saving PDF."
      );
    }
  };

  const toggleModal = () => {
   
    setShowModal(!showModal);
    // filterAppointmentByDate(rearrangedDate)
  };

  useEffect(()=>{
    // getAppointmentByDate()
  
  },[])



  const getAppointmentByDate =async()=>{
  let today = new Date();
  const day = today.getDate(); // Returns the day of the month (1-31)
const month = today.getMonth() + 1; // Returns the month (0-11); +1 to adjust to (1-12)
const year = today.getFullYear();
const myDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
console.log(myDate)

const response = await dateWiseAppointment(myDate)
console.log(response)
if(response && response.appointments){
  setPaymentDetails(response.appointments)
  patientId =  await response?.appointments?.patient_id
}


  }
  const onDayPress = (day) => {
    setSelectedDay(day.dateString);
   setSelectedDate(day.dateString)
    let d1 = day.dateString.split('-');
  setRearrangeDate( `${d1[2]}-${d1[1]}-${d1[0]}`)
    // toggleModal();
  };

  const filterAppointmentByDate = async(date)=>{
    const response = await dateWiseAppointment(date)
    console.log("Date Wise Appointment:",response)
    if(response && response.appointments){
      setPaymentDetails(response?.appointments)
      setShowModal(false)
       
    } else{
      Alert.alert('Info','No Payment Details Found!!')
      setPaymentDetails([])
      setShowModal(false)
    } 
      

   
  }

  const renderItem = ({ item, index }) => {
    const isExpanded = expandedCard === index;

    const handleCardPress = async() => {
      await getAppointmentViaPatientId(patientId)

     
      if (isExpanded) {
        setExpandedCard(null);
      } else {
        setExpandedCard(index);
      }
    };

    const getAppointmentViaPatientId = async(id)=>{
      console.log(id)
      const idResponse = await getAppointmentByPatinetId(1)
      console.log('idResponse:', idResponse)
    }

    
    return (
      <TouchableOpacity style={styles.card} onPress={handleCardPress}>
        <View style={styles.viewHolder}>
          <View style={styles.imageContainer}>
          <Image
            source={{ uri: staticImageURL }}
            resizeMode="cover"
            style={styles.imageStyle}
          />
          </View>
          <View style={styles.view2}>
            <View style={styles.nameView}>
              <Text style={styles.text1}>{item?.patient?.first_name}</Text>
              <Text style={styles.amountText}>
              ₹{item?.amount}
              </Text>
            </View>
            <View style={styles.nameView}>
              <Text style={styles.text}>{item?.age ||"25"} Years</Text>
              <Text style={styles.line}>|</Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: responsivePadding(3),
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="call-outline"
                  size={responsiveFontSize(20)}
                  color={Colors.MediumGrey}
                />
                <Text style={{ color:Colors.MediumGrey}}>{item?.mobile_number || "8888888888"}</Text>
              </View>
              <Text style={styles.line}>|</Text>
              <Text style={styles.amountText}>{item?.payment_mode == "1"?"Online":"Offline"}</Text>
            </View>
          </View>
        </View>
        {/* {isExpanded && (
          <View style={styles.expandedDetails}>
            {Data?.payment_details?.payments.map((payment, paymentIndex) => (
              <View key={paymentIndex} style={styles.paymentDetails}>
                <View style={styles.detailsHolder}>
                  <Text style={styles.amountText}>{payment.date}</Text>
                  <View style={styles.timeHolder}>
                    <Ionicons
                      name="time-outline"
                      size={responsiveFontSize(15)}
                      color={Colors.Black}
                    />
                    <Text style={styles.text2}>{payment.time}</Text>
                  </View>
                </View>
                <View style={styles.detailsHolder}>
                  <Text style={styles.amountText}>Payment</Text>
                  <Text style={styles.text2}>{payment?.payment_method}</Text>
                </View>
                <View style={[styles.detailsHolder, { borderEndWidth: 0 }]}>
                  <Text style={styles.amountText}>Receipt</Text>
                  <TouchableOpacity
                    onPress={() => SaveToPdf(item)}
                    style={styles.printHolder}
                  >
                    <Text style={[styles.text2, { color: Colors.White }]}>
                      Print
                    </Text>
                  </TouchableOpacity>
                </View>
                
              </View>
              
            ))}
            <View style={{justifyContent:'center', alignItems:"center"}}>
            <TouchableOpacity
                    onPress={() => setExpandedCard(null)}
                    style={styles.cancelBtn}
                  >
                    <Text style={[styles.text2, { color: Colors.White }]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
          </View>
        )} */}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.dateHolderView}>
        {/* Date wise show Payment Records */}
        <Text style={styles.dateText}>Today, {selectedDate?selectedDate:formattedDate} </Text>
        <TouchableOpacity style={styles.filterHolder} onPress={()=>toggleModal()}>
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
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={onDayPress}
            theme={{
              textSectionTitleColor: "#b6c1cd",
              todayTextColor: "#00adf5",
              arrowColor: "orange",
            }}
            markedDates={{
              [selectedDay]: {
                selected: true,
                marked: true,
                selectedColor: "blue",
              },
            }}
          />
          <View style={styles.buttonHolder}>
            <View style={{ width: "40%" }}>
              <Button title={"Cancel"} handleAction={()=>setShowModal(false)} />
            </View>
            <View style={{ width: "40%" }}>
              <Button title={"Apply"} handleAction={()=>filterAppointmentByDate()} />
            </View>
          </View>
        </View>
      </Modal>
      {/* Payment Record View */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={paymentDetails}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return Colors.CrimsonRed;
    case "Pending":
      return Colors.Black;
    case "Failed":
      return Colors.Green;
    default:
      return Colors.MediumGrey;
  }
};
export default PaymentDetails;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  dateHolderView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    alignItems: "center",
    padding: responsivePadding(10),
    gap: responsivePadding(10),
    marginLeft: responsivePadding(10),
  },
  dateText: {
    fontSize: responsiveFontSize(18),
    color: Colors.Black,
    fontWeight: "600",
    width: "80%",
  },
  icon: {
    width: responsivePadding(60),
    height: responsivePadding(50),
  },
  imageContainer:{
    padding:10,
  },
  imageStyle: {
    width: responsivePadding(75),
    height: responsivePadding(100),
    borderRadius:responsivePadding(10),
    padding:responsivePadding(10)
  },
  nameView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "82%",
    alignItems: "center",
    height: responsivePadding(30),
  },
  text: {
    color: Colors.MediumGrey,
    fontSize: responsiveFontSize(16),
  
  },
  text1: {
    color: Colors.Black,
    fontSize: responsiveFontSize(18),
    fontWeight:"600"


  
  },
  amountText: {
    color: Colors.Primary,
    fontSize: responsiveFontSize(16),
    fontWeight: "400",
  },
  card: {
    backgroundColor: Colors.White,
    marginVertical: responsivePadding(10),
    width: "95%",
    borderRadius: responsivePadding(10),
    alignSelf: "center",
    elevation:5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
    shadowRadius: responsivePadding(3),
  },
  viewHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: responsivePadding(10),
    gap: responsivePadding(5),
  },
  view2: {
    marginVertical: responsivePadding(10),
    gap: responsivePadding(20),
  },
  line: {
    color: Colors.Tertiary,
    fontSize: responsiveFontSize(18),
  },
  expandedDetails: {
    marginTop: responsivePadding(10),
    padding: responsivePadding(10),
    backgroundColor: Colors.Secondary,
    borderRadius: responsivePadding(10),
    width: "90%",
    alignSelf: "center",
    marginBottom: responsivePadding(10),
  },
  paymentDetails: {
    padding: responsivePadding(10),
    marginVertical: responsivePadding(10),
    borderRadius: responsivePadding(10),
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: Colors.White,
  },
  detailsHolder: {
    gap: responsivePadding(20),
    alignItems: "center",
    paddingRight: responsivePadding(10),
  },
  text2: {
    textAlign: "center",
    color:Colors.MediumGrey,
  },
  timeHolder: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsivePadding(5),
  },
  modalContainer: {
    backgroundColor: Colors.White,
    borderRadius: responsivePadding(5),
    padding: responsivePadding(10),
  },
  buttonHolder: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: responsivePadding(10),
  },
  printHolder: {
    borderWidth: responsivePadding(2),
    borderColor: Colors.Primary,
    backgroundColor: Colors.Primary,
    paddingHorizontal: responsivePadding(10),
    borderRadius: responsivePadding(5),
  },
  cancelBtn:{
    borderWidth: responsivePadding(2),
    borderColor: Colors.Primary,
    backgroundColor: Colors.Primary,
    paddingHorizontal: responsivePadding(25),
    padding:responsivePadding(8),
    borderRadius: responsivePadding(5),
  },
  filterHolder: {
    borderColor: Colors.Primary,
    borderWidth: responsivePadding(2),
    padding: responsivePadding(8),
    borderRadius: responsivePadding(10),
    backgroundColor: Colors.Primary,
  },
});
