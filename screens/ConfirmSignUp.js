import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

//Komponent til å godkjenne nye brukere
export default function ConfirmSignUp({ navigation, route}) {
  const [username, setUsername] = useState("");
  const [authCode, setAuthCode] = useState('');
  
  //Funksjon for å godkjenne brukeren ved å bruke en autentiseringskode som blir sendt på epost.
  async function confirmSignUp({ navigation }) {
    try {
      await Auth.confirmSignUp(username, authCode);
      console.log('Code confirmed');
      navigation.navigate('SignIn');
    } catch (error) {
      console.log(
        'Verification code does not match. Please enter a valid verification code.',
        error.code
      );
    }
  }
  
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Bekreft registrering</Text>
        <AppTextInput
          value={route.params.username}
          onChangeText={text => setUsername(text)}
          leftIcon="account"
          placeholder="Brukernavn"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppTextInput
          value={authCode}
          onChangeText={text => setAuthCode(text)}
          leftIcon="numeric"
          placeholder="Verifiserings kode"
          keyboardType="numeric"
        />
        <AppButton title="Bekreft registrering" onPress={confirmSignUp} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.forgotPasswordButtonText}>
              Bekreft senere
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
      color: '#03A9F4',
      fontWeight: '500',
      marginVertical: 15
    },
    footerButtonContainer: {
      marginVertical: 15,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });