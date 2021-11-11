import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import Module_header from "../components/Module_header";
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("window").height;

export default function ModuleQuestion({ navigation, route }) {
  const filteredQs = route.params.questions;
  const title = route.params.questions[0].kategori;
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isQuestionsFilled = questions && questions.length > 0;

  useEffect(() => {
    setQuestions(filteredQs);
  }, []);
  useEffect(() => {}, [currentIndex]);

  const checkAnswer = (answer) => {
    const isAnswerRight =
      answer.toLowerCase() === questions[currentIndex].fasit.toLowerCase();
    if (isAnswerRight) {
      alert("riktig");
    } else {
      alert("feil");
    }
  };

  const prevQuestion = () => {
    if (currentIndex <= 0) {
      alert("Kan ikke gå tilbake, dette er første spørsmål");
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const nextQuestion = () => {
    if (currentIndex >= questions.length - 1) {
      alert("ikke flere spørsmål, vennligst velg ny kategori");
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const loadingModule = () => {
    return (
      <View style={styles.iconHolder}>
        <ActivityIndicator
          size="large"
          color="red"
          style={styles.iconContainer}
        ></ActivityIndicator>
      </View>
    );
  };
  const buttonModule = () => {
    return (
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          onPress={() => prevQuestion()}
          title="Previous"
        ></Button>
        <Button
          buttonStyle={styles.button}
          onPress={() => nextQuestion()}
          title="Next"
        ></Button>
      </View>
    );
  };
  const cardModule = () => {
    const firstQuestion = questions[currentIndex];
    return (
      <View style={styles.container}>
        <Card containerStyle={styles.questionCard}>
          <ScrollView style={styles.questionContainer}>
            <Text style={styles.text}>{firstQuestion?.sporsmaal}</Text>
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              clearTextOnFocus={true}
              autoCorrect={true}
              placeholder="Svar"
              clearButtonMode="always"
              style={styles.input}
              onSubmitEditing={(text) => checkAnswer(text.nativeEvent.text)}
            ></TextInput>
          </View>
        </Card>
        {buttonModule()}
      </View>
    );
  };
  const questionModule = () => {
    if (isQuestionsFilled) {
      return cardModule();
    } else {
      {
        loadingModule();
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 1 }}>{questionModule()}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: { flex: 1, marginTop: "20%" },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },

  iconHolder: {
    flex: 1,
    justifyContent: "center",
  },
  questionContainer: {},
  inputContainer: {},
  text: {
    fontSize: 20,
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
    flex: 1,
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
    flex: 1 / 2,
  },
});
