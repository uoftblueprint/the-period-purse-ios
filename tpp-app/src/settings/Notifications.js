import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import NotificationAccordion from "./NotificationAccordion";
import { BackButton } from "../home/components/BackButtonComponent";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import ErrorFallback from "../error/error-boundary";
import {
  GETRemindLogPeriodFreq,
  GETRemindLogSymptomsFreq,
  GETRemindLogPeriodTime,
  GETRemindLogSymptomsTime,
} from "../services/SettingsService";
import { BackButtonContainer } from "../onboarding/components/ContainerComponents";
import { STACK_SCREENS } from "./SettingsNavigator";

export default function Notifications({ navigation }) {
  const [remindPeriodFreq, setRemindPeriodFreq] = useState("2");
  const [remindPeriodTime, setRemindPeriodTime] = useState("10:00");
  const [remindPeriodTimeMeridian, setRemindPeriodTimeMeridian] = useState("AM");
  const [remindSymptomsFreq, setRemindSymptomsFreq] = useState("Every day");
  const [remindSymptomsTime, setRemindSymptomsTime] = useState("10:00");
  const [remindSymptomsTimeMeridian, setRemindSymptomsTimeMeridian] = useState("AM");

  // Retrieve previously stored information from the database if it exists
  useEffect(() => {
    async function getFreqTimes() {
      let storedPeriodFreq = await GETRemindLogPeriodFreq();
      let storedSymptomFreq = await GETRemindLogSymptomsFreq();
      let storedPeriodTime = await GETRemindLogPeriodTime();
      let storedSymptomTime = await GETRemindLogSymptomsTime();

      if (storedPeriodFreq) {
        setRemindPeriodFreq(storedPeriodFreq);
      }

      if (storedSymptomFreq) {
        setRemindSymptomsFreq(storedSymptomFreq);
      }

      if (storedPeriodTime) {
        let parsedTime = storedPeriodTime.split(" ");
        setRemindPeriodTime(parsedTime[0]);
        setRemindPeriodTimeMeridian(parsedTime[1]);
      }

      if (storedSymptomTime) {
        let parsedTime = storedSymptomTime.split(" ");
        setRemindSymptomsTime(parsedTime[0]);
        setRemindSymptomsTimeMeridian(parsedTime[1]);
      }
    }
    getFreqTimes();
  }, []);

  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.bgImage}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <SafeAreaView>
            <View style={styles.navbar}>
              <BackButtonContainer style={[styles.navitem, styles.backbutton]}>
                <BackButton
                  title=""
                  onPress={() => {
                    navigation.navigate(STACK_SCREENS.SETTINGS, {
                      remindPeriodFreq: remindPeriodFreq,
                      remindPeriodTime: remindPeriodTime,
                      remindSymptomsFreq: remindSymptomsFreq,
                      remindSymptomsTime: remindSymptomsTime,
                      remindPeriodTimeMeridian: remindPeriodTimeMeridian,
                      remindSymptomsTimeMeridian: remindSymptomsTimeMeridian,
                    });
                  }}
                />
              </BackButtonContainer>
              <Text style={[styles.navitem, styles.title]}>Notifications</Text>
              <View style={styles.navitem}></View>
            </View>
            <View style={{ top: "2%" }}>
              {/*<NotificationStack name={"Remind me to log period"} header={"We'll remind you when your period is coming."}/>*/}
              {/*<View*/}
              {/*style={{*/}
              {/*    borderBottomColor: '#CFCFCF',*/}
              {/*    borderBottomWidth: 1,*/}
              {/*    }}/>*/}

              {/*<NotificationAccordion title={"How many days in advance"} selectedText={remindPeriodFreq} setSelectedText={setRemindPeriodFreq} type={"days"}/> */}
              {/*<View*/}
              {/*style={{*/}
              {/*    borderBottomColor: '#CFCFCF',*/}
              {/*    borderBottomWidth: 1,*/}
              {/*    }}/>*/}
              {/*<NotificationAccordion title={"Reminder time"} selectedText={`${remindPeriodTime} ${remindPeriodTimeMeridian}`} time={remindPeriodTime} meridian={remindPeriodTimeMeridian} setTime={setRemindPeriodTime} setTimeMeridian={setRemindPeriodTimeMeridian}  type={"periodTime"}/>*/}
              {/*<View*/}
              {/*style={{*/}
              {/*    borderBottomColor: '#CFCFCF',*/}
              {/*    borderBottomWidth: 1,*/}
              {/*    }}/>*/}
              <NotificationStack
                name={"Remind me to log symptoms"}
                header={"We'll remind you to log your symptoms. "}
              />
              <View
                style={{
                  borderBottomColor: "#CFCFCF",
                  borderBottomWidth: 1,
                }}
              />
              <NotificationAccordion
                title={"Repeat"}
                selectedText={remindSymptomsFreq}
                setSelectedText={setRemindSymptomsFreq}
                type={"howOften"}
              />
              <View
                style={{
                  borderBottomColor: "#CFCFCF",
                  borderBottomWidth: 1,
                }}
              />
              <NotificationAccordion
                title={"Reminder time"}
                selectedText={`${remindSymptomsTime} ${remindSymptomsTimeMeridian}`}
                time={remindSymptomsTime}
                meridian={remindSymptomsTimeMeridian}
                setTime={setRemindSymptomsTime}
                setTimeMeridian={setRemindSymptomsTimeMeridian}
                type={"symptomTime"}
              />
              <View
                style={{
                  borderBottomColor: "#CFCFCF",
                  borderBottomWidth: 1,
                }}
              />
            </View>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </ErrorFallback>
  );
}

const NotificationStack = (props) => {
  return (
    <SafeAreaView style={styles.rowContainer}>
      <Text style={styles.optionText}>{props.name}</Text>
      <Text style={styles.optionHeader}>{props.header}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  rowContainer: {
    zIndex: 0,
  },
  backbutton: {
    zIndex: 1,
  },
  navbar: {
    flexDirection: "column",
    alignItems: "center",
  },
  navitem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dropDownTextBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 16,
    height: 62,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  dropDownLeftText: {
    fontFamily: "Avenir",
    fontWeight: "400",
    fontSize: 16,
    height: 34,
    lineHeight: 34,
  },
  dropDownRightText: {
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 34,
    color: "#5A9F93",
    right: -50,
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Avenir",
    fontWeight: "800",
    lineHeight: 34,
    textAlign: "left",
    left: 16,
  },
  optionHeader: {
    fontFamily: "Avenir",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 34,
    color: "#6D6E71",
    left: 15,
    bottom: "-10%",
  },
  optionView: {
    paddingTop: -25,
    paddingBottom: -25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    top: 5,
    fontWeight: "800",
    fontSize: 20,
    fontFamily: "Avenir",
    color: "black",
  },
});
