import { StyleSheet, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsivePadding } from '../../Theme/Responsive'
import Colors from '../../Theme/Colors'

const Button = ({title,handleAction}) => {
  return (
    <TouchableOpacity onPress={() => handleAction()} style={styles.buttonHolder}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  buttonHolder:{
    padding:responsivePadding(10),
    borderWidth:responsivePadding(2),
    borderRadius:responsivePadding(10),
    width:'100%',
    backgroundColor:Colors.Primary,
    borderColor:Colors.Primary,
    alignItems:'center'
  },
  buttonText:{
    fontSize:responsiveFontSize(20),
    color:Colors.White,
    fontWeight:'600',
    textAlign:'center'
  }
})
