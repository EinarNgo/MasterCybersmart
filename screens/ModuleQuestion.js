import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View, ImageBackground, Pressable, Modal } from "react-native";
import { Button, Card } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { Block, theme } from "galio-framework";
import { HeaderHeight } from "../constants/utils";
import FinishTask from "../supportfunction/FinishTask";
import LottieView from "lottie-react-native";
const { width, height } = Dimensions.get("screen");

export default function ModuleQuestion({ navigation, route }) {
  const filteredQs = route.params.questions;
  const title = route.params.questions[0].kategori;
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isQuestionsFilled = questions && questions.length > 0;
  const Background = require("../assets/colorful.jpg");
  const [text, onChangeText] = useState("");
  const [check, setCheck] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  //Henter spørmsålene
  useEffect(() => {
    setQuestions(filteredQs);
  }, []);
  useEffect(() => {}, [currentIndex]);

  //håndterer om tilbakemodulen vises
  const handleModalVisible = () => {
    setModalVisible(false);
  }

  //sjekker om svaret er riktig
  const checkAnswer = (answer) => {
    const isAnswerRight =
      answer.toLowerCase() === questions[currentIndex].fasit.toLowerCase();
      console.log(questions[currentIndex].fasit.toLowerCase())
    if (isAnswerRight) {
      FinishTask()
      setCheck(true);
      setModalVisible(true);
      onChangeText("")
    } else {
      setCheck(false);
      setModalVisible(true);
      onChangeText("")
    }
  };

  //Går tilbake til forrige spørsmål
  const prevQuestion = () => {
    if (currentIndex <= 0) {
      alert("Kan ikke gå tilbake, dette er første spørsmål");
    } else {
      setCurrentIndex(currentIndex - 1);
      onChangeText("")
    }
  };

  //Går tilbake til neste spørsmål
  const nextQuestion = () => {
    if (currentIndex >= questions.length - 1) {
      alert("ikke flere spørsmål, vennligst velg ny kategori");
    } else {
      setCurrentIndex(currentIndex + 1);
      onChangeText("")
    }
  };

  //Henter modulen
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

  //Håndtering av neste og tilbake knapper
  const buttonModule = () => {
    return (
      <View style={styles.buttonContainer}>
        <Block>
        {currentIndex != 0 &&
          <Button
          buttonStyle={styles.button}
          onPress={() => (prevQuestion(),handleModalVisible())}
          title="Previous"
        />
        }
        </Block>
        {currentIndex != questions.length - 1 &&
          <Button
          buttonStyle={styles.button}
          onPress={() => (nextQuestion(),handleModalVisible())}
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

              <Block flex  style={styles.resultCard}>
                  <Card.Title>{title}</Card.Title>
                  <Card.Divider></Card.Divider>
                  <Block middle style={styles.textContainer}>
                    <Text>{firstQuestion?.sporsmaal}</Text>
                  </Block>
                  <Block flex>
                  <TextInput
                    marginHorizontal='5%'
                    clearTextOnFocus={true}
                    autoCorrect={true}
                    placeholder="Svar"
                    clearButtonMode="always"
                    style={styles.input}
                    maxLength={20}
                    textAlign="left"
                    value={text}
                    onChangeText={onChangeText}
                    onSubmit
                    Editing={(text) => checkAnswer(text.nativeEvent.text)}
                  />
                  <Button
                      buttonStyle={styles.buttonCheck}
                      onPress={() => (checkAnswer(text), console.log(text))}
                      title="Sjekk svar"
                    />
                    </Block>
                  
              </Block>

              <Block flex marginTop="5%">
                  {buttonModule()}
                  </Block>
              
              <Block style={styles.bottom}/>
              <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                  >
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                    >    

                    {check ? (
                      <Block flex style={styles.resultCard1}>
                      <Block flex style={styles.end}>
                      <LottieView source={require("../assets/gratz.json")} loop autoPlay style={{width: "100%", height: "100%"}}/>
                        </Block>
                        <Text> Gratulerer svaret var riktig, stå på! </Text>
                        <Block flex style={styles.column}>
                        {buttonModule()}
                        </Block>
                    </Block>
                    ) :
                    <Block flex style={styles.resultCard1}>
                      <Block flex style={styles.end}>
                      <LottieView source={require("../assets/wrong.json")} loop autoPlay style={{width: "100%", height: "100%"}}/>
                        </Block>
                        <Text> Feil svar, du klarer det nestegang </Text>
                        <Block flex style={styles.column}>
                        <Pressable
                          style={[styles.buttonModal, styles.buttonClose]}
                          onPress={() => handleModalVisible()}
                        >
                          <Text style={styles.textStyle}>Prøv igjen</Text>
                        </Pressable>
                        </Block>
                    </Block>
                    }
                  
                    </ScrollView>
                  </Modal>
              
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
    backgroundColor: "green",
    shadowColor: "black",
    width: 150,
    marginTop: 10,
  },
  buttonCheck: {
    backgroundColor: "blue",
    shadowColor: "black",
    marginTop: 10,
    marginHorizontal: '5%'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  textview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  end: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 20,
    marginBottom: 50,
    backgroundColor: theme.COLORS.WHITE,
    shadowOffset: { width: 0, height: 0 },
    zIndex: 2,
    justifyContent: "center",
    alignItems: 'center',
  },
  resultCard1: {
    padding: theme.SIZES.BASE,
    //marginHorizontal: theme.SIZES.BASE,
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
    alignItems: 'center',
    justifyContent: "center",
    marginTop: '60%',
    marginHorizontal: '15%'
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginLeft: 5,
    marginRight: 5
  },
  column: {
    paddingTop: "5%",
    flexDirection: 'row',
  },
  buttonModal: {
    borderRadius: 10,
    padding: 10,
    elevation: 1,
    paddingHorizontal: '15%'
  },
});
