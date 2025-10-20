import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export function LoginScreen() {
  const navigation = useNavigation();

  const handleLogin = (type) => {
    console.log(`${type} 로그인 시도`);
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      {/* 로고 */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* 로그인 버튼들 */}
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => handleLogin("구글")}
          style={({ pressed }) => [
            styles.button,
            styles.googleButton,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.iconRow}>
            <Image
              source={require("../../../../assets/google_icon.png")}
              style={styles.icon}
            />
            <Text style={styles.googleText}>구글로 로그인</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => handleLogin("카카오")}
          style={({ pressed }) => [
            styles.button,
            styles.kakaoButton,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.iconRow}>
            <Image
              source={require("../../../../assets/kakao_icon.png")}
              style={styles.icon}
            />
            <Text style={styles.kakaoText}>카카오톡으로 로그인</Text>
          </View>
        </Pressable>

        {Platform.OS === "ios" && (
          <Pressable
            onPress={() => handleLogin("애플")}
            style={({ pressed }) => [
              styles.button,
              styles.appleButton,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.iconRow}>
              <Image
                source={require("../../../../assets/apple_icon.png")}
                style={styles.icon}
              />
              <Text style={styles.appleText}>Apple로 로그인</Text>
            </View>
          </Pressable>
        )}

        <Pressable
          onPress={() => handleLogin("네이버")}
          style={({ pressed }) => [
            styles.button,
            styles.naverButton,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.iconRow}>
            <Image
              source={require("../../../../assets/naver_icon.png")}
              style={styles.icon}
            />
            <Text style={styles.naverText}>네이버로 로그인</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: width * 0.08,
    paddingTop: height * 0.06,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: height * 0.035,
  },
  logo: {
    width: width * 0.8,
    height: height * 0.3,
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.052,
    borderRadius: 10,
    marginVertical: height * 0.009,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: width * 0.055,
    height: width * 0.055,
    marginRight: width * 0.025,
    resizeMode: "contain",
  },
  googleButton: {
    backgroundColor: "#DB4437",
  },
  kakaoButton: {
    backgroundColor: "#FEE500",
  },
  appleButton: {
    backgroundColor: "#000",
  },
  naverButton: {
    backgroundColor: "#1EC800",
  },
  googleText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "600",
  },
  kakaoText: {
    color: "#000",
    fontSize: width * 0.04,
    fontWeight: "600",
  },
  appleText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "600",
  },
  naverText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "600",
  },
});
