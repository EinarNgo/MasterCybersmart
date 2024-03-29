import React, { useState, useEffect } from "react";
import {
  Dimensions,
  View,
  ActivityIndicator,
} from "react-native";
import { Block } from "galio-framework";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
const { width } = Dimensions.get("screen");
import Amplify, { Auth } from "aws-amplify";
import Onboarding from "../screens/Onboarding";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import ConfirmSignUp from "../screens/ConfirmSignUp";
import Home from "../screens/Home";
import Ctf from "../screens/Ctf";
import CustomDrawerContent from "./Menu";
import Profile from "../screens/Profile";
// header for screens
import { Header } from "../components";
import config from "../aws-exports";
import QuizIndex from "../screens/QuizIndex";
import QuizMain from "../Quizcomponents/QuizMain";
import Quiz from "../Quizcomponents/Quiz";
import ModuleQuestion from "../screens/ModuleQuestion";
import PasswordChecker from "../screens/PasswordChecker";
import ArticleViewer from "../components/EducationArticlesComponents/ArticleViewer";
import EducationArticles from "../components/EducationArticlesComponents/EducationArticles";
import YoutubeViewer from "../components/EducationVideos/YoutubeViewer";
import EducationVideoIndex from "../components/EducationVideos/EducationVideoIndex";
Amplify.configure(config);

const AuthenticationStack = createStackNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//For håndtering av stack

//Profilstack
function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
              bgColor={"dodgerblue"}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

//Hjemstack, kobler alle modulene der sammen
function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              search
              options
              navigation={navigation}
              scene={scene}
              bgColor={"dodgerblue"}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Ctf"
        component={Ctf}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home" back navigation={navigation} bgColor={"dodgerblue"} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ModuleQuestion"
        component={ModuleQuestion}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home" back navigation={navigation} bgColor={"dodgerblue"} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
      
      <Stack.Screen
        name="QuizIndex"
        component={QuizIndex}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home" back navigation={navigation} bgColor={"dodgerblue"}/>
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="QuizMain"
        component={QuizMain}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Quiz dashbord" back navigation={navigation} bgColor={"dodgerblue"} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home" back navigation={navigation} bgColor={"dodgerblue"} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="EducationArticles"
        component={EducationArticles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home" back navigation={navigation} bgColor={"dodgerblue"} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ArticleViewer"
        component={ArticleViewer}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Artikkel"
              navigation={navigation}
              bgColor={"dodgerblue"}
              back
              transparent
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="YoutubeViewer"
        component={YoutubeViewer}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Videoer" navigation={navigation} back bgColor={"dodgerblue"} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="EducationVideoIndex"
        component={EducationVideoIndex}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home" navigation={navigation} back bgColor={"dodgerblue"} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="PasswordChecker"
        component={PasswordChecker}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              navigation={navigation}
              back
              bgColor={"dodgerblue"}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

//Ved innlasting av mobilapplikasjon
const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
};

//Autentisering for innlogging, registrering og bekreftelse
function AuthenticationNavigation(props) {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true,
        }}
      />
      <AuthenticationStack.Screen name="App" component={Onboarding} />
      <AuthenticationStack.Screen name="SignIn">
        {(screenProps) => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen
        name="SignUp"
        component={SignUp}
        username={props.username}
      />
      <AuthenticationStack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
        username={props.username}
      />
    </AuthenticationStack.Navigator>
  );
}

//Pålogging stack
export default function SignStack(props) {
  const [isUserLoggedIn, setUserLoggedIn] = useState("initializing");
  useEffect(() => {
    checkAuthState();
  }, []);
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      console.log("User is signed in");
      setUserLoggedIn("loggedIn");
    } catch (err) {
      console.log("User is not signed in");
      setUserLoggedIn("loggedOut");
    }
  }

  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }

  return (
    <Block flex>
      {isUserLoggedIn === "initializing" && <Initializing />}
      {isUserLoggedIn === "loggedIn" && (
        <AppStack updateAuthState={updateAuthState} />
      )}
      {isUserLoggedIn === "loggedOut" && (
        <AuthenticationNavigation updateAuthState={updateAuthState} />
      )}
    </Block>
  );
}

//Kobler stackene sammen
function AppStack({ props, updateAuthState }) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} updateAuthState={updateAuthState} />
      )}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
    </Drawer.Navigator>
  );
}
