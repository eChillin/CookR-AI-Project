import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    StyleSheet,
} from "react-native";

export default function IngredientInput() {
    const [ingredients, setIngredients] = useState("");
    const [recipe, setRecipe] = useState("");
    const [feedback, setFeedback] = useState(""); // track support feedback

    const getRecipe = async () => {
        try {
            const response = await fetch("http://192.168.4.143:5000/api/recipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ingredients: ingredients.split(",") }),
            });

            const data = await response.json();

            if (data.recipe) {
                setRecipe(data.recipe);
                setFeedback(""); // reset feedback when new recipe loads
            } else if (data.error) {
                setRecipe("Error: " + data.error);
            } else {
                setRecipe("No recipe returned.");
            }
        } catch (error) {
            console.error(error);
            setRecipe("Error fetching recipe.");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#E6E6FA" }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>CookR Ingredient Helper</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter ingredients (e.g. eggs, spinach, cheese)"
                    value={ingredients}
                    onChangeText={setIngredients}
                    placeholderTextColor="#888"
                />

                <View style={styles.buttonContainer}>
                    <Button title="Get Recipe" onPress={getRecipe} color="#6A5ACD" />
                </View>

                {recipe !== "" && (
                    <View style={styles.recipeBox}>
                        <Text style={styles.recipeTitle}>Your Recipe</Text>

                        {recipe.split("\n").map((line, index) => {
                            if (line.toLowerCase().includes("ingredients")) {
                                return (
                                    <Text key={index} style={styles.sectionHeader}>
                                        {line}
                                    </Text>
                                );
                            } else if (line.toLowerCase().includes("instructions")) {
                                return (
                                    <Text key={index} style={styles.sectionHeader}>
                                        {line}
                                    </Text>
                                );
                            } else if (line.match(/^\d+\./)) {
                                return (
                                    <Text key={index} style={styles.instructionText}>
                                        {line}
                                    </Text>
                                );
                            } else if (line.startsWith("-")) {
                                return (
                                    <Text key={index} style={styles.ingredientText}>
                                        {line}
                                    </Text>
                                );
                            } else {
                                return (
                                    <Text key={index} style={styles.recipeText}>
                                        {line}
                                    </Text>
                                );
                            }
                        })}

                        {/* Feedback buttons */}
                        <View style={styles.feedbackContainer}>
                            <Button
                                title="Support 👍"
                                onPress={() => setFeedback("You marked this recipe as Supported.")}
                                color="#4CAF50"
                            />
                            <Button
                                title="Don't Support 👎"
                                onPress={() =>
                                    setFeedback("You marked this recipe as Not Supported.")
                                }
                                color="#F44336"
                            />
                        </View>

                        {feedback !== "" && (
                            <Text style={styles.feedbackText}>{feedback}</Text>
                        )}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1,
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#4B0082",
    },
    input: {
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
    },
    buttonContainer: {
        marginBottom: 20,
    },
    recipeBox: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
    },
    recipeTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#4B0082",
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
        color: "#4B0082",
    },
    ingredientText: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 3,
    },
    instructionText: {
        fontSize: 16,
        marginBottom: 5,
    },
    recipeText: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 5,
    },
    feedbackContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },
    feedbackText: {
        marginTop: 10,
        fontSize: 16,
        fontStyle: "italic",
        textAlign: "center",
        color: "#333",
    },
});
