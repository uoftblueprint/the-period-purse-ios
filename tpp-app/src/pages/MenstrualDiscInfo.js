
import React from "react";
import { StyleSheet, Text, Image, ImageBackground, SafeAreaView, View, ScrollView } from "react-native";
import { BackButton } from "../home/components/BackButtonComponent";
import DiscImage from "../../assets/InfoPageImages/menstrual-disk.svg";
import DiscImage1 from "../../assets/InfoPageImages/disc1.png";
import DiscImage2 from "../../assets/InfoPageImages/disc2.png";
import DiscImage3 from "../../assets/InfoPageImages/disc3.png";
import DiscImage4 from "../../assets/InfoPageImages/disc4.png";
import DiscImage5 from "../../assets/InfoPageImages/disc5.png";
import DiscImage6 from "../../assets/InfoPageImages/disc6.png";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import { BackButtonContainer } from "../onboarding/components/ContainerComponents";
import ErrorFallback from "../error/error-boundary";
export default function MenstrualDiscInfo({ navigation }) {
  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <SafeAreaView pointer-events="box-only" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <BackButtonContainer style={styles.backButtonContainer}>
            <BackButton title="" onPress={() => navigation.goBack()} />
          </BackButtonContainer>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.image}>
              <DiscImage />
            </View>
            <View style = {styles.infoContainer}>
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
            </View>
            <Text style={styles.titleText}>How to Use</Text>
            <View style={styles.instructionContainer}>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>1</Text>
                </View>
                <Image source={DiscImage1} style={styles.doubleImage} />
                <Text style={styles.instructionsText}>
                  Fold in half
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>2</Text>
                </View>
                <Image source={DiscImage2} style={styles.doubleImage} />
                <Text style={styles.instructionsText}>
                  Insert with your fingers
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>3</Text>
                </View>
                <Image source={DiscImage3} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Wear up to 12 hours
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>4</Text>
                </View>
                <Image source={DiscImage4} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Hook rim with fingers to remove
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>5</Text>
                </View>
                <Image source={DiscImage5} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Empty disc
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>6</Text>
                </View>
                <Image source={DiscImage6} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Wash disc
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
    paddingTop: "60%",
    paddingBottom: "40%",
  },
  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  image: {
    width: "29%",
    height: "15%",
  },
  infoContainer: {
    marginTop: "-60%"
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
    height: 250,
    marginBottom: "5%",
  },
  instructionImage: {
    width: 300,
    height: 220,
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
