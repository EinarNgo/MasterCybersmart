import React, { useState, useEffect } from "react";
import Amplify, { API, Auth, graphqlOperation } from "aws-amplify";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Card } from '../components';
import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import quiz from '../constants/quiz';
import spaceQuestions from "../assets/data/space"
import { getModuler, listModulers } from "../graphql/queries";
import Module_header from "../components/Module_header";
import ModuleQuestion from "./ModuleQuestion";
import questions from "../assets/data/space";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

export default function QuizIndex({ navigation, updateAuthState }) {
  //const { navigate } = this.props.navigation;
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      //hent alle spørsmål relatert til den kategorien. Må sende inn kategorinavn som en prop og deretter gjøre en query
      //må fikse hvordan filtrere queries, og hvordan fikse screens riktig
      const questionData = await API.graphql(graphqlOperation(listModulers));

      const questionList = questionData.data.listModulers.items;

      setQuestions(questionList);
    } catch (error) {
      console.log("error on fetching questions", error);
    }
  };

  return (
      <Block flex style={styles.quizScreen}>
        <Module_header name=""></Module_header>
        <Block flex>
          <ImageBackground
            source={Images.QuizBackground}
            style={styles.container}
            imageStyle={styles.background}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '0%' }}
            >
              <Block middle style={styles.statsContainer}>
                    <Text bold size={28} color="#fff">
                      Quiz
                    </Text>
              </Block>
              <Block flex style={styles.resultCard}>
              <Text bold size={16} color="#000" style={{marginTop: -5}}>
                        Resultater
                      </Text>
              <Block
                      middle
                      row
                      space="evenly"
                      style={{ marginTop: 20, paddingBottom: 24 }}
                    >
                      <Button
                        small
                        style={{ backgroundColor: argonTheme.COLORS.INFO }}
                      >
                        Poeng: ?
                      </Button>
                      <Button
                        small
                        style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                      >
                        Forsøk: ?
                      </Button>
                
                    </Block>
              </Block>
              <Block flex style={styles.CategoriesCard}>
                <Block
                      row
                      space="between"
                    >
                      <Text bold size={16} color="#000" style={{marginTop: -5}}>
                        Kategori
                      </Text>
                    </Block>
                  <Block row space="between" style={{ flexWrap: "wrap" }}>
                      <Card 
                        item={quiz[2]}
                        style={{ marginRight: theme.SIZES.BASE }}
                        nav={"Quiz"}
                        question={questions}
                      >
                      </Card>
                      <Card item={quiz[3]}/>
                  </Block>
                  <Block row space="between" style={{ flexWrap: "wrap" }}>
                      <Card item={quiz[4]} style={{ marginRight: theme.SIZES.BASE }}/>
                      <Card item={quiz[1]}/>
                  </Block>
        
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    );
  }

const styles = StyleSheet.create({
  quizScreen: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  container: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  background: {
    width: width,
    height: height / 2
  },
  CategoriesCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 20,
    marginBottom: 50,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  resultCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 20,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  quiz: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  statsContainer: {
    position: "relative",
    marginBottom: 65,
    marginTop: 100,
  },
  nameInfo: {
    marginTop: 35
  },

});
