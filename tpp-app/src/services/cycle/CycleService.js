import AsyncStorage from "@react-native-async-storage/async-storage";
import { FLOW_LEVEL } from "../utils/constants";
import { getCalendarByYear, getSymptomsFromCalendar, getDaysDiffInclusive, getPeriodsInYear } from "../utils/helpers";
import { Symptoms } from "../utils/models";
import differenceInDays from "date-fns/differenceInDays";
import isSameDay from "date-fns/isSameDay";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import Keys from "../utils/keys";
import isAfter from "date-fns/isAfter";
import { errorAlertModal } from "../../error/errorAlertModal";

/**
 * Gets the end date of the final period in the year, which may be in the next year. This is not a prediction
 * @param {Date} finalPeriodStart The start date of the final period of the year. Assumed to be a period day.
 * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
 * @return {Promise} Resolves into Date object that is the closest date after finalPeriodStart that is the end of a period. Date may be in a later year than finalPeriodStart
 */
async function getLastPeriodsEnd(finalPeriodStart, calendar = null) {
  var current = finalPeriodStart;
  var yesterday = subDays(current, 1);
  var twoDaysEarlier = subDays(current, 2);

  if (!calendar) {
    calendar = await getCalendarByYear(current.getFullYear());
  }

  let dateSymptoms = getSymptomsFromCalendar(
    calendar,
    current.getDate(),
    current.getMonth() + 1,
    current.getFullYear()
  );
  let yesterdaySymptoms = new Symptoms();
  let twoDaysEarlierSymptoms = new Symptoms();

  var noFlowToday = dateSymptoms.flow === FLOW_LEVEL.NONE || dateSymptoms.flow === null;
  var noFlowYesterday = yesterdaySymptoms.flow === FLOW_LEVEL.NONE || yesterdaySymptoms.flow === null;
  var flowTwoDaysEarlier = twoDaysEarlierSymptoms.flow !== null && twoDaysEarlierSymptoms.flow !== FLOW_LEVEL.NONE;

  while (!(noFlowToday && noFlowYesterday && flowTwoDaysEarlier)) {
    var tomorrow = addDays(current, 1);
    twoDaysEarlier = yesterday;
    yesterday = current;
    current = tomorrow;

    twoDaysEarlierSymptoms = yesterdaySymptoms;
    yesterdaySymptoms = dateSymptoms;
    dateSymptoms = getSymptomsFromCalendar(calendar, current.getDate(), current.getMonth() + 1, current.getFullYear());
    noFlowToday = dateSymptoms.flow === FLOW_LEVEL.NONE || dateSymptoms.flow === null;
    noFlowYesterday = yesterdaySymptoms.flow === FLOW_LEVEL.NONE || yesterdaySymptoms.flow === null;
    flowTwoDaysEarlier = twoDaysEarlierSymptoms.flow !== null && twoDaysEarlierSymptoms.flow !== FLOW_LEVEL.NONE;
  }

  return twoDaysEarlier;
}
export { getLastPeriodsEnd };

/**
 * Checks to see if the user is currently on their period by checking today and yesterday's flow
 * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
 * @returns {Promise} Resolves into a boolean representing whether the user is current on their period or not
 */

async function isOnPeriod(calendar = null) {
  try {
    let current = await this.GETMostRecentPeriodStartDate(calendar); // most recent period start date

    const yesterday = subDays(current, 1);

    if (!calendar) {
      calendar = await getCalendarByYear(current);
    }
    let dateSymptoms = getSymptomsFromCalendar(
      calendar,
      current.getDate(),
      current.getMonth() + 1,
      current.getFullYear()
    );
    let yesterdaySymptoms = getSymptomsFromCalendar(
      calendar,
      yesterday.getDate(),
      yesterday.getMonth(),
      yesterday.getFullYear()
    );

    const noFlowToday = dateSymptoms.flow === FLOW_LEVEL.NONE || dateSymptoms.flow === null;
    const noFlowYesterday = yesterdaySymptoms.flow === FLOW_LEVEL.NONE || yesterdaySymptoms.flow === null;

    if (noFlowYesterday && noFlowToday) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.log(e);
    errorAlertModal();
  }
}

export { isOnPeriod };
/**
 * Gets the start date of the first period recorded in the year, which may be in the previous year.
 * @param {Date} firstPeriodEnd The first recorded period date in the year.
 * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
 * @return {Promise} Resolves into Date object that is the closest date before firstPeriodEnd that is the beginning of a period. Date may be in an earlier year than firstPeriodEnd.
 */
