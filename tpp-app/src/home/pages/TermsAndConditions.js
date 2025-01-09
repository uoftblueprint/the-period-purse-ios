import React from "react";
import { View, ScrollView, StyleSheet, Text, useWindowDimensions, ImageBackground, SafeAreaView } from "react-native";
import RenderHtml from "react-native-render-html";
import OnboardingBackground from "../../../assets/SplashScreenBackground/colourwatercolour.png";
import ErrorFallback from "../../error/error-boundary";

const source = {
  html: `<ol style="font-family: Avenir;font-Size: 14px;">
<li>
You are solely responsible for your account and the security and privacy of your account, including passwords or sensitive information attached to that account; and</li>
<li>All personal information you provide to us through your account is up to date, accurate, and truthful and that you will update your personal information if it changes.</li>
</ol>`,
};

export default TermsAndConditionsScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();

  return (
    <ErrorFallback>
      <ImageBackground source={OnboardingBackground} style={styles.containter}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 60 }}>
          <SafeAreaView>
            <Text style={styles.title}>Terms and Conditions</Text>
            <View style={styles.line} />

            <Text style={styles.standardText}>
              {`\nThese terms and conditions (the "Terms and Conditions") govern the use of`}
              <Text style={{ ...styles.standardText, fontWeight: "bold" }}> www.theperiodpurse.com </Text>
              {`(the "Site"). This Site is owned and operated by The Period Purse. This Site is a news or media website.`}
            </Text>
            <Text
              style={styles.standardText}
            >{`\nBy using this Site, you indicate that you have read and understand these Terms and Conditions and agree to abide by them at all times.`}</Text>

            <Text style={styles.header}>{`\nIntellectual Property`}</Text>
            <Text
              style={styles.standardText}
            >{`All content published and made available on our Site is the property of The Period Purse and the Site's creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our Site.`}</Text>
            <Text style={styles.header}>{`\nAccounts`}</Text>
            <Text
              style={styles.standardText}
            >{`When you create an account on our Site, you agree to the following:`}</Text>

            <RenderHtml source={source} contentWidth={width} style={styles.standardText} />

            <Text
              style={styles.standardText}
            >{`We reserve the right to suspend or terminate your account if you are using our Site illegally or if you violate these Terms and Conditions.`}</Text>

            <Text style={styles.header}>{`\nLimitation of Liability`}</Text>
            <Text
              style={styles.standardText}
            >{`The Period Purse and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the Site.`}</Text>

            <Text style={styles.header}>{`\nIndemnity`}</Text>
            <Text
              style={styles.standardText}
            >{`Except where prohibited by law, by using this Site you indemnify and hold harmless The Period Purse and our directors, officers, agents, employees, subsidiaries, and affiliates from any actions, claims, losses, damages, liabilities and expenses including legal fees arising out of your use of our Site or your violation of these Terms and Conditions.`}</Text>

            <Text style={styles.header}>{`\nApplicable Law`}</Text>
            <Text
              style={styles.standardText}
            >{`These Terms and Conditions are governed by the laws of Canada. The Period Purse headquarters is in Ontario.`}</Text>

            <Text style={styles.header}>{`\nSeverability`}</Text>
            <Text
              style={styles.standardText}
            >{`If at any time any of the provisions set forth in these Terms and Conditions are found to be inconsistent or invalid under applicable laws, those provisions will be deemed void and will be removed from these Terms and Conditions. All other provisions will not be affected by the removal and the rest of these Terms and Conditions will still be considered valid.`}</Text>

            <Text style={styles.header}>{`\nChanges`}</Text>
            <Text
              style={styles.standardText}
            >{`These Terms and Conditions may be amended from time to time in order to maintain compliance with the law and to reflect any changes to the way we operate our Site and the way we expect users to behave on our Site. We will notify users by email of changes to these Terms and Conditions or post a notice on our Site.`}</Text>

            <Text style={styles.header}>{`\nContact Details`}</Text>
            <Text
              style={styles.standardText}
            >{`Please contact us if you have any questions or concerns. Our contact details are as follows:`}</Text>

            <Text style={styles.standardText}>{`
hello@theperiodpurse.com
1460 The Queensway, Toronto, Ontario, M8S 1S7

You can also contact us through the feedback form available on our Site.
                `}</Text>

            <Text
              style={{ ...styles.standardText, marginBottom: 50 }}
            >{`Effective Date: 14th day of April, 2022`}</Text>
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
  header: {
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "bold",
  },
  standardText: {
    fontFamily: "Avenir",
    fontSize: 14,
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
});
