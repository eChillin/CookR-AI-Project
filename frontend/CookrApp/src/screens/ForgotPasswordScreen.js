import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import API from "../config/API";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");

  async function sendResetCode() {
    try {
      const res = await fetch(API.sendReset, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data.success) {
        Alert.alert("Error", data.error || "Could not send reset code.");
        return;
      }

      navigation.navigate("VerifyReset", { email });
    } catch (err) {
      Alert.alert("Server Error", "Unable to send reset code.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Enter your email to receive a reset code.</Text>

      <TextInput
        style={styles.input}
        placeholder="email@example.com"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={sendResetCode}>
        <Text style={styles.buttonText}>Send Reset Code</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 100, paddingHorizontal: 25 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 10 },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 25 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 14, marginBottom: 15 },
  button: { backgroundColor: "#000", padding: 15, borderRadius: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600", fontSize: 16 },
  back: { marginTop: 20, fontSize: 14, textAlign: "center" },
});
