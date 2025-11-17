import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import SignupScreen from "../screens/SignupScreen";
import SignupDetailsScreen from "../screens/SignupDetailsScreen";
import VerifyCodeScreen from "../screens/VerifyCodeScreen";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";

import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import VerifyResetScreen from "../screens/VerifyResetScreen";  // renamed ✔
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

import ForgotUsernameScreen from "../screens/ForgotUsernameScreen";
import VerifyUsernameCodeScreen from "../screens/VerifyUsernameCodeScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* AUTH START */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />

      {/* SIGNUP FLOW */}
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="SignupDetails" component={SignupDetailsScreen} />
      <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />

      {/* LOGIN */}
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* HOME */}
      <Stack.Screen name="Home" component={HomeScreen} />

      {/* PASSWORD RESET FLOW */}
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyReset" component={VerifyResetScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

      {/* USERNAME RECOVERY FLOW */}
      <Stack.Screen name="ForgotUsername" component={ForgotUsernameScreen} />
      <Stack.Screen name="VerifyUsernameCode" component={VerifyUsernameCodeScreen} />

    </Stack.Navigator>
  );
}
