import { Block, theme } from "galio-framework";
import React from "react";
import { StyleSheet, View, Dimensions, Text, ImageBackground } from "react-native";
import { Card, Icon, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import constants from "../../constants/moduleConstants";
//sjekk høyde og width
const { width } = Dimensions.get("screen");
export default function EducationArticles({ navigation, route }) {
  const Background = require("../../assets/colorful.jpg");
  return (
    <ImageBackground source={Background} resizeMode="cover" style={styles.image}>
    <View style={styles.container}>
         
      <ScrollView>
        {constants.Categories.map((categori, idx) => {
          return (
            <Card containerStyle={styles.card} key={`categori${idx}`}>
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
                title={`Video om ${categori.title.toLowerCase()}`}
                onPress={() =>
                  navigation.navigate("YoutubeViewer", {
                    link: categori.youtubeUrl,
                    description: categori.description,
                    title: categori.title,
                  })
                }
              />
            </Card>
          );
        })}
      </ScrollView>
    </View>
    </ImageBackground>
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
    marginTop: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  
});
