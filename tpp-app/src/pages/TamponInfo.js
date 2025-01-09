import React from "react";
import { StyleSheet, Text, Image, ImageBackground, SafeAreaView } from "react-native";
import TamponImage from "../../assets/InfoPageImages/tampons-2x.png";
import { BackButton } from "../home/components/BackButtonComponent";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import { BackButtonContainer } from "../onboarding/components/ContainerComponents";
import ErrorFallback from "../error/error-boundary";

export default function TamponInfo({ navigation }) {
  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <SafeAreaView pointer-events="box-only" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <BackButtonContainer>
            <BackButton title="" onPress={() => navigation.goBack()} />
          </BackButtonContainer>
          <Image source={TamponImage} style={styles.image} resizeMode="contain" />
          <Text style={styles.titleText}>Tampons</Text>

          <Text style={styles.bodyText}>
            Heyyyy! Iz me, your period.
            {"\n\n"}
            Can you imagine that Ancient Egyptians made tampons out of softened papyrus? Ancient Greeks wrapped bits of
            wood with lint. Eeek.
            {"\n\n"}
            Today, tampons are made of absorbent ingredients like purified cotton, rayon fibers, and sometimes bleach.
            But there are amazing companies that make biodegradable tampons out of organic material. Do you know what’s
            in your tampons?
            {"\n\n"}
            Tampon applicators are one of the most common items found when doing a beach clean up. Double eeks. Can you
            find a tampon without an applicator? Don’t worry, tampons won’t get lost inside you and you can sleep with
            one inserted too.
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
    width: "50%",
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
