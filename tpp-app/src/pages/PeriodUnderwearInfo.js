import React from "react";
import { StyleSheet, Text, Image, ImageBackground, SafeAreaView } from "react-native";
import UnderwearImage from "../../assets/InfoPageImages/underwear-clear-2x.png";
import { BackButton } from "../home/components/BackButtonComponent";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import { BackButtonContainer } from "../onboarding/components/ContainerComponents";
import ErrorFallback from "../error/error-boundary";

export default function PeriodUnderwearInfo({ navigation }) {
  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <SafeAreaView pointer-events="box-only" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <BackButtonContainer>
            <BackButton title="" onPress={() => navigation.goBack()} />
          </BackButtonContainer>
          <Image source={UnderwearImage} style={styles.image} resizeMode="contain" />
          <Text style={styles.titleText}>Period Underwear</Text>

          <Text style={styles.bodyText}>
            Quick, your period is “OMW”- period underwear has you covered. Wow, the first period underwear product
            arrived on the market in the late 1980s!?
            {"\n\n"}
            Period underwear is designed to completely replace pads and tampons (or be used as a backup). With a
            leak-proof layer, it can absorb 1-2 tampons’ worth of fluid! Change it daily like normal underwear, but give
            it a quick rinse with cool water before washing it with your regular laundry.
            {"\n\n"}
            While period underwear can be costly, ranging from $30-$100 per pair depending on size, fit and duration of
            wear, it can cost you less in the long run as one pair generally lasts a few years.
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
    width: "45%",
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
