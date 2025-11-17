import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function WelcomeScreen({ navigation }) {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/cookrlogo.png")} style={styles.logo} />

      <Text style={styles.title}>Welcome to Cookr!</Text>
      <Text style={styles.subtitle}>
        Create an account{"\n"}Enter your email to sign up for the app
      </Text>

      <TextInput
        style={styles.input}
        placeholder="email@example.com"
        value={email}
        onChangeText={setEmail}
      />

      {/* Continue */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate("SignupDetails", { email })}
      >
        <Text style={styles.primaryButtonText}>Continue</Text>
      </TouchableOpacity>

      {/* Existing user */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>
          Already a member? <Text style={styles.bold}>Sign in</Text>
        </Text>
      </TouchableOpacity>

      {/* Forgot password */}
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.smallLink}>Forgot your password? Click here.</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.support}>Contact Support? Click here.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 65, backgroundColor: "#fff", paddingHorizontal: 25 },
  logo: { width: 120, height: 120, resizeMode: "contain", marginBottom: 10 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 10 },
  subtitle: { textAlign: "center", fontSize: 13, color: "#5A5A5A", marginBottom: 25 },
  input: { width: "100%", borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 10, padding: 14, marginBottom: 15 },
  primaryButton: { width: "100%", backgroundColor: "#000", borderRadius: 8, padding: 15, marginBottom: 15 },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "600", textAlign: "center" },
  link: { marginTop: 10, fontSize: 14 },
  bold: { fontWeight: "700" },
  smallLink: { marginTop: 10, fontSize: 12 },
  support: { marginTop: 30, fontSize: 12, color: "#7A7A7A" },
});
