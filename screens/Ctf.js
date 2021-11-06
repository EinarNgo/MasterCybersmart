import React, { useState, useEffect } from "react";
import Amplify, { API, Auth, graphqlOperation } from "aws-amplify";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { Block, theme } from "galio-framework";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { getModuler, listModulers } from "../graphql/queries";
import Module_header from "../components/Module_header";
import ModuleQuestion from "./ModuleQuestion";
import moduleConstants from "../constants/moduleConstants";
import { FilteredByCategories } from "../assets/functions/FilteredByCategories";

const { width } = Dimensions.get("screen");

export default function Ctf({ navigation, updateAuthState }) {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetchModulers();
  }, []);

  const fetchModulers = async () => {
    try {
      const modulerData = await API.graphql(graphqlOperation(listModulers));

      const modulerList = modulerData.data.listModulers.items;

      setModules(modulerList);
    } catch (error) {
      console.log("error on fetching modul", error);
    }
  };
  const navigateToModule = (filteredQs) => {
    navigation.navigate("ModuleQuestion", {
      questions: filteredQs,
    });
  };

  const getFilteredQuestions = (filteredRequest, fullList) => {
    var filtered = FilteredByCategories(filteredRequest, fullList);

    navigateToModule(filtered);
  };

  return (
    <Block flex center style={styles.home1}>
      <Module_header name="CTF"></Module_header>
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
  );
}

const styles = StyleSheet.create({
  home1: {
    width: width,
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
});
