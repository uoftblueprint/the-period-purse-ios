import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Switch,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import CrampsIcon from "../../assets/icons/cramps.svg";
import ExerciseIcon from "../../assets/icons/exercise.svg";
import FlowIcon from "../../assets/icons/flow.svg";
import MoodIcon from "../../assets/icons/mood.svg";
import SleepIcon from "../../assets/icons/sleep.svg";
import OvulationIcon from "../../assets/icons/ovulation.svg";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Footer } from "../services/utils/footer";
import { ScrollView } from "react-native-gesture-handler";
import {
  GETAllTrackingPreferences,
  GETRemindLogSymptoms,
  GETRemindLogSymptomsFreq,
  GETRemindLogSymptomsTime,
  POSTRemindLogSymptoms,
  POSTUpdateOnePreference,
} from "../services/SettingsService";
import { TRACK_SYMPTOMS, VIEWS } from "../services/utils/constants";
import CycleService from "../services/cycle/CycleService";
import { useFocusEffect } from "@react-navigation/native";
import { STACK_SCREENS } from "./SettingsNavigator.js";
import ErrorFallback from "../error/error-boundary";

const PreferenceButton = (props) => {
  return (
    <View style={styles.horizontalCenteredColumn}>
      <TouchableOpacity
        style={[styles.preferenceButton, { backgroundColor: props.set }]}
        onPress={props.onPress}
      >
        {props.source === VIEWS.Flow && <FlowIcon />}
        {props.source === VIEWS.Mood && <MoodIcon fill="black" />}
        {props.source === VIEWS.Sleep && <SleepIcon />}
        {props.source === VIEWS.Exercise && <ExerciseIcon />}
        {props.source === VIEWS.Cramps && <CrampsIcon />}
        {props.source === VIEWS.Ovulation && <OvulationIcon />}
      </TouchableOpacity>
      <Text>{props.cardName}</Text>
    </View>
  );
};

const Preferences = (props) => {
  let WHITE = "#FFFFFF";
  let TEAL = "#73C7B7";

  const [flow, trackFlow] = useState("#FFFFFF");
  const [mood, trackMood] = useState("#FFFFFF");
  const [sleep, trackSleep] = useState("#FFFFFF");
  const [cramps, trackCramps] = useState("#FFFFFF");
  const [exercise, trackExercise] = useState("#FFFFFF");
  const [ovulation, trackOvulation] = useState("#FFFFFF");
  const [trackingPrefs, setPrefs] = useState([]); // preferences that are currently tracked, default is empty

  useEffect(() => {
    async function fetchPreferences() {
      // get tracking references
      let stored = await GETAllTrackingPreferences();
      // set trackingPrefs somewhere
      for (let pref of stored) {
        let toTrack = pref[1].toLowerCase() === "true";
        // if tracking that symptom is set to true, append it to trackingPrefs
        if (toTrack) {
          let title = pref[0];
          let symptom;
          switch (title) {
            case TRACK_SYMPTOMS.MOOD:
              symptom = "mood";
              trackMood(TEAL);
              break;
            case TRACK_SYMPTOMS.SLEEP:
              symptom = "sleep";
              trackSleep(TEAL);
              break;
            case TRACK_SYMPTOMS.CRAMPS:
              symptom = "cramps";
              trackCramps(TEAL);
              break;
            case TRACK_SYMPTOMS.EXERCISE:
              symptom = "exercise";
              trackExercise(TEAL);
              break;
            case TRACK_SYMPTOMS.FLOW:
              symptom = "flow";
              trackFlow(TEAL);
              break;
            case TRACK_SYMPTOMS.OVULATION:
              symptom = "ovulation";
              trackOvulation(OVULATION);
              break;
            default:
              break;
          }
        }
      }
    }
    fetchPreferences();
  }, []);

  const handleSleep = () => {
    POSTUpdateOnePreference(TRACK_SYMPTOMS.SLEEP, sleep === WHITE).then(() => {
      sleep === WHITE ? trackSleep(TEAL) : trackSleep(WHITE);
    });
  };

  const handleMood = async () => {
    POSTUpdateOnePreference(TRACK_SYMPTOMS.MOOD, mood === WHITE).then(() => {
      mood === WHITE ? trackMood(TEAL) : trackMood(WHITE);
    });
  };

  const handleCramp = () => {
    POSTUpdateOnePreference(TRACK_SYMPTOMS.CRAMPS, cramps === WHITE).then(
      () => {
        cramps === WHITE ? trackCramps(TEAL) : trackCramps(WHITE);
      }
    );
  };

  const handleExercise = () => {
    POSTUpdateOnePreference(TRACK_SYMPTOMS.EXERCISE, exercise === WHITE).then(
      () => {
        exercise === WHITE ? trackExercise(TEAL) : trackExercise(WHITE);
      }
    );
  };

  const handleOvulation = () => {
    POSTUpdateOnePreference(TRACK_SYMPTOMS.OVULATION, ovulation === WHITE).then(
      () => {
        ovulation === WHITE ? trackOvulation(TEAL) : trackOvulation(WHITE);
      }
    );
  };

  return (
    <View>
      <Text style={styles.heading}>Tracking Preferences </Text>
      <View style={styles.preferences}>
        <PreferenceButton
          source={VIEWS.Mood}
          cardName="Mood"
          set={mood}
          onPress={handleMood}
        />
        <PreferenceButton
          source={VIEWS.Exercise}
          cardName="Exercise"
          set={exercise}
          onPress={handleExercise}
        />
        <PreferenceButton
          source={VIEWS.Cramps}
          cardName="Cramps"
          set={cramps}
          onPress={handleCramp}
        />
        <PreferenceButton
          source={VIEWS.Sleep}
          cardName="Sleep"
          set={sleep}
          onPress={handleSleep}
        />
        <PreferenceButton
          source={VIEWS.Ovulation}
          cardName="Ovulation"
          set={ovulation}
          onPress={handleOvulation}
        />
      </View>
    </View>
  );
};

