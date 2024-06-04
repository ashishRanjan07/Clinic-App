import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Colors from "../../../Theme/Colors";
import { responsivePadding } from "../../../Theme/Responsive";
import images from "../../../Theme/Image";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem("loginData").then((loginData) => {
      if (loginData) {
        navigation.push("Bottom Navigation", {
          loginData: JSON.parse(loginData),
        });
      } else {
        const timer = setTimeout(() => {
          navigation.replace("Welcome");
        }, 3000);
        return () => clearTimeout(timer);
      }
    });
  }, [navigation]);
  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={Colors.Primary} barStyle={"dark-content"} />
      <View style={styles.container}>
        <Image
          source={images.splash_Screen}
          resizeMode="contain"
          style={styles.imageStyle}
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
  imageStyle: {
    width: "80%",
    height: responsivePadding(200),
  },
});
