import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Linking } from "react-native";
import FacebookIcon from "../../../assets/icons/facebook.svg";
import InstagramIcon from "../../../assets/icons/instagram.svg";
import TikTokIcon from "../../../assets/icons/tiktok.svg";
import TwitterIcon from "../../../assets/icons/twitter.svg";
import YoutubeIcon from "../../../assets/icons/youtube.svg";
import { STACK_SCREENS } from "../../../App";

const socialMediaIcons = [
  { component: <InstagramIcon />, url: "https://www.instagram.com/theperiodpurse/" },
  { component: <TikTokIcon />, url: "https://www.tiktok.com/@theperiodpurse" },
  { component: <YoutubeIcon />, url: "https://www.youtube.com/channel/UC2YgDU_9XxbjJsGGvXwxwyA" },
  { component: <TwitterIcon />, url: "https://twitter.com/ThePeriodPurse" },
  { component: <FacebookIcon />, url: "https://www.facebook.com/theperiodpurse/" },
];

const SocialMediaButton = (props) => {
  const openLink = () =>
    Linking.canOpenURL(props.url).then(() => {
      Linking.openURL(props.url);
    });

  return (
    <TouchableOpacity onPress={openLink} style={styles.icon}>
      {props.icon}
    </TouchableOpacity>
  );
};

const Socials = () => {
  return (
    <View style={styles.iconsContainer}>
      {socialMediaIcons.map((socialMedia, i) => {
        return <SocialMediaButton key={i} icon={socialMedia.component} url={socialMedia.url} />;
      })}
    </View>
  );
};

export const TermsAndConditions = ({ navigation }) => {
  const openPrivacyPolicy = () => {
    navigation.navigate(STACK_SCREENS.PRIVACY_POLICY);
  };
  const openTermsAndCondition = () => {
    navigation.navigate(STACK_SCREENS.TERMS_AND_CONDITION);
  };

  return (
    <View styles={styles.termsAndConditionsContainer}>
      <View style={styles.copyright}>
        <Text style={styles.copyrightText}>&copy; 2022 The Period Purse. All rights reserved.</Text>
      </View>
      <View style={styles.terms}>
        <TouchableOpacity onPress={openTermsAndCondition} style={styles.textLink}>
          <Text style={styles.termsText}> Terms and Conditions</Text>
        </TouchableOpacity>
        <Text style={styles.textLink}> and </Text>
        <TouchableOpacity onPress={openPrivacyPolicy} style={styles.textLink}>
          <Text style={styles.termsText}>Privacy Policy </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const Footer = ({ navigation }) => {
  return (
    <View>
      <Socials />
      <TermsAndConditions navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 24,
    marginRight: 38,
    marginTop: 85,
    marginBottom: 75,
  },
  iconsContainer: {
    marginTop: "5%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    margin: 10,
  },
  textLink: {
    marginVertical: 10,
  },
  termsAndConditionsContainer: {
    marginTop: 10,
  },
  copyright: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    color: "red",
  },
  copyrightText: {
    color: "#6D6E71",
  },
  terms: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  termsText: {
    color: "#5A9F93",
    textDecorationLine: "underline",
  },
  lineText: {
    marginTop: -10,
    color: "#5A9F93",
  },
});
