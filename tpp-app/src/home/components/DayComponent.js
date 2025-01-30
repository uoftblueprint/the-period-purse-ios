import React, { createElement } from "react";
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  CrampsTerribleIcon,
  CrampsNeutralIcon,
  CrampsBadIcon,
  CrampsGoodIcon,
  CrampsNoneIcon,
} from "../../services/utils/calendaricons";
import {
  FlowHeavyIcon,
  FlowMediumIcon,
  FlowLightIcon,
  FlowNoneIcon,
  FlowSpottingIcon,
} from "../../services/utils/calendaricons";
import {
  MoodHappyIcon,
  MoodSadIcon,
  MoodNeutralIcon,
  MoodSickIcon,
  MoodAngryIcon,
  MoodLolIcon,
  MoodIdkIcon,
  MoodGreatIcon,
  MoodLovedIcon,
} from "../../services/utils/calendaricons";
import {
  ExerciseBallSportIcon,
  ExerciseCardioIcon,
  ExerciseCycleSportIcon,
  ExerciseMartialArtsIcon,
  ExerciseRacketSportsIcon,
  ExerciseStrengthIcon,
  ExerciseWaterSportIcon,
  ExerciseWinterSportIcon,
  ExerciseYogaIcon,
} from "../../services/utils/calendaricons";
import { OvulatingIcon } from "../../services/utils/calendaricons";
import { VIEWS } from "../../services/utils/constants";
import { FILTER_COLOURS, FILTER_TEXT_COLOURS } from "../../services/utils/constants";
import { CALENDAR_STACK_SCREENS } from "../CalendarNavigator";
import { Filter } from "react-native-svg";

// The component that is used by each day in the calendar
export const DayComponent = ({ date, state, marking, selectedView, navigation }) => {
  let bgColor;
  let textColor;
  let iconName = "view";
  let renderedIcon;
  let isDisabled = false;

  // Check if this is an ovulation date
  const isOvulationDate = marking && marking.ovulation;
  
  if (isOvulationDate) {
    // Set ovulation date styling
    bgColor = FILTER_COLOURS.OVULATION.OVULATING; // Teal color
    textColor = 'white';
    isDisabled = true;  // Make it non-interactive
  } else if (marking) {
    // Handle predicted ovulation dates
    if (marking.period) {
      bgColor = FILTER_COLOURS.OVULATION.PREDICTED_OVULATION;
      textColor = FILTER_TEXT_COLOURS.OVULATION.OVULATING;
    } else {
      // View key just tells us what the view is set to
      let viewKey = getKeyByValue(VIEWS, selectedView).toLowerCase();
      // Basically whatever special value that is attached to the specific key in the Symptoms object
      // i.e. for flow it would be HEAVY/MEDIUM/LIGHT
      // for sleep it will be a number etc.
      let symptomAttribute = marking.symptoms ? marking.symptoms[viewKey] : null;
      
      // If disabled
      if (marking.disable) {
        bgColor = FILTER_COLOURS.DISABLED;
        textColor = FILTER_TEXT_COLOURS.DISABLED;
        // If it contains a working attribute
      } else if (symptomAttribute) {
        let attribute = symptomAttribute;

        // Sleep and exercise have special cases to be calculated through
        switch (viewKey) {
          case "sleep":
            attribute = filterSleep(attribute);
            break;
          case "exercise":
            attribute = filterExercise(symptomAttribute.exercise_minutes);
            if (symptomAttribute.exercise) {
              iconName = viewKey + symptomAttribute.exercise.toLowerCase();
              iconName = iconName.replace(/\s+/g, "");
            }
            break;
        }

        // Mood is the only one that does not modify the background colour
        if (viewKey !== "mood") {
          bgColor = FILTER_COLOURS[viewKey.toUpperCase()][attribute.toUpperCase()];
          textColor = FILTER_TEXT_COLOURS[viewKey.toUpperCase()][attribute.toUpperCase()];
        } else {
          bgColor = FILTER_COLOURS.NOFILTER;
          textColor = FILTER_TEXT_COLOURS.NOFILTER;
        }

        // Get Icon
        if (viewKey !== "sleep" && viewKey !== "exercise") {
          iconName = viewKey + symptomAttribute.toLowerCase();
        }

        renderedIcon = createElement(ICON_TYPES[iconName], {
          style: styles.dayIcon,
          width: ICON_SIZE.width,
          height: ICON_SIZE.height,
          fill: textColor,
        });
      } else {
        bgColor = FILTER_COLOURS.NOFILTER;
        textColor = FILTER_TEXT_COLOURS.NOFILTER;
      }
    }
  }

  return (
    <TouchableOpacity
      disabled={isDisabled || marking?.disable}
      onPress={() => {
        if (!isDisabled && !marking?.disable) {
          navigation.navigate(CALENDAR_STACK_SCREENS.LOG_SYMPTOMS, {
            date: date,
          });
        }
      }}
    >
      <View
        style={[
          styles.dayContainer,
          {
            backgroundColor: bgColor || FILTER_COLOURS.NOFILTER,
          },
        ]}
      >
        <Text
          style={[
            styles.dayText,
            {
              color: textColor || FILTER_TEXT_COLOURS.NOFILTER,
            },
          ]}
        >
          {date.day}
        </Text>
        {renderedIcon}
      </View>
    </TouchableOpacity>
  );
};

