import React from "react";
import { StyleSheet, Text, Image, ImageBackground, SafeAreaView, View, ScrollView } from "react-native";
import TamponImage from "../../assets/InfoPageImages/tampons-2x.png";
import TamponImage1 from "../../assets/InfoPageImages/tamponwith1.png"
import TamponImage2 from "../../assets/InfoPageImages/tamponwith2.png"
import TamponImage3 from "../../assets/InfoPageImages/tamponwith3.png"
import TamponImage4 from "../../assets/InfoPageImages/tamponwith4.png"
import TamponImage5 from "../../assets/InfoPageImages/tamponwith5.png"
import TamponImage6 from "../../assets/InfoPageImages/tamponwith6.png"
import TamponImage7 from "../../assets/InfoPageImages/tamponwith7.png"
import TamponImage8 from "../../assets/InfoPageImages/tamponwith8.png"
import TamponImage9 from "../../assets/InfoPageImages/tamponwithout1.png"
import TamponImage10 from "../../assets/InfoPageImages/tamponwithout2.png"
import { BackButton } from "../home/components/BackButtonComponent";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import { BackButtonContainer } from "../onboarding/components/ContainerComponents";
import ErrorFallback from "../error/error-boundary";

export default function TamponInfo({ navigation }) {
  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <SafeAreaView pointer-events="box-only" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <BackButtonContainer style={styles.backButtonContainer}>
            <BackButton title="" onPress={() => navigation.goBack()} />
          </BackButtonContainer>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image source={TamponImage} style={styles.image} resizeMode="contain" />
            <View style={styles.infoContainer}>
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
            </View>

            <Text style={styles.titleText}>How to Use</Text>
            <View style={styles.instructionContainer}>
              <View style={styles.instructionStep}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>With applicator</Text>
                </View>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>1</Text>
                </View>
                <Image source={TamponImage1} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Remove the wrapper
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>2</Text>
                </View>
                <Image source={TamponImage2} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Gently pull plunger
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>3</Text>
                </View>
                <Image source={TamponImage3} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Insert applicator
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>4</Text>
                </View>
                <Image source={TamponImage4} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Push in plunger
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>5</Text>
                </View>
                <Image source={TamponImage5} style={styles.doubleImage} />
                <Text style={styles.instructionsText}>
                  Rmove applicator and discard
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>6</Text>
                </View>
                <Image source={TamponImage6} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Wear for 2-4 hours
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>7</Text>
                </View>
                <Image source={TamponImage7} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Pull string to remove
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>8</Text>
                </View>
                <Image source={TamponImage8} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Discard tampon in trash
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Without applicator</Text>
                </View>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>1</Text>
                </View>
                <Image source={TamponImage9} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Remove the wrappers
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>2</Text>
                </View>
                <Image source={TamponImage10} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Insert with your fingers
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>3</Text>
                </View>
                <Image source={TamponImage6} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Wear for 2-4 hours
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>4</Text>
                </View>
                <Image source={TamponImage7} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Pull string to remove
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>5</Text>
                </View>
                <Image source={TamponImage8} style={styles.instructionImage} />
                <Text style={styles.instructionsText}>
                  Discard tampon in trash
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
    paddingBottom: "100%",
  },
  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  image: {
    width: "50%",
    height: "15%",
  },
  infoContainer:{
    marginTop: "-65%",
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
    width: 250,
    height: 260,
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
  tag: {
    backgroundColor: "#72C6B7",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "7%",
  },

  tagText: {
    color: "white",
    fontWeight: "bold",
  },


});
