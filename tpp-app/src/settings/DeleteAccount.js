import React from "react";
import { Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DELETEAccountData } from "../services/SettingsService";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import ErrorFallback from "../error/error-boundary";
import RNRestart from "react-native-restart";

export default function DeleteAccount({ navigation }) {
  const deleteAccount = async () => {
    DELETEAccountData().then(() => {
      RNRestart.Restart();
    });
  };

  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.bgImage}>
        <SafeAreaView>
          <Text style={styles.heading}>Delete Account</Text>
          <Text style={styles.body}>Are you sure you want to delete your account? You cannot undo this action. </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() =>
              Alert.alert("Delete Account", "Are you sure you want to delete your account?", [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Delete",
                  onPress: () => deleteAccount(),
                  style: "destructive",
                },
              ])
            }
          >
            <Text style={styles.deleteButtonText}> Delete Account </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </ErrorFallback>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  deleteButton: {
    width: "85%",
    height: "20%",
    backgroundColor: "#B31F20",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    left: "7.5%",
    top: "-100%",
  },
  deleteButtonText: {
    color: "#FFF",
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 14,
  },
  heading: {
    fontFamily: "Avenir",
    fontWeight: "800",
    color: "#6D6E71",
    fontSize: 16,
    letterSpacing: -0.3,
    marginLeft: "7.5%",
    marginBottom: "5%",
    top: "-100%",
    lineHeight: 20,
    left: 0,
  },
  body: {
    fontFamily: "Avenir",
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: -0.3,
    marginBottom: "5%",
    marginLeft: "7.5%",
    top: "-100%",
  },
  textContainer: {
    justifyContent: "space-evenly",
    marginLeft: 24,
    marginRight: 10,
    marginTop: -10,
    marginBottom: 75,
  },
});
