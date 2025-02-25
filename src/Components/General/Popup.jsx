import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsivePadding } from '../../Theme/Responsive'
import Colors from '../../Theme/Colors'


const {height, width} = Dimensions.get('window');

export default function Popup({title,visible, description, subtitle,subtitle1, text, onPress, cancelText}) {
  return (
    <Modal  transparent visible={visible}>
      <View style={styles.modalView}>
         <View style={styles.mainView}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.desc}>{description}</Text>

              <Text style={styles.subtitle}>{subtitle}</Text>
              <Text style={styles.subtitle}>{subtitle1}</Text>

              <View style={styles.buttonView}>
                   <TouchableOpacity onPress={onPress} style={[styles.buttonHolder,{backgroundColor:Colors.Primary}]}>
                       <Text style={styles.buttonText}>{text}</Text>
                   </TouchableOpacity>
              </View>
         </View>
         
      </View>
    </Modal>
  )
}

const styles =  StyleSheet.create({
  modalView:{
    flex:1,
    position:'absolute',
    backgroundColor:'rgba(0,0,0,0.3)',
    justifyContent:'center',
    alignItems:'center',
    width:width,
    height:height
  },
  mainView:{
    width:responsivePadding(300),
    height:responsivePadding(230),
    borderRadius:responsivePadding(10),
    backgroundColor:Colors.White,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonView:{
    flexDirection:'row',
   gap:responsivePadding(30),
    alignItems:"center",
    marginTop:responsivePadding(10)
  },
  title:{
    fontSize:responsiveFontSize(18),
    marginTop:10,
    color:Colors.Black
  },
  desc:{
    fontSize:responsivePadding(16),
    color:Colors.MediumGrey
  },
  subtitle:{
    color:Colors.Black,
    fontSize:responsiveFontSize(18),
    marginTop:responsivePadding(5)
  },
  buttonHolder:{
    borderWidth: responsivePadding(2),
    padding: responsivePadding(15),
    width: "25%",
    justifyContent:'center',
    alignItems: "center",
    borderRadius: responsivePadding(10),
    borderColor: Colors.Primary,
  
    flexDirection: "row",
    gap: responsivePadding(10),
    
  },
  buttonText:{
    color:Colors.White,
    fontSize:responsiveFontSize(16),
    fontWeight:'400'
  }
})