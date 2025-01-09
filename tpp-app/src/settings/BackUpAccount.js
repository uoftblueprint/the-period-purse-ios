import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import { appleAuth, AppleButton } from "@invertase/react-native-apple-authentication";
import { GETAppleUser, GETLastSavedBackupTime, POSTBackupToiCloud } from "../services/AppleService";
import { onAppleButtonPress } from "../onboarding/AppleSignin";
import { errorAlertModal } from "../error/errorAlertModal";
import ErrorFallback from "../error/error-boundary";

export default function BackUpAccount({ navigation }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [lastBackupDateTime, setLastBackupDateTime] = useState("");

  useEffect(() => {
    // Check if user is currently logged into an Apple account
    async function checkUserCredentialState() {
      // get current authentication state for user
      const user = await GETAppleUser();
      console.log(user);
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(user);
      console.log(credentialState);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        setIsSignedIn(true);
      }
    }

    // Get user's last saved backup time
    async function getLastBackupDateTime() {
      const lastBackupTime = await GETLastSavedBackupTime();
      setLastBackupDateTime(
        lastBackupTime
          ? new Date(lastBackupTime).toDateString() + " at " + new Date(lastBackupTime).toLocaleTimeString()
          : "Never"
      );
    }

    checkUserCredentialState();
    getLastBackupDateTime();
  }, []);

  const backUpAccount = async () => {
    POSTBackupToiCloud()
      .then(() => {
        Alert.alert("Backup Successful", "Your data has been backed up to your iCloud!", [
          {
            text: "OK",
            style: "default",
            onPress: () => navigation.goBack(),
          },
        ]);
      })
      .catch((e) => {
        console.log(e);
        errorAlertModal();
      });
  };

  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.bgImage}>
        <SafeAreaView>
          <Text style={styles.heading}>Back Up Account</Text>
          {isSignedIn && (
            <Text style={styles.body}>
              Backing up to iCloud will upload your data to iCloud and ensure you can access it on other devices.{" "}
            </Text>
          )}
          {!isSignedIn && <Text style={styles.body}> Sign in to backup your data </Text>}
          {isSignedIn && (
            <TouchableOpacity style={styles.buttonContainer} onPress={() => backUpAccount()}>
              <Text style={styles.buttonText}> Back Up Account </Text>
            </TouchableOpacity>
          )}
          {isSignedIn && <Text style={styles.lastBackupText}> Last backup: {lastBackupDateTime} </Text>}
          {!isSignedIn && (
            <AppleButton
              buttonStyle={AppleButton.Style.WHITE_OUTLINE}
              buttonType={AppleButton.Type.SIGN_IN}
              style={styles.appleSignin}
              onPress={() => onAppleButtonPress({ navigation: navigation, comingFromSettings: true })}
            />
          )}
        </SafeAreaView>
      </ImageBackground>
    </ErrorFallback>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    alignItems: "stretch",
  },
  buttonText: {
    color: "#fff",
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
    lineHeight: 20,
  },
  body: {
    fontFamily: "Avenir",
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: -0.3,
    marginBottom: "5%",
    marginLeft: "7.5%",
  },
  lastBackupText: {
    fontFamily: "Avenir",
    fontWeight: "500",
    marginLeft: "7.5%",
    paddingTop: "5%",
    color: "#6D6E71",
  },
  textContainer: {
    justifyContent: "space-evenly",
    marginLeft: 24,
    marginRight: 10,
    marginTop: -10,
    marginBottom: 75,
  },
  appleSignin: {
    alignItems: "stretch",
    justifyContent: "center",
    borderRadius: 10,
    width: 330,
    height: 52,
    alignSelf: "center",
  },
  buttonContainer: {
    width: "85%",
    height: "20%",
    backgroundColor: "#5A9F93",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    left: "7.5%",
  },
});
