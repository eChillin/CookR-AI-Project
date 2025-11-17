import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import API from "../config/API";

export default function ForgotUsernameScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const recover = async () => {
    setUsername("");

    const res = await fetch(API.recoverUsername, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (data.success) {
      setUsername(`Your username is: ${data.username}`);
    } else {
      setUsername(data.error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/cookrlogo.png")} style={styles.logo} />

      <Text style={styles.title}>Recover Username</Text>

      <TextInput
        style={styles.input}
        placeholder="email@example.com"
        placeholderTextColor="#A1A1A1"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={recover}>
        <Text style={styles.buttonText}>Find Username</Text>
      </TouchableOpacity>

      {username ? <Text style={styles.result}>{username}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 70, alignItems: "center", backgroundColor: "#FFF" },
  logo: { width: 120, height: 120, marginBottom: 20, resizeMode: "contain" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  input: { width: "100%", borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 10, padding: 14, marginBottom: 15 },
  button: { width: "100%", backgroundColor: "#000", padding: 15, borderRadius: 10 },
  buttonText: { color: "#FFF", textAlign: "center", fontWeight: "700" },
  result: { marginTop: 20, fontSize: 14, fontWeight: "600" }
});