async function getFirstPeriodStart(firstPeriodEnd, calendar = null) {
  try {
    let current = firstPeriodEnd;
    let tomorrow = addDays(current, 1);
    let twoDaysLater = addDays(current, 2);
    if (!calendar) {
      calendar = await getCalendarByYear(current.getFullYear());
    }

    let dateSymptoms = getSymptomsFromCalendar(
      calendar,
      current.getDate(),
      current.getMonth() + 1,
      current.getFullYear()
    );
    let tomorrowSymptoms = new Symptoms();
    let twoDaysLaterSymptoms = new Symptoms();

    let noFlowToday = dateSymptoms.flow === FLOW_LEVEL.NONE || dateSymptoms.flow === null;
    let noFlowTomorrow = tomorrowSymptoms.flow === FLOW_LEVEL.NONE || tomorrowSymptoms.flow === null;
    let flowTwoDaysLater = twoDaysLaterSymptoms.flow !== null && twoDaysLaterSymptoms.flow !== FLOW_LEVEL.NONE;

    while (!(noFlowToday && noFlowTomorrow && flowTwoDaysLater)) {
      const yesterday = subDays(current, 1);
      twoDaysLater = tomorrow;
      tomorrow = current;
      current = yesterday;

      twoDaysLaterSymptoms = tomorrowSymptoms;
      tomorrowSymptoms = dateSymptoms;
      dateSymptoms = getSymptomsFromCalendar(
        calendar,
        current.getDate(),
        current.getMonth() + 1,
        current.getFullYear()
      );
      noFlowToday = dateSymptoms.flow === FLOW_LEVEL.NONE || dateSymptoms.flow === null;
      noFlowTomorrow = tomorrowSymptoms.flow === FLOW_LEVEL.NONE || tomorrowSymptoms.flow === null;
      flowTwoDaysLater = twoDaysLaterSymptoms.flow !== null && twoDaysLaterSymptoms.flow !== FLOW_LEVEL.NONE;
    }

    //return twoDaysLater since pattern searching for is _ _ X where X is the period
    return twoDaysLater;
  } catch (e) {
    console.log(e);
    errorAlertModal();
  }
}
/**
 * @param {Date} date The date to check if it is a period start, which is _ _ X where X is a period and _ is a non-period.
 * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
 * @return {Promise} resolves into a boolean, true if the date is a period start.
 */
async function isPeriodStart(date, calendar) {
  try {
    const yesterday = subDays(date, 1);
    const twoDaysEarlier = subDays(date, 2);

    let dateSymptoms = getSymptomsFromCalendar(calendar, date.getDate(), date.getMonth() + 1, date.getFullYear());
    let yesterdaySymptoms = getSymptomsFromCalendar(
      calendar,
      yesterday.getDate(),
      yesterday.getMonth() + 1,
      yesterday.getFullYear()
    );
    let twoDaysEarlierSymptoms = getSymptomsFromCalendar(
      calendar,
      twoDaysEarlier.getDate(),
      twoDaysEarlier.getMonth() + 1,
      twoDaysEarlier.getFullYear()
    );

    // search for _ _ X where _ is no period or not logged, and X is period
    const flowToday = dateSymptoms.flow !== null && dateSymptoms.flow !== FLOW_LEVEL.NONE;
    const noFlowYesterday = yesterdaySymptoms.flow === FLOW_LEVEL.NONE || yesterdaySymptoms.flow === null;
    const noFlowTwoDaysEarlier =
      twoDaysEarlierSymptoms.flow === FLOW_LEVEL.NONE || twoDaysEarlierSymptoms.flow === null;

    return flowToday && noFlowYesterday && noFlowTwoDaysEarlier;
  } catch (e) {
    console.log(e);
    errorAlertModal();
  }
}

/**
 * Gets the most recent period start date for a given date (searchFrom)
 * @param {Date} searchFrom Date from which to find the last period start
 * @param {Array} periods List of period Dates in this year, in chronological order
 * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
 * @return {Promise} Resolves into Date that is the most recent day that a period started, relative to searchFrom
 */
async function getLastPeriodStart(searchFrom, periods, calendar = null) {
  if (!calendar) {
    calendar = await getCalendarByYear();
  }

  if (isSameDay(searchFrom, periods[0])) {
    return getFirstPeriodStart(searchFrom, calendar);
  }

  //look at periods in reverse chronological order
  for (let i = periods.length - 1; i >= 0; i--) {
    //checking if searchFrom is after current period
    if (isAfter(searchFrom, periods[i]) && (await isPeriodStart(periods[i], calendar))) {
      return periods[i];
    }
  }

  return null;
}

