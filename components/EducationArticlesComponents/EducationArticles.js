import { Block, theme } from "galio-framework";
import React from "react";
import { StyleSheet, View, Dimensions, Button, Text } from "react-native";
import { Card, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import constants from "../../constants/moduleConstants";

const { width } = Dimensions.get("screen");
export default function EducationArticles({ navigation, route }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {constants.Categories.map((categori, idx) => {
          return (
            <Card containerStyle={styles.card}>
              <Card.Title>{categori.title}</Card.Title>
              <Card.Divider></Card.Divider>
              <Icon
                name={categori.icon}
                type={categori.type}
                size={70}
                containerStyle={styles.iconContainer}
              />
              <Text>{categori.description}</Text>
              <Button
                buttonStyle={styles.button}
                title="Les artikkel"
                onPress={() =>
                  navigation.navigate("ArticleViewer", {
                    link: categori.url,
                  })
                }
              />
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
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
