import { Block, theme } from "galio-framework";
import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import articles from "../../constants/articles";

const { width } = Dimensions.get("screen");
export default function EducationArticles({ navigation, route }) {
  return <Block flex center style={styles.home1}></Block>;
}
const styles = StyleSheet.create({
  home1: {
    width: "100%",
    height: "100%",
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});
