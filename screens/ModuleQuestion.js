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
import { Card } from "react-native-elements";
import Theme from "../constants/Theme";
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("window").height;

export default function ModuleQuestion() {
  const [Questions, setQuestions] = useState([]);
  const [Current, setCurrent] = useState(" første tekst lorem ipsum doores ");
  const list = [
    "jsfkasf asfkjasf kasf jjas fjkaskfas jf jas jf jasf jaks asdnklas dasdasl dasjd lasdas d sadasj dlkasjdasjdas djasldas das das dasld asl dasl d",
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
  const checkAnswer = (answer) => {
    let realAnswer = "Hei";
    if (answer == realAnswer) {
      console.log("riktig");
      alert("riktig svar!");
    } else {
      console.log("feil ");
      console.log(answer);
      console.log(realAnswer);
      alert("feil svar, prøv på nytt!");
    }
    //fiks slik at når den sjekker svar at den faktisk sjekker svar og ikke er streng med mellomrom og slikt
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.testList}
        >
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
      <View style={styles.container}>
        <Card containerStyle={styles.questionCard}>
          <Text style={styles.text}>{Current}</Text>
          <TextInput
            style={styles.input}
            onSubmitEditing={(text) => checkAnswer(text.nativeEvent.text)}
          ></TextInput>
        </Card>
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
    backgroundColor: "red",
    height: 100,
  },
  testList: {
    backgroundColor: "limegreen",
    height: height,
    paddingTop: 35,
    flexDirection: "row",
  },
  testText: {
    fontSize: 25,
    padding: 10,
    color: "white",
  },
  container: {
    maxWidth: width,
    height: height,
    backgroundColor: "blue",
  },
  input: {
    borderWidth: 1,
    height: 50,
    backgroundColor: "green",
  },
  questionCard: {
    height: 350,
    backgroundColor: "red",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 2,
  },
});
