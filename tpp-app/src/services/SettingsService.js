import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRACK_SYMPTOMS, REMINDERS } from "./utils/constants";
import { errorAlertModal } from "../error/errorAlertModal";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { getCorrectDate } from "./utils/helpers";

/**
 * Clears all of the user's account data
 * @returns a promise resolving when the clear operation is complete
 */

export const DELETEAccountData = async () =>
  new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.clear().then(() => {
        console.log("Deleted user account data");
        resolve();
      });
    } catch (e) {
      console.log(`DELETEAccountData error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

/**
 * Returns an array of a boolean representing if a symptom is currently tracked
 * @returns a promise of an array containing booleans representing whether to track each symptom
 */
export const GETAllTrackingPreferences = async () =>
  new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.multiGet([
        TRACK_SYMPTOMS.FLOW,
        TRACK_SYMPTOMS.MOOD,
        TRACK_SYMPTOMS.SLEEP,
        TRACK_SYMPTOMS.CRAMPS,
        TRACK_SYMPTOMS.EXERCISE,
      ]).then((values) => {
        console.log("Got All Tracking Preferences");
        resolve(values);
      });
    } catch (e) {
      console.log(`GETAllTrackingPreferences error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

/**
 * Post a single tracking preference update
 * @param {string} key representing one of the tracking options
 * @param {boolean} value true or false representing if this option is being tracked
 * @returns
 */
export const POSTUpdateOnePreference = async (key, value) =>
  new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.setItem(key, JSON.stringify(value)).then(() => {
        console.log(`Updated symptom: ${JSON.stringify(key)}`);
        resolve();
      });
    } catch (e) {
      console.log(`POSTUpdateOnePreference error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

// /**
//  * Posts whether the user wants a reminder to log period
//  * @param {boolean} enableRemind representing whether the user wants to a reminder to log period
//  * @returns a promise resolving when the post operation is complete
//  */
//
// export const POSTRemindLogPeriod = async (enableRemind) => new Promise(async (resolve, reject) => {
//     try {
//         AsyncStorage.setItem(REMINDERS.REMIND_LOG_PERIOD, JSON.stringify(enableRemind))
//             .then(async () => {
//                 console.log("Posted period logging reminder");
//                 // if (!enableRemind) {
//                 //     PushNotificationIOS.removePendingNotificationRequests(['remindperiod'])
//                 // } else {
//                 //     await CycleService.GETPredictedDaysTillPeriod();
//                 // }
//                 resolve();
//             });
//     } catch (e) {
//         console.log(`POSTRemindLogPeriod error: ${JSON.stringify(e)}`);
//         errorAlertModal();
//         reject();
//     }
// });

// /**
//  * Retrieves whether the user wants a remind to log period
//  * @returns a promise resolving in a boolean when the get operation is complete
//  */
//  export const GETRemindLogPeriod = async () => new Promise(async(resolve, reject) => {
//     try {
//         AsyncStorage.getItem(REMINDERS.REMIND_LOG_PERIOD)
//             .then(async (value) => {
//                 console.log(`Retrieved RemindLogPeriod boolean`);
//                 resolve(JSON.parse(value));
//             });
//     } catch (e) {
//         console.log(`GETRemindLogPeriod error: ${JSON.stringify(e)}`);
//         errorAlertModal();
//         reject();
//     }
// });

/**
 * Posts whether the user wants a reminder to log period symptoms
 * @param {boolean} enableRemind representing whether the user wants to a remind to log period symptoms
 * @returns a promise resolving when the post operation is complete
 */
export const POSTRemindLogSymptoms = async (enableRemind) =>
  new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.setItem(
        REMINDERS.REMIND_LOG_SYMPTOMS,
        JSON.stringify(enableRemind)
      ).then(async () => {
        console.log("Posted period symptom logging reminder", enableRemind);

        // If enabled, re-schedule notifications
        if (enableRemind) {
          const remindLogSymptomsTime = await GETRemindLogSymptomsTime();
          const remindLogSymptomsFreq = await GETRemindLogSymptomsFreq();
          const hour = remindLogSymptomsTime.split(" ")[0].split(":")[0];
          const amOrPm = remindLogSymptomsTime.split(" ")[1];
          let remindTime;
          if (amOrPm === "PM" && hour !== "12") {
            // add 12 hours
            remindTime = JSON.stringify(parseInt(hour) + 12) + ":00";
          } else if (hour === "12") {
            remindTime = "0:00";
          } else {
            remindTime = hour + ":00";
          }

          PushNotificationIOS.removePendingNotificationRequests([
            "remindsymptoms",
          ]);

          switch (remindLogSymptomsFreq) {
            case "Every day":
              PushNotificationIOS.addNotificationRequest({
                id: "remindsymptoms",
                title: "Daily Log Reminder",
                body: "Daily reminder to log your symptoms!",
                badge: 1,
                fireDate: getCorrectDate(1, remindTime),
                repeats: true,
                repeatsComponent: {
                  hour: true,
                  minute: true,
                },
              });
              break;
            case "Every week":
              PushNotificationIOS.addNotificationRequest({
                id: "remindsymptoms",
                title: "Weekly Log Reminder",
                body: "Weekly reminder to log your symptoms!",
                badge: 1,
                fireDate: getCorrectDate(1, remindTime),
                repeats: true,
                repeatsComponent: {
                  dayOfWeek: true,
                  hour: true,
                  minute: true,
                },
              });
              break;
            case "Every month":
              PushNotificationIOS.addNotificationRequest({
                id: "remindsymptoms",
                title: "Monthly Log Reminder",
                body: "Monthly reminder to log your symptoms!",
                badge: 1,
                fireDate: getCorrectDate(1, remindTime),
                repeats: true,
                repeatsComponent: {
                  month: true,
                  hour: true,
                  minute: true,
                },
              });
              break;
            default:
              break;
          }
        } else {
          PushNotificationIOS.removePendingNotificationRequests([
            "remindsymptoms",
          ]);
        }
        resolve();
      });
    } catch (e) {
      console.log(`POSTRemindLogSymptoms error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

/**
 * Retrieves whether the user wants a remind to log symptoms
 * @returns a promise resolving in a boolean when the get operation is complete
 */

export const GETRemindLogSymptoms = async () =>
  new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.getItem(REMINDERS.REMIND_LOG_SYMPTOMS).then(
        async (value) => {
          console.log(`Retrieved RemindLogSymptoms boolean`);
          resolve(JSON.parse(value));
        }
      );
    } catch (e) {
      console.log(`GETRemindLogSymptoms error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

/**
 * Posts the frequency to send log period reminders
 * @param {string} advanceDays how many days in advance of period to send reminder
 * @returns a promise resolving when the post operation is complete
 */
export const POSTRemindLogPeriodFreq = async (advanceDays) =>
  new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.setItem(REMINDERS.LOG_PERIOD_DAYS, advanceDays).then(() => {
        console.log(
          "Posted the number of days in advance to send log period reminder"
        );
        resolve();
      });
    } catch (e) {
      console.log(`POSTRemindLogPeriodFreq error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

/**
 * Retrieves the frequency to send log period reminders
 * @returns a promise resolving in a string representing the number of days
 */
export const GETRemindLogPeriodFreq = async () =>
  new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.getItem(REMINDERS.LOG_PERIOD_DAYS).then((value) => {
        console.log(
          "Retrieved the number of days in advance to send log period reminder"
        );
        resolve(value);
      });
    } catch (e) {
      console.log(`GETRemindLogPeriodFreq error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

/**
 * Posts the time (exp: 1 am, 2 am) to send reminder to log period
 * @param {string} time string representing the time
 * @returns a promise resolving when the post method is complete
 */
export const POSTRemindLogPeriodTime = async (time) =>
  new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.setItem(REMINDERS.LOG_PERIOD_TIME, time).then(() => {
        console.log("Posted time to send log period reminder");
        resolve();
      });
    } catch (e) {
      console.log(`POSTRemindLogPeriodTime error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

/**
 * Retrieves the time (exp: 1 am, 2 am) to send reminder to log period
 * @returns a promise resolving in a string representing the time
 */
export const GETRemindLogPeriodTime = async () =>
  new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.getItem(REMINDERS.LOG_PERIOD_TIME).then((value) => {
        console.log("Retrieved the time to log period reminder");
        resolve(value);
      });
    } catch (e) {
      console.log(`GETRemindLogPeriodTime error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

/**
 * Posts the frequency to send log symptom reminders
 * @param {string} freq string representing the frequency to send reminder
 * @returns a promise resolving when the post operation is complete
 */
export const POSTRemindLogSymptomsFreq = async (freq) =>
  new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.setItem(REMINDERS.LOG_SYMPTOMS_DAYS, freq).then(() => {
        console.log("Posted log symptoms reminder frequency");
        resolve();
      });
    } catch (e) {
      console.log(`POSTRemindLogSymptomsFreq error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

/**
 * Retrieves the frequency to send log symptom reminders
 * @returns a promise resolving in a string that represents the frequency to send reminder
 */
export const GETRemindLogSymptomsFreq = async () =>
  new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.getItem(REMINDERS.LOG_SYMPTOMS_DAYS).then((value) => {
        console.log("Retrieved log symptoms reminder frequency");
        resolve(value);
      });
    } catch (e) {
      console.log(`GETRemindLogSymptomsFreq error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

/**
 * Posts the time (exp: 1:00 am, 2:00 am) to send reminder to log symptoms
 * @param {string} time string representing the time
 * @returns a promise resolving when the post method is complete
 */
export const POSTRemindLogSymptomsTime = async (time) =>
  new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.setItem(REMINDERS.LOG_SYMPTOMS_TIME, time).then(() => {
        console.log("Posted log symptoms reminder time");
        resolve();
      });
    } catch (e) {
      console.log(`POSTRemindLogSymptomsTime error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

/**
 * Retrieves the time (exp: 1 am, 2 am) to send reminder to log symptoms
 * @returns a promise resolving in a string representing the time
 */
export const GETRemindLogSymptomsTime = async () =>
  new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.getItem(REMINDERS.LOG_SYMPTOMS_TIME).then((value) => {
        console.log("Retrieved log symptoms reminder time");
        resolve(value);
      });
    } catch (e) {
      console.log(`GETRemindLogSymptomsTime error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });
