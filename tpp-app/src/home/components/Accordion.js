import React, { Component, createElement } from "react";
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation } from "react-native";
import ExpandArrow from "../../../assets/icons/arrow_accordion.svg";
import OptionPicker from "./OptionPicker";
import TimeInput from "./TimeInput";
import TextArea from "./TextArea";
import { FLOW_LEVEL, CRAMP_LEVEL, MOOD_LEVEL, EXERCISE_TYPE, OVULATION } from "../../services/utils/constants";
import { ExerciseActivity } from "../../services/utils/models";

// ALL ICON IMPORTS
import SleepIcon from "../../../assets/icons/symptoms/sleep-moon.svg";
import ExerciseIcon from "../../../assets/icons/symptoms/exercise/exercise-icon.svg";
import NotesIcon from "../../../assets/icons/symptoms/notes-lines.svg";

// FLOW ICONS
import FlowHeavy from "../../../assets/icons/symptoms/flow/flow-heavy.svg";
import FlowMedium from "../../../assets/icons/symptoms/flow/flow-medium.svg";
import FlowLight from "../../../assets/icons/symptoms/flow/flow-light.svg";
import FlowNone from "../../../assets/icons/symptoms/flow/flow-none.svg";
import FlowSpotting from "../../../assets/icons/symptoms/flow/flow-spotting.svg";

// CRAMPS ICONS
import CrampsNeutral from "../../../assets/icons/symptoms/cramps/cramps-neutral.svg";
import CrampsBad from "../../../assets/icons/symptoms/cramps/cramps-bad.svg";
import CrampsTerrible from "../../../assets/icons/symptoms/cramps/cramps-terrible.svg";
import CrampsGood from "../../../assets/icons/symptoms/cramps/cramps-good.svg";
import CrampsNone from "../../../assets/icons/symptoms/cramps/cramps-nocramps.svg";

// MOOD ICONS
import MoodHappy from "../../../assets/icons/symptoms/mood/mood-happy.svg";
import MoodNeutral from "../../../assets/icons/symptoms/mood/mood-neutral.svg";
import MoodSad from "../../../assets/icons/symptoms/mood/mood-sad.svg";
import MoodLol from "../../../assets/icons/symptoms/mood/mood-lol.svg";
import MoodIdk from "../../../assets/icons/symptoms/mood/mood-idk.svg";
import MoodGreat from "../../../assets/icons/symptoms/mood/mood-great.svg";
import MoodSick from "../../../assets/icons/symptoms/mood/mood-sick.svg";
import MoodAngry from "../../../assets/icons/symptoms/mood/mood-angry.svg";
import MoodLoved from "../../../assets/icons/symptoms/mood/mood-loved.svg";

// EXERCISE ICONS
import Cardio from "../../../assets/icons/symptoms/exercise/exercise-cardio.svg";
import Yoga from "../../../assets/icons/symptoms/exercise/exercise-yoga.svg";
import Strength from "../../../assets/icons/symptoms/exercise/exercise-strength.svg";
import BallSports from "../../../assets/icons/symptoms/exercise/exercise-ball-sports.svg";
import MartialArts from "../../../assets/icons/symptoms/exercise/exercise-martial-arts.svg";
import WaterSports from "../../../assets/icons/symptoms/exercise/exercise-water-sports.svg";
import CycleSports from "../../../assets/icons/symptoms/exercise/exercise-cycle-sports.svg";
import RacketSports from "../../../assets/icons/symptoms/exercise/exercise-racket-sports.svg";
import WinterSports from "../../../assets/icons/symptoms/exercise/exercise-winter-sports.svg";


//OVULATION ICONS
import OvulatingIcon from "../../../assets/icons/ovulation.svg";

const accordionData = {
  flow: {
    title: "Flow",
    icon: FlowMedium,
    options: [
      <FlowLight fill={"#000"} value={FLOW_LEVEL.LIGHT} />,
      <FlowMedium fill={"#000"} value={FLOW_LEVEL.MEDIUM} />,
      <FlowHeavy fill={"#000"} value={FLOW_LEVEL.HEAVY} />,
      <FlowSpotting fill={"#000"} value={FLOW_LEVEL.SPOTTING} />,
      <FlowNone fill={"#000"} value={FLOW_LEVEL.NONE} />,
    ],
  },
  mood: {
    title: "Mood",
    icon: CrampsNeutral,
    options: [
      <MoodHappy value={MOOD_LEVEL.HAPPY} />,
      <MoodNeutral value={MOOD_LEVEL.NEUTRAL} />,
      <MoodSad value={MOOD_LEVEL.SAD} />,
      <MoodLol value={MOOD_LEVEL.LOL} />,
      <MoodIdk value={MOOD_LEVEL.IDK} />,
      <MoodGreat value={MOOD_LEVEL.GREAT} />,
      <MoodSick value={MOOD_LEVEL.SICK} />,
      <MoodAngry value={MOOD_LEVEL.ANGRY} />,
      <MoodLoved value={MOOD_LEVEL.LOVED} />,
    ],
  },
  sleep: {
    title: "Sleep",
    icon: SleepIcon,
  },
  cramps: {
    title: "Cramps",
    icon: CrampsTerrible,
    options: [
      <CrampsNeutral fill={"#000"} value={CRAMP_LEVEL.NEUTRAL} />,
      <CrampsBad fill={"#000"} value={CRAMP_LEVEL.BAD} />,
      <CrampsTerrible fill={"#000"} value={CRAMP_LEVEL.TERRIBLE} />,
      <CrampsGood fill={"#000"} value={CRAMP_LEVEL.GOOD} />,
      <CrampsNone fill={"#000"} value={CRAMP_LEVEL.NONE} />,
    ],
  },
  exercise: {
    title: "Exercise",
    icon: ExerciseIcon,
    options: [
      <Cardio value={EXERCISE_TYPE.CARDIO} />,
      <Yoga value={EXERCISE_TYPE.YOGA} />,
      <Strength value={EXERCISE_TYPE.STRENGTH} />,
      <BallSports value={EXERCISE_TYPE.BALL_SPORT} />,
      <MartialArts value={EXERCISE_TYPE.MARTIAL_ARTS} />,
      <WaterSports value={EXERCISE_TYPE.WATER_SPORT} />,
      <CycleSports value={EXERCISE_TYPE.CYCLE_SPORT} />,
      <RacketSports value={EXERCISE_TYPE.RACKET_SPORT} />,
      <WinterSports value={EXERCISE_TYPE.WINTER_SPORT} />,
    ],
  },
  ovulation:{
    title: "Ovulation",
    icon: OvulatingIcon,
    options: [
      <OvulatingIcon fill={"#000"} value={OVULATION.OVULATING} />,
    ]
  }, 
  notes: {
    title: "Notes",
    icon: NotesIcon,
    content: "blahblah",
  },
};

