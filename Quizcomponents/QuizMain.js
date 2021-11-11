import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  Button
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { HeaderHeight } from "../constants/utils";
import { Card, Icon } from "react-native-elements";
const { width, height } = Dimensions.get("screen");

const QuizMain = ({handleStart, length:length}) => {
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
                      Poengsum: ??
                    </Text>
                    <Text color="black">
                      Antall løste: ??
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
                    name="bug"
                    size={70}
                    containerStyle={styles.iconContainer}
                  />
                  <Block middle style={styles.textContainer}>
                    <Text>Quizzz med 10 random spørsmål, som tester dine ferdigheter innenfor temaet personvern</Text>
                  </Block>
                  <Button
                    buttonStyle={styles.button}
                    title="Spill"
                    onPress={() => handleStart("Personvern")}
                  />
              </Block>
              <Block flex style={styles.resultCard}>
              <Card.Title>Etisk hacking</Card.Title>
                  <Card.Divider></Card.Divider>
                  <Icon
                    name="bug"
                    size={70}
                    containerStyle={styles.iconContainer}
                  />
                  <Block middle style={styles.textContainer}>
                    <Text>Etisk hacking handler om å avdekke svakheter i et datasystem på vegne av den som eier produktet</Text>
                  </Block>
                  <Button
                    buttonStyle={styles.button}
                    title="Spill"
                    onPress={() => handleStart("Etisk hacking")}
                  />
              </Block>
              <Block flex style={styles.resultCard}>
              <Card.Title>Etisk hacking</Card.Title>
                  <Card.Divider></Card.Divider>
                  <Icon
                    name="bug"
                    size={70}
                    containerStyle={styles.iconContainer}
                  />
                  <Block middle style={styles.textContainer}>
                    <Text>Etisk hacking handler om å avdekke svakheter i et datasystem på vegne av den som eier produktet</Text>
                  </Block>
                  <Button
                    buttonStyle={styles.button}
                    title="Spill"
                    onPress={() => handleStart("Skadevare")}
                  />
              </Block>
              <Block flex style={styles.resultCard}>
              <Card.Title>Etisk hacking</Card.Title>
                  <Card.Divider></Card.Divider>
                  <Icon
                    name="bug"
                    size={70}
                    containerStyle={styles.iconContainer}
                  />
                  <Block middle style={styles.textContainer}>
                    <Text>Etisk hacking handler om å avdekke svakheter i et datasystem på vegne av den som eier produktet</Text>
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
  bg: {
    backgroundColor: "#7a88b0"
  },
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
    backgroundColor: "#d6ddf1",
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
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
});

export default QuizMain;
