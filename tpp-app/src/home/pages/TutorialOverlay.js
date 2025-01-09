import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text, Image } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { TabBarMiddleButton } from "../components/TabBarMiddleButton";
import PadImageHappy from "../../../assets/InfoPageImages/pad-3-2x.png";
import { CALENDAR_STACK_SCREENS } from "../CalendarNavigator";
import { SETTutorial } from "../../services/TutorialService";

export default function TutorialOverlay({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();
  SETTutorial(false); // set 'showTutorial' key to false in backend

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.overlay}>
        <View style={{ position: "absolute", bottom: tabBarHeight + 55 }}>
          <View style={styles.textbox}>
            <Text style={styles.text}>Tap this red button to log your period or symptoms</Text>
            <Image source={PadImageHappy} style={styles.image} />
            <View style={styles.triangle} />
          </View>
        </View>

        <TabBarMiddleButton
          style={{
            position: "absolute",
            bottom: tabBarHeight - 40,
          }}
          inOverlay={false}
          customOnPress={() => {
            navigation.goBack();
            navigation.navigate(CALENDAR_STACK_SCREENS.SELECT_LOG_OPTION);
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  textbox: {
    width: 224,
    height: 100,
    backgroundColor: "#F8FAFC",
    position: "relative",
    marginTop: 200,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  triangle: {
    width: 10,
    height: 10,
    position: "absolute",
    bottom: -10,
    left: 102,
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
    borderRightWidth: 10,
    borderRightColor: "transparent",
    borderTopWidth: 10,
    borderTopColor: "#F8FAFC",
  },
  text: {
    fontSize: 16,
    maxWidth: 140,
    color: "#475569",
    lineHeight: 22,
    letterSpacing: -0.02,
  },
  image: {
    width: 44,
    height: 57,
  },
});
