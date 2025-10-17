import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function LoginScreen() {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#DB4437" }]}
        onPress={handleLogin}
      >
        <Text style={styles.text}>G  구글로 로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FEE500" }]}
        onPress={handleLogin}
      >
        <Text style={[styles.text, { color: "#000" }]}>💬  카카오로 로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#1EC800" }]}
        onPress={handleLogin}
      >
        <Text style={styles.text}>N  네이버로 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});
