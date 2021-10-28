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
