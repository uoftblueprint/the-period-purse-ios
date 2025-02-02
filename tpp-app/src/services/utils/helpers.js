import AsyncStorage from "@react-native-async-storage/async-storage";
import { FLOW_LEVEL } from "../utils/constants";
import { Symptoms } from "./models";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import addDays from "date-fns/addDays";
import { errorAlertModal } from "../../error/errorAlertModal";
// Backend helper functions used across app

/**
 * Returns TRUE if a symptom previously had flow and now doesn't, or vice versa. Return FALSE otherwise.
 * @param previousFlow string of previous flow level
 * @param newFlow string of new flow level
 * @return {boolean} indicating if flow used to be on and is now off, or vice versa
 */
export const flowOnOffModeChanged = (previousFlow, newFlow) => {
  const flowOn = [FLOW_LEVEL.SPOTTING, FLOW_LEVEL.LIGHT, FLOW_LEVEL.MEDIUM, FLOW_LEVEL.HEAVY];
  return (
    (flowOn.includes(previousFlow) && !flowOn.includes(newFlow)) ||
    (!flowOn.includes(previousFlow) && flowOn.includes(newFlow))
  );
};

/**
 * Initializes an empty year array with 12 nested arrays, representing a month.
 * Within each month array is X null values corresponding to X days of that month in that year.
 * @param {number} yearNumber
 */
export const initializeEmptyYear = (yearNumber) => {
  let year = new Array(12);

  for (let i = 0; i < 12; ++i) {
    let daysInMonth = new Date(yearNumber, i + 1, 0).getDate();
    let month = new Array(daysInMonth).fill(null); // fill with daysInMonth null values
    year[i] = month; // assign it to year
  }

  return year;
};

/**
 * Convert a Date object into a date string, encoding year, month and day. Note it encodes months as 1 indexed, and days as 0 indexed
 * @param {Date} date Object to convert to string
 * @param {string | undefined} format String format to convert date to. If none is specified, uses 'YYYY-MM-DD'.
 * @return {string} String encoding year, month and day in specified format
 */
export const getDateString = (date, format = "YYYY-MM-DD") => {
  switch (format) {
    case "MM DD, YYYY":
      let options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleString("default", options);
    default: // YYYY-MM-DD
      return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }
};

/**
 * Check if the date, month, year combination is a valid date.
 * @param {number} day 1st day of month = 1
 * @param {number} month January = 1
 * @param {number} year
 * @return {boolean} if date is valid and not in the future
 */
export const isValidDate = (day, month, year) => {
  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month <= 0 || month > 12) return false;

  let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29;

  // Check the range of the day
  if (!(day > 0 && day <= monthLength[month - 1])) return false;

  // Check that date isn't in the future
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month - 1, day) <= today;
};

/**
 * @param {number} year The year for which to get calendars
 * @return {Object} A dictionary containing the calendars for the year before, current year, and next year. Keys are the year numbers
 */
export const getCalendarByYear = async (year) => {
  try {
    let prevYear = year - 1;
    let nextYear = year + 1;

    let currentCalendarString = await AsyncStorage.getItem(year.toString());
    let prevCalendarString = await AsyncStorage.getItem(prevYear.toString());
    let nextCalendarString = await AsyncStorage.getItem(nextYear.toString());

    let calendars = {};
    if (prevCalendarString) {
      let prevCalendar = JSON.parse(prevCalendarString);
      calendars[prevYear] = prevCalendar;
    }
    if (currentCalendarString) {
      let currentCalendar = JSON.parse(currentCalendarString);
      calendars[year] = currentCalendar;
    }
    if (nextCalendarString) {
      let nextCalendar = JSON.parse(nextCalendarString);
      calendars[nextYear] = nextCalendar;
    }
    return calendars;
  } catch (e) {
    console.log(e);
    errorAlertModal();
  }
};

/**
 * Retrieves the user's symptom data for the given date from the calendar.
 * @param {Object} calendar The object containing the symptoms for this year, last year, and next year.
 * @param {Number} day number (First day = 1)
 * @param {Number} month number (January = 1)
 * @param {Number} year number
 */
export const getSymptomsFromCalendar = (calendar, day, month, year) => {
  if (year in calendar && isValidDate(day, month, year)) {
    let rawSymptoms = calendar[year][month - 1][day - 1];
    return rawSymptoms
      ? new Symptoms(
          rawSymptoms.flow,
          rawSymptoms.mood,
          rawSymptoms.sleep,
          rawSymptoms.cramps,
          rawSymptoms.exercise,
          rawSymptoms.notes,
          rawSymptoms.ovulation
        )
      : new Symptoms();
  } else {
    return new Symptoms();
  }
};

/**
 * Computes the number of days between the two dates provided, including the two dates. If earlierDate and laterDate are equal, returns 1.
 * @param {Date} earlierDate
 * @param {Date} laterDate
 * @return {number} number of days between the two dates provided, ignoring their hours, minutes and seconds.
 */
