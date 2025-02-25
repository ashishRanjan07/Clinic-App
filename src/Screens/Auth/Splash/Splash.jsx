import { Animated, Image, StatusBar, StyleSheet, View } from "react-native";
import React, { useEffect, useRef } from "react";
import Colors from "../../../Theme/Colors";
import { responsivePadding } from "../../../Theme/Responsive";
import images from "../../../Theme/Image";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = () => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1, 
      duration: 2000, 
      useNativeDriver: false, 
    }).start();

        const timer = setTimeout(() => {
          navigation.replace("Welcome");
        }, 3000);
        return () => clearTimeout(timer);
      
    
  }, [navigation, scaleAnim]);

  
  const imageStyle = {
    width: scaleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 250], 
    }),
    height: scaleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 250], 
    }),
  };

  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={Colors.Primary} barStyle={"dark-content"} />
      <View style={styles.container}>
        <Animated.Image
          source={images.splash_Screen}
          resizeMode="contain"
          style={[styles.imageStyle, imageStyle]}
        />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.Primary,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
