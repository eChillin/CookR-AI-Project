import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const canned = [
  'What can I make with chicken, rice, and tomatoes?',
  'Give me a quick vegetarian dinner with potatoes and cheese.',
  'Recommend spices for a Mexican-style chicken dish.',
  'How long should I roast a 3 lb chicken at 375°F?'
];

export default function CannedQuestions({ onSelect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Questions</Text>

      <View style={styles.list}>
        {canned.map((q, i) => (
          <TouchableOpacity key={i} style={styles.chip} onPress={() => onSelect(q)}>
            <Text style={{ color: '#5B3E96' }}>{q}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 12 },
  title: { fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#5B3E96' },
  list: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { backgroundColor: '#F0E6FF', borderWidth: 1, borderColor: '#D4C9FF', padding: 8, borderRadius: 12, marginRight: 8, marginBottom: 8 },
});