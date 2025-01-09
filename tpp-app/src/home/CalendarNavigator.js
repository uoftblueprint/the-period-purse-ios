import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CycleCalendarTabs from "./components/CycleCalendarTabs";
import LogSymptomsScreen from "./pages/LogSymptomsScreen";
import SelectLogOptionOverlay from "./pages/SelectLogOptionOverlay";
import LogMultipleDatesScreen from "./pages/LogMultipleDatesScreen";
import CycleHistoryScreen from "./pages/CycleHistoryScreen";
import TutorialOverlay from "./pages/TutorialOverlay";
import LegendScreen from "./pages/LegendScreen";

// Create a navigation stack that can be used to access other pages
// Stack begins first page at CalendarScreen. This is done so that the global
// tab bar on the bottom is kept when navigating within pages.
const Stack = createNativeStackNavigator();

export const CALENDAR_STACK_SCREENS = {
  CYCLE_CALENDAR_TABS: "CycleCalendarTabs",
  SELECT_LOG_OPTION: "SelectLogOption",
  LOG_SYMPTOMS: "LogSymptoms",
  LOG_MULTIPLE_DATES: "LogMultipleDates",
  CYCLE_HISTORY: "CycleHistoryScreen",
  CYCLE_PAGE: "Cycle",
  CALENDAR_PAGE: "Calendar",
  TUTORIAL: "TutorialOverlay",
  LEGEND_PAGE: "Legend",
};

export default function CalendarNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={CALENDAR_STACK_SCREENS.CYCLE_CALENDAR_TABS} component={CycleCalendarTabs} />
      <Stack.Screen
        name={CALENDAR_STACK_SCREENS.TUTORIAL}
        component={TutorialOverlay}
        options={{
          animation: "fade",
          presentation: "transparentModal",
        }}
      />
      <Stack.Screen
        name={CALENDAR_STACK_SCREENS.SELECT_LOG_OPTION}
        component={SelectLogOptionOverlay}
        options={{
          animation: "fade",
          presentation: "transparentModal",
        }}
      />
      <Stack.Screen
        name={CALENDAR_STACK_SCREENS.LOG_SYMPTOMS}
        component={LogSymptomsScreen}
        options={{ presentation: "fullScreenModal" }}
      />
      <Stack.Screen
        name={CALENDAR_STACK_SCREENS.LOG_MULTIPLE_DATES}
        component={LogMultipleDatesScreen}
        options={{ presentation: "fullScreenModal" }}
      />
      <Stack.Screen name={CALENDAR_STACK_SCREENS.CYCLE_HISTORY} component={CycleHistoryScreen} />
      <Stack.Screen name={CALENDAR_STACK_SCREENS.LEGEND_PAGE} component={LegendScreen} />
    </Stack.Navigator>
  );
}
