import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize } from '../../Theme/Responsive'
import Colors from '../../Theme/Colors'


const Dropdown = ({label,data}) => {
    const [open, setOpen] = useState(false)
  return (
    <View>
     <TouchableOpacity onPress={()=>setOpen(!open)} style={styles.dropdownSelector}>
       <Text style={styles.labelText}>{label || ""}</Text>
       <Ionicons
       
            style={{alignSelf:"flex-end",
                marginBottom:10,
            }}
            name="chevron-down"
            size={responsiveFontSize(15)}
            color={Colors.Grey}
          />
     </TouchableOpacity>

       {
        open &&(
            <View style={styles.dropdownArea}>
            <TextInput
             placeholder='Search'
             placeholderTextColor={'gray'}
             style={styles.searchInput}
            />


             
       </View>
        )
       }
    </View>
  )
}

export default Dropdown

const styles = StyleSheet.create({
    dropdownSelector:{
        width:'100%',
        height:50,
        borderRadius:10,
        backgroundColor:'white',
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingLeft:15,
        paddingRight:15
    },
    labelText:{
        color:"gray",
        fontSize:16,
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
      },
      dropdownArea:{
        width:'100%',
        height:300,
        backgroundColor:"white",
        elevation:5,
        zIndex:999,
        position:'absolute',
        top:50,

      },
      searchInput:{
        width:"90%",
        alignSelf:"center",
        marginTop:10,
        height:40,
        borderRadius:5,
        borderWidth:0.5,
        borderColor:"#8e8e8e"
      },
      dropdownItem:{
        width:"90%",
        marginTop:3,
        height:40,
        borderRadius:10,
        borderColor:'#8e8e8e',
        borderWidth:0.2,
        alignSelf:"center"
      }
})