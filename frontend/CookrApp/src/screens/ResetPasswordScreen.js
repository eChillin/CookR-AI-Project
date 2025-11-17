import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import API from "../config/API";

export default function ResetPassword({ navigation, route }) {
  const { email } = route.params;
  const [newPass, setNewPass] = useState("");

  async function handleReset() {
    try {
      const res = await fetch(API.resetPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: newPass }),
      });

      const data = await res.json();

      if (!data.success) {
        Alert.alert("Error", data.error || "Failed to reset password");
        return;
      }

      Alert.alert("Password Reset", "Your password has been updated.", [
        { text: "Login", onPress: () => navigation.navigate("Login") }
      ]);
    } catch (err) {
      Alert.alert("Server Error", "Unable to reset password");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a New Password</Text>

      <TextInput
        style={styles.input}
        placeholder="New password"
        secureTextEntry
        value={newPass}
        onChangeText={setNewPass}
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Save Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 100, paddingHorizontal: 25 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 30 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 14, marginBottom: 20 },
  button: { backgroundColor: "#000", padding: 15, borderRadius: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "700" },
  back: { textAlign: "center", marginTop: 20, fontSize: 14 },
});
