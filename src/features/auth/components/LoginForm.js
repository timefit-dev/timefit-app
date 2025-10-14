import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

export function LoginForm({ onLogin }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <TextInput placeholder="ID" onChangeText={setId} value={id} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="로그인" onPress={() => onLogin(id, password)} />
    </View>
  );
}
