import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import API from "../config/API";

export default function SignupDetails({ navigation, route }) {
  const { email } = route.params;

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    try {
      const response = await fetch(API.signupRequest, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullName, phone, username, password }),
      });

      const data = await response.json();

      if (!data.success) {
        Alert.alert("Error", data.error || "Signup failed");
        return;
      }

      navigation.navigate("VerifyCode", { email });
    } catch (err) {
      Alert.alert("Server Error", "Unable to create user");
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/cookrlogo.png")} style={styles.logo} />

      <Text style={styles.title}>Create your account</Text>

      <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.primaryButton} onPress={handleSignup}>
        <Text style={styles.primaryButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80, paddingHorizontal: 25, alignItems: "center", backgroundColor: "#fff" },
  logo: { width: 120, height: 120, resizeMode: "contain", marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 15 },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 10,
    marginBottom: 12,
  },
  primaryButton: { width: "100%", backgroundColor: "#000", padding: 15, borderRadius: 10, marginTop: 20 },
  primaryButtonText: { color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "600" },
});
