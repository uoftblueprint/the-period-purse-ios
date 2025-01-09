import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CalendarScreen from "../pages/CalendarScreen";
import CycleScreen from "../pages/CycleScreen";
import { STACK_SCREENS } from "../CalendarNavigator";

const Tab = createMaterialTopTabNavigator();

export default function HomeNavigator() {
  return (
    <Tab.Navigator style={{ top: 40 }}>
      <Tab.Screen name={STACK_SCREENS.CALENDAR_PAGE} component={CalendarScreen} />
      <Tab.Screen name={STACK_SCREENS.CYCLE_PAGE} component={CycleScreen} />
    </Tab.Navigator>
  );
}
