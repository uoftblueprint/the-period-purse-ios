import React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import * as Sentry from "@sentry/react-native";
import CalendarNavigator from "./src/home/CalendarNavigator";
import SettingsNavigator from "./src/settings/SettingsNavigator";
import { TabBarMiddleButton } from "./src/home/components/TabBarMiddleButton";
import { InfoNavigator } from "./src/info/Info";
import {
  POSTRemindLogSymptoms,
  POSTRemindLogSymptomsFreq,
  POSTRemindLogSymptomsTime,
  GETRemindLogSymptomsFreq,
  GETRemindLogSymptomsTime,
  GETRemindLogSymptoms,
  POSTRemindOvulation,
  POSTRemindOvulationFreq,
  POSTRemindOvulationTime,
  GETRemindOvulationFreq,
  GETRemindOvulationTime,
  GETRemindOvulation,
} from "./src/services/SettingsService";
import SettingsIcon from "./assets/icons/settings_icon.svg";
import InfoIcon from "./assets/icons/info_icon.svg";
import PrivacyPolicyScreen from "./src/home/pages/PrivacyPolicyScreen";
import TermsAndConditions from "./src/home/pages/TermsAndConditions";
import { StartLoadScreen } from "./src/home/pages/StartLoadScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { registerTranslation, en } from "react-native-paper-dates";

// For DatePicker
registerTranslation("en", en);

export const STACK_SCREENS = {
  MAIN_PAGE: "MainPage",
  TERMS_AND_CONDITION: "TermsAndCondition",
  PRIVACY_POLICY: "PrivacyPolicy",
};

// Commented out Sentry for now as it is causing issues with the app build.
// Initialize Sentry's SDK
// Sentry.init({
//   dsn: "https://35946e620f1a4559b9abd70d044e6ca0@o1164205.ingest.sentry.io/6253138",
//   // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
//   // We recommend adjusting this value in production.
//   tracesSampleRate: 1.0,
//   enableNative: false
// });

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const InfoIconStyled = (props) => (
  <View style={{ top: 3 }}>
    <InfoIcon fill={props.focused ? "#5A9F93" : "#6D6E71"} />
  </View>
);

const SettingsIconStyled = (props) => (
  <View style={{ top: 3 }}>
    <SettingsIcon fill={props.focused ? "#5A9F93" : "#6D6E71"} />
  </View>
);

const MainPage = () => {
  return (
    <Tab.Navigator initialRouteName="MiddleButton">
      <Tab.Screen
        name="Learn"
        component={InfoNavigator}
        options={{
          headerShown: false,
          tabBarIcon: (props) => <InfoIconStyled {...props} />,
          tabBarActiveTintColor: "#5A9F93",
          tabBarInactiveTintColor: "#6D6E71",
        }}
      />
      <Tab.Screen
        name="MiddleButton"
        component={CalendarNavigator}
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <TabBarMiddleButton
              {...props}
              style={{
                top: -30,
                alignSelf: "center",
                marginHorizontal: "auto",
              }}
              inOverlay={false}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          headerShown: false,
          tabBarIcon: (props) => <SettingsIconStyled {...props} />,
          tabBarActiveTintColor: "#5A9F93",
          tabBarInactiveTintColor: "#6D6E71",
        }}
      />
    </Tab.Navigator>
  );
};

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={STACK_SCREENS.MAIN_PAGE} component={MainPage} />
      <Stack.Screen
        name={STACK_SCREENS.PRIVACY_POLICY}
        component={PrivacyPolicyScreen}
        options={{
          title: "Privacy Policy",
          headerShown: true,
          headerStyle: { height: 200 },
          headerTitleStyle: {
            fontWeight: "800",
            fontSize: 20,
            fontFamily: "Avenir",
            color: "black",
          },
          headerTintColor: "#5A9F93",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.TERMS_AND_CONDITION}
        component={TermsAndConditions}
        options={{
          title: "Terms and Conditions",
          headerShown: true,
          headerStyle: { height: 200 },
          headerTitleStyle: {
            fontWeight: "800",
            fontSize: 20,
            fontFamily: "Avenir",
            color: "black",
          },
          headerTintColor: "#5A9F93",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export const MainNavigator = RootNavigator;

function App() {
  const navigationRef = useNavigationContainerRef();

  // Move the notification useEffect from MainNavigator to here
  useEffect(() => {
    PushNotificationIOS.addEventListener("localNotification", (notification) => {
      const isClicked = notification.getData().userInteraction === 1;

      if (isClicked) {
        PushNotificationIOS.setApplicationIconBadgeNumber(0);
        navigationRef.navigate("MiddleButton", { screen: "Calendar" });
      }
    });

    PushNotificationIOS.requestPermissions({
      alert: true,
      badge: true,
      sound: true,
      critical: true,
    }).then(
      async (data) => {
        console.log("PushNotificationsIOS.requestPermissions", data);

        if ((await GETRemindLogSymptomsFreq()) === null) {
          await POSTRemindLogSymptomsFreq("Every day");
        }
        if ((await GETRemindLogSymptomsTime()) == null) {
          await POSTRemindLogSymptomsTime("10:00 AM");
        }
        if ((await GETRemindLogSymptoms()) === null) {
          await POSTRemindLogSymptoms(true);
        }
        if ((await GETRemindOvulationFreq()) === null) {
          await POSTRemindLogSymptomsFreq("Every day");
        }
        if ((await GETRemindOvulationTime()) == null) {
          await POSTRemindOvulationTime("10:00 AM");
        }
        if ((await GETRemindOvulation()) === null) {
          await POSTRemindOvulation(true);
        }
      },
      (data) => {
        console.log("PushNotificationsIOS.requestPermissions failed", data);
      }
    );
    return () => {
      PushNotificationIOS.removeEventListener("localNotification");
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <StartLoadScreen />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

// export default Sentry.wrap(App);
export default App;
