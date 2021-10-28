import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function EducationArticles({ navigation, route }) {
  return (
    <WebView
      style={styles.container}
      originWhitelist={["https://*"]}
      allowsInlineMediaPlayback={true}
      source={{ uri: "https://reactnative.dev/" }}
    />
  );
}
const styles = StyleSheet.create({
  container: { justifyContent: "center", marginTop: 89 },
  content: {
    backgroundColor: "red",
  },
});
