import {React, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import AnimatedLoader from 'react-native-animated-loader';
import { Block } from "galio-framework";

//Skjerm for artiklene
export default function ArticleViewer({ navigation, route }) {
  const [show, setShow] = useState(false);
  return (

    <WebView
      style={styles.artikkel}
      originWhitelist={["https://*"]}
      allowsInlineMediaPlayback={true}
      source={{ uri: route.params.link }}
      onLoad={() => setShow(true)}
    >
      {show == false ? (
        <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../../assets/loader.json")}
        animationStyle={styles.lottie}
        speed={1}>
        <Text>Henter artikkel...</Text>
      </AnimatedLoader>
        
      ) :
      <Text>{console.log("Viser artikkel")}</Text>
      }
    </WebView>
    
    

  );
}
const styles = StyleSheet.create({
  ramme: { justifyContent: "center", marginTop: 89, zIndex: 1},
  artikkel: { justifyContent: "center", marginTop: 89, zIndex: 2},
  content: {
    backgroundColor: "red",
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
