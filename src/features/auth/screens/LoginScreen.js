// src/features/auth/screens/LoginScreen.js
import React, { useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  useWindowDimensions,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginWithSocial } from "../services/socialAuth";

export function LoginScreen() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  /* ✅ 이미 로그인돼 있으면 이동 */
  useEffect(() => {
    AsyncStorage.getItem("jwt").then((jwt) => {
      console.log("🔐 jwt =", jwt);
      if (jwt) navigation.replace("Dashboard");
    });
  }, []);

  const handleLogin = async (provider) => {
    try {
      await loginWithSocial(provider); // KAKAO | GOOGLE | APPLE
      navigation.replace("Dashboard");
    } catch (e) {
      console.error(e);
      alert(`${provider} 로그인 실패`);
    }
  };

  return (
    <View style={styles.container}>
      {/* 로고 */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@assets/logo.png")}
          style={{ width: width * 0.5, height: height * 0.2 }}
          resizeMode="contain"
        />
      </View>

      {/* 카카오 로그인 */}
      <Pressable
        onPress={() => handleLogin("KAKAO")}
        style={({ pressed }) => [
          styles.button,
          styles.kakaoButton,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.iconRow}>
          <Image
            source={require("@assets/kakao_icon.png")}
            style={styles.icon}
          />
          <Text style={styles.kakaoText}>카카오로 로그인</Text>
        </View>
      </Pressable>

      {/* 구글 로그인 */}
      <Pressable
        onPress={() => handleLogin("GOOGLE")}
        style={({ pressed }) => [
          styles.button,
          styles.googleButton,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.iconRow}>
          <Image
            source={require("@assets/google_icon.png")}
            style={styles.icon}
          />
          <Text style={styles.googleText}>구글로 로그인</Text>
        </View>
      </Pressable>

      {/* 애플 로그인 (iOS만) */}
      {Platform.OS === "ios" && (
        <Pressable
          onPress={() => handleLogin("APPLE")}
          style={({ pressed }) => [
            styles.button,
            styles.appleButton,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.iconRow}>
            <Image
              source={require("@assets/apple_icon.png")}
              style={styles.icon}
            />
            <Text style={styles.appleText}>Apple로 로그인</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: "20%",
  },
  logoContainer: {
    marginBottom: "30%",
  },
  button: {
    width: "85%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  pressed: {
    opacity: 0.9,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },

  /* Kakao */
  kakaoButton: {
    backgroundColor: "#FEE500",
  },
  kakaoText: {
    fontWeight: "600",
    color: "#000",
  },

  /* Google */
  googleButton: {
    backgroundColor: "#DB4437",
  },
  googleText: {
    fontWeight: "600",
    color: "#fff",
  },

  /* Apple */
  appleButton: {
    backgroundColor: "#000",
  },
  appleText: {
    fontWeight: "600",
    color: "#fff",
  },
});
