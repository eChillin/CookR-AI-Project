import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';

export default function RecommendedSpicesScreen() {
  const [dishName, setDishName] = useState('');
  const [recommendations, setRecommendations] = useState('');

  const popularSpices = ['Garlic', 'Thyme', 'Paprika', 'Salt'];

  const handleGetRecommendations = () => {
    if (!dishName.trim()) {
      Alert.alert('Error', 'Please enter a dish name.');
      return;
    }
    // Simulate AI response for now
    const simulatedResponse = `Recommended spices for ${dishName}: Garlic, Thyme, Paprika, and Salt.`;
    setRecommendations(simulatedResponse);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Recommended Spices</Text>

      {/* Input */}
      <Text style={styles.label}>What recipe are you making?</Text>
      <TextInput
        placeholder="Type recipe name..."
        value={dishName}
        onChangeText={setDishName}
        style={styles.input}
      />

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleGetRecommendations}>
        <Text style={styles.buttonText}>Get Spice Recommendations</Text>
      </TouchableOpacity>

      {/* AI Response */}
      {recommendations ? (
        <View style={styles.responseCard}>
          <Text style={styles.responseText}>{recommendations}</Text>
        </View>
      ) : null}

      {/* Popular Spices */}
      <Text style={styles.sectionTitle}>Popular Spices</Text>
      {popularSpices.map((spice, index) => (
        <Text key={index} style={styles.spiceItem}>{spice}</Text>
      ))}

      {/* Footer */}
      <Text style={styles.footer}>
        Contact Support? <Text style={{ color: '#5B3E96' }}>Click here.</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EDE7FF', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#5B3E96', marginBottom: 20 },
  label: { fontSize: 16, color: '#5B3E96', marginBottom: 8 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D4C9FF',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#A87FFF',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  responseCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D4C9FF',
  },
  responseText: { color: '#5B3E96', fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#5B3E96' },
  spiceItem: { fontSize: 16, marginBottom: 8, color: '#333' },
  footer: { textAlign: 'center', marginTop: 30, color: '#333' },
});