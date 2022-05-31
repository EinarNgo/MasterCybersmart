import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';


export default function SignIn({ navigation, updateAuthState }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //Påloggings funksjon
  async function signIn() {
    try {
      await Auth.signIn(username, password);
      console.log('Success');
      updateAuthState('loggedIn');
    } catch (error) {
      if(error.message == "Incorrect username or password.") {
        alert("Feil brukernavn eller passord.")
      } else if(error.message == "User does not exist.") {
        alert("Brukeren finnes ikke.")
      } else if(error.message == "Username cannot be empty"){
        alert("Brukernavn kan ikke være tom.")
      } else {
        alert(error.message)
      }
    }
  }
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Logg inn med brukeren din</Text>
        <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          leftIcon="account"
          placeholder="Brukernavn"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppTextInput
          value={password}
          onChangeText={text => setPassword(text)}
          leftIcon="lock"
          placeholder="Passord"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
        />
        <AppButton title="Logg inn" onPress={signIn} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.forgotPasswordButtonText}>
              Har ikke en bruker? Registrer deg
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      backgroundColor: 'white'
    },
    container: {
      flex: 1,
      alignItems: 'center'
    },
    title: {
      fontSize: 20,
      color: '#202020',
      fontWeight: '500',
      marginVertical: 15
    },
    footerButtonContainer: {
      marginVertical: 15,
      justifyContent: 'center',
      alignItems: 'center'
    },
    forgotPasswordButtonText: {
      color: '#03A9F4',
      fontSize: 18,
      fontWeight: '600'
    }
  });