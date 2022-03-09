import { API, graphqlOperation } from "aws-amplify";
import { Block, theme } from "galio-framework";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { HeaderHeight } from "../constants/utils";
import { listModulers } from "../graphql/queries";
import { Quiz, QuizEnd, QuizMain } from "../Quizcomponents";
import { FilteredByCategories } from "../assets/functions/FilteredByCategories";
const { width, height } = Dimensions.get("screen");

function QuizIndex() {
  const [questions, setQuestions] = useState([]);
  const [play, setPlay] = useState("Main");
  const [correctCount, setCorrectCount] = useState(0);
  const [length, setLength] = useState(questions.length);
  const [activeIndex, setActiveIndex] = useState(0);
  const [answer, setAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [filterQuestion, setFilterQuestion] = useState([]);
  const [filterLength, setFilterLength] = useState([]);
  const [tittel, setTittel] = useState("");

  const fetchQuestions = async () => {
    try {
      const questionData = await API.graphql(graphqlOperation(listModulers));
      const questionList = questionData.data.listModulers.items;
      setQuestions(questionList);
      setLength(questionList.length);
    } catch (error) {
      console.log("error on fetching questions", error);
    }
  };

  //UseEffect funksjon som henter inn fetchQuestion før alt annet blir hentet
  useEffect(() => {
    fetchQuestions();
  }, []);

  const getFilteredQuestions = (filteredRequest) => {
    var filtered = FilteredByCategories(filteredRequest, questions);
    setFilterQuestion(filtered);
    setFilterLength(filtered.length)
  };

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
    setPlay("Main");
    setAnswer(false);
  };
  
  if (play === "Main") {
    return (
      <View style={styles.container}>
        <Block flex style={styles.bg}>
          <QuizMain handleStart={handleStart} length={length} />
        </Block>
      </View>
    );
  } else if (play === "Play") {
    return (
      <View style={styles.container}>
        {filterLength > 0 ? (
          <Block flex style={styles.bg}>
          <Quiz
            prop={filterQuestion[activeIndex]}
            handleAnswer={handleAnswer}
            tittel={tittel}
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
    marginBottom: -HeaderHeight * 2,
    flex: 1,
  },
  container: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  background: {
    width: width,
    height: height / 2,
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
    zIndex: 2,
  },
});

export default QuizIndex;
