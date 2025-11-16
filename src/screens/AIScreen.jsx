import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AIScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AI Assistance Coming Soon!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F0FF' },
  text: { fontSize: 20, color: '#5B3E96', fontWeight: 'bold' },
});