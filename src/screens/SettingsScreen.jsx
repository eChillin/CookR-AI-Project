import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default function SettingsScreen() {
  const handlePress = (option) => {
    Alert.alert(option, `${option} page coming soon`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Account Info */}
      <Text style={styles.sectionTitle}>Account Info</Text>
      <TouchableOpacity style={styles.option} onPress={() => handlePress('Account')}>
        <Text style={styles.optionText}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => handlePress('Security')}>
        <Text style={styles.optionText}>Security</Text>
      </TouchableOpacity>

      {/* Default Settings */}
      <Text style={styles.sectionTitle}>Default Settings</Text>
      <TouchableOpacity style={styles.option} onPress={() => handlePress('Notifications Settings')}>
        <Text style={styles.optionText}>Notifications Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => handlePress('Language')}>
        <Text style={styles.optionText}>Language</Text>
      </TouchableOpacity>

      {/* Support */}
      <Text style={styles.sectionTitle}>Support</Text>
      <TouchableOpacity style={styles.option} onPress={() => handlePress('Help Centre')}>
        <Text style={styles.optionText}>Help Centre</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => handlePress('Community Rules')}>
        <Text style={styles.optionText}>Community Rules</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => handlePress('Delete Account')}>
        <Text style={styles.optionText}>Delete Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6b3ff', // Light purple background
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#6a0dad', // Dark purple header
    paddingVertical: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  option: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});
