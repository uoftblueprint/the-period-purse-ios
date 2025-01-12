import React from "react";
import { StyleSheet, Text, Image, ImageBackground, SafeAreaView, View } from "react-native";
import { BackButton } from "../home/components/BackButtonComponent";
import DiscImage from "../../assets/InfoPageImages/menstrual-disk.svg";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import { BackButtonContainer } from "../onboarding/components/ContainerComponents";
import ErrorFallback from "../error/error-boundary";

export default function MenstrualDiscInfo({ navigation }) {
  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <SafeAreaView pointer-events="box-only" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <BackButtonContainer>
            <BackButton title="" onPress={() => navigation.goBack()} />
          </BackButtonContainer>
          <View style={styles.image}>
            <DiscImage />
          </View>
          <Text style={styles.titleText}>Menstrual Disc</Text>

          <Text style={styles.bodyText}>
            Vibe check! (Because your period’s almost here). Menstrual discs are gaining popularity very quickly and
            were created less than 30 years ago!
            {"\n\n"}
            Unlike menstrual cups, discs don't use suction to stay in place. If you can feel it, try making sure that it
            is pushed all the way back before tucking it up behind your pubic bone.
            {"\n\n"}
            Many menstrual discs are single use, but there are more companies coming on the market introducing reusable
            menstrual discs. They are made of non-porous medical grade silicone, and like a menstrual cup, should be
            changed up to every 12 hours. They only come in one size and one shape, so it fits everyone!
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
    width: "29%",
    height: "15%",
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