const SettingsStackButton = (props) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate(props.name)}>
      <SafeAreaView style={[styles.rowContainer, styles.optionView]}>
        <Text style={[styles.containerElement, styles.optionText]}>
          {props.name}
        </Text>
        <View style={styles.containerElement}>
          <Icon
            name="arrow-forward-ios"
            size={24}
            color="#5A9F93"
            style={styles.arrowBack}
          />
        </View>
      </SafeAreaView>
      <View
        style={{
          borderBottomColor: "#CFCFCF",
          borderBottomWidth: 1,
          top: "5%",
        }}
      />
    </TouchableOpacity>
  );
};

const NotificationsButton = (props) => {
  return (
    <View>
      <View style={styles.reminderTextBox}>
        <Text style={styles.remindText}>{props.text}</Text>
        <Switch
          onValueChange={props.toggle}
          value={props.enabled}
          trackColor={{ true: "#72C6B7" }}
          style={{
            zIndex: 1,
            top: "5%",
            left: "-10%",
          }}
        />
      </View>
      <Text style={styles.remindSubtext}>{props.subtext}</Text>
      <View
        style={{
          borderBottomColor: "#CFCFCF",
          borderBottomWidth: 1,
          bottom: "15%",
        }}
      />
    </View>
  );
};

const NotificationSettings = (props) => {
  // needed for Settings Page
  const [remindPeriodEnabled, setRemindPeriodEnabled] = useState(false);
  const [remindSymptomsEnabled, setRemindSymptomsEnabled] = useState(false);
  const [numberOfDaysUntilPeriod, setNumberOfDaysUntilPeriod] = useState(0);

  // needed for Notification Page
  const [remindSymptomsFreq, setRemindSymptomsFreq] = useState("Every day");
  const [remindSymptomsTime, setRemindSymptomsTime] = useState("10:00");
  const [remindSymptomsTimeMeridian, setRemindSymptomsTimeMeridian] =
    useState("AM");

  // get the days until period
  useFocusEffect(
    React.useCallback(() => {
      GETRemindLogSymptoms().then((enabled) => {
        setRemindSymptomsEnabled(enabled);
      });

      CycleService.GETPredictedDaysTillPeriod()
        .then((numDays) => {
          let toSet;
          if (numDays && numDays != -1) {
            toSet = numDays;
          } else {
            toSet = 0;
          }
          setNumberOfDaysUntilPeriod(toSet);
        })
        .catch(() => {
          setDaysTillPeriod(0);
        });
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (props.route.params?.remindSymptomsFreq)
        setRemindSymptomsFreq(props.route.params?.remindSymptomsFreq);
      if (props.route.params?.remindSymptomsTime)
        setRemindSymptomsTime(props.route.params?.remindSymptomsTime);
      if (props.route.params?.remindSymptomsTimeMeridian)
        setRemindSymptomsTimeMeridian(
          props.route.params?.remindSymptomsTimeMeridian
        );

      if (
        props.route.params?.remindSymptomsFreq &&
        props.route.params?.remindSymptomsTime
      ) {
        console.log(234);
        POSTRemindLogSymptoms(remindSymptomsEnabled);
      }
    }, [
      props.route.params?.remindPeriodFreq,
      props.route.params?.remindPeriodTime,
      props.route.params?.remindSymptomsFreq,
      props.route.params?.remindSymptomsTime,
    ])
  );

  // get the frequencies
  useEffect(() => {
    async function getRemindSymptomsEnabled() {
      let remindSymptoms = await GETRemindLogSymptoms();
      console.log(318, typeof remindSymptoms);
      setRemindSymptomsEnabled(remindSymptoms);
    }

    async function getFreqTimes() {
      let storedSymptomFreq = await GETRemindLogSymptomsFreq();
      let storedSymptomTime = await GETRemindLogSymptomsTime();

      if (storedSymptomFreq) {
        setRemindSymptomsFreq(storedSymptomFreq);
      }

      if (storedSymptomTime) {
        let parsedTime = storedSymptomTime.split(" ");
        setRemindSymptomsTime(parsedTime[0]);
        setRemindSymptomsTimeMeridian(parsedTime[1]);
      }
    }

    getFreqTimes();
    getRemindSymptomsEnabled();
  }, []);

  // const togglePeriodSwitch = async () => {
  //     console.log(379, remindPeriodEnabled)
  //     POSTRemindLogPeriod(!remindPeriodEnabled)
  //         .then(async () => {
  //             setRemindPeriodEnabled(!remindPeriodEnabled);
  //         });
  //
  // };
  const toggleSymptomsSwitch = async () => {
    // post here
    POSTRemindLogSymptoms(!remindSymptomsEnabled).then(() => {
      console.log(!remindSymptomsEnabled);
      setRemindSymptomsEnabled(!remindSymptomsEnabled);
    });
  };
  return (
    <SafeAreaView style={{ top: "-5%" }}>
      <Text style={styles.heading}>Notifications</Text>
      {/*<NotificationsButton */}
      {/*    text={"Remind me to log period"} */}
      {/*    subtext={`${remindPeriodFreq} ${remindPeriodFreq === "1" ? "day" : "days" } before at ${remindPeriodTime + " " + remindPeriodTimeMeridian}`}*/}
      {/*    toggle={togglePeriodSwitch} */}
      {/*    enabled={remindPeriodEnabled} />*/}
      <NotificationsButton
        text={"Remind me to log symptoms"}
        subtext={`${remindSymptomsFreq} at ${
          remindSymptomsTime + " " + remindSymptomsTimeMeridian
        }`}
        toggle={toggleSymptomsSwitch}
        enabled={remindSymptomsEnabled}
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate(STACK_SCREENS.NOTIFICATIONS)}
      >
        <View>
          <SafeAreaView
            style={[styles.rowContainer, styles.notificationSettingsView]}
          >
            <Text style={[styles.containerElement, styles.optionText]}>
              Customize notifications
            </Text>
            <View style={styles.containerElement}>
              <Icon
                name="arrow-forward-ios"
                size={24}
                color="#5A9F93"
                style={styles.arrowBack}
              />
            </View>
          </SafeAreaView>
          <View
            style={{
              borderBottomColor: "#CFCFCF",
              borderBottomWidth: 1,
              top: "15%",
            }}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const SettingOptions = ({ navigation }) => {
  return (
    <SafeAreaView style={{ top: "-8%" }}>
      <Text style={styles.heading}>Account settings </Text>
      {/*<SettingsStackButton name={"Profile Information"}  navigation={navigation} />*/}
      {/*<SettingsStackButton name={"Privacy Policy"}  navigation={navigation}/>*/}
      <SettingsStackButton
        name={STACK_SCREENS.BACK_UP_ACCOUNT}
        navigation={navigation}
      />
      <SettingsStackButton
        name={STACK_SCREENS.DELETE_ACCOUNT}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};
export default function Settings({ route, navigation }) {
  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.bgImage}>
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <View style={{ marginLeft: "5%" }}>
              <Preferences />
              <NotificationSettings route={route} navigation={navigation} />
              <SettingOptions navigation={navigation} />
            </View>
            <Footer navigation={navigation} />
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </ErrorFallback>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  containerElement: {
    flex: 0,
  },
  preferences: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    left: -20,
  },
  preferenceButton: {
    width: 50,
    height: 50,
    backgroundColor: "#73C7B7",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 14,
    marginVertical: 10,
  },
  horizontalCenteredColumn: {
    alignItems: "center",
  },
  container: {
    justifyContent: "space-evenly",
    marginRight: 10,
    marginTop: -10,
    marginBottom: 75,
  },
  dropShadow: {
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowColor: "black",
  },
  card: {
    borderRadius: 12,
    marginLeft: 0,
  },
  heading: {
    fontFamily: "Avenir",
    fontWeight: "800",
    color: "#6D6E71",
    fontSize: 16,
    letterSpacing: -0.3,
    marginBottom: 9,
    marginTop: "18%",
    lineHeight: 20,
    left: 0,
  },
  subheading: {
    fontSize: 12,
    color: "gray",
  },

  preferenceText: {
    fontFamily: "SF Pro Display",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 22,
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Avenir",
    fontWeight: "800",
    lineHeight: 22,
    textAlign: "left",
    paddingBottom: 15,
    paddingTop: 0,
  },
  optionView: {
    paddingTop: "15%",
    paddingBottom: "15%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrowBack: {
    
  },
  notificationSettingsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  remindText: {
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 16,
    height: 34,
    lineHeight: 34,
    left: -10,
    zIndex: 0,
  },
  reminderTextBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "3%",
    height: 72,
    left: 0,
  },
  remindSubtext: {
    fontFamily: "Avenir",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 34,
    top: "-30%",
    color: "#6D6E71",
    left: 4,
    zIndex: 0,
    width: 300,
  },

  iconsContainer: {
    marginTop: 50,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    margin: 10,
  },
  termsAndConditionsContainer: {
    marginTop: 10,
  },
  copyright: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    color: "red",
  },
  copyrightText: {
    color: "#6D6E71",
  },
  terms: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  lineText: {
    marginTop: -10,
    color: "#5A9F93",
  },
  termsText: {
    color: "#5A9F93",
  },
});
