import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';


Amplify.configure(config);

function App() {
  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }
  return (
    <View style={styles.container}>
      <Text><img draggable="false" class="emoji" alt="💙" src="https://s.w.org/images/core/emoji/11/svg/1f499.svg"/> + <img draggable="false" class="emoji" alt="💛" src="https://s.w.org/images/core/emoji/11/svg/1f49b.svg"/> = React Native + Amplify </Text>
      <Button title="Sign Out" color="tomato" onPress={signOut} />
      <StatusBar style="auto" />
    </View>
  );
}
// make sure to remove the second argument
export default withAuthenticator(App);