const CycleService = {
  /**
   * Get the user's average period length
   * @return {Promise} Resolves into either an integer for number of days or NULL if info not present
   */
  GETAveragePeriodLength: async function () {
    try {
      const res = await AsyncStorage.getItem(Keys.AVERAGE_PERIOD_LENGTH);
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  /**
   * Get the user's average cycle length
   * @return {Promise} Resolves into either an integer for number of days or NULL if info is not present
   */
  GETAverageCycleLength: async function () {
    try {
      const res = await AsyncStorage.getItem(Keys.AVERAGE_CYCLE_LENGTH);
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  /**
   * Get the number of days the user has been on their period
   *
   * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
   * @return {Promise} Resolves into 0 if user not on period, and an integer of the days they have been on their period otherwise
   */
  GETPeriodDay: async function (calendar = null) {
    try {
      const date = new Date();
      if (!calendar) {
        calendar = await getCalendarByYear(date.getFullYear());
      }
      let dateSymptoms = getSymptomsFromCalendar(calendar, date.getDate(), date.getMonth() + 1, date.getFullYear());
      if (dateSymptoms.flow === null || dateSymptoms.flow === FLOW_LEVEL.NONE) {
        return 0;
      } else {
        let startDate = await this.GETMostRecentPeriodStartDate(calendar);
        return getDaysDiffInclusive(startDate, date);
      }
    } catch (e) {
      console.log(e);
      errorAlertModal();
    }
  },

  /**
   * Get the days since the last period has ended.
   * @return {Promise} Resolves into 0 if user on their period, and an integer of the days they have been on their period otherwise
   */
  GETDaysSinceLastPeriodEnd: async function () {
    try {
      let curr = new Date();
      let days = 0;

      let calendar = await getCalendarByYear(curr.getFullYear());

      let currSymptoms = getSymptomsFromCalendar(calendar, curr.getDate(), curr.getMonth() + 1, curr.getFullYear());
      let hasFlow = currSymptoms.flow !== null && currSymptoms.flow !== FLOW_LEVEL.NONE;

      // furthest back we will check for a last period
      let furthest_date = new Date(curr.getFullYear() - 1, 10, 30);

      while (!isSameDay(furthest_date, curr) && !hasFlow) {
        curr = subDays(curr, 1);
        currSymptoms = getSymptomsFromCalendar(calendar, curr.getDate(), curr.getMonth() + 1, curr.getFullYear());
        hasFlow = currSymptoms.flow !== null && currSymptoms.flow !== FLOW_LEVEL.NONE;
        days += 1;
      }
      if (isSameDay(furthest_date, curr)) {
        //return 0 in the case we have not found a period within our defined bounds
        return 0;
      }
      return days;
    } catch (e) {
      console.log(e);
      errorAlertModal();
    }
  },

  /**
   * Get most recent period start date
   *
   * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
   * @return {Promise} A promise that resolves into a Date object that is when the most recent period started. Null if there are no periods.
   */
  GETMostRecentPeriodStartDate: async function (calendar = null) {
    try {
      const date = new Date();

      if (!calendar) {
        calendar = await getCalendarByYear(date.getFullYear());
      }

      let periods = await getPeriodsInYear(date.getFullYear());
      let mostRecentPeriodDay = getLastPeriodStart(date, periods, calendar);
      return mostRecentPeriodDay;
    } catch (e) {
      console.log(e);
      errorAlertModal();
    }
  },

  /**
   * Get how far the user is into their period as a percentage
   * @return {Promise} A percentage approximation (meaning in range [0,1]) of how far the user is into their period
   */
  GETCycleDonutPercent: async function () {
    try {
      const averageCycleLength = await this.GETAverageCycleLength();
      const daysSinceLastPeriodEnd = await this.GETDaysSinceLastPeriodEnd();
      const lastPeriod = await this.GETMostRecentPeriodStartDate();

      // period any day now!
      if (daysSinceLastPeriodEnd >= averageCycleLength) {
        return 1;
      } else {
        return averageCycleLength > 0 ? getDaysDiffInclusive(lastPeriod, new Date()) / averageCycleLength : 0;
      }
    } catch (e) {
      console.log(e);
      errorAlertModal();
    }
  },

  /** Get the start and length of each period in the given year
   * @param {number} year The year to retrieve history for
   * @return {Promise} an object that contains intervals of the user's period (start & length) in that year in reverse chronological order
   */
  GETCycleHistoryByYear: async function (year) {
    let periodDays;
    let intervals = [];
    let endOfYear = new Date(year, 11, 31);
    let isYearsLastPeriod = true;

    let calendar = await getCalendarByYear(year);
    let periods = await getPeriodsInYear(year, calendar);

    if (periods.length === 0) {
      return intervals;
    }

    try {
      // Search backwards until date switches to the previous year
      let periodEnd = null;
      let periodStart = null;

      let isPeriodEnd = false;
      let isLastPeriodStart = true;

      for (let i = periods.length - 1; i >= 0; i--) {
        let current = periods[i];
        if (await isPeriodStart(current, calendar)) {
          if (isPeriodEnd) {
            //handle the case where a period is a single day long
            periodEnd = current;
          }
          periodStart = current;
          isPeriodEnd = true;

          if (isLastPeriodStart) {
            //handle special case for the last period, since it could possibly span multiple years
            periodStart = periods[i];
            periodEnd = await getLastPeriodsEnd(periodStart);
            periodDays = getDaysDiffInclusive(periodEnd, periodStart);
            intervals.push({ start: periodStart, periodDays: periodDays });
          } else if (periodEnd && periodStart) {
            //general case for any period besides first or last in the year
            periodDays = getDaysDiffInclusive(periodEnd, periodStart);
            intervals.push({ start: periodStart, periodDays: periodDays });
          }
          isLastPeriodStart = false;
        } else {
          if (isPeriodEnd) {
            periodEnd = current;
            isPeriodEnd = false;
          }
        }
      }

      periodStart = await getFirstPeriodStart(periodEnd);

      //check if the first period is not already in intervals, in which case we know it's the case where the first period spans 2 different years
      if (!intervals.some((interval) => isSameDay(interval.start, periodStart))) {
        periodDays = getDaysDiffInclusive(periodEnd, periodStart);
        intervals.push({ start: periodStart, periodDays: periodDays });
      }
    } catch (e) {
      console.log(e);
      errorAlertModal();
    }
    return intervals;
  },

  /**
   *
   * @returns {Promise} resolves to the expected number of days till the next period. In case of error, returns -1
   */
  GETPredictedDaysTillPeriod: async function () {
    //formula is last period start + cycle length is predicted next period day
    let today = new Date();
    let calendar = await getCalendarByYear(today.getFullYear());
    let periods = await getPeriodsInYear(today.getFullYear(), calendar);
    let prevPeriodStart;
    if (await isPeriodStart(today, calendar)) {
      prevPeriodStart = today;
    } else {
      prevPeriodStart = await getLastPeriodStart(today, periods, calendar);
    }

    let avgCycleLength = await this.GETAverageCycleLength(calendar);

    let nextPeriodStart = addDays(prevPeriodStart, avgCycleLength);
    if (avgCycleLength && prevPeriodStart) {
      let predictedDaysTillPeriod = differenceInDays(nextPeriodStart, today);

      // Set notification if enabled
      // if (await GETRemindLogPeriod()) {
      //   const freq = await GETRemindLogPeriodFreq();
      //   const time = await GETRemindLogPeriodTime();
      //
      //   // Parsing
      //   const daysAhead = parseInt(freq);
      //   const hour = time.split(" ")[0].split(":")[0];
      //   const amOrPm = time.split(" ")[1];
      //   let remindPeriodTime;
      //   if (amOrPm === "PM" && hour !== "12") {
      //     // add 12 hours
      //     remindPeriodTime = JSON.stringify(parseInt(hour) + 12) + ":00";
      //   } else if (hour === "12") {
      //     remindPeriodTime = "0:00";
      //   } else {
      //     remindPeriodTime = hour + ":00";
      //   }
      //
      //   // "0:00 - 24:00"
      //
      //   // notification scheduling
      //   PushNotificationIOS.removePendingNotificationRequests(['remindperiod'])
      //   PushNotificationIOS.addNotificationRequest({
      //     id: 'remindperiod',
      //     title: 'Period Reminder!',
      //     body: `Your period is predicted to come in ${daysAhead} days.`,
      //     badge: 1,
      //     fireDate: getCorrectDate((predictedDaysTillPeriod - daysAhead), remindPeriodTime),
      //     repeats: true
      //   });
      //
      // }
      return predictedDaysTillPeriod;
    } else {
      return -1;
    }
  },
};

export default CycleService;
