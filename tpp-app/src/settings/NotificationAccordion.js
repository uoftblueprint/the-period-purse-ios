import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  POSTRemindLogPeriodFreq,
  POSTRemindLogSymptomsFreq,
  POSTRemindLogPeriodTime,
  POSTRemindLogSymptomsTime,
  POSTRemindOvulationFreq,
  POSTRemindOvulationTime,
} from "../services/SettingsService";

const NotificationAccordion = (props) => {
  const [expanded, setExpanded] = useState(false);

  function toggleExpand() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.dropDownTextBox} onPress={() => toggleExpand()}>
        <Text style={styles.dropDownLeftText}>{props.title}</Text>
        <Text style={styles.dropDownRightText}>{props.selectedText}</Text>
        <Icon name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={30} color={"#5A9F93"} />
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {expanded && (
        <View style={styles.child}>
          <PickerTab
            pickerType={props.type}
            selectedText={props.selectedText}
            setSelectedText={props.setSelectedText}
            time={props.time}
            meridian={props.meridian}
            setTime={props.setTime}
            setTimeMeridian={props.setTimeMeridian}
            pickerDataValues={props.pickerDataValues}
            pickerDataFunctions={props.pickerDataFunctions}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const PickerTab = (props) => {
  let picker;

  switch (props.pickerType) {
    case "periodTime":
      picker = (
        <PeriodTimePicker
          selectedText={props.selectedText}
          time={props.time}
          meridian={props.meridian}
          setTime={props.setTime}
          setTimeMeridian={props.setTimeMeridian}
        />
      );
      break;
    case "symptomTime":
      picker = (
        <SymptomTimePicker
          selectedText={props.selectedText}
          time={props.time}
          meridian={props.meridian}
          setTime={props.setTime}
          setTimeMeridian={props.setTimeMeridian}
        />
      );
      break;
    case "ovulationTime":
      picker = (
        <OvulationTimePicker
          selectedText={props.selectedText}
          time={props.time}
          meridian={props.meridian}
          setTime={props.setTime}
          setTimeMeridian={props.setTimeMeridian}
        />
      );
      break;
    case "days":
      picker = <SchedulingPicker selectedText={props.selectedText} setSelectedText={props.setSelectedText} />;
      break;
    case "howOften":
      picker = <FrequencyPicker selectedText={props.selectedText} setSelectedText={props.setSelectedText} />;
      break;
    default:
      break;
  }

  return picker;
};

const FrequencyPicker = (props) => {
  return (
    <View>
      <Picker
        selectedValue={props.selectedText}
        onValueChange={(itemValue) => {
          props.setSelectedText(itemValue), POSTRemindLogSymptomsFreq(itemValue);
        }}
      >
        <Picker.Item label={"Every day"} value={"Every day"} />
        <Picker.Item label={"Every week"} value={"Every week"} />
        <Picker.Item label={"Every month"} value={"Every month"} />
      </Picker>
    </View>
  );
};

const SymptomTimePicker = (props) => {
  // var storedTime = "10:00"
  // var storedMeridian = "AM"
  // if (typeof props.selectedText == 'string'){
  //     const values = props.selectedText.split("")
  //     storedTime = values[0]
  //     storedMeridian = values[1]
  // }

  return (
    <View style={styles.timePickerContainer}>
      <Picker
        selectedValue={props.time}
        onValueChange={(itemValue) => {
          props.setTime(itemValue), POSTRemindLogSymptomsTime(itemValue + " " + props.meridian);
        }}
        style={styles.timePickerTimeWidth}
      >
        <Picker.Item label={"1:00"} value={"1:00"} />
        <Picker.Item label={"2:00"} value={"2:00"} />
        <Picker.Item label={"3:00"} value={"3:00"} />
        <Picker.Item label={"4:00"} value={"4:00"} />
        <Picker.Item label={"5:00"} value={"5:00"} />
        <Picker.Item label={"6:00"} value={"6:00"} />
        <Picker.Item label={"7:00"} value={"7:00"} />
        <Picker.Item label={"8:00"} value={"8:00"} />
        <Picker.Item label={"9:00"} value={"9:00"} />
        <Picker.Item label={"10:00"} value={"10:00"} />
        <Picker.Item label={"11:00"} value={"11:00"} />
        <Picker.Item label={"12:00"} value={"12:00"} />
      </Picker>
      <Picker
        selectedValue={props.meridian}
        onValueChange={(itemValue) => {
          props.setTimeMeridian(itemValue), POSTRemindLogSymptomsTime(props.time + " " + itemValue);
        }}
        style={styles.timePickerMeridianWidth}
      >
        <Picker.Item label={"AM"} value={"AM"} />
        <Picker.Item label={"PM"} value={"PM"} />
      </Picker>
    </View>
  );
};
const PeriodTimePicker = (props) => {
  // var storedTime = "10:00"
  // var storedMeridian = "AM"
  // if (typeof props.selectedText == 'string'){
  //     const values = props.selectedText.split("")
  //     storedTime = values[0]
  //     storedMeridian = values[1]
  // }

  return (
    <View style={styles.timePickerContainer}>
      <Picker
        selectedValue={props.time}
        onValueChange={(itemValue) => {
          props.setTime(itemValue), POSTRemindLogPeriodTime(itemValue + " " + props.meridian);
        }}
        style={styles.timePickerTimeWidth}
      >
        <Picker.Item label={"1:00"} value={"1:00"} />
        <Picker.Item label={"2:00"} value={"2:00"} />
        <Picker.Item label={"3:00"} value={"3:00"} />
        <Picker.Item label={"4:00"} value={"4:00"} />
        <Picker.Item label={"5:00"} value={"5:00"} />
        <Picker.Item label={"6:00"} value={"6:00"} />
        <Picker.Item label={"7:00"} value={"7:00"} />
        <Picker.Item label={"8:00"} value={"8:00"} />
        <Picker.Item label={"9:00"} value={"9:00"} />
        <Picker.Item label={"10:00"} value={"10:00"} />
        <Picker.Item label={"11:00"} value={"11:00"} />
        <Picker.Item label={"12:00"} value={"12:00"} />
      </Picker>
      <Picker
        selectedValue={props.meridian}
        onValueChange={(itemValue) => {
          props.setTimeMeridian(itemValue), POSTRemindLogPeriodTime(props.time + " " + itemValue);
        }}
        style={styles.timePickerMeridianWidth}
      >
        <Picker.Item label={"AM"} value={"AM"} />
        <Picker.Item label={"PM"} value={"PM"} />
      </Picker>
    </View>
  );
};

const OvulationTimePicker = (props) => {
  // var storedTime = "10:00"
  // var storedMeridian = "AM"
  // if (typeof props.selectedText == 'string'){
  //     const values = props.selectedText.split("")
  //     storedTime = values[0]
  //     storedMeridian = values[1]
  // }

  return (
    <View style={styles.timePickerContainer}>
      <Picker
        selectedValue={props.time}
        onValueChange={(itemValue) => {
          props.setTime(itemValue), POSTRemindOvulationTime(itemValue + " " + props.meridian);
        }}
        style={styles.timePickerTimeWidth}
      >
        <Picker.Item label={"1:00"} value={"1:00"} />
        <Picker.Item label={"2:00"} value={"2:00"} />
        <Picker.Item label={"3:00"} value={"3:00"} />
        <Picker.Item label={"4:00"} value={"4:00"} />
        <Picker.Item label={"5:00"} value={"5:00"} />
        <Picker.Item label={"6:00"} value={"6:00"} />
        <Picker.Item label={"7:00"} value={"7:00"} />
        <Picker.Item label={"8:00"} value={"8:00"} />
        <Picker.Item label={"9:00"} value={"9:00"} />
        <Picker.Item label={"10:00"} value={"10:00"} />
        <Picker.Item label={"11:00"} value={"11:00"} />
        <Picker.Item label={"12:00"} value={"12:00"} />
      </Picker>
      <Picker
        selectedValue={props.meridian}
        onValueChange={(itemValue) => {
          props.setTimeMeridian(itemValue), POSTRemindOvulationTime(props.time + " " + itemValue);
        }}
        style={styles.timePickerMeridianWidth}
      >
        <Picker.Item label={"AM"} value={"AM"} />
        <Picker.Item label={"PM"} value={"PM"} />
      </Picker>
    </View>
  );
};

const SchedulingPicker = (props) => {
  return (
    <View>
      <Picker
        selectedValue={props.selectedText}
        onValueChange={(itemValue) => {
          props.setSelectedText(itemValue);
          POSTRemindOvulationFreq(itemValue);
        }}
      >
        <Picker.Item label={"1 days"} value={"1"} />
        <Picker.Item label={"2 days"} value={"2"} />
        <Picker.Item label={"3 days"} value={"3"} />
        <Picker.Item label={"4 days"} value={"4"} />
        <Picker.Item label={"5 days"} value={"5"} />
        <Picker.Item label={"6 days"} value={"6"} />
        <Picker.Item label={"7 days"} value={"7"} />
        <Picker.Item label={"8 days"} value={"8"} />
        <Picker.Item label={"9 days"} value={"9"} />
        <Picker.Item label={"10 days"} value={"10"} />
        <Picker.Item label={"11 days"} value={"11"} />
        <Picker.Item label={"12 days"} value={"12"} />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: -48,
  },

  dropDownTextBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 16,
    height: 62,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  dropDownLeftText: {
    flex: 1,
    justifyContent: "center",
    fontFamily: "Avenir",
    fontWeight: "400",
    fontSize: 16,
    height: 34,
    lineHeight: 34,
    flexBasis: 100,
    width: "auto",
  },
  dropDownRightText: {
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 34,
    color: "#5A9F93",

    textAlign: "right",
    flex: 1,
    justifyContent: "center",
    width: "auto",
  },

  child: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 16,
  },
  parentHr: {
    height: 1,
    color: "#FFFF",
    width: "100%",
  },
  timePickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  timePickerMeridianWidth: {
    width: 100,
  },
  timePickerTimeWidth: {
    width: 150,
  },
});

export default NotificationAccordion;
