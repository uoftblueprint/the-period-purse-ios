import * as React from "react";
import { View, StyleSheet, TouchableHighlight, Text, SafeAreaView, ImageBackground } from "react-native";
import Warning from "../../assets/icons/warning.svg";
import OnboardingBackground from "../../assets/SplashScreenBackground/colourwatercolour.png";

export default class ErrorFallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    console.log("ErrorFallback occurred with error: ", error, errorInfo);
    this.setState({ hasError: true });
  }

  resetErrorBoundary() {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      // Error path
      return (
        <ImageBackground source={OnboardingBackground} style={styles.container}>
          <SafeAreaView role="alert" style={styles.errorContainer}>
            <View style={styles.errorIcon}>
              <Warning />
            </View>
            <Text style={styles.errorTitle}>Whoops</Text>
            <Text style={styles.errorText}>
              Something went wrong. {"\n\n"} Please try again, or close the app and reopen it.
            </Text>
            {/*If the issue persists, please contact .... TODO Is there a support email they can contact? Ask Jana */}
            <TouchableHighlight
              underlayColor={"#EEEEEE"}
              style={styles.tryAgainButton}
              onPress={() => {
                this.resetErrorBoundary();
              }}
            >
              <Text>Try Again</Text>
            </TouchableHighlight>
          </SafeAreaView>
        </ImageBackground>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  errorContainer: {
    alignItems: "center",
  },
  errorIcon: {
    position: "absolute",
    top: 300,
  },
  errorTitle: {
    position: "absolute",
    height: 27,
    top: 371,
    fontFamily: "Avenir",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 20,
    lineHeight: 27,
    textAlign: "center",
    letterSpacing: -0.02,
    color: "#6D6E71",
  },
  errorText: {
    position: "absolute",
    width: 342,
    height: 59,
    top: 404,

    fontFamily: "Avenir",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
    letterSpacing: -0.3,
    color: "#000000",
  },
  tryAgainButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,

    position: "absolute",
    width: 129,
    height: 45,
    top: 495,
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 30,
  },
  tryAgainButtonText: {
    backgroundColor: "#FFFFFF",
    /* black */

    borderColor: "#000000",
  },
});
