import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  View,
  ActivityIndicator,
  Navbar,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
const { height, width } = Dimensions.get("screen");
import Amplify, { API, Auth, graphqlOperation } from "aws-amplify";
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import Onboarding from "../screens/Onboarding";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import ConfirmSignUp from "../screens/ConfirmSignUp";
import Home from "../screens/Home";
import Pro from "../screens/Pro";
import Ctf from "../screens/Ctf";
import Quiz from "../screens/Quiz";
import CustomDrawerContent from "./Menu";
import Profile from "../screens/Profile";
// header for screens
import { Header } from "../components";
import config from "../aws-exports";
import QuizIndex from "../screens/QuizIndex";
import ModuleQuestion from "../screens/ModuleQuestion";
Amplify.configure(config);

const AuthenticationStack = createStackNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

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
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Ctf"
        component={Ctf}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function QuizStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="QuizIndex"
        component={QuizIndex}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        centerComponent={{ name: "MY TITLE" }}
        options={{
          header: () => (
            <Header
              title=""
              back
              white
              transparent
              centerComponent={{ title: "MY TITLE" }}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
function CtfStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="ModuleQuestion"
        component={ModuleQuestion}
        centerComponent={{ name: "MY TITLE" }}
        options={{
          header: () => (
            <Header
              title=""
              back
              white
              transparent
              centerComponent={{ title: "MY TITLE" }}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
};

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
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
      />
    </AuthenticationStack.Navigator>
  );
}

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
      <Drawer.Screen name="QuizIndex" component={QuizStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="ModuleQuestion" component={ModuleQuestion} />
    </Drawer.Navigator>
  );
}
