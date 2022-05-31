import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  ImageBackground
} from "react-native";
import { Block, theme } from "galio-framework";
import { Card, Button } from "react-native-elements";
import { listModulers } from "../graphql/queries";
import moduleConstants from "../constants/moduleConstants";
import { FilteredByCategories } from "../assets/functions/FilteredByCategories";

const { width } = Dimensions.get("screen");

//Komponent for valg av kategorier til ctf
export default function Ctf({ navigation, updateAuthState }) {
  const [modules, setModules] = useState([]);
  const Background = require("../assets/colorful.jpg");

  //Henter inne modulene før ting blir rendret
  useEffect(() => {
    fetchModulers();
  }, []);

  //Henter data fra databasen og legger det i en liste
  const fetchModulers = async () => {
    try {
      const modulerData = await API.graphql(graphqlOperation(listModulers));

      const modulerList = modulerData.data.listModulers.items;

      setModules(modulerList);
    } catch (error) {
      console.log("error on fetching modul", error);
    }
  };

  //En action funksjon som sender brukeren til ctf spørsmålene med ønsket kategori
  const navigateToModule = (filteredQs) => {
    navigation.navigate("ModuleQuestion", {
      questions: filteredQs,
    });
  };

  //Filtrerer spørsmålene etter kategori
  const getFilteredQuestions = (filteredRequest, fullList) => {
    var filtered = FilteredByCategories(filteredRequest, fullList);

    navigateToModule(filtered);
  };

  return (
    <ImageBackground source={Background} resizeMode="cover" style={styles.image}>
    <Block flex center style={styles.home1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        <TextInput editable={false} style={styles.title}>
          Kategorier
        </TextInput>

        <Block flex>
          {moduleConstants.Categories.map((modul, idx) => {
            return (
              <Card containerStyle={styles.card} key={`modul${idx}`}>
                <Card.Title>{modul.title}</Card.Title>
                <Card.Divider />
                <Text style={{ paddingBottom: 15 }}>{modul.description}</Text>
                <Button
                  onPress={() => getFilteredQuestions(modul.title, modules)}
                  buttonStyle={styles.buttonStyle}
                  title="START"
                />
              </Card>
            );
          })}
        </Block>
      </ScrollView>
    </Block>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  home1: {
    width: width,
    marginTop: "20%",
  },
  scrollList: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  title: {
    color: "#3B464B",
    fontSize: 22,
    textAlign: "center",
    borderBottomColor: "#CACACA",
    borderBottomWidth: 2,
    fontWeight: "600",
  },
  textview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  card: {
    backgroundColor: "white",
    alignItems: "center",
  },
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
