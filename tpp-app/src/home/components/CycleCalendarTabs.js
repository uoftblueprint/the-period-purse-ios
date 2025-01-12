import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CalendarScreen from "../pages/CalendarScreen";
import CycleScreen from "../pages/CycleScreen";
import Constants from "expo-constants";
import ErrorFallback from "../../error/error-boundary";

const Tab = createMaterialTopTabNavigator();

export default function HomeNavigator() {
  return (
    <ErrorFallback>
      <Tab.Navigator
        style={{ top: Constants.statusBarHeight }}
        screenOptions={{
          tabBarIndicatorStyle: {
            height: 3,
            backgroundColor: "#5A9F93",
          },
          tabBarLabelStyle: {
            textTransform: "capitalize",
            fontFamily: "Avenir",
            fontSize: 20,
            fontStyle: "normal",
            fontWeight: "800",
            lineHeight: 27,
            letterSpacing: -0.02,
            textAlign: "left",
          },
          tabBarStyle: {
            height: "7%",
            justifyContent: "center",
            backgroundColor: "transparent",
          },
        }}
      >
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Cycle" component={CycleScreen} />
      </Tab.Navigator>
    </ErrorFallback>
  );
}
