import React from "react";
import { useSafeArea } from "react-native-safe-area-context";
import { Auth } from 'aws-amplify';
import {
  ScrollView,
  StyleSheet,
  Image,
  Button
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem } from '../components';

function CustomDrawerContent({ drawerPosition, navigation, profile, focused, state,updateAuthState, ...res }) {
  const insets = useSafeArea();
  const screens = [
    "Home", 
    "Profile",
  ];

  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');

    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  return (
    <Block
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <Block flex={0.06} style={styles.header}>
        <Image styles={styles.logo} source={Images.Logo} />
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
              return (
                <DrawerCustomItem
                  title={item}
                  key={index}
                  navigation={navigation}
                  focused={state.index === index ? true : false}
                />
              );
            })}
            <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
              <Block style={{ borderColor: "rgba(0,0,0,0.2)", width: '100%', borderWidth: StyleSheet.hairlineWidth }}/>
              <Text color="dodgerblue" style={{ marginTop: 16, marginLeft: 8 }}>Instillinger</Text>
            </Block>
            <DrawerCustomItem title="Les mer" navigation={navigation} />
        </ScrollView>
        <Button title="Sign Out" color="dodgerblue" style={styles.button} onPress={signOut} />
      </Block>
    </Block>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center'
  }
});

export default CustomDrawerContent;
