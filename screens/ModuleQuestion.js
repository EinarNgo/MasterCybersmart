import React, { Component, useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Amplify, { API, Auth, graphqlOperation } from "aws-amplify";
import { getModuler, listModulers } from "../graphql/queries";
import TestHeader from "../components/TestComps/TestHeader";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Card, Button } from "react-native-elements";
import Theme from "../constants/Theme";
import { Block, theme } from "galio-framework";
import Module_header from "../components/Module_header";
import { constants } from "buffer";
import { FilteredByCategories } from "../assets/functions/FilteredByCategories";
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("window").height;

export default function ModuleQuestion() {
  const [Questions, setQuestions] = useState([]);
  const [CurrentQuestion, setCurrentQuestion] = useState(
    " Velkommen trykk på test "
  );
  const [CurrentIndex, setCurrentIndex] = useState(0);
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
  useEffect(() => {}, [CurrentIndex]);
  const fetchQuestions = async () => {
    try {
      const questions = await API.graphql(graphqlOperation(listModulers));

      const questionArray = questions.data.listModulers.items;

      setQuestions(questionArray);
    } catch (error) {
      console.log("error on fetching questions", error);
    }
  };
  const ActiveQuestion = (number) => {};
  const checkAnswer = (answer) => {};
  const getFilteredQuestions = (filteredRequest) => {
    var qs = Questions.filter((e) => e.kategori === filteredRequest);
    setQuestions(qs);
    var l = FilteredByCategories("Skadevare", Questions);
    console.log(l);
  };
  const prevQuestion = (number) => {
    setCurrentQuestion(list[number]);
    setCurrentIndex(CurrentIndex - 1);
  };
  const nextQuestion = (number) => {
    setCurrentQuestion(list[number]);
    setCurrentIndex(CurrentIndex + 1);
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Module_header name="KategoriNAVN"></Module_header>
      </View>
      <View style={styles.container}>
        <Card containerStyle={styles.questionCard}>
          <Text style={styles.text}>{CurrentQuestion}</Text>
          <TextInput
            style={styles.input}
            onSubmitEditing={(text) => checkAnswer(text.nativeEvent.text)}
          ></TextInput>
        </Card>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.button}
            onPress={() => prevQuestion(CurrentIndex - 1)}
            title="Previous"
          ></Button>
          <Button
            buttonStyle={styles.button}
            onPress={() => nextQuestion(CurrentIndex + 1)}
            title="Next"
          ></Button>
          <Button
            buttonStyle={styles.button}
            onPress={() => getFilteredQuestions("Skadevare")}
            title="TEST"
          ></Button>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    textAlign: "center",
    textAlignVertical: "bottom",
  },
  header: {
    height: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "limegreen",
    shadowColor: "black",
    width: 150,
    marginTop: 10,
  },

  testText: {
    fontSize: 25,
    padding: 10,
    color: "white",
  },
  container: {
    maxWidth: width,
    height: height,
  },
  input: {
    borderWidth: 1,
    height: 50,
  },
  questionCard: {
    height: 350,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 2,
  },
});
