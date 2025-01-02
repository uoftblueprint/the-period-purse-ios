import AsyncStorage from "@react-native-async-storage/async-storage";
import { TUTORIAL_KEY } from "./utils/constants";

/**
 * Gets value for whether user needs to see intro tutorial
 * @returns {string} 'true' if show tutorial, else 'false' if user has already seen it
 */
export const GETTutorial = async () =>
  new Promise(async (resolve, reject) => {
    try {
      AsyncStorage.getItem(TUTORIAL_KEY).then((val) => resolve(val));
    } catch (e) {
      console.log("unable to get 'showTutorial' key", JSON.stringify(e));
      reject();
    }
  });

/**
 * Set value for whether user needs to see intro tutorial
 * @param showTutorial boolean for whether to turn on tutorial or not
 */
export const SETTutorial = async (showTutorial) =>
  new Promise(async (resolve, reject) => {
    let val = showTutorial ? "true" : "false";
    try {
      AsyncStorage.setItem(TUTORIAL_KEY, val).then(() => resolve());
    } catch (e) {
      console.log(`unable to set 'showTutorial' key to ${val}`, JSON.stringify(e));
      reject();
    }
  });
