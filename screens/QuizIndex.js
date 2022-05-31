import {React, useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  ImageBackground
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { API, graphqlOperation } from "aws-amplify";
import { listModulers } from "../graphql/queries";
import { HeaderHeight } from "../constants/utils";
import { Card, Icon,Button } from "react-native-elements";
const { width, height } = Dimensions.get("screen");

const QuizIndex = ({ navigation, route }) => {
  const [questions, setQuestions] = useState([]);
  const Background = require("../assets/quiz.jpg");

  //Henter informasjonen
  const fetchQuestions = async () => {
    try {
      const questionData = await API.graphql(graphqlOperation(listModulers));
      const questionList = questionData.data.listModulers.items;
      setQuestions(questionList);
    } catch (error) {
      console.log("error on fetching questions", error);
    }
  };

  //UseEffect funksjon som henter inn fetchQuestion før alt annet blir hentet
  useEffect(() => {
    fetchQuestions();
  }, []);

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
                      Quiz
                    </Text>
              </Block>
              <Block style={styles.result}>
                      <Text bold size={16} color="#000" style={{marginTop: -5}}>
                        Resultater
                      </Text>
              </Block>
              <Block flex style={styles.resultCard}>
              <Block
                      middle
                      row
                      space="evenly"
                      style={{ marginTop: 20, paddingBottom: 24 }}
                    >
                      <Text color="black">
                      Poengsum: 0
                    </Text>
                    <Text color="black">
                      Antall løste: 0
                    </Text>
                  </Block>
              </Block>
              <Block style={styles.result}>
                      <Text bold size={16} color="#000" style={{marginTop: 20}}>
                        Kategorier
                      </Text>
              </Block> 
              <Block flex style={styles.resultCard}>
                  <Card.Title>Personvern og passord</Card.Title>
                  <Card.Divider></Card.Divider>
                  <Icon
                    name={"id-card"}
                    type={"font-awesome"}
                    size={70}
                    containerStyle={styles.iconContainer}
                  />
                  <Block middle style={styles.textContainer}>
                    <Text>Quiz med 10 spørsmål, som tester dine ferdigheter innenfor temaene Personvern og Passordbruk</Text>
                  </Block>
                  <Button
                    buttonStyle={styles.button}
                    title="Spill"
                    onPress={() => navigation.navigate("QuizMain",{
                      kategori: "Quiz: Personvern og Passord",
                      question: questions,
                    })}
                  />
              </Block>
              <Block flex style={styles.resultCard}>
              <Card.Title>Etisk hacking og Phising</Card.Title>
                  <Card.Divider></Card.Divider>
                  <Icon
                    name={"user-secret"}
                    type={"font-awesome"}
                    size={70}
                    containerStyle={styles.iconContainer}
                  />
                  <Block middle style={styles.textContainer}>
                    <Text>Quiz med 10 spørsmål, som tester dine ferdigheter innenfor temaene Etisk hacking og Phising</Text>
                  </Block>
                  <Button
                    buttonStyle={styles.button}
                    title="Spill"
                    onPress={() => navigation.navigate("QuizMain",{
                      kategori: "Quiz: Etisk hacking og Phising",
                      question: questions,
                    })}
                  />
              </Block>
              <Block flex style={styles.resultCard}>
              <Card.Title>Skadevare og kryptografi</Card.Title>
                  <Card.Divider></Card.Divider>
                  <Icon
                    name={"bug"}
                    type={"font-awesome"}
                    size={70}
                    containerStyle={styles.iconContainer}
                  />
                  <Block middle style={styles.textContainer}>
                    <Text>Quiz med 10 spørsmål, som tester dine ferdigheter innenfor temaene Skadevare og Kryptografi</Text>
                  </Block>
                  <Button
                    buttonStyle={styles.button}
                    title="Spill"
                    onPress={() => navigation.navigate("QuizMain",{
                      kategori: "Quiz: Skadevare og kryptografi",
                      question: questions,
                    })}
                  />
              </Block>
              <Block style={styles.bottom}/>
              
            </ScrollView>
            </ImageBackground>
        </Block>
      </Block>
  )
}

const styles = StyleSheet.create({
  quizScreen: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    flex: 1,
    
  },
  /*
  bg: {
    backgroundColor: "#FFFFFF"
  },
  */
  container: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  CategoriesCard: {
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
    zIndex: 2,
  },
  resultCard: {
    // position: "relative",
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
    zIndex: 2,
    backgroundColor: "#ffffff",
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
    justifyContent: 'center',
    resizeMode: 'cover',
    marginBottom: 20,
    minWidth: '100%',
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
  button: {
    justifyContent: 'center',
    resizeMode: 'cover',
    borderRadius: 0,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
    minWidth: '10%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default QuizIndex;
