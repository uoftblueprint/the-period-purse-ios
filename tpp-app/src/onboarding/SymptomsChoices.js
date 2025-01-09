import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { Card, Text } from "@rneui/themed";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import { STACK_SCREENS } from "./Confirmation";
import { BackButton } from "../home/components/BackButtonComponent";
import { NextButton, SymptomsChoicesButton, SkipButton } from "./components/ButtonComponents";
import { BodyText, TitleText } from "./components/TextComponents";
import { TwoButtonContainer, BackButtonContainer, SymptomsButtonContainer } from "./components/ContainerComponents";
import { POSTSymptomsToTrack } from "../services/OnboardingService";
import MoodIcon from "../../assets/icons/mood.svg";
import ExerciseIcon from "../../assets/icons/exercise.svg";
import CrampsIcon from "../../assets/icons/cramps.svg";
import SleepIcon from "../../assets/icons/sleep.svg";
import BackgroundShape from "../../assets/icons/background_shape.svg";
import CalendarIcon from "../../assets/icons/symptoms_track_img.svg";
import BarIcon from "../../assets/icons/onboard_bar3.svg";
import FlowDeselected from "../../assets/icons/flow_deselected.svg";
import ErrorFallback from "../error/error-boundary";

let WHITE = "#FFFFFF"; // button is not selected
let TEAL = "#73C7B7"; // button is selected
export default function SymptomsChoices({ route, navigation }) {
  const { periodLength, periodStart, periodEnd } = route.params;

  // checks for button selection are based on the background color
  const [sleep, setSleep] = useState(WHITE);
  const [mood, setMood] = useState(WHITE);
  const [cramp, setCramp] = useState(WHITE);
  const [exercise, setExercise] = useState(WHITE);

  const handleSleep = () => {
    sleep == WHITE ? setSleep(TEAL) : setSleep(WHITE);
  };
  const handleMood = () => {
    mood == WHITE ? setMood(TEAL) : setMood(WHITE);
  };
  const handleCramp = () => {
    cramp == WHITE ? setCramp(TEAL) : setCramp(WHITE);
  };
  const handleExercise = () => {
    exercise == WHITE ? setExercise(TEAL) : setExercise(WHITE);
  };

  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <BackButtonContainer style={styles.backButtonContainer}>
          <BackButton
            title=""
            onPress={() => {
              navigation.navigate(STACK_SCREENS.PERIOD_START, {
                periodLength: periodLength,
              });
            }}
          />
        </BackButtonContainer>

        <View pointerEvents="none" style={{ alignItems: "center" }}>
          <BackgroundShape style={{ top: "10%" }} />
          <CalendarIcon width="250" height="250" style={{ bottom: "30%" }} />
          <BarIcon style={{ bottom: "31%" }} />
          <TitleText style={{ bottom: "30%" }}>What symptoms do you {"\n"} want to track?</TitleText>
          <BodyText style={{ bottom: "31%" }}>You can change these anytime in your settings. {"\n"}</BodyText>
          <Card containerStyle={[styles.card]}>
            <FlowDeselected style={styles.image} />
            <Text style={{ top: 10, marginLeft: "28%", marginRight: "4%", fontSize: 14.5 }}>
              By default, we'll always track your period flow. Choose up to four other symptoms to track.
            </Text>
          </Card>
        </View>

        <SymptomsButtonContainer>
          <SafeAreaView style={[styles.symptoms, { backgroundColor: mood }]}>
            <SymptomsChoicesButton
              onPress={handleMood}
              title="Mood"
              icon={<MoodIcon style={styles.icon} fill="black" />}
            />
          </SafeAreaView>
          <SafeAreaView style={[styles.symptoms, { backgroundColor: exercise }]}>
            <SymptomsChoicesButton
              onPress={handleExercise}
              title="Exercise"
              icon={<ExerciseIcon style={styles.icon} />}
            />
          </SafeAreaView>
          <SafeAreaView style={[styles.symptoms, { backgroundColor: cramp }]}>
            <SymptomsChoicesButton onPress={handleCramp} title="Cramps" icon={<CrampsIcon style={styles.icon} />} />
          </SafeAreaView>
          <SafeAreaView style={[styles.symptoms, { backgroundColor: sleep }]}>
            <SymptomsChoicesButton onPress={handleSleep} title="Sleep" icon={<SleepIcon style={styles.icon} />} />
          </SafeAreaView>
        </SymptomsButtonContainer>

        <TwoButtonContainer style={{ bottom: "3%" }}>
          <SkipButton
            title="Skip"
            onPress={async () => {
              POSTSymptomsToTrack(true, false, false, false, false).then(() => {
                navigation.navigate(STACK_SCREENS.CONFIRMATION, {
                  periodLength: periodLength,
                  periodStart: periodStart,
                  periodEnd: periodEnd,
                  trackingPreferences: [true, false, false, false, false],
                });
              });
            }}
          />
          <NextButton
            title="Next"
            onPress={async () => {
              let trackingPreferences = [true, mood === TEAL, sleep === TEAL, cramp === TEAL, exercise === TEAL];
              POSTSymptomsToTrack(
                trackingPreferences[0],
                trackingPreferences[1],
                trackingPreferences[2],
                trackingPreferences[3],
                trackingPreferences[4]
              ).then(() => {
                navigation.navigate(STACK_SCREENS.CONFIRMATION, {
                  periodLength: periodLength,
                  periodStart: periodStart,
                  periodEnd: periodEnd,
                  trackingPreferences: trackingPreferences,
                });
              });
            }}
            disabled={[mood, sleep, cramp, exercise].some((element) => element == TEAL) ? false : true}
          />
        </TwoButtonContainer>
      </ImageBackground>
    </ErrorFallback>
  );
}

const styles = StyleSheet.create({
  backButtonContainer: {
    zIndex: 1,
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  symptoms: {
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 16,
    width: 55,
    height: 55,
  },
  icon: {
    alignSelf: "center",
    top: "30%",
  },
  card: {
    bottom: "33%",
    borderRadius: 12,
    width: "88%",
    height: "11%",
    borderWidth: 0,
    shadowColor: "rgba(0,0,0, 0.0)", // Remove Shadow for iOS
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    backgroundColor: "#CEE2DE",
  },
  image: {
    position: "absolute",
    top: 3,
    marginLeft: "2%",
  },
});
