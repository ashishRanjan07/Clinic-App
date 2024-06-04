import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsivePadding } from '../../Theme/Responsive'
import Colors from '../../Theme/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign';
const HeaderView = () => {
  return (
    <View style={styles.headerView}>
        <View style={{flexDirection:'row',alignItems:'center',gap:responsivePadding(20),width:'50%',justifyContent:'flex-start'}}>
            {/* <AntDesign name="arrowleft" size={responsiveFontSize(30)} color={Colors.Tertiary}/> */}
            <Text style={styles.text}>Payments</Text>
        </View>
        <TouchableOpacity style={styles.downloadStatement}>
            <Text style={styles.downloadStatementText}>Download Statements</Text>
        </TouchableOpacity>
    </View>
  )
}

export default HeaderView

const styles = StyleSheet.create({
    headerView:{
        flexDirection:'row',
        padding:responsivePadding(10),
        justifyContent:'space-between',
        alignItems:'center',
        width:'95%',
        alignSelf:'center'
    },
    text:{
        fontSize:responsiveFontSize(20),
        fontWeight:'600',
        color:Colors.Tertiary
    },
    downloadStatement:{
        borderWidth:1,
        padding:responsivePadding(10),
        borderRadius:responsivePadding(10),
        borderColor:Colors.MediumGrey
    },
    downloadStatementText:{
        color:Colors.Black,
        fontSize:responsiveFontSize(16),
        fontWeight:'600'
    }
})