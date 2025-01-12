import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default class OptionPicker extends Component {
  constructor(props) {
    super(props);
  }

  // Child component representing each option
  Option = (value, icon, key) => {
    return (
      <View style={styles.option} key={key}>
        <TouchableOpacity
          onPress={() => {
            let newVal = this.props.curVal === value ? null : value;
            this.props.selectThis(newVal);
          }}
          style={[styles.iconButton, this.props.curVal === value ? styles.selected : styles.unselected]}
        >
          {icon}
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.label}>
          {value}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.optionIcons.map((icon, i) => {
          return this.Option(icon.props.value, icon, i);
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 327,
    paddingBottom: 10,
  },
  option: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 17,
    marginTop: 25,
    marginBottom: 30,
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 75,
    height: 75,
    borderRadius: 16,
  },
  label: {
    flex: 1,
    marginTop: 75,
    paddingTop: 10,
    position: "absolute",
    width: 105,
    textAlign: "center",
  },
  selected: {
    backgroundColor: "#72C6B7",
  },
  unselected: {
    backgroundColor: "#EFEFF4",
  },
});
