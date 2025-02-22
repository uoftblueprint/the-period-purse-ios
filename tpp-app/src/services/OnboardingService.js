import AsyncStorage from "@react-native-async-storage/async-storage";
import { FLOW_LEVEL, TRACK_SYMPTOMS, KEYS } from "./utils/constants.js";
import { initializeEmptyYear, getISODate } from "./utils/helpers.js";
import { Symptoms } from "./utils/models.js";
import { errorAlertModal } from "../error/errorAlertModal";

/**
 * Initializes user's initial period length and average period length.
 * @param periodLength a number representing the period length
 * @returns a promise resolving when the multiset operation is complete
 */
export const POSTInitialPeriodLength = async (periodLength) =>
  new Promise(async (resolve, reject) => {
    try {
      if (periodLength) {
        periodLength = JSON.stringify(periodLength);
        await AsyncStorage.multiSet([
          [KEYS.INITIAL_PERIOD_LENGTH, periodLength],
          [KEYS.AVERAGE_PERIOD_LENGTH, periodLength],
        ]).then(() => {
          console.log(
            `Initialized ${KEYS.INITIAL_PERIOD_LENGTH}, ${KEYS.AVERAGE_PERIOD_LENGTH} as ${periodLength}`
          );
          resolve();
        });
      }
    } catch (e) {
      console.log(`POSTInitialPeriodLength error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

/**
 * Initializes entries for the user's last period.
 * This only happens when the user has given inputs
 * for both the start and end date of their last period.
 * @param periodStart date representing the start date of their last period
 * @param periodEnd date representing the end date of their last period (periodEnd <= today's date)
 * @returns a promise resolving when the multiset operation is complete
 */
export const POSTInitialPeriodStart = async (periodStart, periodEnd) =>
  new Promise(async (resolve, reject) => {
    try {
      if (periodStart && periodEnd) {
        const periodStartTime = periodStart.getTime();
        const periodEndTime = periodEnd.getTime();
        let yearsSet = new Set();
        let dates = [];

        // Use timestamps to populate the list of dates to avoid
        // messing up when dealing with last day of a month and/or year
        for (
          let i = periodStartTime;
          i <= periodEndTime;
          i = i + 1000 * 60 * 60 * 24
        ) {
          const currentDate = new Date(i);
          yearsSet.add(currentDate.getFullYear());
          dates.push(currentDate);
        }

        let yearDicts = {};
        yearsSet.forEach((year) => {
          yearDicts[year] = initializeEmptyYear(year);
        });

        // Initialize the correct daily logs
        dates.forEach((date) => {
          yearDicts[date.getFullYear()][date.getMonth()][date.getDate() - 1] =
            new Symptoms(FLOW_LEVEL.MEDIUM);
        });

        let allSet = [];
        yearsSet.forEach(async (year) => {
          allSet.push([JSON.stringify(year), JSON.stringify(yearDicts[year])]);
        });

        await AsyncStorage.multiSet(allSet).then(() => {
          console.log("Initialized the first loggings");
          resolve();
        });
      }
    } catch (e) {
      console.log(`POSTInitialPeriodStart error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

/**
 * Initializes the user's initial tracking preferences for what symptoms to track.
 * At least one symptom has to be selected for initialization to happen.
 * @param flow boolean representing whether to track flow
 * @param mood boolean representing whether to track mood
 * @param sleep boolean representing whether to track sleep
 * @param cramps boolean representing whether to track cramps
 * @param exercise boolean representing whether to track exercise
 * @param ovulation boolean representing whether to track ovulation
 * @returns a promise resolving when the multiset operation is complete
 */
export const POSTSymptomsToTrack = async (
  flow,
  mood,
  sleep,
  cramps,
  exercise,
  ovulation
) =>
  new Promise(async (resolve, reject) => {
    try {
      if (
        [flow, mood, sleep, cramps, exercise, ovulation].some((bool) => bool)
      ) {
        await AsyncStorage.multiSet([
          [TRACK_SYMPTOMS.FLOW, JSON.stringify(flow)],
          [TRACK_SYMPTOMS.MOOD, JSON.stringify(mood)],
          [TRACK_SYMPTOMS.SLEEP, JSON.stringify(sleep)],
          [TRACK_SYMPTOMS.CRAMPS, JSON.stringify(cramps)],
          [TRACK_SYMPTOMS.EXERCISE, JSON.stringify(exercise)],
          [TRACK_SYMPTOMS.OVULATION, JSON.stringify(ovulation)],
        ]).then(() => {
          console.log("Initialized tracking preferences");
          resolve();
        });
      }
    } catch (e) {
      console.log(`POSTSymptomsToTrack error: ${JSON.stringify(e)}`);
      errorAlertModal();
      errorAlertModal();
      reject();
    }
  });

/**
 * Stores the date the user started using the app.
 * @returns a promise resolving when the set operation is complete
 */
export const POSTJoinedDate = async () =>
  new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.setItem(KEYS.JOINED_DATE, getISODate(new Date())).then(
        () => {
          console.log(
            `Stored ${KEYS.JOINED_DATE} as ${getISODate(new Date())}`
          );
          resolve();
        }
      );
    } catch (e) {
      console.log(`POSTJoinedDate error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

/**
 * Retrieves the date the user started using the app.
 * @returns a date string representing the date the user started using the app
 */
export const GETJoinedDate = async () => {
  try {
    const joinedDate = await AsyncStorage.getItem(KEYS.JOINED_DATE);
    console.log(`Retrieved ${KEYS.JOINED_DATE} as ${joinedDate}`);
    return joinedDate;
  } catch (e) {
    console.log(`GETJoinedDate error: ${JSON.stringify(e)}`);
    errorAlertModal();
    reject();
  }
};
