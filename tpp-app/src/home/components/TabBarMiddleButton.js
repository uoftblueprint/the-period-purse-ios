import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import PlusSign from "../../../assets/icons/plus_sign.svg";
import CalendarIcon from "../../../assets/icons/calendar_icon.svg";
import { CALENDAR_STACK_SCREENS } from "../CalendarNavigator";

/** Recursive function to get the current active screen state through nested navigators */
const getActiveRouteState = function (route) {
  if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
    return route;
  }

  const childActiveRoute = route.routes[route.index];
  return getActiveRouteState(childActiveRoute);
};

export const TabBarMiddleButton = ({ style, inOverlay, customOnPress }) => {
  const navigation = useNavigation();
  const calendarShowing = useIsFocused();

  // set icon and background color based on if the calendar screen is focused
  let icon = inOverlay ? (
    <PlusSign fill={"#B31F20"} />
  ) : calendarShowing ? (
    <PlusSign fill={"#FFFFFF"} />
  ) : (
    <CalendarIcon />
  );
  let bgColor = inOverlay ? "#FFFFFF" : calendarShowing ? "#D32729" : "#5A9F93";

  // check if the SelectLogOption overlay is visible
  const activeRoute = getActiveRouteState(navigation.getState());
  let overlayVisible = activeRoute?.state?.routes?.some(
    (screen) => screen["name"] === CALENDAR_STACK_SCREENS.SELECT_LOG_OPTION
  );

  return (
    <TouchableOpacity
      style={[
        style,
        {
          backgroundColor: bgColor,
          justifyContent: "center",
          alignItems: "center",
        },
        styles.middleButton,
      ]}
      onPress={() => {
        if (customOnPress) {
          customOnPress();
        } else if (inOverlay) {
          navigation.goBack();
        } else {
          calendarShowing && !overlayVisible
            ? navigation.navigate("MiddleButton", {
                screen: CALENDAR_STACK_SCREENS.CYCLE_CALENDAR_TABS,
                params: {
                  screen: CALENDAR_STACK_SCREENS.SELECT_LOG_OPTION,
                },
              })
            : navigation.navigate("MiddleButton", {
                screen: CALENDAR_STACK_SCREENS.CYCLE_CALENDAR_TABS,
                params: {
                  screen: CALENDAR_STACK_SCREENS.CALENDAR_PAGE,
                },
              });
        }
      }}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  middleButton: {
    width: 70,
    height: 70,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
