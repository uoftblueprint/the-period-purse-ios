import React, { useEffect, useState, createElement } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { GETAllTrackingPreferences } from "../../services/SettingsService";
import { TRACK_SYMPTOMS } from "../../services/utils/constants";
import { VIEWS } from "../../services/utils/constants";
import FlowIcon from "../../../assets/icons/flow.svg";
import MoodIcon from "../../../assets/icons/mood.svg";
import ExerciseIcon from "../../../assets/icons/exercise.svg";
import CrampsIcon from "../../../assets/icons/cramps.svg";
import SleepIcon from "../../../assets/icons/sleep.svg";
import OvulationIcon from "../../../assets/icons/ovulation.svg";
import { useIsFocused } from "@react-navigation/native";

//write function that takes props & renders the corresponding icon
export const SelectedIcon = ({ selectedView, style }) => {
  switch (selectedView) {
    case VIEWS.Cramps:
      return <CrampsIcon style={style} />;
    case VIEWS.Exercise:
      return <ExerciseIcon style={style} />;
    case VIEWS.Flow:
      return <FlowIcon style={style} />;
    case VIEWS.Mood:
      return <MoodIcon style={style} fill="black" />;
    case VIEWS.Sleep:
      return <SleepIcon style={style} />;
    case VIEWS.Ovulation:
      return <OvulationIcon style={style} />;
  }
};

const trackSymptomsToViews = {
  [TRACK_SYMPTOMS.MOOD]: VIEWS.Mood,
  [TRACK_SYMPTOMS.CRAMPS]: VIEWS.Cramps,
  [TRACK_SYMPTOMS.FLOW]: VIEWS.Flow,
  [TRACK_SYMPTOMS.EXERCISE]: VIEWS.Exercise,
  [TRACK_SYMPTOMS.SLEEP]: VIEWS.Sleep,
  [TRACK_SYMPTOMS.OVULATION]: VIEWS.Ovulation,
};

const Selector = (props) => {
  let [trackedViews, setTrackedViews] = useState([]);
  let [numTracked, setNumTracked] = useState(0);
  let flowSelected = props.selectedView === VIEWS.Flow;
  let moodSelected = props.selectedView === VIEWS.Mood;
  let exerciseSelected = props.selectedView === VIEWS.Exercise;
  let crampsSelected = props.selectedView === VIEWS.Cramps;
  let sleepSelected = props.selectedView === VIEWS.Sleep;
  let ovulationSelected = props.selectedView === VIEWS.Ovulation;
  let selectedColor = "#B31F20";
  let unselectedColor = "#6D6E71";
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      GETAllTrackingPreferences().then((allPrefs) => {
        //convert into map so you can directly index in
        let newTrackedViews = Object.assign(
          {},
          ...allPrefs.map((pref) => ({
            [trackSymptomsToViews[pref[0]]]: pref[1] === "true",
          }))
        );

        // find only tracked symptom, if there is only one
        let numTracked = 0;
        for (const prefName in newTrackedViews) {
          if (newTrackedViews[prefName]) {
            numTracked += 1;
            onlyTracked = trackSymptomsToViews[prefName];
          }
        }

        // if the selected view is no longer tracked, default to flow
        if (!newTrackedViews[props.selectedView]) {
          props.setSelectedView(VIEWS.Flow);
        }

        setNumTracked(numTracked);
        setTrackedViews(newTrackedViews);
      });
    }
  }, [isFocused]);

  const iconData = [
    {
      view: VIEWS.Flow,
      selected: flowSelected,
      internalIcon: FlowIcon,
      visible: trackedViews[VIEWS.Flow],
    },
    {
      view: VIEWS.Mood,
      selected: moodSelected,
      internalIcon: MoodIcon,
      visible: trackedViews[VIEWS.Mood],
    },
    {
      view: VIEWS.Exercise,
      selected: exerciseSelected,
      internalIcon: ExerciseIcon,
      visible: trackedViews[VIEWS.Exercise],
    },
    {
      view: VIEWS.Cramps,
      selected: crampsSelected,
      internalIcon: CrampsIcon,
      visible: trackedViews[VIEWS.Cramps],
    },
    {
      view: VIEWS.Sleep,
      selected: sleepSelected,
      internalIcon: SleepIcon,
      visible: trackedViews[VIEWS.Sleep],
    },
    {
      view: VIEWS.Ovulation,
      selected: ovulationSelected,
      internalIcon: OvulationIcon,
      visible: trackedViews[VIEWS.Sleep],
    },
  ];

  return (
    <View style={[{ backgroundColor: "#fff" }, props.expanded && styles.elevatedSelector]}>
      {props.expanded && (
        <View style={[styles.selectorContainer, numTracked === 5 && styles.allSelectedContainer]}>
          {iconData.map((icon, i) => {
            let renderedIcon = createElement(icon.internalIcon, {
              fill: icon.selected ? selectedColor : unselectedColor,
            });
            let activeOpacity = icon.selected ? 1 : 0.2;
            return (
              icon.visible && (
                <TouchableOpacity
                  onPress={() => props.setSelectedView(icon.view)}
                  key={i}
                  style={[icon.selected && styles.selectedIcon, styles.iconContainer]}
                  activeOpacity={activeOpacity}
                >
                  {renderedIcon}
                </TouchableOpacity>
              )
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectorContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginBottom: "14%",
  },
  allSelectedContainer: {
    justifyContent: "space-evenly",
  },
  elevatedSelector: {
    position: "absolute",
    width: "100%",
    zIndex: 3,
    marginTop: 47,
    height: 55,
  },
  selectedIcon: {
    backgroundColor: "#EFEFF4",
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  icon: {
    transform: [{ scale: 1.3 }],
  },
});

export default Selector;
