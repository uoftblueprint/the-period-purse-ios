import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEYS, TRACK_SYMPTOMS } from "./utils/constants.js";
import { Symptoms } from "./utils/models.js";
import { GETAllTrackingPreferences } from "./SettingsService.js";
import { errorAlertModal } from "../error/errorAlertModal";

/**
 * Makes API request to AsyncStorage to access symptoms for the entire year
 * @param {number} year the desired data from a specific year
 * @returns: {Object} if data for that year exists
 */
export const GETYearData = async (year) => {
  try {
    let yearObject = JSON.parse(await AsyncStorage.getItem(year.toString()));

    // yearObject could be null
    if (yearObject) {
      let parsedYear = yearObject.map((month) => {
        let parsedMonth = month.map((day) => {
          return day
            ? new Symptoms(day["flow"], day["mood"], day["sleep"], day["cramps"], day["exercise"], day["notes"])
            : new Symptoms();
        });

        return parsedMonth;
      });

      return parsedYear;
    }

    return null;
  } catch (e) {
    console.log(e);
    errorAlertModal();
  }
};

/**
 * Saves user's current selected filter, selected month, and selected year, to preserve the thing they are looking at.
 * Meant to be used when user exits calendar page in any way.
 * @param {string} selectedvVew, mostly used for filtering
 * @param {number} selectedMonth integer used to represent the month from 1 to 12
 * @param {number} selectedYear integer to represent the year
 */

export const POSTMostRecentCalendarState = async (selectedView, selectedMonth, selectedYear) =>
  new Promise(async (resolve, reject) => {
    try {
      // Check if it's a valid view or month
      if (selectedMonth > 12 || selectedMonth < 1) {
        reject("No month to record");
      }

      const exists = Object.keys(TRACK_SYMPTOMS).some((tracking) => tracking === selectedView);

      if (exists) {
        const viewPair = [KEYS.SELECTED_VIEW, selectedView];
        const monthPair = [KEYS.SELECTED_MONTH, String(selectedMonth - 1)];
        const yearPair = [KEYS.SELECTED_YEAR, String(selectedYear)];
        try {
          await AsyncStorage.multiSet([viewPair, monthPair, yearPair])
            .then(() => resolve())
            .catch((e) => {
              reject(`Unable to update most recent calendar state`);
              console.log(JSON.stringify(e));
            });
        } catch (e) {
          console.log(`POSTMostRecentCalendarState error: ${JSON.stringify(e)}`);
          reject("Something went wrong");
        }
      } else {
        reject("No view to record");
      }
    } catch (e) {
      console.log(e);
      errorAlertModal();
    }
  });

/**
 * Retrieves user's previous selected filter, selected month, and selected year, to preserve the thing they are looking at.
 * Meant to be used when user returns to the calendar page in any way.
 * @returns: {object} array of selectedView, selectedMonth and selectedYear
 */
export const GETMostRecentCalendarState = async () => {
  try {
    let tracking = await GETAllTrackingPreferences();
    const selectedView = await AsyncStorage.getItem(KEYS.SELECTED_VIEW);
    const selectedMonth = await AsyncStorage.getItem(KEYS.SELECTED_MONTH);
    const selectedYear = await AsyncStorage.getItem(KEYS.SELECTED_YEAR);

    // Checks which view it is on
    let index = Object.values(TRACK_SYMPTOMS).indexOf(selectedView);

    if (tracking[Object.keys(tracking)[index]]) {
      return [selectedView, selectedMonth, selectedYear];
    }
  } catch (e) {
    // error reading value
    console.log(e);
    errorAlertModal();
  }

  return null;
};
