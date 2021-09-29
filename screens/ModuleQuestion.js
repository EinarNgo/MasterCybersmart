import React, { Component, useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, } from "react-native";
import Amplify, { API, Auth, graphqlOperation } from "aws-amplify";
import { getModuler, listModulers } from "../graphql/queries";
import TestHeader from "../components/TestComps/TestHeader";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-elements";
import Theme from "../constants/Theme";
import { Block, theme } from "galio-framework";
import Module_header from "../components/Module_header";
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("window").height;

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
        <Block flex>
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
          </Block>
        </View>
      </View>
      <View style={styles.container}>
      <Card containerStyle = {styles.questionCard}>
      <Text style={styles.text}>{Current}</Text>
      <TextInput style={styles.input}></TextInput>
      </Card>
      </View>
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
  container:{
    width:width,
    marginTop:150,
    //endre slik at høyden er en konstant over flere forskjellige skjermer

  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  questionCard:{
    backgroundColor:"white",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 2,
    
  }
});
