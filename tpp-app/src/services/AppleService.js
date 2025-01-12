import AsyncStorage from "@react-native-async-storage/async-storage";
import { APPLE_CREDENTIALS, ICLOUD } from "./utils/constants";
import iCloudStorage from "react-native-icloudstore";
import { errorAlertModal } from "../error/errorAlertModal";

/**
 * Save the user's token so we can authenticate them
 * @param {string} userId User's Apple user ID
 * @param {string} givenName User's first name
 * @param {string} familyName User's last name
 * @param {string} token Identity token that authenticates the user
 */
export const POSTAppleIdentity = async (userId, givenName, familyName, token) =>
  new Promise(async (resolve, reject) => {
    AsyncStorage.multiSet([
      [APPLE_CREDENTIALS.USER_ID, JSON.stringify(userId)],
      [APPLE_CREDENTIALS.GIVEN_NAME, JSON.stringify(givenName)],
      [APPLE_CREDENTIALS.FAMILY_NAME, JSON.stringify(familyName)],
      [APPLE_CREDENTIALS.IDENTITY_TOKEN, JSON.stringify(token)],
    ])
      .then(() => {
        console.log(`Saved user's Apple identity as: ${userId}, ${givenName}, ${familyName}, ${token}`);
        resolve();
      })
      .catch((e) => {
        console.log(`POSTAppleIdentity error: ${JSON.stringify(e)}`);
        errorAlertModal();
        reject();
      });
  });

/**
 * Retrieve the user's identity token so we can authenticate them
 */
export const GETAppleIdentityToken = async () =>
  new Promise(async (resolve, reject) => {
    AsyncStorage.getItem(APPLE_CREDENTIALS.IDENTITY_TOKEN)
      .then((token) => {
        console.log("Retrieved user's Apple identity token");
        resolve(JSON.parse(token));
      })
      .catch((e) => {
        console.log(`GETAppleIdentityToken error: ${JSON.stringify(e)}`);
        errorAlertModal();
        reject();
      });
  });

/**
 * Retrieve the user's user id so we can authenticate them
 */
export const GETAppleUser = async () =>
  new Promise(async (resolve, reject) => {
    AsyncStorage.getItem(APPLE_CREDENTIALS.USER_ID)
      .then((token) => {
        console.log("Retrieved user's Apple user ID", token);
        resolve(JSON.parse(token));
      })
      .catch((e) => {
        console.log(`GETAppleUser error: ${JSON.stringify(e)}`);
        errorAlertModal();
        reject();
      });
  });

/**
 * Retrieve last saved time
 */
export const GETLastSavedBackupTime = async () =>
  new Promise(async (resolve, reject) => {
    AsyncStorage.getItem(ICLOUD.LAST_SAVED_TIME)
      .then((lastSavedTime) => {
        console.log("Retrieved user's last back up time");
        resolve(JSON.parse(lastSavedTime));
      })
      .catch((e) => {
        console.log(`GETLastSavedBackupTime error: ${JSON.stringify(e)}`);
        errorAlertModal();
        reject();
      });
  });

/**
 * Backup account to iCloud
 */
export const POSTBackupToiCloud = async () =>
  new Promise(async (resolve, reject) => {
    try {
      // Create a json of everything in AsyncStorage
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);

      // Save keys and values to iCloud
      await iCloudStorage.setItem(ICLOUD.BACKUP_KEY, JSON.stringify(values));
      await AsyncStorage.setItem(ICLOUD.LAST_SAVED_TIME, JSON.stringify(new Date()));

      resolve();
    } catch (e) {
      console.log(`POSTBackupToiCloud error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

/**
 * Check if iCloud has backed up data
 * @returns boolean indicating whether the user has a backup of M. Nation data in their iCloud
 */
export const userHasiCloudBackup = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const iCloudKeys = await iCloudStorage.getAllKeys();
      if (iCloudKeys.includes(ICLOUD.BACKUP_KEY)) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      console.log(`userHasiCloudBackup error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });

/**
 * Retrieve Backup from iCloud and enter it into AsyncStorage
 * IMPORTANT: Recommend to call userHasiCloudBackup() to ensure user has backup before this function
 */
export const GETBackupFromiCloud = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const backup = await iCloudStorage.getItem(ICLOUD.BACKUP_KEY);

      // Clear AsyncStorage
      AsyncStorage.clear()
        .then(async () => {
          // Use MultiSet to store backup from iCloud in AsyncStorage
          await AsyncStorage.multiSet(JSON.parse(backup));

          resolve();
        })
        .catch((e) => {
          console.log(`AsyncStorage clear error during GETBackupFromiCloud: ${JSON.stringify(e)}`);
          reject();
        });
    } catch (e) {
      console.log(`GETBackupFromiCloud error: ${JSON.stringify(e)}`);
      errorAlertModal();
      reject();
    }
  });
