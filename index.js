import { AppRegistry, Text, TextInput } from "react-native";
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
// Disable font scaling globally for TextInput
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
import App from "./App";
import './gesture-handler';
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
