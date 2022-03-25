import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View, ImageBackground } from "react-native";
import { Button, Card } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { Block, theme } from "galio-framework";
import { HeaderHeight } from "../constants/utils";
const { width, height } = Dimensions.get("screen");

export default function ModuleQuestion({ navigation, route }) {
  const filteredQs = route.params.questions;
  const title = route.params.questions[0].kategori;
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isQuestionsFilled = questions && questions.length > 0;
  const Background = require("../assets/colorful.jpg");

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
        <Block>
        {currentIndex != 0 &&
          <Button
          buttonStyle={styles.button}
          onPress={() => prevQuestion()}
          title="Previous"
        />
        }
        </Block>
        {currentIndex != questions.length - 1 &&
          <Button
          buttonStyle={styles.button}
          onPress={() => nextQuestion()}
          title="Next"
        />}

      </View>
    );
  };
  const cardModule = () => {
    const firstQuestion = questions[currentIndex];
    return (
      <Block flex style={styles.quizScreen}>
        <Block flex style={styles.bg}>
        <ImageBackground source={Background} resizeMode="cover" style={styles.image}>
            <ScrollView
              showsVerticalScrollIndicator={true}
              style={{ width, marginTop: '15%' }}
            >
              <Block middle style={styles.statsContainer}>
                    <Text bold size={28} color="black">
                      
                    </Text>
              </Block>

              <Block flex style={styles.resultCard}>
                  <Card.Title>{title}</Card.Title>
                  <Card.Divider></Card.Divider>
                  <Block middle style={styles.textContainer}>
                    <Text>{firstQuestion?.sporsmaal}</Text>
                  </Block>
                  <TextInput
                    marginHorizontal="5%"
                    clearTextOnFocus={true}
                    autoCorrect={true}
                    placeholder="Svar"
                    clearButtonMode="always"
                    style={styles.input}
                    onSubmitEditing={(text) => checkAnswer(text.nativeEvent.text)}
                  />
                  <Block flex marginTop="5%">
                  {buttonModule()}
                  </Block>
              </Block>
              
              <Block style={styles.bottom}/>
              
            </ScrollView>
            </ImageBackground>
        </Block>
      </Block>
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
  quizScreen: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    flex: 1,
    
  },
  bg: {
    backgroundColor: "white"
  },
  container: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  CategoriesCard: {
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
  resultCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 20,
    marginBottom: 10,
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
  result: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginBottom: -20,
    zIndex: 2
  },
  bottom: {
    marginBottom: 50,
  },
  statsContainer: {
    position: "relative",
    marginBottom: 65,
    marginTop: 100,
  },
  textContainer: {
    position: "relative",
    marginBottom: 20,
  },
  container: {
    marginTop: 89,
  },
  iconContainer: {
    alignSelf: "center",
    marginVertical: 20,
  },

  card: {
    backgroundColor: "white",
    alignItems: "center",
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
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
