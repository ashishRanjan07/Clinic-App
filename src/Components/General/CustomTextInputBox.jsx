import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Colors from '../../Theme/Colors'
import { moderateScale, moderateScaleVertical, textScale } from '../../utils/ResponsiveSize'
import FontFamily from '../../utils/FontFamily'

const CustomTextInputBox = ({value,onChangeText,placeholder,keyboardType,multiLine,maxlength,editable}) => {
  return (
    <View style={styles.viewHolder}>
      <Text style={styles.text}>{placeholder}</Text>
          <TextInput
            style={styles.inputBox}
            placeholder={placeholder}
            placeholderTextColor={Colors.MediumGrey}
            keyboardType={keyboardType}
            value={value}
            multiline={multiLine}
            onChangeText={onChangeText}
            maxLength={maxlength}
            editable={editable}
          />
    </View>
  )
}

export default CustomTextInputBox

const styles = StyleSheet.create({
    text: {
        fontSize: textScale(15),
        fontFamily:FontFamily.P_400,
        color: Colors.Grey,
      },
      inputBox: {
        borderWidth: 1,
        padding: moderateScale(10),
        borderRadius: moderateScale(10),
        borderColor: Colors.White,
        fontSize: textScale(15),
        color: Colors.Black,
        backgroundColor: Colors.White,
      },
      viewHolder: {
        marginTop: moderateScaleVertical(10),
        padding: moderateScale(10),
        width: "95%",
        alignSelf: "center",
        gap: moderateScaleVertical(10),
      },
})