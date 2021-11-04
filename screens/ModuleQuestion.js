import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { FilteredByCategories } from "../assets/functions/FilteredByCategories";
import Module_header from "../components/Module_header";
import { listModulers } from "../graphql/queries";
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("window").height;

export default function ModuleQuestion({ navigation, route }) {
  const filteredQs = route.params.questions;
  const title = route.params.questions[0].kategori;
  const [Questions, setQuestions] = useState([]);
  const [CurrentQuestion, setCurrentQuestion] = useState("");
  const [CurrentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setQuestions(filteredQs);
  }, []);
  useEffect(() => {}, [CurrentIndex]);

  const checkAnswer = (answer) => {};

  const prevQuestion = (number) => {
    console.log("forrige funksjon");
    console.log(number);
    console.log("forrige funksjon");
    if (number < 0) {
      alert("Kan ikke gå tilbake, dette er første spørsmål");
    } else {
      setCurrentQuestion(Questions[number]);
      setCurrentIndex(CurrentIndex - 1);
    }
  };
  const nextQuestion = (number) => {
    console.log("neste funksjon");
    console.log(number);
    console.log(Questions.length);
    console.log("neste funksjon");
    if (number >= Questions.length) {
      alert("ikke flere spørsmål, vennligst velg ny kategori");
    } else {
      setCurrentQuestion(Questions[number]);
      setCurrentIndex(CurrentIndex + 1);
    }
  };
  const test = (
    <View style={styles.container}>
      <Card containerStyle={styles.questionCard}>
        <Text style={styles.text}>{CurrentQuestion.sporsmaal}</Text>
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
      </View>
    </View>
  );
  //endre på at første spørsmål ikke er tom og at første spørsmål peker på null og ikke 1
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Module_header name={title}></Module_header>
        {Questions ? test : <Text>tullllll</Text>}
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
    backgroundColor: "darkgray",
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
