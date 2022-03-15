import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  View,
  Button,
  Alert
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { HeaderHeight } from "../constants/utils";
import { FilteredByCategories } from "../assets/functions/FilteredByCategories";
import { Quiz } from "../Quizcomponents";
import LottieView from "lottie-react-native";

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
  const [filterLength, setFilterLength] = useState(2);
  const [activeIndex, setActiveIndex] = useState(0);
  const [play, setPlay] = useState("Play");
  const [answer, setAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAnswer = (answerFromButton) => {    
    console.log(answer);
    if (answer == false) {
      if (answerFromButton === filterQuestion[activeIndex].fasit) {
        setScore(score + 1);
        setAnswer(true);
        setModalVisible(true);
      } else {
        setAnswer(false);
        setModalVisible(true);
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
      setModalVisible(false);
    }
  };

  const handleModalVisible = () => {
    setModalVisible(false);
  }


  const handleRestart = () => {
    setActiveIndex(0);
    setScore(0);
    setPlay("Play");
    setAnswer(false);
    setModalVisible(false);
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
            modalVisible={modalVisible}
            handleModalVisible={handleModalVisible}
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
        <Block flex style={styles.bg}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: '30%' }}
          >
            <Block flex style={styles.resultCard}>
              <Block flex style={styles.end}>
                <LottieView source={require("../assets/endscreen.json")} autoPlay /*loop={false}*/ style={{width: "100%", height: "100%"}}/>
                </Block>
                <Text> Gratulerer du fikk {score} riktig(e)! </Text>
            </Block>
            <Block flex style={styles.valg}>
                        <Button
                          title="Quiz meny"
                          
                          onPress={() =>
                            navigation.navigate("QuizIndex")
                          }
                          
                        />
            </Block>
            <Block flex style={styles.valg}>
                        <Button
                          title="Restart"
                          onPress={() =>
                            handleRestart()
                          }
                        />
            </Block>
                  
          </ScrollView>
      </Block>
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
    //position: "relative",
    //display: 'flex',
    //flexDirection: 'column',
    //flexWrap: 'wrap',
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
    justifyContent: "center",
    alignItems: 'center',
  },
  end: {
    // position: "relative",
    display: 'flex',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 20,
    marginBottom: 50,
    backgroundColor: theme.COLORS.WHITE,
    shadowOffset: { width: 0, height: 0 },
    zIndex: 2,

    justifyContent: "center"
  },
  animation: {
    width:10,
    height:10,
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