import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEYS } from "./utils/constants";
import { getDaysDiffInclusive } from "./utils/helpers";
import CycleService from "./cycle/CycleService";
import { GETStoredYears } from "./utils/helpers";
import { errorAlertModal } from "../error/errorAlertModal";

/**
 * Calculates the average ovulation length given a completeHistory of their period intervals
 * @return {number} representing average ovulation length, 0 if not enough entries
 */
export const calculateAverageOvulationLength = () => {
  // Ensure there are enough entries to calculate ovulation length
  if (completeHistory.length < 2) return 0;
  // Estimate ovulation as the midpoint of each cycle
  const ovulationLengths = completeHistory
    .map((interval, index) => {
      if (index === 0) return 0; // Skip the first interval as we need a reference cycle
      const previousCycleStart = completeHistory[index - 1].start;
      const currentCycleStart = interval.start;
      const cycleLength = getDaysDiffInclusive(previousCycleStart, currentCycleStart);
      // Ovulation is assumed to occur roughly 14 days before the next cycle starts
      return cycleLength - 14 > 0 ? cycleLength - 14 : 0;
    })
    .filter((length) => length > 0); // Filter out invalid lengths
  // Calculate average ovulation length
  return ovulationLengths.length > 0
    ? ovulationLengths.reduce((sum, length) => sum + length, 0) / ovulationLengths.length
    : 0;
};

/**
 * Calculates the average period length given a completeHistory of their period intervals
 * @param completeHistory list of period intervals in the form returned by GETCycleHistoryByYear
 * @return {number} representing average period length, 0 if not enough entries to calculate average
 */
export const calculateAveragePeriodLength = (completeHistory) => {
  return completeHistory.length > 0
    ? completeHistory.reduce(function (sum, interval) {
        return sum + interval.periodDays;
      }, 0) / completeHistory.length
    : 0;
};

/**
 * Calculates the average cycle length given a completeHistory of their period intervals
 * @param completeHistory list of period intervals in the form returned by GETCycleHistoryByYear
 * @return {number} representing average cycle length, 0 if not enough entries
 */
export const calculateAverageCycleLength = (completeHistory) => {
  return completeHistory.length - 1 > 0
    ? completeHistory
        // Map to difference of days
        .map((interval, index) => {
          return index === 0 ? 0 : getDaysDiffInclusive(completeHistory[index - 1].start, interval.start) - 1;
        })
        // Remove 0th index
        .slice(1)
        // Find average
        .reduce((sum, cycleDays) => {
          return sum + cycleDays;
        }, 0) /
        (completeHistory.length - 1)
    : 0;
};

/**
 * Calculates and saves to AsyncStorage the average period length, average cycle length, and average ovulation length of the user.
 */
export const calculateAverages = async () =>
  new Promise(async (resolve, reject) => {
    // Get all Years
    GETStoredYears()
      .then((years) => {
        let promises = [];
        years.forEach((year) => {
          promises.push(CycleService.GETCycleHistoryByYear(year));
        });

        Promise.all(promises)
          .then((history) => {
            const completeHistory = [].concat.apply([], history);

            const averagePeriodLength = calculateAveragePeriodLength(completeHistory);

            // Use map and reduce to find average
            const averageCycleLength = calculateAverageCycleLength(completeHistory);

            const averageOvulationPhaseLength = calculateAverageOvulationLength(completeHistory);

            AsyncStorage.multiSet([
              [KEYS.AVERAGE_CYCLE_LENGTH, JSON.stringify(averageCycleLength)],
              [KEYS.AVERAGE_PERIOD_LENGTH, JSON.stringify(averagePeriodLength)],
              [KEYS.AVERAGE_OVULATION_PHASE_LENGTH, JSON.stringify(averageOvulationPhaseLength)],
            ])
              .then(() => {
                console.log(`Recalculated ${KEYS.AVERAGE_PERIOD_LENGTH} as ${averagePeriodLength}`);
                console.log(`Recalculated ${KEYS.AVERAGE_CYCLE_LENGTH} as ${averageCycleLength}`);
                console.log(`Recalculated ${KEYS.AVERAGE_OVULATION_PHASE_LENGTH} as ${averageOvulationPhaseLength}`);
                resolve();
              })
              .catch((error) => {
                console.log(`calculateAverageCycleLength error: ${JSON.stringify(error)}`);
                reject();
              });
          })
          .catch((error) => {
            console.log(`GETCycleHistoryByYear promises error: ${JSON.stringify(error)}`);
            reject();
          });
      })
      .catch((e) => {
        console.log(`GETStoredYears error: ${JSON.stringify(error)}`);
        errorAlertModal();
        reject();
      });
  });
