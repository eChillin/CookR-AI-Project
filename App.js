import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Correct paths for your structure
import HomeScreen from './src/screens/HomeScreen.jsx';
import AIScreen from './src/screens/AIScreen.jsx';
import SavedRecipesScreen from './src/screens/SavedRecipesScreen.jsx';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen.jsx';
import SettingsScreen from './src/screens/SettingsScreen.jsx';
import RecommendedSpicesScreen from './src/screens/RecommendedSpicesScreen.jsx';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'CookR' }} />
        <Stack.Screen name="AI Assistance" component={AIScreen} />
        <Stack.Screen name="Saved Recipes" component={SavedRecipesScreen} />
        <Stack.Screen name="Recipe Detail" component={RecipeDetailScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Recommended Spices" component={RecommendedSpicesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}