import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import { WideButton } from "./components/ButtonComponents";
import {
  BackButtonContainer,
  HorizontalLine,
  SymptomIconContainer,
} from "./components/ContainerComponents";
import { SETTutorial } from "../services/TutorialService";
import PaddyIcon from "../../assets/icons/paddy.svg";
import FlowIcon from "../../assets/icons/flow.svg";
import SleepIcon from "../../assets/icons/sleep.svg";
import OvulationIcon from "../../assets/icons/ovulation.svg";
import MoodIcon from "../../assets/icons/mood.svg";
import ExerciseIcon from "../../assets/icons/exercise.svg";
import CrampsIcon from "../../assets/icons/cramps.svg";
import { POSTJoinedDate } from "../services/OnboardingService";
import ErrorFallback from "../error/error-boundary";
import { BackButton } from "../home/components/BackButtonComponent";

export const STACK_SCREENS = {
  GET_STARTED: "Get Started",
  PERIOD_LENGTH: "Period Length",
  PERIOD_START: "Period Start",
  SYMPTOMS_CHOICES: "Symptoms Choices",
  BACKUP: "Backup",
  MAIN_PAGE: "Main Page",
  REGISTRATION: "Registration",
  PASSWORD: "Password",
  SUCCESS: "Success",
  CONFIRMATION: "Confirmation",
  TERMS_AND_CONDITION: "TermsAndCondition",
  PRIVACY_POLICY: "PrivacyPolicy",
};

export default function Confirmation({ route, navigation }) {
  const { periodLength, periodStart, periodEnd, trackingPreferences } =
    route.params;

  function IconPref() {
    let iconComponents = [];
    if (trackingPreferences[0])
      // flow
      iconComponents.push(<FlowIcon key="flow" style={styles.icon} />);
    if (trackingPreferences[1])
      // mood
      iconComponents.push(
        <MoodIcon key="mood" style={styles.icon} fill="black" />
      );
    if (trackingPreferences[2])
      // sleep
      iconComponents.push(<SleepIcon key="sleep" style={styles.icon} />);
    if (trackingPreferences[3])
      // cramps
      iconComponents.push(<CrampsIcon key="cramps" style={styles.icon} />);
    if (trackingPreferences[4])
      // exercise
      iconComponents.push(<ExerciseIcon key="exercise" style={styles.icon} />);
    if (trackingPreferences[5])
      // ovulation
      iconComponents.push(
        <OvulationIcon key="ovulation" style={styles.icon} />
      );
    return <SymptomIconContainer>{iconComponents}</SymptomIconContainer>;
  }

  function DateRange() {
    if (periodStart && periodEnd)
      return (
        <Text style={styles.text}>
          {periodStart} to {periodEnd}
        </Text>
      );
    else return null;
  }

  function Length() {
    if (periodLength)
      return <Text style={styles.text}>{periodLength} days</Text>;
    else return null;
  }

  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <BackButtonContainer>
          <BackButton
            title=""
            onPress={() => {
              navigation.navigate(STACK_SCREENS.SYMPTOMS_CHOICES, {
                periodLength: periodLength,
                periodStart: periodStart,
                periodEnd: periodEnd,
              });
            }}
          />
        </BackButtonContainer>
        <PaddyIcon style={{ alignSelf: "center" }} />
        <Text style={styles.bigText}>You're all set!</Text>
        {periodLength && (
          <View>
            <View style={styles.row}>
              <Text style={styles.smallText}>Average period length</Text>
              <Length />
            </View>
            <HorizontalLine></HorizontalLine>
          </View>
        )}

        {periodStart && periodEnd && (
          <View>
            <View style={styles.row}>
              <Text style={styles.smallText}>Last period</Text>
              <DateRange />
            </View>
            <HorizontalLine></HorizontalLine>
          </View>
        )}

        <View style={styles.row}>
          <Text style={styles.smallText}>Symptoms to log</Text>
          <IconPref />
        </View>
        <HorizontalLine></HorizontalLine>

        <WideButton
          title="Let's go!"
          color="#5A9F93"
          bottom="-8%"
          onPress={() => {
            POSTJoinedDate();
            SETTutorial(true).finally(() =>
              navigation.navigate(STACK_SCREENS.MAIN_PAGE)
            );
          }}
        />
      </ImageBackground>
    </ErrorFallback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  bigText: {
    alignSelf: "center",
    fontFamily: "Avenir",
    fontSize: 34,
    fontWeight: "800",
    color: "#000000",
    marginTop: 13,
    marginBottom: 24,
  },
  text: {
    fontFamily: "System",
    fontSize: 17,
    fontWeight: "400",
    color: "#000000",
    marginTop: 4,
    marginBottom: 15,
  },
  smallText: {
    fontFamily: "Avenir",
    fontSize: 12,
    fontWeight: "800",
    color: "#5A9F93",
    marginTop: 20,
  },
  row: {
    textAlign: "left",
    marginLeft: 30,
  },
  icon: {
    marginRight: 15,
    marginBottom: 15,
    marginTop: 4,
  },
  infoText: {
    fontFamily: "Avenir",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
    bottom: "-25%",
  },
});
