import React, { useState } from "react";
import {
  Button,
  LogBox,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground
} from "react-native";
import { Card } from "react-native-elements";
import PasswordBar from "../components/PasswordChecker/PasswordBar";

LogBox.ignoreAllLogs();

//Passordmodul, sjekker passordet til brukeren
function PasswordChecker({ navigation }) {
  const [password, setPassword] = useState("");
  const Background = require("../assets/506554.jpg");

  const bulletListData = [
    " Ha minimum en lengde på seks tegn",
    " Ha forskjellige tegn for mer kompleksitet",
    " Ha både store og små bokstaver",
    " Ikke ha navn eller bursdag som passord",
  ];

  //Variabler for passordlengde og merknad til passordstyker, 
  const MAX_LEN = 15,
    MIN_LEN = 6,
    PASS_LABELS = ["For kort", "Svak", "Normal", "Sterk", "Sikker"];

  return (
    <ImageBackground source={Background} resizeMode="cover" style={styles.image}>
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>Passord sjekker</Card.Title>
        <Card.Divider></Card.Divider>

        <Text style={styles.intro}>
          Informasjon for å ha et sterkt passord:
        </Text>
        <View style={{ flexDirection: "column", marginVertical: 10 }}>
          {bulletListData.map((listData, idx) => {
            return (
              <Text style={styles.bulletList} key={`list${idx}`}>
                {"\u2022"} {listData}
              </Text>
            );
          })}
        </View>
        <TextInput
          style={styles.input}
          maxLength={15}
          secureTextEntry
          onChangeText={(password) => setPassword(password)}
        />

        <PasswordBar
          style={styles.passMeter}
          showLabels
          password={password}
          maxLength={MAX_LEN}
          minLength={MIN_LEN}
          labels={PASS_LABELS}
        />
      </Card>
      <Card containerStyle={styles.card}>
        <Button
          style={styles.button}
          title="Les mer om hvordan man lager et sterkt passord"
          onPress={() =>
            navigation.navigate("ArticleViewer", {
              link: "https://nettvett.no/passord/",
            })
          }
        />
        <Card.Divider></Card.Divider>

        <Button
          style={styles.button}
          title="Topp hundre vanlige passord 2021"
          onPress={() =>
            navigation.navigate("ArticleViewer", {
              link: "https://techcult.com/most-common-passwords/",
            })
          }
        />
      </Card>
    </View>
              </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  bulletList: {
    paddingLeft: 5,
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 3,
  },
  title: {
    fontSize: 25,
    color: "black",
  },
  intro: {
    fontSize: 20,
  },
  input: {
    margin: 1,
    padding: 6,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 10,
    backgroundColor: "#eceff1",
  },
  passMeter: {
    marginTop: 1,
    backgroundColor: "blue",
  },
  card: {
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default PasswordChecker;
