import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default function TestHeader() {
  const list = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
  ];
  return (
    <View style={styles.testList}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {list.map((q, idx) => {
          return (
            <TouchableOpacity key={`list${idx}`}>
              <Text style={styles.testText} key={`list${idx}`}>
                {idx}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  testList: {
    backgroundColor: "limegreen",
    height: 100,
    paddingTop: 25,
    alignItems: "center",
    flexDirection: "row",
  },
  testText: {
    fontSize: 25,
    padding: 10,
    color: "white",
  },
});
