import React, { Component } from "react";
import { View } from "react-native";

export default function ModuleQuestions() {
  const [Questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      //hent alle spørsmål relatert til den kategorien. Må sende inn kategorinavn som en prop og deretter gjøre en query
      //må fikse hvordan filtrere queries, og hvordan fikse screens riktig
      const questions = await API.graphql(graphqlOperation(listModulers));

      const questionArray = questions.data.listModulers.items;

      setQuestions(questionArray);
    } catch (error) {
      console.log("error on fetching questions", error);
    }

    return (
      <View>
        <Text>Dette er spørsmål siden</Text>
      </View>
    );
  };
}
