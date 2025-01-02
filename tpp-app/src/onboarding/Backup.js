import React from "react";
import { StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import { STACK_SCREENS } from "./Confirmation";
import { BackButton } from "../home/components/BackButtonComponent";
import { WideButton } from "./components/ButtonComponents";
import { BodyText, TitleText } from "./components/TextComponents";
import { BackButtonContainer } from "./components/ContainerComponents";
import BackgroundShape from "../../assets/icons/background_shape.svg";
import BarIcon from "../../assets/icons/onboard_bar3.svg";
import ErrorFallback from "../error/error-boundary";

export default function Backup({ route, navigation }) {
  const { periodLength, periodStart, periodEnd, trackingPreferences } = route.params;

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

        <SafeAreaView pointerEvents="box-none" style={{ alignItems: "center" }}>
          <BackgroundShape />
          <BarIcon style={{ bottom: "15%" }} />

          <TitleText style={{ bottom: "12%" }}>Would you like to {"\n"} back up your data?</TitleText>
          <BodyText style={{ bottom: "12%" }}>Your data will be lost if you {"\n"} switch devices</BodyText>
          <SafeAreaView style={{ bottom: "10%" }}>
            <WideButton
              title="Register"
              color="#B31F20"
              onPress={() => navigation.navigate(STACK_SCREENS.REGISTRATION)}
            />
            <WideButton
              title="Continue as guest"
              color="#5A9F93"
              onPress={() =>
                navigation.navigate(STACK_SCREENS.CONFIRMATION, {
                  periodLength: periodLength,
                  periodStart: periodStart,
                  periodEnd: periodEnd,
                  trackingPreferences: trackingPreferences,
                })
              }
            />
          </SafeAreaView>
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
});
