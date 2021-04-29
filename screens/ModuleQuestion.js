import React, { Component, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Amplify, { API, Auth, graphqlOperation } from "aws-amplify";
import { getModuler, listModulers } from "../graphql/queries";

export default function ModuleQuestion() {
  const [Questions, setQuestions] = useState([]);

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
  return (
    <View>
      <Text style={styles.text}>Dette er spørsmål siden</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 80,
    textAlign: "center",
    textAlignVertical: "bottom",
  },
});
