import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { LoginForm } from "../components/LoginForm";

export function LoginScreen() {
  const { user, login } = useAuth();

  return (
    <View>
      {user ? (
        <Text>{user.name}님 환영합니다!</Text>
      ) : (
        <LoginForm onLogin={login} />
      )}
    </View>
  );
}
