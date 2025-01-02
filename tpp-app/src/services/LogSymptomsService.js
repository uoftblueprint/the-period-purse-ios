import AsyncStorage from "@react-native-async-storage/async-storage";
import { FLOW_LEVEL } from "./utils/constants";
import { initializeEmptyYear, isValidDate, getCalendarByYear, getSymptomsFromCalendar } from "./utils/helpers";
import { Symptoms } from "./utils/models";
import { errorAlertModal } from "../error/errorAlertModal";

/**
 * Posts the user's symptom data into the local storage for the given date.
 * @param {number} day 1st day of month = 1
 * @param {number} month January = 1
 * @param {number} year
 * @param {Symptoms} symptoms
 */
export const POSTsymptomsForDate = async (day, month, year, symptoms) =>
  new Promise(async (resolve, reject) => {
    // Check that date, month, year combo is valid
    if (!isValidDate(day, month, year)) {
      reject("Sorry, this isn't a valid date to log symptoms for!");
      return;
    }

    // Try to POST new symptoms in async storage
    try {
      //Get the year's data or set to empty year
      const fetchYear = await AsyncStorage.getItem(year.toString());
      const yearData = JSON.parse(fetchYear) ?? initializeEmptyYear(year);

      yearData[month - 1][day - 1] = symptoms;
      let yearStr = JSON.stringify(yearData);

      // post symptoms to storage
      await AsyncStorage.setItem(year.toString(), yearStr)
        .then(() => {
          resolve();
          return;
        })
        .catch((e) => {
          console.log(
            `Unable to mergeItem and post symptoms for this day, month, year: ${
              (day, month, year)
            }. Error: ${JSON.stringify(e)}`
          );
          reject(`Something went wrong. Please try again later.`);
          return;
        });
    } catch (e) {
      console.log(`POSTsymptomsForDate error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject("Something went wrong. Please try again later.");
      return;
    }
  });

/**
 * Updates user's flow to medium on selected days where the user's flow was originally null or none.
 * @param {Array<date>} datesToMark
 * @param {Array<date>} datesToUnmark
 * where date.day is a number (1st day of month = 1),
 * date.month is a number (January = 1),
 * date.year is a number.
 */
export const LogMultipleDayPeriod = async (datesToMark, datesToUnmark) => {
  // run this code for each value in the dates array
  if (datesToMark.length + datesToUnmark.length > 0) {
    try {
      const allDates = datesToMark.concat(datesToUnmark);
      const curYear = parseInt(allDates[0].year);
      const calendarData = await getCalendarByYear(curYear);

      allDates.map((date, index) => {
        const year = date.year;
        const month = date.month;
        const day = date.day;
        try {
          // initialize years that are not in the data
          if (!calendarData[year]) {
            calendarData[year] = initializeEmptyYear(year);
          }

          let symptoms = getSymptomsFromCalendar(calendarData, day, month, year);

          // Need to mark the date with period
          if (index < datesToMark.length) {
            if (symptoms.flow == null || symptoms.flow === FLOW_LEVEL.NONE) {
              symptoms.flow = FLOW_LEVEL.MEDIUM;
            }
          }

          // Need to unmark the date with no period
          else if (datesToMark.length <= index) {
            symptoms.flow = null;
          }

          calendarData[year][month - 1][day - 1] = symptoms;
        } catch (error) {
          console.log(error);
        }
      });

      for (const [key, value] of Object.entries(calendarData)) {
        if (value) {
          try {
            await AsyncStorage.setItem(key.toString(), JSON.stringify(value));
          } catch (error) {
            console.log(`LogMultipleDayPeriod error: ${JSON.stringify(error)}`);
          }
        }
      }
    } catch (error) {
      console.log("error with multiselect:", error);
      errorAlertModal();
    }
  }
};