export const getDaysDiffInclusive = (earlierDate, laterDate) => {
  earlierDate.setHours(0, 0, 0, 0);
  laterDate.setHours(0, 0, 0, 0);
  return Math.abs(differenceInCalendarDays(earlierDate, laterDate)) + 1;
};

/**
 * Returns a string in the format of 'yyyy-MM-dd' from a date object and removes the time
 * @param {Date} date object to be processed
 * @return {string} a string in the format of 'yyyy-MM-dd' without the time
 */
export const getISODate = (date) => {
  return date.toISOString().substring(0, 10);
};

/**
 *
 * @param {Number} year The year from which to find all period days
 * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
 * @return {Array} List of period Dates in this year, in chronological order
 */
export const getPeriodsInYear = async (year, calendar = null) => {
  let startOfYear = new Date(year, 0, 1);
  let periods = [];

  if (!calendar) {
    calendar = await getCalendarByYear(year);
  }

  let current = startOfYear;

  try {
    while (current.getFullYear() === year) {
      let currentSymptoms = getSymptomsFromCalendar(
        calendar,
        current.getDate(),
        current.getMonth() + 1,
        current.getFullYear()
      );
      if (currentSymptoms.flow !== null && currentSymptoms.flow !== FLOW_LEVEL.NONE) {
        periods.push(current);
      }
      current = addDays(current, 1);
    }
    return periods;
  } catch (e) {
    console.log(e);
    return periods;
  }
};

/**
 * Generalized function to find all dates in a year where a given symptom is not null.
 *
 * @param {Number} year The year from which to find all period days
 * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
 * @param {String} symptomType The type of symptom to find
 * @return {Array} List of symptom Dates in this year, in chronological order
 */
export const getSymptomsInYear = async (year, calendar = null, symptomType) => {
  let startOfYear = new Date(year, 0, 1);
  let symptomDays = [];

  if (!calendar) {
    calendar = await getCalendarByYear(year);
  }

  let current = startOfYear;

  try {
    while (current.getFullYear() === year) {
      let currentSymptoms = getSymptomsFromCalendar(
        calendar,
        current.getDate(),
        current.getMonth() + 1,
        current.getFullYear()
      );
      if (currentSymptoms[symptomType] !== null) {
        symptomDays.push(current);
      }
      current = addDays(current, 1);
    }
    return symptomDays;
  } catch (e) {
    console.log(e);
    return symptomDays;
  }
};

/**
 * @returns {Promise} Promise that resolves into all the years that are stored. If none found, returns empty array
 */
export const GETStoredYears = async () => {
  try {
    let currentYear = new Date().getFullYear();
    let storedYears = [];
    let yearToCheck = currentYear;

    while (JSON.parse(await AsyncStorage.getItem(yearToCheck.toString()))) {
      storedYears.push(yearToCheck);
      yearToCheck -= 1;
    }

    return storedYears;
  } catch (e) {
    console.log(e);
    errorAlertModal();
  }

  return storedYears;
};

/**
 * Calculates the number of months between today's date and date given by dateFromStr
 * @param {String} dateFromStr string ("YYYY-MM-DD") representing the date to calculate from
 * @returns the number of months between today's date and dateFromStr
 */
export const getMonthsDiff = (dateFromStr) => {
  if (dateFromStr) {
    let parts = dateFromStr.split("-");
    let dateFrom = new Date(parts[0], parts[1] - 1, parts[2]);
    let dateTo = new Date();
    return dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear());
  }
  return null;
};

export const getCorrectDate = (daysAdded, time) => {
  // takes a string time and parses it
  const timeToSet = time.split(":");
  let hour = parseInt(timeToSet[0].split(":")[0]);

  const date = new Date();
  date.setDate(date.getDate() + daysAdded);
  date.setHours(hour);
  date.setMinutes(0);
  date.setSeconds(0);
  return date;
};

/**
 * Gets the full current date as a string in the format of "2022-1-1"
 * @returns a string representing the current date
 */

export function getFullCurrentDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();

  const fullDateArray = [year, month, day];

  return fullDateArray.join("-");
}

/**
 * Returns the number of days between the first ovulation date and last ovulation date between two periods
 * @param {*} prevPeriodEnd - The end of the previous period
 * @param {*} currPeriodStart - The start of the current period
 * @param {*} ovulations - The list of ovulation dates
 * @returns {number} The number of days in the ovulation phase between the start and end of the period
 */
export const getOvulationPhaseLength = (prevPeriodEnd, currPeriodStart, ovulations) => {
  // Filter ovulations within the period range
  const ovulationDays = ovulations.filter((date) => date >= prevPeriodEnd && date <= currPeriodStart);

  // If there are no ovulations return 0
  if (ovulationDays.length == 0) {
    return 0;
  } else if (ovulationDays.length == 1) {
    return 1;
  }

  // Sort the dates to ensure we get first and last correctly
  ovulationDays.sort((a, b) => a - b);

  // Return the number of days between first and last ovulation using differenceInCalendarDays
  return differenceInCalendarDays(ovulationDays[ovulationDays.length - 1], ovulationDays[0]);
};
