import {React, useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { API, graphqlOperation } from "aws-amplify";
import { listModulers } from "../graphql/queries";
import { HeaderHeight } from "../constants/utils";
import { Card, Icon,Button } from "react-native-elements";
const { width, height } = Dimensions.get("screen");

const QuizIndex = ({ navigation, route }) => {
  const [questions, setQuestions] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [length, setLength] = useState(questions.length);
  const [answer, setAnswer] = useState(false);
  const [score, setScore] = useState(0);
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

  return (
    <Block flex style={styles.quizScreen}>
        <Block flex style={styles.bg}>
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
                  <Card.Title>Personvern</Card.Title>
                  <Card.Divider></Card.Divider>
                  <Icon
                    name={"id-card"}
                    type={"font-awesome"}
                    size={70}
                    containerStyle={styles.iconContainer}
                  />
                  <Block middle style={styles.textContainer}>
                    <Text>Quizzz med 10 random spørsmål, som tester dine ferdigheter innenfor temaet personvern</Text>
                  </Block>
                  <Button
                    buttonStyle={styles.button}
                    title="Spill"
                    onPress={() => navigation.navigate("QuizMain",{
                      kategori: "Personvern",
                      question: questions,
                    })}
                  />
              </Block>
              <Block flex style={styles.resultCard}>
              <Card.Title>Etisk hacking</Card.Title>
                  <Card.Divider></Card.Divider>
                  <Icon
                    name={"user-secret"}
                    type={"font-awesome"}
                    size={70}
                    containerStyle={styles.iconContainer}
                  />
                  <Block middle style={styles.textContainer}>
                    <Text>Etisk hacking handler om å avdekke svakheter i et datasystem på vegne av den som eier produktet</Text>
                  </Block>
                  <Button
                    buttonStyle={styles.button}
                    title="Spill"
                    //onPress={() => handleStart("Etisk hacking")}
                  />
              </Block>
              <Block flex style={styles.resultCard}>
              <Card.Title>Skadevare</Card.Title>
                  <Card.Divider></Card.Divider>
                  <Icon
                    name={"bug"}
                    type={"font-awesome"}
                    size={70}
                    containerStyle={styles.iconContainer}
                  />
                  <Block middle style={styles.textContainer}>
                    <Text>Skadevare handler om programvare som utfører handlinger på en bruker sitt system, uten deres tillatelse.</Text>
                  </Block>
                  <Button
                    buttonStyle={styles.button}
                    title="Spill"
                    onPress={() => handleStart("Skadevare")}
                  />
              </Block>
              <Block flex style={styles.resultCard}>
              <Card.Title>Phishing</Card.Title>
                  <Card.Divider></Card.Divider>
                  <Icon
                    name="hook"
                    type={"material-community"}
                    size={70}
                    containerStyle={styles.iconContainer}
                  />
                  <Block middle style={styles.textContainer}>
                    <Text>Phishing handler om å snoke digitalt eller å anskaffe sensitiv informasjon om noen, oftest ved å forfalske mailer.</Text>
                  </Block>
                  <Button
                    buttonStyle={styles.button}
                    title="Spill"
                    onPress={() => handleStart("Phising")}
                  />
              </Block>
              <Block style={styles.bottom}/>
              
            </ScrollView>
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
  button: {
    borderRadius: 0,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
  },
});

export default QuizIndex;
