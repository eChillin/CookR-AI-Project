import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function VerifyUsernameCodeScreen({ navigation }) {
  const [code, setCode] = useState('');

  return (
    <View style={styles.container}>

      <Image source={require('../../assets/cookrlogo.png')} style={styles.logo} />

      <Text style={styles.title}>Verification Code</Text>
      <Text style={styles.subtitle}>Enter the code sent to your email</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Code"
        placeholderTextColor="#B8A7D6"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ForgotUsername')}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.resend}>Resend Code</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0E9FF',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  logo: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6A4BBC',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6A4BBC',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  input: {
    width: '100%',
    padding: 14,
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#D6C6F6',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6A4BBC',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  resend: {
    marginTop: 15,
    textAlign: 'center',
    color: '#6A4BBC',
    fontWeight: '500',
  },
});