/**
 *
 * @param {Object} object the desired object to search through
 * @param {Object} value the value that is associated with a key
 * @return {Object} key associated
 */
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

/**
 *
 * @param {number} minutes the amount of total sleep
 * @return {string} returns a key for accessing colour data
 */
function filterSleep(minutes) {
  let sleepScore = minutes / 60;
  let attribute;

  if (sleepScore > 10) {
    attribute = "HEAVY";
  } else if (sleepScore >= 8) {
    attribute = "MEDIUM";
  } else if (sleepScore >= 6) {
    attribute = "LIGHT";
  } else {
    attribute = "LITTLE";
  }

  return attribute;
}

/**
 *
 * @param {number} minutes the amount of total exercise
 * @return {string} returns a key for accessing colour data
 */
function filterExercise(minutes) {
  let attribute;

  if (minutes > 60) {
    attribute = "HEAVY";
  } else if (minutes >= 40) {
    attribute = "MEDIUM";
  } else if (minutes >= 20) {
    attribute = "LIGHT";
  } else {
    attribute = "LITTLE";
  }

  return attribute;
}

const styles = StyleSheet.create({
  dayContainer: {
    borderColor: "#D1D3D4",
    borderWidth: 1,
    borderRadius: 8,
    width: 50,
    height: 50,
    paddingLeft: 5,
    paddingTop: 3,
    margin: 2,
    color: "#FFF",
  },
  dayIcon: {
    position: "relative",
    top: -4,
    height: 20,
    left: -2,
    marginLeft: "auto",
    marginRight: "auto",
  },
  dayText: {
    fontSize: 16,
    fontWeight: '400',
  },
});

const ICON_SIZE = {
  height: 23,
  width: 23,
};

const ICON_TYPES = {
  crampsterrible: CrampsTerribleIcon,
  crampsbad: CrampsBadIcon,
  crampsneutral: CrampsNeutralIcon,
  crampsgood: CrampsGoodIcon,
  crampsnone: CrampsNoneIcon,
  flowheavy: FlowHeavyIcon,
  flowmedium: FlowMediumIcon,
  flowlight: FlowLightIcon,
  flownone: FlowNoneIcon,
  flowspotting: FlowSpottingIcon,
  moodhappy: MoodHappyIcon,
  moodsad: MoodSadIcon,
  moodneutral: MoodNeutralIcon,
  moodsick: MoodSickIcon,
  moodangry: MoodAngryIcon,
  moodlol: MoodLolIcon,
  moodidk: MoodIdkIcon,
  moodgreat: MoodGreatIcon,
  moodloved: MoodLovedIcon,
  exerciseballsports: ExerciseBallSportIcon,
  exercisecardio: ExerciseCardioIcon,
  exercisecyclesports: ExerciseCycleSportIcon,
  exercisemartialarts: ExerciseMartialArtsIcon,
  exerciseracketsports: ExerciseRacketSportsIcon,
  exercisestrength: ExerciseStrengthIcon,
  exercisewatersports: ExerciseWaterSportIcon,
  exercisewintersports: ExerciseWinterSportIcon,
  exerciseyoga: ExerciseYogaIcon,
  ovulationovulating : OvulatingIcon,
  view: SafeAreaView,
};
