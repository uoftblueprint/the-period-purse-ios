import AsyncStorage from '@react-native-async-storage/async-storage';

import {FLOW_LEVEL} from './utils/constants'
import { initializeEmptyYear, GETsymptomsForDate, isValidDate } from './utils/helpers'


/**
 * Posts the user's symptom data into the local storage for the given date.
 * @param day number (1st day of month = 1)
 * @param month number (January = 1)
 * @param year number
 * @param symptoms Symptoms object
 */
export const POSTsymptomsForDate = async (day, month, year, symptoms) => new Promise( async (resolve, reject) => {
    // Check that symptoms object is not all null or not empty
    let notEmpty = Object.values(symptoms).some((symptom) => symptom !== null)
    if (!symptoms || notEmpty) {
        reject("No symptoms to record");
    }

    // Check that date, month, year combo is valid
    if (!isValidDate(day, month, year)) {
        reject("Not a valid date");
    }

    // Try to POST new symptoms in async storage
    try {
        // Get the year's data or set to empty year
        const yearData = JSON.parse(await AsyncStorage.getItem(year.toString())) ?? initializeEmptyYear(year);

        yearData[month-1][day-1] = symptoms

        // post symptoms to storage
        await AsyncStorage.setItem(year.toString(), JSON.stringify(yearData))
            .then(() => resolve())
            .catch((e) => {
                console.log(JSON.stringify(e));
                reject(`Unable to mergeItem and post symptoms for this day, month, year: ${day, month, year}`);
            });
    } catch (e) {
        console.log(`POSTsymptomsForDate error: ${JSON.stringify(e)}`);
        reject("Something went wrong");
    }
})


/**
 * Updates user's flow to medium on selected days where the user's flow was originally null or none.
 * @param date 
 * where date.day is a number (1st day of month = 1),
 * date.month is a number (January = 1), 
 * date.year is a number.
 */
export const LogMultipleDayPeriod = async (dates) => {
    // run this code for each value in the dates array
    dates.map(async (date)=>{
        const year = date.year;
        const month = date.month;
        const day = date.day;

        let symptoms = await GETsymptomsForDate(day, month, year)

        if (symptoms.flow == null || symptoms.flow == FLOW_LEVEL.NONE){
            symptoms.flow = FLOW_LEVEL.MEDIUM;
        }

        POSTsymptomsForDate(day, month, year, symptoms);

    })

}
