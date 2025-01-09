import React from "react";
import { StyleSheet, Text, Image, ImageBackground, SafeAreaView } from "react-native";
import CupImage from "../../assets/InfoPageImages/Cup-2x.png";
import { BackButton } from "../home/components/BackButtonComponent";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import { BackButtonContainer } from "../onboarding/components/ContainerComponents";
import ErrorFallback from "../error/error-boundary";

export default function MenstrualCupInfo({ navigation }) {
  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <SafeAreaView pointer-events="box-only" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <BackButtonContainer>
            <BackButton title="" onPress={() => navigation.goBack()} />
          </BackButtonContainer>
          <Image source={CupImage} style={styles.image} resizeMode="contain" />
          <Text style={styles.titleText}>Menstrual Cup</Text>

          <Text style={styles.bodyText}>
            Just popping in to let you know - the earliest versions of the menstrual cup were designed in 1932 and made
            of natural rubber. Today, menstrual cups are typically made of silicone, which is flexible, durable and
            anti-bacterial.
            {"\n\n"}
            Menstrual cups are cost effective and sustainable, with almost no waste created each cycle. A cup costs
            about $40 CAD and can last at least two years.
            {"\n\n"}A menstrual cup can be used for up to 12 hours, depending on your menstrual flow. It does take a few
            uses to learn how often you want to “empty” your cup, and this can vary for each cycle and for every person.
          </Text>
        </SafeAreaView>
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
  image: {
    width: "26%",
    height: "23%",
    marginBottom: "6%",
  },
  titleText: {
    textAlign: "center",
    fontFamily: "Avenir",
    marginBottom: "3%",
    fontWeight: "800",
    fontSize: 34,
    lineHeight: 40,
  },
  bodyText: {
    textAlign: "center",
    fontFamily: "Avenir",
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: -0.3,
    paddingLeft: "10%",
    paddingRight: "10%",
  },
});
