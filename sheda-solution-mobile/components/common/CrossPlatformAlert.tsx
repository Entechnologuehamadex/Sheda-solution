import React from "react";
import { Alert, Platform } from "react-native";

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
}

interface CrossPlatformAlertProps {
  title: string;
  message: string;
  buttons?: AlertButton[];
}

export const showAlert = (
  title: string,
  message: string,
  buttons?: AlertButton[]
) => {
  if (Platform.OS === "web") {
    // For web, use browser's native alert/confirm
    if (buttons && buttons.length > 1) {
      // Use confirm for multiple buttons
      const result = window.confirm(`${title}\n\n${message}`);
      if (result && buttons[1]?.onPress) {
        buttons[1].onPress();
      } else if (!result && buttons[0]?.onPress) {
        buttons[0].onPress();
      }
    } else {
      // Use alert for single button
      window.alert(`${title}\n\n${message}`);
      if (buttons?.[0]?.onPress) {
        buttons[0].onPress();
      }
    }
  } else {
    // For mobile, use React Native Alert
    Alert.alert(title, message, buttons);
  }
};

export const CrossPlatformAlert: React.FC<CrossPlatformAlertProps> = ({
  title,
  message,
  buttons,
}) => {
  React.useEffect(() => {
    showAlert(title, message, buttons);
  }, [title, message, buttons]);

  return null; // This component doesn't render anything
};

export default showAlert;


