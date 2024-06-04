import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../Theme/Colors';

const CustomAlert = ({ message, onCancel, onConfirm }) => {
    return (
      <View style={styles.container}>
        <View style={styles.alertBox}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onCancel} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.confirmButton]}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

export default CustomAlert

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertBox: {
      backgroundColor: Colors.White,
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    message: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      flex: 1,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    confirmButton: {
      backgroundColor: Colors.Primary,
      marginLeft: 10,
    },
    buttonText: {
      fontSize: 16,
      color: Colors.White,
    },
  });