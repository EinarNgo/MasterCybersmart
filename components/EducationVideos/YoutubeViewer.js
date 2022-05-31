import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, View, Alert, StyleSheet, Text } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Card, Icon } from "react-native-elements";
import AnimatedLoader from 'react-native-animated-loader';

//Skjerm som viser youtube, blir hentet inn i hovedskjermen
export default function YoutubeViewer({ navigation, route }) {
  const youtubeLink = route.params.link;
  const cardTitle = route.params.title;
  const description = route.params.description;
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titleContainer}>{cardTitle.toUpperCase()}</Text>
      <View style={styles.playerContainer}>
      <YoutubePlayer
          height={225}
          videoId={youtubeLink}
          play={true}
          onChangeState={() => setShow(true)}
        /> 
      {show == false? (
        <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../../assets/loader.json")}
        animationStyle={styles.lottie}
        speed={1}>
        <Text>Henter youtube video...</Text>
      </AnimatedLoader>
        
      ) :
      <Text>{console.log("spiller av video")}</Text>
      }
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
    marginTop: "20%",
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
  lottie: {
    width: 100,
    height: 100,
  }
});
