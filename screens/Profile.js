import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View,
  TouchableOpacity
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { Auth } from 'aws-amplify';

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
const Background = require("../assets/colorful.jpg");

async function checkUser() {
  try {
    await Auth.signIn(username, password);
    console.log('Success');
    updateAuthState('loggedIn');
    {console.log(await Auth.currentAuthenticatedUser())}
  } catch (error) {
    alert(error.message)
    console.log('Error signing in...', error);
  }
}

export default function Profile({ navigation, updateAuthState, user }) {  
    return (
      
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Background} resizeMode="cover" style={styles.image}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '60%' }}
            >
              <Block flex style={styles.profileCard}>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      Under arbeid {console.log(user)}
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                  <Text bold size={14} color="#32325D">
                      Sjekk igjen senere
                    </Text>
                  
                  </Block>
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    );
  
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  lottie: {
    width: 100,
    height: 100
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

/*
              <AnimatedLoader
                    visible={true}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("../assets/loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}>
                    <Text>Utvikler i arbeid...</Text>
                  </AnimatedLoader>
                  */