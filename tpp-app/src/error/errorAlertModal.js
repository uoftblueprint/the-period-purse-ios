import { Alert } from "react-native";
import RNRestart from "react-native-restart";

export const errorAlertModal = () => {
  Alert.alert("Whoops", "Something went wrong. Please try reloading the app.", [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "OK",
      onPress: () => RNRestart.Restart(),
    },
  ]);
};
