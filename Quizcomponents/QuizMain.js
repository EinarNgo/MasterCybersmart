import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  View,
  Button
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { HeaderHeight } from "../constants/utils";
import { FilteredByCategories } from "../assets/functions/FilteredByCategories";
import { Quiz, QuizEnd } from "../Quizcomponents";

const { width, height } = Dimensions.get("screen");

const getFilteredQuestions = (filteredRequest,questions) => {
  var filtered = FilteredByCategories(filteredRequest, questions);
  //setFilterQuestion(filtered);
  //setFilterLength(filtered.length)
};

const QuizMain = ({route, navigation}) => {
  const { kategori, question } = route.params;
  const filterQuestion = FilteredByCategories(kategori, question);
  //const [filterLength, setFilterLength] = useState(filterQuestion.length);
  const [filterLength, setFilterLength] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [play, setPlay] = useState("Play");
  const [answer, setAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answerFromButton) => {
    console.log(answer);
    if (answer == false) {
      if (answerFromButton === filterQuestion[activeIndex].fasit) {
        alert("Riktig svar");
        setScore(score + 1);
        setAnswer(true);
      } else {
        setAnswer(true);
        alert("Feil svar");
      }
    } 
  };

  const handleNext = () => {
    console.log(activeIndex);
    console.log(filterLength);
    if (activeIndex === filterLength - 1) {
      console.log("End");
      setPlay("End");
    } else {
      setActiveIndex(activeIndex + 1);
      setAnswer(false);
    }
  };

  const handleStart = (Kategori) => {
    getFilteredQuestions(Kategori);
    setTittel(Kategori);
    setActiveIndex(0);
    setScore(0);
    setPlay("Play");
  };

  const handleRestart = () => {
    setActiveIndex(0);
    setScore(0);
    setPlay("Play");
    setAnswer(false);
  };

  const handleMain = () => {
    setActiveIndex(0);
    setScore(0);
    setAnswer(false);
  };

  if (play === "Play") {
    return (
      <View style={styles.container}>
        {filterLength > 0 ? (
          <Block flex style={styles.bg}>
          <Quiz
            prop={filterQuestion[activeIndex]}
            handleAnswer={handleAnswer}
            tittel={kategori}
            handleNext={handleNext}
            answer={answer}
            length={filterLength}
            score={score}
          />
        </Block>
      ) :
        //Husk å aktivere databasen hvis denne beskjed kommer =)
       (<h2 className="text-2xl text-white font-bold"> Spørsmål ikke loaded... </h2>)}
      </View>
    );
  } else if (play === "End") {
    return (
      <View style={styles.container}>
        <Block flex style={styles.bg}>
          <QuizEnd
            handleMain={handleMain}
            handleRestart={handleRestart}
            score={score}
          />
        </Block>
      </View>
    );
  
  }

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
    //backgroundColor: ""
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

export default QuizMain;