import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import API from "../config/API";

export default function VerifyReset({ navigation, route }) {
  const { email } = route.params;
  const [code, setCode] = useState("");

  async function verifyCode() {
    try {
      const res = await fetch(API.verifyReset, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!data.success) {
        Alert.alert("Incorrect Code", "Please try again.");
        return;
      }

      navigation.navigate("ResetPassword", { email });
    } catch (err) {
      Alert.alert("Server Error", "Unable to verify code.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Reset Code</Text>
      <Text style={styles.subtitle}>A 6-digit code was sent to your email.</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter code"
        keyboardType="numeric"
        maxLength={6}
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity style={styles.button} onPress={verifyCode}>
        <Text style={styles.buttonText}>Verify Code</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 100, paddingHorizontal: 25 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 10 },
  subtitle: { fontSize: 14, marginBottom: 25, color: "#555" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 14, marginBottom: 15 },
  button: { backgroundColor: "#000", padding: 15, borderRadius: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "600" },
  back: { textAlign: "center", marginTop: 20, fontSize: 14 },
});
