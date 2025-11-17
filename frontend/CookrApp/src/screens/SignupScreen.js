import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>

      <Image source={require('../../assets/cookrlogo.png')} style={styles.logo} />

      <Text style={styles.title}>Welcome to Cookr!</Text>

      <Text style={styles.subtitle}>
        Create an account{'\n'}Enter your email to sign up for the app
      </Text>

      <TextInput
        style={styles.input}
        placeholder="email@example.com"
        placeholderTextColor="#A1A1A1"
        value={email}
        onChangeText={setEmail}
      />

      {/* Continue */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('SignupDetails', { email })}
      >
        <Text style={styles.primaryButtonText}>Continue</Text>
      </TouchableOpacity>

      {/* Already a member */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>
          Already a member? <Text style={styles.bold}>Sign in.</Text>
        </Text>
      </TouchableOpacity>

      {/* Forgot password */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.linkSmall}>Forgot your password? Click here.</Text>
      </TouchableOpacity>

      {/* Support */}
      <TouchableOpacity>
        <Text style={styles.support}>Contact Support? Click here.</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingTop: 65,
    alignItems: 'center',
  },
  logo: { width: 120, height: 120, resizeMode: 'contain', marginBottom: 10 },
  title: { fontSize: 26, fontWeight: '700', marginTop: 10, marginBottom: 8 },
  subtitle: {
    textAlign: 'center',
    fontSize: 13,
    color: '#5A5A5A',
    marginBottom: 25,
    lineHeight: 18,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    fontSize: 14,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  primaryButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  link: { fontSize: 14, marginTop: 10, color: '#000' },
  bold: { fontWeight: '700' },
  linkSmall: { fontSize: 12, marginTop: 10, color: '#000' },
  support: { fontSize: 12, marginTop: 30, color: '#7A7A7A' },
});
