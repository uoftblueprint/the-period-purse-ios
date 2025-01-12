import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground } from "react-native";
import PadImageHappy from "../../assets/InfoPageImages/pad-3-2x.png";
import { BackButton } from "../home/components/BackButtonComponent";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import { GETFactCycle, POSTFactCycle } from "../info/InfoService";
import { getFullCurrentDateString } from "../services/utils/helpers.js";
import dykData from "../pages/DYKFacts.json";
import ErrorFallback from "../error/error-boundary";

export default function DidYouKnow({ navigation }) {
  const [factCycleDate, setFactCycleDate] = useState(""); // 0th index
  const [factCycleNum, setFactCycleNum] = useState(1); // number of fact
  const [retrievedFact, setRetrievedFact] = useState("Getting Fact");
  useEffect(() => {
    async function retrieveFactCycle() {
      let factWhole;
      GETFactCycle().then((factArray) => {
        factWhole = dykData[factCycleNum];
        setRetrievedFact(factWhole);

        if (!factArray) {
          POSTFactCycle().then(async () => {
            let factArray = await GETFactCycle();
            setFactCycleDate(factArray[0]);
            setFactCycleNum(factArray[1]);
            factWhole = dykData[factArray[1]];
            setRetrievedFact(factWhole);
          });
        }

        setFactCycleDate(factArray[0]);
        setFactCycleNum(factArray[1]);

        if (getFullCurrentDateString() !== factCycleDate) {
          POSTFactCycle().then(async () => {
            let factArray = await GETFactCycle();
            setFactCycleDate(factArray[0]);
            setFactCycleNum(factArray[1]);

            factWhole = dykData[factArray[1]];

            setRetrievedFact(factWhole);
          });
        }
      });
    }
    retrieveFactCycle();
  }, []);

  let fact = dykData[factCycleNum];

  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={styles.arrowPosition}>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
          <Image source={PadImageHappy} style={styles.image} resizeMode="contain" />
          <Text style={styles.bodyText}>
            <Text style={styles.titleText}>Did you know?</Text>
            {"\n"}
            {"\n"}
            {fact}
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
    position: "absolute",
    width: "37%",
    height: "22%",
    left: "32%",
    top: "26%",
  },
  titleText: {
    position: "absolute",
    textAlign: "center",
    fontFamily: "Avenir",
    height: 109,
    width: 193,
    left: 91,
    top: 406,
    bottom: 297,
    fontWeight: "800",
    fontSize: 15,
    lineHeight: 20.49,
    letterSpacing: -0.02,
  },
  bodyText: {
    position: "absolute",
    textAlign: "center",
    fontFamily: "Avenir",
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 20.49,
    letterSpacing: -0.3,
    height: "40%",
    width: "50%",
    left: "25%",
    top: "55%",
    bottom: 297,
  },
  arrowPosition: {
    position: "absolute",
    left: "4%",
    // right: 348.5,
    top: "8%",
    // bottom: 741.52
  },
});
