import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import CannedQuestions from '../components/CannedQuestions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [supportState, setSupportState] = useState(null);
  const [qrValue, setQrValue] = useState('');

  function truncateTo200Words(text) {
    if (!text) return '';
    const words = text.trim().split(/\s+/);
    return words.slice(0, 200).join(' ') + (words.length > 200 ? '...' : '');
  }

  async function handleSendQuery(payload) {
    setLoading(true);
    setSupportState(null);

    try {
      const simulatedResponse = `Here is a quick recipe suggestion for: ${payload.content}.
1. Prepare your ingredients.
2. Cook them together with spices.
3. Serve and enjoy!`;
      const limited = truncateTo200Words(simulatedResponse);

      setAiResponse(limited);
      setQrValue(JSON.stringify({ query: payload.content, preview: limited.substring(0, 80) }));
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveRecipe() {
    if (!aiResponse) {
      Alert.alert('Error', 'No recipe to save.');
      return;
    }
    const newRecipe = {
      id: Date.now().toString(),
      title: inputText || 'Recipe',
      content: aiResponse,
      image: 'https://via.placeholder.com/150',
      updated: `Saved on ${new Date().toLocaleDateString()}`,
    };

    try {
      const existing = await AsyncStorage.getItem('recipes');
      const recipes = existing ? JSON.parse(existing) : [];
      recipes.push(newRecipe);
      await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
      Alert.alert('Success', 'Recipe saved!');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  }

  function handleCanned(question) {
    setInputText(question);
    handleSendQuery({ type: 'text', content: question });
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsButton}
        >
          <Text style={styles.settingsText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.title}>CookR</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Ask the AI to create recipes from your ingredients</Text>

        {/* Input Card */}
        <View style={styles.inputCard}>
          <TextInput
            placeholder="Type ingredients or a question..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            style={styles.textInput}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() => Alert.alert('Upload Photo', 'Not implemented')}
            >
              <Text style={{ color: '#5B3E96' }}>Upload Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => handleSendQuery({ type: 'ingredients', content: inputText })}
            >
              <Text style={{ color: '#fff' }}>{loading ? 'Sending...' : 'Send'}</Text>
            </TouchableOpacity>
          </View>

          <CannedQuestions onSelect={handleCanned} />
        </View>

        {/* AI Response */}
        <View style={styles.responseCard}>
          <Text style={styles.cardTitle}>AI Suggestion</Text>
          {aiResponse ? (
            <View>
              <Text style={styles.responseText}>{aiResponse}</Text>

              {/* Support Buttons */}
              <View style={styles.supportRow}>
                <TouchableOpacity
                  style={[styles.supportButton, supportState === 'support' && styles.supportSelected]}
                  onPress={() => setSupportState('support')}
                >
                  <Text>Support</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.supportButton, supportState === 'dont' && styles.dontSelected]}
                  onPress={() => setSupportState('dont')}
                >
                  <Text>Don't Support</Text>
                </TouchableOpacity>
              </View>

              {/* QR Code */}
              {qrValue ? (
                <View style={{ marginTop: 12, alignItems: 'center' }}>
                  <Text>Recipe QR Code:</Text>
                  <QRCode value={qrValue} size={150} />
                </View>
              ) : null}

              {/* Save Recipe Button */}
              <TouchableOpacity
                style={[styles.primaryButton, { marginTop: 12, alignSelf: 'center', width: 180 }]}
                onPress={saveRecipe}
              >
                <Text style={{ color: '#fff' }}>Save Recipe</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text>No AI response yet.</Text>
          )}
        </View>

        {/* My Recipes Button */}
        <TouchableOpacity
          style={[styles.primaryButton, { marginTop: 20, alignSelf: 'center', width: 180 }]}
          onPress={() => navigation.navigate('Saved Recipes')}
        >
          <Text style={{ color: '#fff' }}>My Recipes</Text>
        </TouchableOpacity>

        {/* Recommended Spices Button */}
        <TouchableOpacity
          style={[styles.primaryButton, { marginTop: 20, alignSelf: 'center', width: 220 }]}
          onPress={() => navigation.navigate('Recommended Spices')}
        >
          <Text style={{ color: '#fff' }}>Recommended Spices</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F0FF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E0D9FF',
    backgroundColor: '#EDE7FF',
  },
  settingsButton: { width: 40, alignItems: 'center' },
  settingsText: { fontSize: 20, color: '#5B3E96' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#5B3E96' },
  content: { padding: 16 },
  subtitle: { marginBottom: 12, fontSize: 14, color: '#5B3E96' },
  inputCard: { backgroundColor: '#FFFFFF', padding: 12, borderRadius: 10, marginBottom: 16 },
  textInput: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#D4C9FF',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FAF8FF',
    color: '#5B3E96',
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  primaryButton: { backgroundColor: '#A87FFF', padding: 12, borderRadius: 8, width: 100, alignItems: 'center' },
  outlineButton: { borderWidth: 1, borderColor: '#A87FFF', padding: 12, borderRadius: 8, width: 120, alignItems: 'center' },
  responseCard: { padding: 12, borderWidth: 1, borderColor: '#D4C9FF', borderRadius: 10, backgroundColor: '#FFFFFF' },
  cardTitle: { fontWeight: 'bold', marginBottom: 8, color: '#5B3E96' },
  responseText: { lineHeight: 20, color: '#5B3E96' },
  supportRow: { flexDirection: 'row', marginTop: 12 },
  supportButton: { padding: 10, borderWidth: 1, borderColor: '#A87FFF', borderRadius: 8, marginRight: 10 },
  supportSelected: { backgroundColor: '#E0D9FF' },
  dontSelected: { backgroundColor: '#FFE0F0' },
});