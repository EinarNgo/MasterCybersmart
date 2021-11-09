import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme } from "galio-framework";

import { Card } from "../components";
import articles from "../constants/articles";
const { width } = Dimensions.get("screen");

class Home extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          <Card item={articles[0]} horizontal nav={"Ctf"} />
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
      <Block flex center style={styles.home1}>
        {this.renderArticles()}
      </Block>
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
});

export default Home;
