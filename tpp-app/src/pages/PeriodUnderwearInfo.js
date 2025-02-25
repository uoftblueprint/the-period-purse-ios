
import React from "react";
import { StyleSheet, Text, Image, ImageBackground, SafeAreaView, View, ScrollView } from "react-native";
import UnderwearImage from "../../assets/InfoPageImages/underwear-clear-2x.png";
import UnderwearImage1 from "../../assets/InfoPageImages/period-underwear1.png";
import UnderwearImage2 from "../../assets/InfoPageImages/period-underwear2.png";
import UnderwearImage3 from "../../assets/InfoPageImages/period-underwear3.png";
import UnderwearImage4 from "../../assets/InfoPageImages/period-underwear4.png";
import { BackButton } from "../home/components/BackButtonComponent";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import { BackButtonContainer } from "../onboarding/components/ContainerComponents";
import ErrorFallback from "../error/error-boundary";
export default function PeriodUnderwearInfo({ navigation }) {
  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <SafeAreaView pointer-events="box-only" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <BackButtonContainer style={styles.backButtonContainer}>
            <BackButton title="" onPress={() => navigation.goBack()} />
          </BackButtonContainer>
          
          <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <Text style={styles.titleText}>How to Use</Text>
            <View style={styles.instructionContainer}>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>1</Text>
                </View>
                <Image source={UnderwearImage1} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Put on underwear
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>2</Text>
                </View>
                <Image source={UnderwearImage2} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Wear up to 12 hours
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>3</Text>
                </View>
                <Image source={UnderwearImage3} style={styles.doubleImage} />
                <Text style={styles.instructionsText}>
                  Hand wash OR machine wash
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>4</Text>
                </View>
                <Image source={UnderwearImage4} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Hang to dry
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </ErrorFallback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "30%", 
    paddingBottom: "40%",
  },
  backButtonContainer: {
    position: "absolute",
    top: 40, 
    left: 20,
    zIndex: 1, 
  },
  image: {
    width: "35%",
    height: "15%",
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
    marginBottom: "10%",
  },
  instructionContainer: {
    width: "90%",
    marginBottom: 20,
  },
  instructionStep: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  numberCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#72C6B7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },
  numberText: {
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
    color: "#FCFFFE",
  },
  doubleImage: {
    width: 300,
    height: 200,
    marginBottom: "5%",
  },
  instructionImage: {
    width: 250,
    height: 220,
  },
  instructionsText: {
    fontFamily: "Avenir",
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: -0.3,
    textAlign: "center",
    paddingTop: "5%",
    paddingBottom: "5%",
  },
});
