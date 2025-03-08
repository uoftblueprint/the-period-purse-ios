
import React from "react";
import { StyleSheet, Text, Image, ImageBackground, SafeAreaView, View, ScrollView } from "react-native";
import CupImage from "../../assets/InfoPageImages/Cup-2x.png";
import CupImage1 from "../../assets/InfoPageImages/menstrual-cup1.png";
import CupImage2 from "../../assets/InfoPageImages/menstrual-cup2.png";
import CupImage3 from "../../assets/InfoPageImages/menstrual-cup3.png";
import CupImage4 from "../../assets/InfoPageImages/menstrual-cup4.png";
import CupImage5 from "../../assets/InfoPageImages/menstrual-cup5.png";
import CupImage6 from "../../assets/InfoPageImages/menstrual-cup6.png";
import { BackButton } from "../home/components/BackButtonComponent";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import { BackButtonContainer } from "../onboarding/components/ContainerComponents";
import ErrorFallback from "../error/error-boundary";
export default function MenstrualCupInfo({ navigation }) {
  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <SafeAreaView pointer-events="box-only" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <BackButtonContainer style={styles.backButtonContainer}>
            <BackButton title="" onPress={() => navigation.goBack()} />
          </BackButtonContainer>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image source={CupImage} style={styles.image} resizeMode="contain" />
            <View style={styles.infoContainer}>
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
            </View>
            <Text style={styles.titleText}>How to Use</Text>
            <View style={styles.instructionContainer}>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>1</Text>
                </View>
                <Image source={CupImage1} style={styles.doubleImage} />
                <Text style={styles.instructionsText}>
                  Fold in half
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>2</Text>
                </View>
                <Image source={CupImage2} style={styles.doubleImage} />
                <Text style={styles.instructionsText}>
                  Insert with your fingers
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>3</Text>
                </View>
                <Image source={CupImage3} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Wear up to 12 hours
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>4</Text>
                </View>
                <Image source={CupImage4} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Pinch cup to release suction
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>5</Text>
                </View>
                <Image source={CupImage5} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Empty cup
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>6</Text>
                </View>
                <Image source={CupImage6} style={styles.lastInstructionImage} />
                <Text style={styles.instructionsText}>
                  Wash cup
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
    paddingTop: "40%",
    paddingBottom: "70%",
  },
  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  image: {
    width: "25%",
    height: "23%",
  },
  infoContainer: {
    marginTop: "-35%"
  },
  titleText: {
    textAlign: "center",
    fontFamily: "Avenir",
    marginBottom: "5%",
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
    paddingBottom: "10%",
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
    width: 350,
    height: 220,
    marginBottom: "5%",
  },
  instructionImage: {
    width: 250,
    height: 200,
  },
  lastInstructionImage: {
    height: 200,
    width: 200,
  },
  instructionsText: {
    fontFamily: "Avenir",
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: -0.3,
    textAlign: "center",
    paddingTop: "7%",
    paddingBottom: "5%",
  },
});
