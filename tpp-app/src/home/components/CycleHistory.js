import React from "react";
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import addDays from "date-fns/addDays";
import { CALENDAR_STACK_SCREENS } from "../CalendarNavigator";
import Icon from "react-native-vector-icons/MaterialIcons";

const NothingLogged = () => {
  return <Text style={styles.nothingLogged}>Please start logging to learn more.</Text>;
};

const ShowMore = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(CALENDAR_STACK_SCREENS.CYCLE_HISTORY, { screen: CALENDAR_STACK_SCREENS.CYCLE_HISTORY })
      }
    >
      <View style={styles.showMoreButton}>
        <Text style={styles.showMoreText}>Show More</Text>
        <Icon name="keyboard-arrow-right" size={24} color={"#2F7A6D"} />
      </View>
    </TouchableOpacity>
  );
};

/**
 *
 * @returns Component that renders 1 continuous period, and lists the start and end
 */
function Interval({ interval, isMostRecent, onPeriod }) {
  let startDate = interval.start;
  const formattedStart = startDate.toLocaleString("default", { month: "short", day: "numeric" });
  let days = interval.periodDays;
  let endDate = addDays(startDate, days);
  let formattedEnd = endDate.toLocaleString("default", { month: "short", day: "numeric" });

  let header = (
    <View>
      <Text style={styles.intervalHeader}>
        {formattedStart} - {formattedEnd}
      </Text>
      <Text style={styles.periodText}>{days}-day period</Text>
    </View>
  );

  let mostRecentText = onPeriod ? "Current Period" : "Most Recent Period";

  let mostRecentHeader = (
    <Text style={[styles.intervalHeader, styles.initialHeader]}>
      {mostRecentText}: Started {formattedStart}
    </Text>
  );

  let daysArray = Array.from(Array(days).keys());

  return (
    <View style={styles.interval}>
      {isMostRecent ? mostRecentHeader : header}
      <View style={{ flexDirection: "row" }}>
        {daysArray.map((day, index) => (
          <View style={styles.redDot} key={index} />
        ))}
      </View>
    </View>
  );
}
/**
 *
 * @returns Component that only renders the 3 most recent periods & their dates in the current year
 */
function MinimizedHistoryCard({ navigation, intervals, onPeriod }) {
  return (
    <View style={styles.card}>
      <ScrollView style={styles.historyContainer}>
        <SafeAreaView style={[styles.rowContainer, styles.bottomBorder]}>
          <Text style={styles.title}>Period History</Text>
          <ShowMore navigation={navigation} />
        </SafeAreaView>
        {intervals.length == 0 && NothingLogged()}
        {intervals.map((interval, index) => {
          if (index < 3) {
            return <Interval interval={interval} key={index} isMostRecent={index === 0} onPeriod={onPeriod} />;
          }
        })}
      </ScrollView>
    </View>
  );
}

/**
 *
 * @returns Component that renders all the periods and their dates for the renderedYear
 */
function ExpandedHistoryCard({ intervals, renderedYear, onPeriod }) {
  let currentYear = new Date().getFullYear();
  return (
    <View style={styles.card}>
      <ScrollView style={styles.historyContainer}>
        <View style={styles.bottomBorder}>
          <Text style={styles.title}> {renderedYear} </Text>
        </View>
        {intervals.length == 0 && NothingLogged()}
        {intervals.map((interval, index) => {
          return (
            <Interval
              interval={interval}
              key={index}
              isMostRecent={(index === 0) & (renderedYear === currentYear)}
              onPeriod={onPeriod}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
export { MinimizedHistoryCard, ExpandedHistoryCard };

const styles = StyleSheet.create({
  redDot: {
    backgroundColor: "#B31F20",
    borderRadius: 50,
    width: 10,
    height: 10,
    marginHorizontal: 1,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
  },
  intervalHeader: {
    fontFamily: "Avenir",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: -0.30000001192092896,
    textAlign: "left",
  },
  initialHeader: {
    marginBottom: 7,
  },
  periodText: {
    fontFamily: "Avenir",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "300",
    lineHeight: 16,
    letterSpacing: -0.30000001192092896,
    textAlign: "left",
  },
  bottomBorder: {
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  title: {
    fontFamily: "Avenir",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: 22,
    letterSpacing: -0.30000001192092896,
    textAlign: "left",
    color: "#6D6E71",
  },
  showMoreText: {
    fontFamily: "Avenir",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: 19,
    letterSpacing: -0.4848649203777313,
    textAlign: "center",
    color: "#2F7A6D",
  },
  showMoreButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyContainer: {
    marginHorizontal: "6%",
    marginTop: "4%",
  },
  interval: {
    marginBottom: 19,
  },
  nothingLogged: {
    fontFamily: "Avenir",
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 19,
    letterSpacing: -0.30000001192092896,
    textAlign: "left",
    marginBottom: "10%",
  },
});
