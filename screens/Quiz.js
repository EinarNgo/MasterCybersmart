import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View,
  ButtonContainer,
  Button
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

export default class Quiz extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    correctCount: 0,
    totalCount: this.props.route.params.questions.length,
    activeQuestionIndex: 0,
    answered: false,
    answerCorrect: false
  };

  answer = correct => {
    this.setState(
      state => {
        const nextState = { answered: true };

        if (correct) {
          nextState.correctCount = state.correctCount + 1;
          nextState.answerCorrect = true;
        } else {
          nextState.answerCorrect = false;
        }

        return nextState;
      },
      () => {
        setTimeout(() => this.nextQuestion(), 750);
      }
    );
  };
  

  nextQuestion = () => {
    this.setState(state => {
      const nextIndex = state.activeQuestionIndex + 1;

      if (nextIndex >= state.totalCount) {
        return this.props.navigation.popToTop();
      }

      return {
        activeQuestionIndex: nextIndex,
        answered: false
      };
    });
  };
  
 checkAnswer = (choice,ans)=> {
   console.log(choice)
   console.log(ans)
   this.setState(
    state => {
      const nextState = { answered: true };

      if (choice == ans) {
        nextState.correctCount = state.correctCount + 1;
        nextState.answerCorrect = true;
        alert("Riktig svar")
      }
      else{
        nextState.answerCorrect = false;
        alert("Feil svar")
      }
      return nextState;
    },
    () => {
      setTimeout(() => this.nextQuestion(), 1000);
    }
  );
}
  render() {
    const questions = this.props.route.params.questions;
    const question = questions[this.state.activeQuestionIndex];
    const riktigSvar = questions[this.state.activeQuestionIndex].fasit
    console.log("-------------------------------------");
    console.log(question);
    console.log(questions[this.state.activeQuestionIndex].fasit[1]);
    return (
      <Block flex style={styles.quizScreen}>
        <Block flex>
          <ImageBackground
            source={Images.QuizBackground}
            style={styles.container}
            imageStyle={styles.background}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
              <Block flex style={styles.resultCard}>
              <View style={styles.textview}>
                  <Text style={styles.questions}>Antall spørsmål: {`${this.state.totalCount}`}</Text>
                  <Text style={styles.solved}>Antall løste: {`${this.state.correctCount}`}</Text>
                </View>
                <Text bold size={16} color="#000" style={{marginTop: 10}}>
                          Tid igjen: --,--
                </Text>
                      <Text style={styles.text}>{question.sporsmaal}</Text>
              
              </Block>
              <Block
                      space="evenly"
                      style={{ marginTop: 20, paddingBottom: 24 }}
                    >
                    {question.valgmuligheter.map((answer, idx) => (
                        <Block flex style={styles.valg}>
                          <Button
                            key={`modul${answer.idx}`}
                            title={answer}
                            onPress={() =>
          
                              this.checkAnswer(answer,riktigSvar)
                            }
                          />
                        </Block>
                        ))}
                      
                    </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    );
  }
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
  valg: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE ,
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
  textview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },

});

