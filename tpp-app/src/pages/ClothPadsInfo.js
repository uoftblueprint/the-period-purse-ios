
import React from "react";
import { StyleSheet, Text, Image, ImageBackground, SafeAreaView, View, ScrollView } from "react-native";
import ClothImage from "../../assets/InfoPageImages/cloth-pads-2x.png";
import ClothImage1 from "../../assets/InfoPageImages/cloth1.png";
import ClothImage2 from "../../assets/InfoPageImages/cloth2.png";
import ClothImage3 from "../../assets/InfoPageImages/cloth3.png";
import ClothImage4 from "../../assets/InfoPageImages/cloth4.png";
import { BackButton } from "../home/components/BackButtonComponent";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import ErrorFallback from "../error/error-boundary";
import { BackButtonContainer } from "../onboarding/components/ContainerComponents";
export default function ClothPadInfo({ navigation }) {
  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <SafeAreaView pointer-events="box-only" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <BackButtonContainer style={styles.backButtonContainer}>
            <BackButton title="" onPress={() => navigation.goBack()} />
          </BackButtonContainer>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            
            <Text style={styles.titleText}>How to Use</Text>
            <View style={styles.instructionContainer}>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>1</Text>
                </View>
                <Image source={ClothImage1} style={styles.doubleImageFirst} />
                <Text style={styles.instructionsText}>
                  Put in underwear and snap into place
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>2</Text>
                </View>
                <Image source={ClothImage2} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Wear for 3-5 hours
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>3</Text>
                </View>
                <Image source={ClothImage3} style={styles.doubleImage} />
                <Text style={styles.instructionsText}>
                  Hand wash OR machine wash
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>4</Text>
                </View>
                <Image source={ClothImage4} style={styles.instructionImage} />
                <Text style={styles.lastInstructionsText}>
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
    paddingTop: "40%",
    paddingBottom: "30%",
  },
  backButtonContainer: {
    position: "absolute",
    top: 40, 
    left: 20,
    zIndex: 1, 
  },
  image: {
    width: "70%",
    height: "17%",
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
    paddingBottom: "10%"
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
  doubleImageFirst: {
    width: 350,
    height: 150,
    marginBottom: "5%",
  },
  instructionImage: {
    width: 350,
    height: 250,
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
    paddingBottom: "15%"
  },
});
