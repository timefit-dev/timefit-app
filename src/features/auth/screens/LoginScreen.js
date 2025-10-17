import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* 로고 영역 */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/logo.png")}
          style={styles.logo}
        />
      </View>

      {/* 소셜 로그인 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#DB4437" }]}>
          <Text style={styles.text}>G  구글로 로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: "#FEE500" }]}>
          <Text style={[styles.text, { color: "#000" }]}>💬  카카오로 로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: "#1EC800" }]}>
          <Text style={styles.text}>N  네이버로 로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // ✅ 중앙 → 위쪽으로 변경
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 90, // ✅ 위쪽에서 시작하도록 여백 조정
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 300,
    height: 200,
  },
  buttonContainer: {
    width: "100%",
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
