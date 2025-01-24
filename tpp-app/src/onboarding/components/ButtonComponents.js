import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Button } from "@rneui/themed";

export const WideButton = ({ onPress, title, color, disabled, bottom }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: "stretch",
        justifyContent: "center",
        backgroundColor: color,
        borderRadius: 10,
        width: 330,
        height: 52,
        alignSelf: "center",
        margin: 10,
        bottom: bottom,
      }}
      disabled={disabled}
    >
      <Text style={[styles.wideButtonText, { opacity: disabled ? 0.5 : 1.0 }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const NextButton = ({ onPress, title, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.nextButtonContainer, { opacity: disabled ? 0.5 : 1.0 }]}
    >
      <Text style={styles.nextButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export const SkipButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.skipButtonContainer}>
      <Text style={styles.skipButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export const CrossButton = ({ onPress }) => {
  return (
    <Button
      icon={<Icon name="cross" size={30} color="#000000" />}
      onPress={onPress}
      type="clear"
    />
  );
};

export const UnderlineButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginTop: 7 }}>
      <Text style={styles.underlineButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export const DatePickerButton = ({ onPress, title, inputted, icon }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ height: "100%" }}>
      {icon}
      <Text
        style={inputted ? styles.datePickerOutput : styles.datePickerButtonText}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const SymptomsChoicesButton = ({ onPress, title, color, icon }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 16,
        backgroundColor: color,
      }}
    >
      {icon}
      {title === "Exercise" && (
        <Text style={styles.symptomsChoicesButtonExercise}>{title}</Text>
      )}
      {title === "Mood" && (
        <Text style={styles.symptomsChoicesButtonMood}>{title}</Text>
      )}
      {title === "Ovulation" && (
        <Text style={styles.symptomsChoicesButtonOvulation}>{title}</Text>
      )}
      {title !== "Exercise" && title !== "Mood" && title !== "Ovulation" && (
        <Text style={styles.symptomsChoicesButtonText}>{title}</Text>
      )}
      {/* <Text style={title === 'Exercise' ? styles.symptomsChoicesButtonExercise : styles.symptomsChoicesButtonText}>{title}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wideButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Avenir",
    fontSize: 18,
    fontWeight: "800",
  },
  nextButtonContainer: {
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#5A9F93",
    borderRadius: 10,
    width: 149,
    height: 54,
    // bottom: 10
  },
  nextButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Avenir",
    fontSize: 15,
    fontWeight: "800",
  },
  skipButtonContainer: {
    alignItems: "stretch",
    justifyContent: "center",
    borderRadius: 10,
    width: 149,
    height: 54,
    // bottom: 10,
    marginRight: 20,
  },
  skipButtonText: {
    color: "#5A9F93",
    fontSize: 15,
    textAlign: "center",
  },
  underlineButtonText: {
    color: "#5A9F93",
    textAlign: "center",
    textDecorationLine: "underline",
    fontWeight: "800",
    fontSize: 15,
    fontFamily: "Avenir",
  },
  datePickerButtonText: {
    color: "#6D6E71",
    fontFamily: "Avenir",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "400",
    right: "5%",
  },
  datePickerOutput: {
    color: "#000000",
    fontFamily: "System",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "600",
    marginTop: "10%",
  },
  symptomsChoicesButtonText: {
    color: "#000000",
    fontFamily: "Avenir",
    fontWeight: "500",
    fontSize: 14,
    top: "75%",
    textAlign: "center",
  },
  symptomsChoicesButtonExercise: {
    color: "#000000",
    fontFamily: "Avenir",
    fontWeight: "500",
    fontSize: 14,
    top: "77%",
    textAlign: "center",
  },
  symptomsChoicesButtonMood: {
    color: "#000000",
    fontFamily: "Avenir",
    fontWeight: "500",
    fontSize: 14,
    top: "70%",
    textAlign: "center",
  },
  symptomsChoicesButtonOvulation: {
    color: "#000000",
    fontFamily: "Avenir",
    fontWeight: "500",
    fontSize: 12,
    top: "75%",
    textAlign: "center",
  },
});
