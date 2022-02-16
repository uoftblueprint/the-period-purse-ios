import AsyncStorage from '@react-native-async-storage/async-storage';
import {FLOW_LEVEL} from '../utils/constants';
import {initializeEmptyYear, getDaysDiff}  from '../utils/helpers';
import {Symptoms} from '../utils/models';
import Keys from '../utils/keys';




/**
 * @param {Date} searchFrom Date from which to find the last period start
 */
async function getLastPeriodStart(searchFrom){
  //TODO: how to deal with date? so like it is jan 1st, your period started in december last year. This should carry over
    var current = searchFrom;
    var tomorrow = new Date(current.getTime())
    tomorrow.setDate(current.getDate() + 1)
    var twoDaysLater = new Date(current.getTime());
    twoDaysLater.setDate(current.getDate() + 2);

    console.log("Starting with " + current);
    let dateSymptoms = await CycleService.getSymptomsForDate(current.getDate(), current.getMonth(), current.getFullYear());
    let tomorrowSymptoms = new Symptoms();
    let twoDaysLaterSymptoms = new Symptoms()

    var noFlowToday = (dateSymptoms.flow === FLOW_LEVEL.NONE || dateSymptoms.flow === null) ;
    var noFlowTomorrow = (tomorrowSymptoms.flow === FLOW_LEVEL.NONE || tomorrowSymptoms.flow === null) ;
    var flowTwoDaysLater = (twoDaysLaterSymptoms.flow !== null && twoDaysLaterSymptoms.flow !== FLOW_LEVEL.NONE)


    while(!(noFlowToday && noFlowTomorrow && flowTwoDaysLater)){

      var yesterday = new Date(current.getTime());
      yesterday.setDate(current.getDate()-1);
      twoDaysLater = tomorrow;
      tomorrow = current;
      current = yesterday;

      twoDaysLaterSymptoms = tomorrowSymptoms;
      tomorrowSymptoms = dateSymptoms;
      dateSymptoms = await CycleService.getSymptomsForDate(current.getDate(), current.getMonth(), current.getFullYear());
      noFlowToday = (dateSymptoms.flow === FLOW_LEVEL.NONE || dateSymptoms.flow === null) ;
      noFlowTomorrow = (tomorrowSymptoms.flow === FLOW_LEVEL.NONE || tomorrowSymptoms.flow === null) ;
      flowTwoDaysLater = (twoDaysLaterSymptoms.flow !== null && twoDaysLaterSymptoms.flow !== FLOW_LEVEL.NONE)
    }

    //TODO: test CycleService


    console.log("last period start is at " + current);
    return current;
}

const CycleService = {
  /**
   *  Store how far the user is into their period as a percentage
   *  @param {number} percent Float in range [0,1] of how far along period is
   *  @return {Promise} Resolves when the set operation is completed
   */
  PostCycleDonutPercent: async function(percent){
    try {
      var today = new Date();
      // adding 1 b/c month is zero-indexed
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      let datePercent = {
      }
      datePercent[date] = percent;
      return await AsyncStorage.setItem(Keys.CycleDonutPercent, JSON.stringify(datePercent));
    } catch (e) {
      console.log(e);
    }
  },

  getSymptomsForDate: async function(day, month, year){
    try {
      var calendar = await AsyncStorage.getItem(year.toString());
      calendar = calendar != null ? JSON.parse(calendar) : null;
      if (calendar === null){
        return new Symptoms();
      }
      // day from Date object is 1-31 so we decrease by 1
      let rawSymptoms =  calendar[month][day-1];
      if (rawSymptoms === null){
        return new Symptoms();
      }
      let symptoms = new Symptoms(rawSymptoms.Flow, rawSymptoms.Mood, rawSymptoms.Sleep, rawSymptoms.Cramps, rawSymptoms.Exercise, rawSymptoms.Notes);
      return symptoms;
    }
    catch(e) {
      console.log(e);
    }
  },


  // SIMPLE GETS
  /**
   * Get the user's average period length
   * @return {Promise} Resolves into either an integer for number of days or NULL if info not present
   */
  GetAveragePeriodLength: async function(){
    try {
      const res = await AsyncStorage.getItem(Keys['Average Period Length']);
      console.log(res);
      //already returns null if key is invalid
      return res;
    } catch (e) {
      console.log("unsuccesful promise");
      console.log(e);
      return null;
    }

  },
  /**
   * Get the user's average cycle length
   * @return {Promise} Resolves into either an integer for number of days or NULL if info is not present
   */
  GetAverageCycleLength: async function(){
    try {
      //TODO: what returns when key is invalid
      const res = await AsyncStorage.getItem(Keys['Average Cycle Length']);
      console.log(res);
      return res;
    } catch (e) {
      console.log("unsuccesful promise");
      console.log(e);
      return null;
    }

  },

  //COMPLEX GETS
  /**
   * Get the number of days the user has been on their period
   * @return {Promise} Resolves into 0 if user not on period, and an integer of the days they have been on their period otherwise
   */
  GetPeriodDay: async function (){
    // TODO: how to handle when you go from 2022 -> 2021? Answer: Handled by date package lfg


    // CASES:
    /**
     * 1. _ _ X X _ and today is that last blank.
     * 2. _ _ X _ X _ X and today is last period day
     * 3. _ _ X and today is last period day
     */

    let periodDays = 0;
    var date = new Date()
    let dateSymptoms = await this.getSymptomsForDate(date.getDate(), date.getMonth(), date.getFullYear());
    if (dateSymptoms.flow === null || dateSymptoms.flow === FLOW_LEVEL.NONE){
      console.log("%o", dateSymptoms);
      return 0;
    }
    else {
      let startDate = await this.GetMostRecentPeriodStartDay();
      return getDaysDiff(startDate, date);
    }

    //TODO: test this


    return periodDays;

  },

  /**
   * Get most recent period start date
   * @return {Promise} A promise that resolves into a Date object that is when the most recent period started.
   */
  GetMostRecentPeriodStartDay: async function () {
    //NOTE: we can't actually do this based off getPeriodDay. Basically b/c if today is not a period day, behavior is not identical
    var date = new Date()

    let mostRecentPeriodDay = getLastPeriodStart(date);
    return mostRecentPeriodDay;

  },
  /**
   * Get how far the user is into their period as a percentage
   * @return {Promise}}
   */
  GetCycleDonutPercent: async function() {
    //TODO: Is this the correct definition of
    try{
      let today = new Date();
      let percent = await AsyncStorage.getItem(Keys.CycleDonutPercent)
      console.log(percent.keys());

    } catch(e){

    }
  }
}


export default CycleService

