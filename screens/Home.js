import React from "react";
import { StyleSheet, Dimensions, Button, TouchableOpacity, Text} from 'react-native';
import { Auth } from 'aws-amplify';
import { Block, theme } from 'galio-framework';
import argonTheme from "../constants/Theme";
const { width } = Dimensions.get('screen');
import AppButton from '../components/AppButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
const Tab = createBottomTabNavigator();

export default function Home ({updateAuthState}) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

    return (
      <Block flex center style={styles.home}>
        <TouchableOpacity onPress={() => navigation.navigate('Pro')}>
              <Text style={styles.forgotPasswordButtonText}>
                 Pro
              </Text>
        </TouchableOpacity>
        <Button title="Sign Out" color="#03A9F4" style={styles.button} onPress={signOut} />
        </Block>
    );
}


const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  container: {
    flex: 15,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  sectionHeaderStyle: {
    backgroundColor: '#03A9F4',
    fontSize: 20,
    padding: 5,
    color: '#fff',
  },
  sectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: '#000',
    backgroundColor: '#F5F5F5',
  },
  listItemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  home: {
    flex: 1,   
  },
  button: {
    marginVertical: 100,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '80%',
    backgroundColor: '#03A9F4'
  },
})
