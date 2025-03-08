
import React from "react";
import { StyleSheet, Text, Image, ImageBackground, SafeAreaView, View, ScrollView } from "react-native";
import PadImage from "../../assets/InfoPageImages/pad-2x.png";
import Pad1Image from "../../assets/InfoPageImages/pad1.png";
import Pad2Image from "../../assets/InfoPageImages/pad2.png";
import Pad3Image from "../../assets/InfoPageImages/pad3.png";
import Pad4Image from "../../assets/InfoPageImages/pad4.png";
import { BackButton } from "../home/components/BackButtonComponent";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import { BackButtonContainer } from "../onboarding/components/ContainerComponents";
import ErrorFallback from "../error/error-boundary";
export default function PadInfo({ navigation }) {
  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <BackButtonContainer style={styles.backButtonContainer}>
            <BackButton title="" onPress={() => navigation.goBack()} />
          </BackButtonContainer>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            <Text style={styles.titleText}>How to Use</Text>
            <View style={styles.instructionContainer}>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>1</Text>
                </View>
                <Image source={Pad1Image} style={styles.doubleImage} />
                <Text style={styles.instructionsText}>
                  Put in underwear and snap into place
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>2</Text>
                </View>
                <Image source={Pad2Image} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Put in underwear
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>3</Text>
                </View>
                <Image source={Pad3Image} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Wear for 3-5 hours
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>4</Text>
                </View>
                <Image source={Pad4Image} style={styles.instructionImage} />
                <Text style={styles.lastInstructionsText}>
                  Discard pad in trash
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
    paddingTop: "20%", 
    paddingBottom: "5%",
  },
  backButtonContainer: {
    position: "absolute",
    top: 40, 
    left: 20,
    zIndex: 1, 
  },
  image: {
    width: "100",
    height: "100",
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
    width: 200,
    height: 200,
    marginBottom: "5%",
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
  lastInstructionsText: {
    fontFamily: "Avenir",
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: -0.3,
    textAlign: "center",
    paddingTop: "2%"
  },
});
