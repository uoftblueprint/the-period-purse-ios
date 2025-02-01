import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import CloseIcon from "../../../assets/icons/close_icon.svg";
import { CalendarList } from "react-native-calendars";
import { CALENDAR_STACK_SCREENS } from "../CalendarNavigator";
import {
  getCalendarByYear,
  getISODate,
  GETStoredYears,
  getSymptomsFromCalendar,
  getMonthsDiff,
} from "../../services/utils/helpers";
import { LogMultipleDayPeriod } from "../../services/LogSymptomsService";
import SubmitIcon from "../../../assets/icons/checkmark";
import { scrollDate } from "./CalendarScreen";
import { FILTER_COLOURS, FILTER_TEXT_COLOURS, FLOW_LEVEL } from "../../services/utils/constants";
import { GETYearData } from "../../services/CalendarService";
import { calculateAverages } from "../../services/CalculationService";
import ErrorFallback from "../../error/error-boundary";
import Constants from "expo-constants";
import { GETJoinedDate } from "../../services/OnboardingService";
import LoadingVisual from "../components/LoadingVisual";

const DayComponent = ({ props }) => {
  const { onPress, date, marking } = props;

  return (
    // onpress should select the dates for multi select
    <TouchableOpacity disabled={new Date(date.dateString) > new Date()} onPress={() => onPress(date)}>
      <View
        style={{
          ...styles.dayContainer,
          backgroundColor:
            new Date(date.dateString) > new Date()
              ? FILTER_COLOURS.DISABLED
              : marking && marking["customStyles"].backgroundColor,
        }}
      >
        <Text style={{ color: new Date(date.dateString) > new Date() ? FILTER_TEXT_COLOURS.DISABLED : "#000000" }}>
          {date.day}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const Calendar = ({ navigation, setSelectedDates, markedDates, currentDate }) => {
  let joinedDate = "";
  GETJoinedDate().then((res) => {
    joinedDate = res;
  });
  const futureScroll = 1 + getMonthsDiff(currentDate);
  const pastScroll = 12 + getMonthsDiff(joinedDate) - getMonthsDiff(currentDate);
  return (
    <CalendarList
      // Initially visible month. Default = now
      current={currentDate}
      // Max amount of months allowed to scroll to the past. Default = 50
      pastScrollRange={pastScroll}
      // Max amount of months allowed to scroll to the future. Default = 50
      futureScrollRange={futureScroll}
      // Enable or disable scrolling of calendar list
      scrollEnabled={true}
      // Enable or disable vertical scroll indicator. Default = false
      showScrollIndicator={true}
      onDayPress={setSelectedDates}
      markingType={"custom"}
      dayComponent={(props) => <DayComponent props={props} />}
      markedDates={markedDates}
      theme={{
        paddingBottom: 100,
        margin: 20,
        calendarBackground: "#ffffff",
        // Sun Mon Tue Wed Thu Fri Sat Bar
        textSectionTitleColor: "#000000",
        todayTextColor: "red",
        dayTextColor: "#000000",
        monthTextColor: "red",
        textDayFontFamily: "Avenir",
        textMonthFontFamily: "Avenir",
        textDayHeaderFontFamily: "Avenir",
        textDayFontWeight: "500",
        textMonthFontWeight: "400",
        textDayHeaderFontWeight: "800",
        textDayFontSize: 10,
        textMonthFontSize: 14,
        textDayHeaderFontSize: 10,
        "stylesheet.calendar.main": {
          dayContainer: {
            flex: 1,
            margin: 0,
          },
          emptyDayContainer: {
            flex: 1,
            margin: 0,
          },
          week: {
            marginTop: 0,
            marginBottom: 0,
            flexDirection: "row",
            justifyContent: "space-around",
          },
        },
      }}
    />
  );
};

export default function LogMultipleDatesScreen({ navigation }) {
  // const [selectedDates, setSelectedDates] = useState([]);
  const [numSelected, setNumSelected] = useState(0);
  const [markedDates, setMarkedDates] = useState({});
  const [hasChanged, setHasChanged] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const DESELECTED_COLOR = "#FFFFFF";
  const SELECTED_COLOR = "#E44545";

  useEffect(() => {
    // Retrieve all marked dates and indicate that they are marked in log multiple dates screen
    async function populateMarkedDates() {
      GETStoredYears()
        .then((years) => {
          let promises = [];
          years.forEach((year) => {
            promises.push(GETYearData(year));
          });

          Promise.all(promises)
            .then((history) => {
              let allMarkedDates = {};
              history.forEach((year, yearIndex) => {
                year.forEach((month, monthIndex) => {
                  month.forEach((day, dayIndex) => {
                    if (day.flow !== null && day.flow !== FLOW_LEVEL.NONE) {
                      let monthString = monthIndex + 1 < 10 ? "0" + (monthIndex + 1) : monthIndex + 1;
                      let dayString = dayIndex + 1 < 10 ? "0" + (dayIndex + 1) : dayIndex + 1;
                      let stringDate = years[yearIndex] + "-" + monthString + "-" + dayString;
                      allMarkedDates[stringDate] = {
                        marked: true,
                        originalMarked: true,
                        customStyles: {
                          backgroundColor: SELECTED_COLOR,
                        },
                      };
                    }
                    if (day.ovulation) {
                      allMarkedDates[stringDate] = {
                        ...allMarkedDates[stringDate],
                        marked: true,
                        originalMarked: true,
                        customStyles: {
                          backgroundColor: "teal",
                        },
                      };
                    }
                  });
                });
              });
              setMarkedDates(allMarkedDates);
              setLoaded(true);
            })
            .catch((error) => {
              console.log(`GETCycleHistoryByYear error: ${JSON.stringify(error)}`);
            });
        })
        .catch((error) => {
          console.log(`GETStoredYears error: ${JSON.stringify(error)}`);
        });
    }

    populateMarkedDates();
  }, []);

  useEffect(() => {
    setHasChanged(
      Object.keys(markedDates).some(
        (key) =>
          (markedDates[key].marked && !markedDates[key].originalMarked) ||
          (!markedDates[key].marked && markedDates[key].originalMarked)
      )
    );
  }, [numSelected]);

  useEffect(() => {
    if (!submitting) {
      return;
    }

    const onSubmit = async () => {
      let selectedDates = [];
      let deselectedDates = [];

      Object.keys(markedDates).map((date) => {
        // Dates that were not selected before that have been marked as selected
        if (markedDates[date].marked && !markedDates[date].originalMarked) {
          const processed = date.split("-");
          const data = { year: processed[0], month: processed[1], day: processed[2] };

          selectedDates.push(data);

          // Dates that were selected before that have been marked as unselected
        } else if (!markedDates[date].marked && markedDates[date].originalMarked) {
          const processed = date.split("-");
          const data = { year: processed[0], month: processed[1], day: processed[2] };

          deselectedDates.push(data);
        }
      });

      let inputData = {};

      if (selectedDates.length + deselectedDates.length > 0) {
        try {
          await LogMultipleDayPeriod(selectedDates, deselectedDates);
          for (let date of selectedDates.concat(deselectedDates)) {
            let cal = await getCalendarByYear(date.year);
            let submitSymp = getSymptomsFromCalendar(cal, date.day, date.month, date.year);
            let dateObject = new Date(date.year, date.month - 1, date.day);
            inputData[getISODate(dateObject)] = {
              symptoms: submitSymp,
            };
          }
        } catch (error) {
          console.log(error);
        }
      }
      setSubmitting(false);
      navigation.navigate(CALENDAR_STACK_SCREENS.CALENDAR_PAGE, { inputData: inputData });
      await calculateAverages();
    };

    onSubmit();
  }, [submitting]);


  const unsavedChanges = {
    title: "Unsaved changes",
    message: "Your changes have not been saved. Do you want to discard the changes and continue?",
    cancelTitle: "Cancel",
    acceptTitle: "Yes",
  };

  const setSelectedDates = (date) => {
    if (markedDates[date.dateString]) {
      const isMarked = !markedDates[date.dateString].marked;
      const isOriginalMarked = markedDates[date.dateString].originalMarked;
      setMarkedDates({
        ...markedDates,
        [date.dateString]: {
          marked: isMarked,
          originalMarked: isOriginalMarked,
          customStyles: {
            backgroundColor: isMarked ? SELECTED_COLOR : DESELECTED_COLOR,
          },
        },
      });

      isMarked ? setNumSelected(numSelected + 1) : setNumSelected(numSelected - 1);
    } else {
      setMarkedDates({
        ...markedDates,
        [date.dateString]: {
          marked: true,
          originalMarked: false,
          customStyles: {
            backgroundColor: SELECTED_COLOR,
          },
        },
      });

      setNumSelected(numSelected + 1);
    }
  };

  const onSubmit = async () => {
    let selectedDates = [];
    let deselectedDates = [];

    Object.keys(markedDates).map((date) => {
      // Dates that were not selected before that have been marked as selected
      if (markedDates[date].marked && !markedDates[date].originalMarked) {
        const processed = date.split("-");
        const data = { year: processed[0], month: processed[1], day: processed[2] };

        selectedDates.push(data);

        // Dates that were selected before that have been marked as unselected
      } else if (!markedDates[date].marked && markedDates[date].originalMarked) {
        const processed = date.split("-");
        const data = { year: processed[0], month: processed[1], day: processed[2] };

        deselectedDates.push(data);
      }
    });

    let inputData = {};

    if (selectedDates.length + deselectedDates.length > 0) {
      try {
        await LogMultipleDayPeriod(selectedDates, deselectedDates);
        for (let date of selectedDates.concat(deselectedDates)) {
          let cal = await getCalendarByYear(date.year);
          let submitSymp = getSymptomsFromCalendar(cal, date.day, date.month, date.year);
          let dateObject = new Date(date.year, date.month - 1, date.day);
          inputData[getISODate(dateObject)] = {
            symptoms: submitSymp,
          };
        }
      } catch (error) {
        console.log(error);
      }
    }

    let newDate = null;
    if (selectedDates.length > 0)
      newDate = [selectedDates[0].year, selectedDates[0].month, selectedDates[0].day].join("-");
    else if (deselectedDates.length > 0)
      newDate = [deselectedDates[0].year, deselectedDates[0].month, deselectedDates[0].day].join("-");

    navigation.navigate(CALENDAR_STACK_SCREENS.CALENDAR_PAGE, {
      inputData: inputData,
      newDate: newDate,
    });

    await calculateAverages();
  };

  const alertPopup = (info) => {
    Alert.alert(info.title, info.message, [
      {
        text: info.cancelTitle,
        style: "cancel",
      },
      { text: info.acceptTitle, onPress: () => navigation.navigate(CALENDAR_STACK_SCREENS.CALENDAR_PAGE) },
    ]);
  };

  const onClose = () => {
    // alert that there are unsaved changes if there are newly marked dates, or newly unmarked dates
    if (
      Object.keys(markedDates).some(
        (key) =>
          (markedDates[key].marked && !markedDates[key].originalMarked) ||
          (!markedDates[key].marked && markedDates[key].originalMarked)
      )
    ) {
      alertPopup(unsavedChanges);
    } else {
      navigation.navigate(CALENDAR_STACK_SCREENS.CALENDAR_PAGE);
    }
  };

  if (loaded) {
    return (
      <ErrorFallback>
        <SafeAreaView style={styles.container}>
          <View style={styles.navbarContainer}>
            <TouchableOpacity onPress={() => onClose()} style={styles.close}>
              <CloseIcon fill={"#181818"} />
            </TouchableOpacity>
            <View style={styles.navbarTextContainer}>
              <Text style={styles.navbarTitle}>Tap date to log period</Text>
              <Text style={styles.navbarSubTitle}>Selected dates will have their Flow level set to Medium</Text>
            </View>
          </View>

          <View style={styles.calendar}>
            <Calendar
              numSelected={numSelected}
              setNumSelected={setNumSelected}
              navigation={navigation}
              setSelectedDates={setSelectedDates}
              markedDates={markedDates}
              currentDate={scrollDate}
            />
          </View>
          <TouchableOpacity
            disabled={!hasChanged}
            onPress={() => setSubmitting(true)}
            style={{ ...styles.submitButton, opacity: hasChanged ? 1 : 0.5 }}
          >
            <SubmitIcon fill={"#181818"} />
          </TouchableOpacity>
        </SafeAreaView>
      </ErrorFallback>
    );
  } else {
    return <LoadingVisual />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    marginBottom: "-35%",
  },
  navbarContainer: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: "10%",
    position: "relative",
    flexDirection: "row",
    backgroundColor: "#EFEFF4",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  navbarTextContainer: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  navbarTitle: {
    color: "#181818",
    fontWeight: "600",
    fontSize: 20,
  },
  navbarSubTitle: {
    color: "#181818",
    fontWeight: "300",
    fontSize: 13,
  },
  close: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 17.05,
    right: 348.5,
    top: 24.51,
    bottom: 741.52,
  },
  dayContainer: {
    borderColor: "#D1D3D4",
    // backgroundColor: '#B31F20',
    borderWidth: 1,
    borderRadius: 8,
    width: 50,
    height: 50,
    paddingLeft: 5,
    paddingTop: 3,
    margin: 2,
  },
  submitButton: {
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 8, //IOS
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    right: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#5A9F93",
  },
  selectedIcon: {
    position: "relative",
    top: -4,
    height: 20,
    left: -2,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
