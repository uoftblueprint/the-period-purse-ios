import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

/**
 * Button component used in SelectLogOptionOverlay for different logging options
 */
export const OptionButton = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.optionText}>{title}</Text>
      <View style={styles.iconCircle}>{icon}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  optionText: {
    textAlign: "center",
    maxWidth: 100,
    fontSize: 14,
    marginBottom: 10,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: "#B31F20",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
