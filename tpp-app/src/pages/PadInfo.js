import React from "react";
import { StyleSheet, Text, Image, ImageBackground, SafeAreaView } from "react-native";
import PadImage from "../../assets/InfoPageImages/pad-2x.png";
import { BackButton } from "../home/components/BackButtonComponent";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import { BackButtonContainer } from "../onboarding/components/ContainerComponents";
import ErrorFallback from "../error/error-boundary";

export default function PadInfo({ navigation }) {
  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <SafeAreaView pointer-events="box-only" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <BackButtonContainer>
            <BackButton title="" onPress={() => navigation.goBack()} />
          </BackButtonContainer>
          <Image source={PadImage} style={styles.image} resizeMode="contain" />
          <Text style={styles.titleText}>Pads</Text>

          <Text style={styles.bodyText}>
            BRB, grabbing a pad.
            {"\n\n"}
            Despite being the oldest period product, invented back in the 10th century, we’re still the most popular
            choice for youth.
            {"\n\n"}
            Do you know what is inside your pad? Most are made from plastic, so every pad you’ve ever used is still
            sitting in a landfill. Ack. There are brands that use healthier, biodegradable ingredients like bamboo. You
            gotta go check them out.
            {"\n\n"}
            Period prep time: remember to keep one or two pads in your school backpack for you and your friends! They
            come in different sizes and absorbencies, so you’ll have to test them out to see which ones work best for
            you during your cycle.
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
    width: "18%",
    height: "20%",
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
