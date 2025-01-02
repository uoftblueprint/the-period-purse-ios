import AsyncStorage from "@react-native-async-storage/async-storage";
import { FACT_NUM } from "../services/utils/constants.js";
import { getFullCurrentDateString } from "../services/utils/helpers.js";

/**
 * Retrieves an array containing the last date the user accessed the info screen and the fact number they saw
 * @returns returns a promise resolving in an array with format ["2022-1-1", "1"]
 */
export const GETFactCycle = async () =>
  new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.getItem(FACT_NUM.FACT_CYCLE_NUM).then((array) => {
        console.log(`Retrieved Fact Cycle Date and Number: ${array}`);
        console.log(`GETFactCycle got this array: ${array}`);
        resolve(array != null ? JSON.parse(array) : null);
      });
    } catch (e) {
      console.log(`GETFactCycle error: ${JSON.stringify(e)}`);
      reject();
    }
  });

/**
 * Updates FACT_CYCLE_NUM with the currentDate and updated fact number if the current date and the stored date differ
 * If GETFactCycle is null, instantiates FACT_CYCLE_NUM with the current date and 1 as the first fact number
 * @returns a Promise resolving when the setItem or mergeItem operation is complete
 */

export const POSTFactCycle = async () =>
  new Promise(async (resolve, reject) => {
    try {
      if ((await GETFactCycle()) === null) {
        // if there is currently no fact/date array stored
        const value = [getFullCurrentDateString(), "1"];
        await AsyncStorage.setItem(FACT_NUM.FACT_CYCLE_NUM, JSON.stringify(value))
          .catch(() => {
            console.log("GETFactCycle error: failed to instantiate FACT_CYCLE_NUM");
            reject();
          })
          .then(() => {
            console.log("Instantiated Fact Cycle Number");
            resolve();
          });
      } else {
        // get the current date
        newDate = getFullCurrentDateString();
        let storedFactArray = await GETFactCycle();
        if (newDate != storedFactArray[0]) {
          // update dateand fact only if the current date does not match the stored date
          console.log(`This is the date that POSTFactCylce got: ${storedFactArray[0]}`);
          let previousFactNum = storedFactArray[1];
          console.log(`This is previous fact number: ${previousFactNum}`);
          var newFactNum;

          if (!previousFactNum) {
            // if for some reason, the previous fact number is null, randomly generate a number
            newFactNum = (Math.floor(Math.random() * (28 - 1 + 1)) + 1).toString();
            console.log(`This is a randomly generated newFactNumber fact number: ${newFactNum}`);
          } else if (parseInt(previousFactNum, 10) == 28) {
            newFactNum = "1";
            console.log(`Returned to the first fact in fact cycle`);
          } else {
            newFactNum = (parseInt(previousFactNum, 10) + 1).toString();
            console.log(`This is a calculated newFactNumber fact number: ${newFactNum}`);
          }

          console.log(`This is newFactNumber fact number: ${newFactNum}`);
          const value = [newDate, newFactNum];

          await AsyncStorage.setItem(FACT_NUM.FACT_CYCLE_NUM, JSON.stringify(value))
            .then(() => {
              console.log("Updated Fact Cycle Number");
              resolve();
            })
            .catch(() => {
              console.log("GETFactCycle error: failed to mergeItem FACT_CYCLE_NUM");
              reject();
            });
        }
      }
    } catch (e) {
      console.log(`POSTFactCycle error: ${JSON.stringify(e)}`);
      reject();
    }
  });
