import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      height: 124, // initial height of box
    };
  }

  // Update the textbox size as more text is written up to max of 368 units
  updateSize = (newVal) => {
    if (newVal <= 368) this.setState({ height: newVal });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.input, { height: this.state.height }, this.state.isFocused ? styles.focussed : styles.blurred]}
          multiline={true}
          maxLength={500}
          onChangeText={(text) => this.props.onInput(text)}
          onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
          value={this.props.curVal}
          placeholder={"Record a symptom or make a note"}
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => {
            this.setState({ isFocused: false });
            let newText = this.props.curVal ? this.props.curVal.trim() : this.props.curVal; // trims notes on blur
            this.props.onInput(newText);
          }}
        />
        <Text style={styles.charCount}>{`${this.props.curVal ? this.props.curVal.length : 0}/500`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    minHeight: 124,
  },
  input: {
    width: "100%",
    minHeight: 124,
    maxHeight: 368,
    borderRadius: 16,
    paddingTop: 18,
    padding: 18,
    color: "#6D6E71",
    textAlignVertical: "top",
    lineHeight: 22,
  },
  blurred: {
    backgroundColor: "#EFEFF4",
  },
  focussed: {
    backgroundColor: "#E3F4F1",
  },
  charCount: {
    marginTop: 4,
    width: "100%",
    textAlign: "right",
    color: "#000000",
  },
});
