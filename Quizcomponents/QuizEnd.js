import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  Button
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get("screen");


const QuizEnd = ({score:score, handleMain, handleRestart}) => {
  return (
    <Block flex style={styles.quizScreen}>
      <Block flex style={styles.bg}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: '30%' }}
          >
            <Block flex style={styles.resultCard}>
                <Text> Gratulerer du fikk {score} riktige! </Text>
            </Block>
            <Block flex style={styles.valg}>
                        <Button
                          title="Quiz meny"
                          onPress={() =>
                            handleMain()
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
  );
  
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
    zIndex: 1
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
    //backgroundColor: "#32CD32"
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

export default QuizEnd;