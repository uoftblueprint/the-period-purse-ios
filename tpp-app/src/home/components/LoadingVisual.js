import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingVisual() {
  // general use pattern is to use Promise.all for all backend calls. and stop rendering this when done
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color="#ff0000" />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
