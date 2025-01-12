import React from "react";
import { View, ScrollView, StyleSheet, Text, SafeAreaView, ImageBackground, Linking } from "react-native";
import OnboardingBackground from "../../../assets/SplashScreenBackground/colourwatercolour.png";
import ErrorFallback from "../../error/error-boundary";

const EmailLink = () => {
  const openLink = () => {
    Linking.canOpenURL("mailto:hello@periodpurse.com").then(() => {
      try {
        Linking.openURL("mailto:hello@periodpurse.com");
      } catch (e) {
        console.log("Email link: ", e);
      }
    });
  };

  return (
    <Text onPress={openLink} style={{ ...styles.standardText, color: "blue", textDecorationLine: "underline" }}>
      hello@periodpurse.com
    </Text>
  );
};

export default PrivacyPolicyScreen = ({ navigation }) => {
  const onClose = () => {
    navigation.goBack();
  };

  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.containter}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 60 }}>
          <SafeAreaView>
            <Text style={styles.title}>Privacy Policy</Text>
            <View style={styles.line} />

            <Text style={styles.header}>{`\nPrivacy Statement`}</Text>
            <Text
              style={styles.standardText}
            >{`The Period Purse strives to achieve menstrual equity by providing people who menstruate with access to free menstrual products, and to reduce the stigma surrounding periods through public education and advocacy.

With the help of UofT Blueprint from the University of Toronto, we have developed this app to enable you to keep track of your periods and provide you with useful information. 

We understand that recording intimate information about your body in an app can be scary. Who can access this information? How will it be used? Is it well protected?
`}</Text>
            <Text style={styles.standardText}>
              This is why we build this app with your privacy first in mind. Contrary to other period tracking apps,
              with your Period Purse app, <EmailLink /> if you cannot find what you are looking for.
            </Text>

            <Text style={styles.header}>{`\nWhat do we do with your information?`}</Text>
            <Text
              style={styles.standardText}
            >{`Nothing! Nor the Period Purse, nor any other organization, can access your personal information.`}</Text>

            <Text style={styles.header}>{`\nDid you get my consent?`}</Text>
            <Text
              style={styles.standardText}
            >{`We did not ask for your consent, because we do not want your data. Your data is yours and yours only.`}</Text>

            <Text style={styles.header}>{`\nDo you share my information with anyone?`}</Text>
            <Text
              style={styles.standardText}
            >{`We do not disclose your data to any third party. We could not if we wanted to since we do not have it!

All the data that you add to the app to keep track of your periods and your health is stored locally, on your phone, with one exception. We wanted you to be able to transfer your data from one device to the other in case you change phone, so that you do not lose your history. To make sure this would not jeopardize your privacy, we created an optional feature that enables you to connect your Apple account to your app and download all your data on your iCloud. Upon request, data goes straight from the app to your Apple account. You can then download it from your new phone. 

Once your data is on your iCloud, the iCloud privacy policy applies. We invite you to read it if you have any question on how Apple protects your information.

The app also includes some links to social media pages. If you click those links, these pages’ privacy policy applies. 
`}</Text>
            <Text style={styles.header}>{`Is my information protected?`}</Text>
            <Text
              style={styles.standardText}
            >{`We built this app so that you would feel comfortable tracking your periods on your phone. Not accessing it is the best way for us to protect it.`}</Text>

            <Text style={styles.header}>{`\nI am underage. Can I use this app?`}</Text>
            <Text
              style={styles.standardText}
            >{`From a privacy standpoint, you can use this app whichever your age is, because your data stays with you. `}</Text>

            <Text style={styles.header}>{`\nChanges to this privacy policy`}</Text>
            <Text
              style={styles.standardText}
            >{`If any of the above were to change, we will update this document to inform you.`}</Text>

            <Text style={styles.header}>{`\nQuestions and contact information`}</Text>
            <Text style={{ ...styles.standardText, marginBottom: 50 }}>
              Any question? Just email us: <EmailLink />.
            </Text>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </ErrorFallback>
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontFamily: "avenir",
    fontWeight: "bold",
  },
  line: {
    marginTop: 5,
    height: 3,
    alignSelf: "stretch",
    backgroundColor: "#6D6E71",
  },
  header: {
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "bold",
  },
  standardText: {
    fontFamily: "Avenir",
    fontSize: 14,
  },
});
