import React, { useState, useEffect } from "react";
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
import { Button } from "react-native-elements";
import { Block, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { Auth } from 'aws-amplify';
import PointCalculation from "../supportfunction/PointCalculation";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
const Background = require("../assets/colorful.jpg");

export default function Profile({ navigation, updateAuthState }) {
  const [name, setName] = useState("");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    getInformation();
  }, []);

  async function getInformation() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setName(user.attributes['custom:Name'])
      setPoints(user.attributes['custom:Poeng'])
    } catch (err) {
      console.log('error fetching user info: ', err);
    }
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
                      Hei, {name} vi er under arbeid
                    </Text>

                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                  <Text bold size={14} color="#32325D">
                      Din poengsum {points}
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