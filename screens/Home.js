import React from "react";
import { StyleSheet, Dimensions, ScrollView, ImageBackground } from "react-native";
import { Block, theme } from "galio-framework";
import { Card } from "../components";
import articles from "../constants/articles";
const { width } = Dimensions.get("screen");
const Background = require("../assets/colorful.jpg");

class Home extends React.Component {
  
  renderArticles = () => {
    return (

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          <Block flex row>
            <Card item={articles[0]} style={{ marginRight: theme.SIZES.BASE }} nav={"Ctf"} />
            <Card item={articles[5]} nav={"PasswordChecker"} />
          </Block>
          <Block flex row>
            <Card
              item={articles[1]}
              style={{ marginRight: theme.SIZES.BASE }}
              nav={"QuizIndex"}
            />
            <Card item={articles[2]} nav={"EducationArticles"} />
          </Block>
          <Card item={articles[4]} full nav={"EducationVideoIndex"} />
        </Block>
      </ScrollView>


    );
  };

  render() {
    return (
      <ImageBackground source={Background} resizeMode="cover" style={styles.image}>
      <Block flex center style={styles.home1}>
        {this.renderArticles()}
      </Block>
            </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  home1: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default Home;
