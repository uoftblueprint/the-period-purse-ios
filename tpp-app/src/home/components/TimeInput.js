import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default class TimeInput extends Component {
  constructor(props) {
    super(props);
  }

  updateMins = (val, isHour) => {
    let totalMins;
    let curr = this.props.currMins ?? 0;

    if (isHour) {
      totalMins = val * 60 + (curr % 60); // calculate NEW hours + keep remaining mins
    } else {
      let keepHr = Math.floor(curr / 60); // calculate kept hours + NEW mins
      totalMins = keepHr * 60 + val;
    }

    this.props.selectMins(totalMins);
  };

  render() {
    let totalMins = this.props.currMins ?? 0;
    let minsStr = (totalMins % 60).toString();
    let hoursStr = Math.floor(totalMins / 60).toString();

    return (
      <View style={styles.container}>
        {/* HOUR INPUT */}
        <Picker
          selectedValue={hoursStr}
          onValueChange={(value) => this.updateMins(parseInt(value), true)} // NOTE: Picker only stores string values
          style={styles.picker}
        >
          {[...Array(24)].map((_, i) => (
            <Picker.Item color={"#5A9F93"} key={i} label={i.toString()} value={i.toString()} />
          ))}
        </Picker>
        <Text style={[styles.text, { marginRight: 12 }]}>hours</Text>

        {/* MINUTE INPUT */}
        <Picker
          selectedValue={minsStr}
          onValueChange={(value) => this.updateMins(parseInt(value), false)}
          style={styles.picker}
        >
          {[...Array(60)].map((_, i) => (
            <Picker.Item color={"#5A9F93"} key={i} label={i.toString()} value={i.toString()} />
          ))}
        </Picker>
        <Text style={styles.text}>mins</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#6D6E71",
    marginLeft: 12,
  },
  input: {
    height: 40,
    width: 68,
    textAlign: "center",
    padding: 10,
    color: "#5A9F93",
    backgroundColor: "#fff",
  },
  inputFocused: {
    color: "#6D6E71",
    backgroundColor: "#E3F4F1",
  },
  picker: {
    width: 100,
  },
});
