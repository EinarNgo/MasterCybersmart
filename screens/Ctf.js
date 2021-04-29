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
const { width } = Dimensions.get("screen");

export default function Ctf({ navigation, updateAuthState }) {
  const [modulers, setModulers] = useState([]);

  useEffect(() => {
    fetchModulers();
  }, []);

  const fetchModulers = async () => {
    try {
      const modulerData = await API.graphql(graphqlOperation(listModulers));

      const modulerList = modulerData.data.listModulers.items;

      setModulers(modulerList);
    } catch (error) {
      console.log("error on fetching modul", error);
    }
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
          {modulers.map((modul, idx) => {
            return (
              <Card containerStyle={styles.card} key={`modul${idx}`}>
                <Card.Title style={{ textAlign: "center", fontSize: 30 }}>
                  {modul.kategori}
                </Card.Title>
                <Card.Divider />
                <Text style={{ paddingBottom: 15 }}>
                  Tekst relatert til hver kategori lorem ipsum dolores sit amet
                </Text>
                <View style={styles.textview}>
                  <Text style={styles.questions}>Antall spørsmål: 10</Text>
                  <Text style={styles.solved}>Antall løste: 5</Text>
                </View>
                <Button
                  onPress={() => navigation.navigate(ModuleQuestion)}
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    backgroundColor: "limegreen",
                  }}
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
    color: "limegreen",
    fontSize: 22,
    textAlign: "center",
    borderBottomColor: "#CACACA",
    borderBottomWidth: 2,
  },
  textview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  card: {
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 2,
  },
});
