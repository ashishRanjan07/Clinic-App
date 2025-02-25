import { showMessage } from "react-native-flash-message";

export function showSuccessMessage(message) {
  showMessage({
    type: "success",
    icon: "success",
    message: message,
  });
}

export function showErrorMessage(message) {
  showMessage({
    type: "danger",
    icon: "danger",
    message: message,
  });
}
