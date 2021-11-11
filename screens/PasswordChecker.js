import React, { useEffect, useState } from "react";
import { Dimensions, Platform, StyleSheet, View, TextInput } from "react-native";
import PassMeter from "react-native-passmeter";

function PasswordChecker() {
  const [password, setPassword] = useState("");
  const MAX_LEN = 15, MIN_LEN = 6, PASS_LABELS = ["For kort", "Svak", "Normal", "Sterk", "Sikker"];

  /*
  const checkPassword = () => {
    
  };
  */

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            maxLength={15}
            secureTextEntry
            onChangeText={password => setPassword(password)}
        />
        <PassMeter
            showLabels
            password={password}
            maxLength={MAX_LEN}
            minLength={MIN_LEN}
            labels={PASS_LABELS}
            useNativeDriver={true}
        />
    </View>
  );
  
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center" },
    input: {
      margin: 5,
      padding: 6,
      borderRadius: 8,
      marginBottom: 8,
      paddingHorizontal: 10,
      backgroundColor: "#eceff1"
    }
});

export default PasswordChecker;
