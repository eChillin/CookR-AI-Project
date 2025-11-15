import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SavedRecipesScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);

  // Load recipes whenever the screen is focused
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const stored = await AsyncStorage.getItem('recipes');
        if (stored) {
          setRecipes(JSON.parse(stored));
        } else {
          setRecipes([]);
        }
      } catch (err) {
        Alert.alert('Error', 'Failed to load recipes.');
      }
    };

    const unsubscribe = navigation.addListener('focus', loadRecipes);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => navigation.navigate('Recipe Detail', { recipe: item })}
    >
      <Text style={styles.recipeText}>{item.title}</Text>
      <Text style={styles.updatedText}>{item.updated}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Saved Recipes</Text>

      {recipes.length === 0 ? (
        <Text style={styles.emptyText}>No recipes saved yet.</Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F0FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#5B3E96',
  },
  recipeItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#D4C9FF',
  },
  recipeText: {
    fontSize: 18,
    color: '#5B3E96',
    fontWeight: '600',
  },
  updatedText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#5B3E96',
    marginTop: 50,
  },
});