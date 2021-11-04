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
import Module_header from "../components/Module_header";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const Quiz = ({prop: question, handleAnswer, handleNext, answer:answer, correctCount:correctCount, length:length, score:score}) => {
  return (
    <Block flex style={styles.quizScreen}>
      <Block flex style={styles.bg}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: '20%' }}
          >
            <Block middle style={styles.statsContainer}>
                    <Text bold size={28} color="black">
                       Blir sendt ned
                    </Text>
              </Block>
            <Block flex style={styles.resultCard}>
            <View style={styles.textview}>
                <Text style={styles.questions}>Antall spørsmål: {length}</Text>
                <Text style={styles.solved}>Antall løste: {score}</Text>
              </View>
              <Text bold size={16} color="#000" style={{marginTop: 10}}>
                        Tid igjen: --,--
              </Text>
                    <Text style={styles.text}>{question.sporsmaal}</Text>
            
            </Block>
            <Block
                    space="evenly"
                    style={{ marginTop: 0, paddingBottom: 24 }}
                  >
                    {question.valgmuligheter.map((choices, idx) => (
                      <Block flex style={styles.valg}>
                        <Button
                          key={idx}
                          title={choices}
                          color={answer ? choices === question.fasit ? 'green' : 'red' : 'blue'}
                          onPress={() =>
                            handleAnswer(choices)
                          }
                        />
       
                      </Block>

                      ))}
                    
                  </Block>
                 
                  {answer && (
                    <Block flex style={styles.valg}>
                    <Button title={"neste"} onPress={() => handleNext()} />
                  </Block>
                  )}
                  <Block style={styles.bottom}/>
                  
          </ScrollView>
      </Block>
    </Block>
  );
  
}

const styles = StyleSheet.create({
  quizScreen: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    flex: 1,
  },
  container: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  bottom: {
    // position: "relative",
    marginBottom: 50,
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
  bg: {
    backgroundColor: "white"
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

export default Quiz;