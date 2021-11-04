import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import StyleSheet from "react-native";
import { Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
export default function Module_header(props) {
  const headerTheme = ["gray", "black"];
  const start = [0.1, 1];
  const end = [1, 0.1];

  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };
  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  return (
    <LinearGradient colors={headerTheme} start={start} end={end}>
      <View
        style={{
          width: dimensions.screen.width,
          height: dimensions.screen.height * 0.1,
        }}
      >
        <Text style={styles.text}>{props.name}</Text>
      </View>
    </LinearGradient>
  );
}
const styles = {
  text: {
    color: "white",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    fontSize: 30,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
};
