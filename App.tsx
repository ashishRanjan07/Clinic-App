import { Alert, LogBox, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import NoInternet from "./src/screens/Auth/NoInternet";
import NetInfo from "@react-native-community/netinfo";
import { Provider } from "react-redux";
import store from "./src/redux/store/Store";
import Toast from "react-native-toast-message";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/navigation/routes/Routes";
import JailMonkey from "jail-monkey";
import RNExitApp from "react-native-exit-app";
const App = () => {
  const [isConnected, setIsConnected] = useState(true);
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();
  // console.log = console.warn = console.error = () => {};

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    checkPhoneRooted();
    return () => unsubscribe();
  }, []);
  const checkPhoneRooted = () => {
    if (JailMonkey.isJailBroken()) {
      // Alternative behaviour for jail-broken/rooted devices.
      console.log("Yes");
      Alert.alert("Warning", "Your Phone is Rooted");
      RNExitApp.exitApp();
    } else {
      console.log("Not");
    }
  };
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Toast />
        <FlashMessage position={"top"} />
        {isConnected ? (
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        ) : (
          <NoInternet />
        )}
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