export default class Accordion extends Component {
  constructor(props) {
    super(props);

    // set accordion data based on symptom type
    this.accordionType = accordionData[props.type];
    this.title = this.accordionType.title;
    this.icon = this.accordionType.icon;

    this.state = {
      expanded: false,
    };
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  // Helper function to properly update ExerciseActivity state
  updateExercise = (updatedVal) => {
    let activity;
    if (this.props.value) {
      // existing exercise obj
      activity =
        typeof updatedVal === "number"
          ? new ExerciseActivity(this.props.value.exercise, updatedVal)
          : new ExerciseActivity(updatedVal, this.props.value.exercise_minutes);
    } else {
      // exercise symptom null
      activity =
        typeof updatedVal === "number" ? new ExerciseActivity(null, updatedVal) : new ExerciseActivity(updatedVal, 0);
    }
    this.props.setState(activity);
  };

  render() {
    // if symptom is exercise, check that either mins or exercise type is non-null
    const isNonEmpty =
      this.props.type === "exercise" && this.props.value
        ? this.props.value.exercise_minutes || this.props.value.exercise
        : this.props.value;

    // Change icon color depending on if there's a selected value
    const iconFill = isNonEmpty ? "#72C6B7" : "#6D6E71";
    let renderedIcon = createElement(this.icon, {
      fill: iconFill,
    });

    if (this.props.type === "sleep") {
      renderedIcon = createElement(this.icon, {
        fill: iconFill,
        marginLeft: 4,
      });
    } else if (this.props.type === "exercise") {
      renderedIcon = createElement(this.icon, {
        fill: iconFill,
        marginLeft: 3,
      });
    } else if (this.props.type === "notes") {
      renderedIcon = createElement(this.icon, {
        fill: iconFill,
        marginLeft: 3,
      });
    }

    // set accordion content based on symptom type
    let accContent;
    switch (this.props.type) {
      case "flow":
      case "mood":
      case "cramps":
        accContent = (
          <OptionPicker
            optionIcons={this.accordionType.options}
            selectThis={this.props.setState}
            curVal={this.props.value}
          />
        );
        break;
      case "sleep":
        accContent = <TimeInput selectMins={this.props.setState} currMins={this.props.value} />;
        break;
      case "exercise":
        let exercise = this.props.value;
        accContent = (
          <View>
            <TimeInput selectMins={this.updateExercise} currMins={exercise ? exercise.exercise_minutes : 0} />
            <OptionPicker
              style={{ marginTop: -25 }}
              optionIcons={this.accordionType.options}
              selectThis={this.updateExercise}
              curVal={exercise ? exercise.exercise : null}
            />
          </View>
        );
        break;
      case "notes":
        accContent = <TextArea onInput={this.props.setState} curVal={this.props.value} />;
        break;
      case "ovulation":
        accContent = (
          <OptionPicker
            optionIcons={this.accordionType.options}
            selectThis={this.props.setState}
            curVal={this.props.value}
          />
        );
      default: // render empty accordion
        break;
    }

    return (
      <View>
        {/* ACCORDION HEADER */}
        <TouchableOpacity ref={this.accordian} style={styles.row} onPress={() => this.toggleExpand()}>
          <View style={styles.heading}>
            {renderedIcon}
            <Text
              style={[
                styles.title,
                this.icon && { position: "absolute", marginLeft: 45 }, // if there's an icon, shift title left
                isNonEmpty && styles.selected, // if there's a selected value, title is teal
              ]}
            >
              {this.title}
            </Text>
          </View>
          <ExpandArrow style={this.state.expanded && { transform: [{ rotate: "180deg" }] }} />
        </TouchableOpacity>

        {/* ACCORDION HR */}
        {!this.props.isLastChild && <View style={styles.parentHr} />}

        {/* ACCORDION CONTENT */}
        {this.state.expanded && <View style={styles.content}>{accContent}</View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6D6E71",
  },
  selected: {
    color: "#72C6B7",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
    paddingLeft: 28,
    paddingRight: 28,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  parentHr: {
    height: 2,
    backgroundColor: "#EFEFF4",
    width: "100%",
  },
  content: {
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
  },
});
