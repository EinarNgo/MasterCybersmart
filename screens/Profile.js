import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Platform,
  Pressable
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { HeaderHeight } from "../constants/utils";
import AnimatedLoader from 'react-native-animated-loader';
import { Auth } from 'aws-amplify';

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
const Background = require("../assets/colorful.jpg");

export default function Profile() {
  const [name, setName] = useState("");
  const [points, setPoints] = useState(0);
  const [score, setScore] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    getInformation();
  }, []);

  async function getInformation() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setName(user.username)
      setPoints(user.attributes['custom:Poeng'])
      setScore(user.attributes['custom:AntallRiktig'])
    } catch (err) {
      console.log('error fetching user info: ', err);
    }
  }

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function getTimer() {
    setShow(false)
    setTimeout(() => {
      console.log("2 sec.")
      setShow(true)
    }, 1000);
  }

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
                      Hei, {Capitalize(name)} vi er under arbeid
                    </Text>

                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                  <Text bold size={14} color="#32325D">
                  Din poengsum:
                  {points == undefined ? 0 : points }
                  </Text>
                  <Text bold size={14} color="#32325D">
                  Antall riktig på CTF:
                  {score == undefined ? 0 : score }
                  </Text>
                  <Pressable
                          style={[styles.buttonModal, styles.buttonClose]}
                          onPress={() => (getInformation(),getTimer())}
                        >
                          <Text style={styles.textStyle}>Oppdater status</Text>
                        </Pressable>
                        {show == false ? (
                          <AnimatedLoader
                          visible={true}
                          overlayColor="rgba(255,255,255,0.75)"
                          source={require("../assets/loader.json")}
                          animationStyle={styles.lottie}
                          speed={1}>
                          <Text>Henter artikkel...</Text>
                        </AnimatedLoader>
                          
                        ) :
                        <Text>{console.log("Viser artikkel")}</Text>
                        }     
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
  buttonModal: {
    borderRadius: 10,
    padding: 10,
    elevation: 1,
    paddingHorizontal: '15%'
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginLeft: 5,
    marginRight: 5
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