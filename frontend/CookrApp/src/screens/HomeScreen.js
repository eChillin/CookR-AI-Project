import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>Welcome to Cookr 👨‍🍳</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Create Meal Plan</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Browse Recipes</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Shopping List</Text>
      </View>

      <TouchableOpacity
        style={styles.logout}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0E9FF',
    padding: 25,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6A4BBC',
    marginTop: 30,
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 14,
    marginVertical: 10,
    borderColor: '#D6C6F6',
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6A4BBC',
  },
  logout: {
    marginTop: 40,
    alignSelf: 'center',
  },
  logoutText: {
    color: '#6A4BBC',
    fontWeight: 'bold',
  },
});
