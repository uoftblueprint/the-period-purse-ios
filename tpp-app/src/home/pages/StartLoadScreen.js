import LoadingVisual from "../components/LoadingVisual";
import React, { useEffect } from "react";
import { useState } from "react";
import { GETAllTrackingPreferences } from "../../services/SettingsService";
import { MainNavigator } from "../../../App";
import Welcome from "../../onboarding/Welcome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const RootStack = createNativeStackNavigator();

export const StartLoadScreen = () => {
  const [preferences, setPreferences] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getPreferences() {
      setPreferences(await GETAllTrackingPreferences());
    }
    getPreferences();
  }, []);

  useEffect(() => {
    if (preferences) {
      setLoaded(true);
    }
  }, [preferences]);

  if (!loaded) {
    return <LoadingVisual />;
  }

  // Keep the navigator structure to maintain proper navigation context
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {preferences && preferences[0] && preferences[0][1] ? (
        <RootStack.Screen name="Main" component={MainNavigator} />
      ) : (
        <RootStack.Screen name="Onboarding" component={Welcome} />
      )}
    </RootStack.Navigator>
  );
};
