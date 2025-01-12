import React from "react";
import { StyleSheet, Text, Image, ImageBackground, SafeAreaView } from "react-native";
import ClothImage from "../../assets/InfoPageImages/cloth-pads-2x.png";
import { BackButton } from "../home/components/BackButtonComponent";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import ErrorFallback from "../error/error-boundary";
import { BackButtonContainer } from "../onboarding/components/ContainerComponents";

export default function ClothPadInfo({ navigation }) {
  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <SafeAreaView pointer-events="box-only" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <BackButtonContainer>
            <BackButton title="" onPress={() => navigation.goBack()} />
          </BackButtonContainer>
          <Image source={ClothImage} style={styles.image} resizeMode="contain" />
          <Text style={styles.titleText}>Cloth Pads</Text>

          <Text style={styles.bodyText}>
            Storytime: here comes your period - reusable cloth pads are a great period product option!
            {"\n\n"}
            Cloth pads originated as cloth rags dating back to the 10th century in Ancient Greece. Now they are made of
            cotton, an absorbent, leak-proof material such as “Zorb,” Polyurethane Laminate (a plastic-like material for
            the pad’s backing), or amazing bamboo or organic cotton. Most of them have snaps to secure the pad in place,
            like a pad with wings.
            {"\n\n"}
            You need about five cloth pads to wash and use throughout your cycle. They are also a financial investment
            (around $100 for 5), but cloth pads will last for 2-3 years, depending on personal usage and care.
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
    width: "70%",
    height: "17%",
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
