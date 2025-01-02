import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "./Settings";
import Notifications from "./Notifications";
import DeleteAccount from "./DeleteAccount";
import BackUpAccount from "./BackUpAccount";

const Stack = createNativeStackNavigator();

export const STACK_SCREENS = {
  SETTINGS: "Settings",
  NOTIFICATIONS: "Notifications",
  BACK_UP_ACCOUNT: "Back Up Account",
  DELETE_ACCOUNT: "Delete Account",
};

export default function SettingsNavigator({ navigation }) {
  return (
    <Stack.Navigator
      intialRouteName="Settings"
      screenOptions={{
        headerShown: false,
        headerStyle: { height: 200 },
        headerTitleStyle: {
          fontWeight: "800",
          fontSize: 20,
          fontFamily: "Avenir",
        },
      }}
    >
      <Stack.Screen name={STACK_SCREENS.SETTINGS} component={Settings} />
      <Stack.Screen
        name={STACK_SCREENS.NOTIFICATIONS}
        component={Notifications}
        // options={{
        //   headerLeft : () => (<TouchableOpacity
        //     onPress={() => navigation.goBack(null)}
        // >
        //     <Icon name="keyboard-arrow-left" size={36} color={"#5A9F93"}/>
        // </TouchableOpacity>)}}
      />
      <Stack.Screen
        name={STACK_SCREENS.BACK_UP_ACCOUNT}
        component={BackUpAccount}
        options={{
          title: STACK_SCREENS.BACK_UP_ACCOUNT,
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
        name={STACK_SCREENS.DELETE_ACCOUNT}
        component={DeleteAccount}
        options={{
          title: STACK_SCREENS.DELETE_ACCOUNT,
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
