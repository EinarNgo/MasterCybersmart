import Amplify, { API, Auth, graphqlOperation } from "aws-amplify";
import { getModuler, listModulers } from "../../graphql/queries";

export async function fetchQuestions() {
  try {
    const questions = await API.graphql(graphqlOperation(listModulers));

    const questionArray = questions.data.listModulers.items;

    return questionArray;
  } catch (error) {
    console.log("error on fetching questions", error);
  }
}
const getFilteredQuestions = (filteredRequest) => {};

export function FilteredByCategories(categori, AllQuestions) {
  var filteredQuestions = AllQuestions.filter((e) => e.kategori === categori);
  return filteredQuestions;
}
