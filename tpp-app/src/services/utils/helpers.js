import AsyncStorage from '@react-native-async-storage/async-storage';
import {Symptoms} from '../utils/models';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
// Backend helper functions used across app

/**
 * Initializes an empty year array with 12 nested arrays, representing a month.
 * Within each month array is X null values corresponding to X days of that month in that year.
 * @param yearNumber number
 */
export const initializeEmptyYear = (yearNumber) => {
  let year = new Array(12);

  for (let i = 0; i < 12; ++i) {
    let daysInMonth = new Date(yearNumber, i+1, 0).getDate();
    let month = new Array(daysInMonth).fill(null); // fill with daysInMonth null values
    year[i] = month; // assign it to year
  }

  return year
}


/**
 * Convert a Date object into a date string, encoding year, month and day. Note it encodes months as 1 indexed, and days as 0 indexed
 * @param {Date} date Object to convert to string
 * @return {String} String encoding year, month and day in YYYY-MM-DD format
 */
export const getDateString = (date) => {
  var date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  return date;

}


/**
 * Check if the date, month, year combination is a valid date.
 * @param day number
 * @param month number (January = 1)
 * @param year number
 * @return True or False boolean
 */
 export const isValidDate = (day, month, year) => {
  // COPIED FROM EMILY. TODO: delete this for original when merge
  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12)
      return false;

  let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
};

/**
 * @param {number} year The year for which to get calendars
 * @return {Object} A dictionary containing the calendars for the year before, current year, and next year. Keys are the year numbers
 */
export const getCalendarByYear = async (year) => {
  let prevYear = year - 1;
  let nextYear = year + 1;

  let currentCalendarString = await AsyncStorage.getItem(year.toString());
  let prevCalendarString = await AsyncStorage.getItem(prevYear.toString());
  let nextCalendarString = await AsyncStorage.getItem(nextYear.toString());

  let calendars = {}
  if (prevCalendarString){
    let prevCalendar = JSON.parse(prevCalendarString);
    calendars[prevYear] = prevCalendar;
  }
  if (currentCalendarString){
    let currentCalendar = JSON.parse(currentCalendarString);
    calendars[year] = currentCalendar;
  }
  if (nextCalendarString){
    let nextCalendar = JSON.parse(nextCalendarString);
    calendars[nextYear] = nextCalendar;
  }
  return calendars;
}

/**
 * Retrieves the user's symptom data for the given date from the calendar.
* @param {Object} calendar The object containing the symptoms for this year, last year, and next year.
 * @param {Number} day number (First day = 0)
 * @param {Number} month number (January = 1)
 * @param {Number} year number
 */
export const getSymptomsFromCalendar = async (calendar, day, month, year) => {
  if (year in calendar && isValidDate(day,month, year)){
    let rawSymptoms = calendar[year][month - 1][day-1];
    return rawSymptoms ? new Symptoms(rawSymptoms.Flow, rawSymptoms.Mood, rawSymptoms.Sleep, rawSymptoms.Cramps, rawSymptoms.Exercise,rawSymptoms.Notes) : new Symptoms();
  }
  else {
    return new Symptoms();
  }
}

/**
 * Computes the number of days between the two dates provided, including the two dates. If earlierDate and laterDate are equal, returns 1.
 * @param {Date} earlierDate
 * @param {Date} laterDate
 * @return {number} number of days between the two dates provided, ignoring their hours, minutes and seconds.
 */
export const getDaysDiffInclusive = (earlierDate, laterDate) => {
  earlierDate.setHours(0,0,0,0)
  laterDate.setHours(0,0,0,0)
  return Math.abs(differenceInCalendarDays(earlierDate, laterDate)) + 1;
}

