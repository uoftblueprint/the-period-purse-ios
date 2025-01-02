import AnimatedProgressWheel from "react-native-progress-wheel";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

function OnPeriodText({ periodDays }) {
  return (
    <View style={styles.periodTextContainer}>
      <Text style={styles.cycleTextTop}>Day </Text>
      <Text style={styles.cycleNumber}> {periodDays} </Text>
      <Text style={styles.cycleText}> of period </Text>
    </View>
  );
}

function OffPeriodText({ daysSinceLastPeriod }) {
  return (
    <View style={styles.periodTextContainer}>
      <Text style={styles.cycleNumber}> {daysSinceLastPeriod} </Text>
      <Text style={styles.cycleText}> Days since </Text>
      <Text style={styles.cycleText}> last period </Text>
    </View>
  );
}

function Cycle({ periodDays, daysSinceLastPeriod, cycleDonutPercent }) {
  return (
    // Cycle Centering code
    <View>
      <Text style={styles.header}> Current Cycle</Text>
      <View style={styles.centeredColumn}>
        <View style={styles.centeredRow}>
          <AnimatedProgressWheel
            size={200}
            width={25}
            color={"#FFDBDB"}
            fullColor={"#B31F20"}
            progress={cycleDonutPercent}
            backgroundColor={"#F1F1F0"}
          ></AnimatedProgressWheel>
        </View>
      </View>

      {/* centering the text within the cycle */}
      <View style={styles.absoluteCentered}>
        {periodDays > 0 ? (
          <OnPeriodText periodDays={periodDays} />
        ) : (
          <OffPeriodText daysSinceLastPeriod={daysSinceLastPeriod} />
        )}
      </View>
    </View>
  );
}

export default function CycleCard({ periodDays, daysSinceLastPeriod, cycleDonutPercent, showTip }) {
  return (
    <View style={[styles.card, !showTip && styles.noTip]}>
      <Cycle periodDays={periodDays} daysSinceLastPeriod={daysSinceLastPeriod} cycleDonutPercent={cycleDonutPercent} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    height: 298,
    backgroundColor: "white",
  },
  noTip: {
    marginTop: "7%",
  },
  cycleText: {
    fontFamily: "Avenir",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22,
    letterSpacing: -0.30000001192092896,
    color: "#6D6E71",
    top: -8,
  },
  cycleTextTop: {
    fontFamily: "Avenir",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22,
    letterSpacing: -0.30000001192092896,
    color: "#6D6E71",
    top: 7,
  },
  cycleNumber: {
    fontFamily: "Avenir",
    fontSize: 50,
    fontStyle: "normal",
    fontWeight: "900",
    lineHeight: 68,
    letterSpacing: -0.30000001192092896,
    color: "#B31F20",
    top: 3,
  },
  periodTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  centeredColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  centeredRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    margin: 10,
    transform: [{ rotate: "270deg" }],
  },
  absoluteCentered: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontFamily: "Avenir",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: 25,
    letterSpacing: -0.30000001192092896,
    textAlign: "left",
    position: "absolute",
    marginLeft: "5%",
    marginTop: "2.5%",
    color: "#B31F20",
  },
});
