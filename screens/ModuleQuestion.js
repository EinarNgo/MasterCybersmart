import React, { Component, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Amplify, { API, Auth, graphqlOperation } from "aws-amplify";
import { getModuler, listModulers } from "../graphql/queries";
import TestHeader from "../components/TestComps/TestHeader";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default function ModuleQuestion() {
  const [Questions, setQuestions] = useState([]);
  const [Current, setCurrent] = useState(" første tekst ");
  const list = [
    "0",
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
  ];

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      //hent alle spørsmål relatert til den kategorien. Må sende inn kategorinavn som en prop og deretter gjøre en query
      //må fikse hvordan filtrere queries, og hvordan fikse screens riktig
      const questions = await API.graphql(graphqlOperation(listModulers));

      const questionArray = questions.data.listModulers.items;

      setQuestions(questionArray);
    } catch (error) {
      console.log("error on fetching questions", error);
    }
  };
  const currentQuestion = (number) => {
    console.log(number);
    console.log(list[number] + " hentet fra listen ");
    setCurrent(list[number]);
  };

  return (
    <View>
      <View>
        <View style={styles.testList}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {list.map((q, idx) => {
              return (
                <TouchableOpacity
                  key={`list${idx}`}
                  onPress={() => currentQuestion(idx)}
                >
                  <Text style={styles.testText} key={`list${idx}`}>
                    {idx}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>

      <Text style={styles.text}>{Current}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 80,
    textAlign: "center",
    textAlignVertical: "bottom",
  },
  header: {
    backgroundColor: "red",
    height: 100,
  },
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
