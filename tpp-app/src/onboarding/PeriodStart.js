import React, { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { configureFonts, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";
import { STACK_SCREENS } from "./Confirmation";
import { BackButton } from "../home/components/BackButtonComponent";
import { NextButton, SkipButton, DatePickerButton } from "./components/ButtonComponents";
import { TitleText, BodyText } from "./components/TextComponents";
import { TwoButtonContainer, BackButtonContainer, InputContainer } from "./components/ContainerComponents";
import { POSTInitialPeriodStart, POSTInitialPeriodLength } from "../services/OnboardingService";
import { DatePickerModal } from "react-native-paper-dates";
import BackgroundShape from "../../assets/icons/background_shape.svg";
import PeriodStartIcon from "../../assets/icons/last_period_date.svg";
import BarIcon from "../../assets/icons/onboard_bar2.svg";
import CalendarIcon from "../../assets/icons/onboard_calendar.svg";
import ErrorFallback from "../error/error-boundary";

const MILLISECPERDAY = 24 * 60 * 60 * 1000;
export default function PeriodStart({ route, navigation }) {
  const { periodLength } = route.params;
  let newPeriodLength = periodLength;
  const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
  const [open, setOpen] = useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
    setRange({ startDate: undefined, endDate: undefined });
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );

  const onChange = React.useCallback(
    ({ startDate, endDate }) => {
      setRange({ startDate, endDate });
    },
    [setRange]
  );

  function CalendarIconPref() {
    if (range.startDate) return null;
    else return <CalendarIcon style={styles.icon} />;
  }

  /**
   * Computes the end date based on the period length user entered previously
   * and the range.startDate that user chose in the date picker modal.
   * @returns computed end date or today's date, whichever is earlier in time
   */
  function getEndDate() {
    let endDate = new Date(range.startDate.getTime() + (periodLength - 1) * MILLISECPERDAY);
    if (endDate > new Date())
      // the calculated endDate goes beyond the current date
      return new Date();
    else return endDate;
  }

  /**
   * Returns the date paramater as a string.
   * @param {Date} date date object to be translated into a string
   * @returns string version of date, formatted as "YYYY-MM-DD"
   */
  function getCustomDateString(date) {
    if (!date) return null;
    const month = date.getMonth() + 1; // month starts at 0
    const day = date.getDate();
    return [date.getFullYear(), (month > 9 ? "" : "0") + month, (day > 9 ? "" : "0") + day].join("-");
  }

  return (
    <ErrorFallback>
      <PaperProvider theme={theme}>
        <ImageBackground source={OnboardingBackground} style={styles.container}>
          <BackButtonContainer style={styles.backButtonContainer}>
            <BackButton
              title=""
              onPress={() => {
                navigation.navigate(STACK_SCREENS.PERIOD_LENGTH);
              }}
            />
          </BackButtonContainer>

          <SafeAreaView pointerEvents="box-none" style={{ alignItems: "center" }}>
            <BackgroundShape style={{ top: 10 }} />
            <PeriodStartIcon width="130" height="130" style={{ bottom: "38%" }} />
            <BarIcon style={{ bottom: "30%" }} />

            <TitleText style={{ bottom: "28%" }}>When did your {"\n"} period last start?</TitleText>
            <BodyText style={{ bottom: "28%" }}>Record your last period or {"\n"} skip if you don’t know</BodyText>

            <InputContainer style={{ bottom: "25%" }}>
              <DatePickerButton
                title={range.startDate ? getCustomDateString(range.startDate) : "Choose date"}
                onPress={() => setOpen(true)}
                inputted={range.startDate}
                icon={<CalendarIconPref style={styles.icon} />}
              />
            </InputContainer>
            <DatePickerModal
              locale="en"
              backgroundColor="#000000"
              mode="range"
              visible={open}
              onDismiss={onDismiss}
              startDate={range.startDate}
              // calculates endDate if user entered periodLength; asks user to pick endDate manually otherwise
              endDate={periodLength && range.startDate ? getEndDate() : range.endDate}
              onConfirm={onConfirm}
              onChange={onChange}
              validRange={{ endDate: new Date() }}
              saveLabel="Done"
              uppercase={false}
              label="Select Start Date"
              startLabel="From"
              endLabel="To"
            />
          </SafeAreaView>

          <TwoButtonContainer>
            <SkipButton
              title="Skip"
              onPress={() =>
                navigation.navigate(STACK_SCREENS.SYMPTOMS_CHOICES, {
                  periodLength: periodLength,
                  periodStart: null,
                  periodEnd: null,
                })
              }
            />
            <NextButton
              title="Next"
              onPress={() => {
                if (range.endDate) {
                  if (periodLength == null) {
                    // user did not enter periodLength previously but manually selected a complete date range
                    newPeriodLength = Math.round(
                      (range.endDate.getTime() - range.startDate.getTime()) / MILLISECPERDAY
                    );
                    POSTInitialPeriodLength(newPeriodLength);
                  }
                } else range.endDate = range.startDate; // just log 1 day if no end date is found
                POSTInitialPeriodStart(range.startDate, range.endDate);
                navigation.navigate(STACK_SCREENS.SYMPTOMS_CHOICES, {
                  periodLength: newPeriodLength,
                  // pass down the custom string version of the dates
                  periodStart: getCustomDateString(range.startDate),
                  periodEnd: getCustomDateString(range.endDate),
                });
              }}
              disabled={range.startDate ? false : true}
            />
          </TwoButtonContainer>
        </ImageBackground>
      </PaperProvider>
    </ErrorFallback>
  );
}

// styling for the date picker package
const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: "#5A9F93",
  },
};

const fontConfig = {
  default: {
    regular: {
      fontFamily: "Avenir",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "Avenir",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "Avenir",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "Avenir",
      fontWeight: "normal",
    },
  },
};

const styles = StyleSheet.create({
  backButtonContainer: {
    zIndex: 1,
  },
  container: {
    zIndex: 3,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  icon: {
    zIndex: 2,
    alignSelf: "center",
    left: "30%",
    bottom: "-35%",
  },
});
