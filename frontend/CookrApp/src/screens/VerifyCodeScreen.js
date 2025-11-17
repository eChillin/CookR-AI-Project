import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import API from "../config/API";

export default function VerifyCode({ route, navigation }) {
  const { email } = route.params;
  const [code, setCode] = useState("");

  async function handleVerify() {
    try {
      const res = await fetch(API.signupVerify, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!data.success) {
        Alert.alert("Incorrect Code", "Please try again");
        return;
      }

      Alert.alert("Success", "Account verified!", [
        { text: "Continue", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (err) {
      Alert.alert("Error", "Could not verify code");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <TextInput
        style={styles.input}
        placeholder="6-digit code"
        keyboardType="numeric"
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 100, backgroundColor: "#fff", alignItems: "center" },
  title: { fontSize: 22, marginBottom: 20, fontWeight: "600" },
  input: { width: "100%", padding: 15, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, marginBottom: 20 },
  button: { backgroundColor: "#000", padding: 15, width: "100%", borderRadius: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
