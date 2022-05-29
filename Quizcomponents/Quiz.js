import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  View,
  Button,
  Modal,
  Pressable,
  ImageBackground
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { HeaderHeight } from "../constants/utils";
import LottieView from "lottie-react-native";
import CountDown from 'react-native-countdown-component';

const { width, height } = Dimensions.get("screen");

const Quiz = ({prop: question, handleAnswer, handleNext, answer:answer, correctCount:correctCount, length:length, score:score, tittel:tittel, modalVisible:modalVisible, handleModalVisible, check, handleEnd, activeIndex}) => {
  const [time, setTime] = useState(length*60);
  const Background = require("../assets/quiz.jpg");
  return (
    <Block flex style={styles.quizScreen}>
      <Block flex style={styles.bg}>
      <ImageBackground source={Background} resizeMode="cover" style={styles.image}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width , marginTop: '20%' }}
          >
            
            <Block middle style={styles.statsContainer}>
                    <Text bold size={28} color="black">
                       {tittel}
                    </Text>
                    <Block style={{marginTop: 30}}></Block>
                    <CountDown
                          size={25}
                          until={time}
                          onFinish={() => handleEnd()}
                          digitStyle={{backgroundColor: '#FFF', borderWidth: 1, borderColor: 'blue'}}
                          digitTxtStyle={{color: 'blue'}}
                          timeToShow={['M', 'S']}
                          timeLabels={{m: null, s: null}}
                          showSeparator
                        />
                        <Block style={{marginBottom: -30}}></Block>
              </Block>
            <Block flex style={styles.resultCard}>
            <View style={styles.textview}>
            <Text bold size={16} color="#000" style={{marginTop: 10}}>
                
                Spørsmål: {activeIndex+1}/{length}
                
              </Text>
                <Text bold size={16} color="#000" style={{marginTop: 10}}>Antall løste: {score}</Text>
              </View>
              
                        <Block style={{marginTop: 10}}></Block>
                    <Text style={styles.text}>{question.sporsmaal}</Text>
            
            </Block>
            <Block
                    space="evenly"
                    style={{ marginTop: 0, paddingBottom: 24 }}
                  >
                    {question.valgmuligheter.map((choices, idx) => (
                      <Block flex style={styles.valg} key={`categori${idx}`}>
                        <Button
                          key={idx}
                          title={choices}
                          color={answer ? choices === question.fasit ? 'green' : 'blue' : 'blue'}
                          onPress={() =>
                            handleAnswer(choices)
                          }
                        />
       
                      </Block>

                      ))}
                    
                  </Block>
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
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => handleModalVisible()}
                        >
                          <Text style={styles.textStyle}>Se svar</Text>
                        </Pressable>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => handleNext()}
                        >
                          <Text style={styles.textStyle}>Neste</Text>
                        </Pressable>
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
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => handleModalVisible()}
                        >
                          <Text style={styles.textStyle}>Se svar</Text>
                        </Pressable>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => handleNext()}
                        >
                          <Text style={styles.textStyle}>Neste</Text>
                        </Pressable>
                        </Block>
                    </Block>
                    }
                  
                    </ScrollView>
                  </Modal>
                 
                  {answer && (
                    <Block flex style={styles.valg}>
                    <Button title={"neste"} onPress={() => handleNext()} />
                  </Block>
                  )}
                  <Block style={styles.bottom}/>
                  
          </ScrollView>
          </ImageBackground>
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
  column: {
    paddingTop: "5%",
    flexDirection: 'row',
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 1,
    paddingHorizontal: '15%'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginLeft: 5,
    marginRight: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
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
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

});

export default Quiz;