import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert, StyleSheet, Text } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Card, Icon } from "react-native-elements";

export default function YoutubeViewer({ navigation, route }) {
  const youtubeLink = route.params.link;
  const cardTitle = route.params.title;
  const description = route.params.description;

  return (
    <View style={styles.container}>
      <Text style={styles.titleContainer}>{cardTitle.toUpperCase()}</Text>
      <View style={styles.playerContainer}>
        <YoutubePlayer height={225} videoId={youtubeLink} />
      </View>
      <View>
        <Card containerStyle={styles.card}>
          <Card.Title>{`Generelt om ${cardTitle.toLowerCase()}`}</Card.Title>
          <Card.Divider></Card.Divider>
          <Text>{description}</Text>
        </Card>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 89,
    flex: 1,
    backgroundColor: "#e5ecf8",
  },
  playerContainer: {
    marginTop: 20,
    height: 200,
  },
  titleContainer: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 15,
    letterSpacing: 2,
  },

  content: {
    backgroundColor: "blue",
  },

  card: {
    backgroundColor: "white",
    alignItems: "center",
    borderColor: "#e5ecf8",
    borderRadius: 1,
  },
});
