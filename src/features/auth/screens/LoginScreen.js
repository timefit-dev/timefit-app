import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

// ✅ 매직 넘버 제거용 상수 정의
const LAYOUT = {
  PADDING_TOP: 90,
  LOGO_WIDTH: 300,
  LOGO_HEIGHT: 200,
  LOGO_MARGIN_BOTTOM: 10,
  BUTTON_HEIGHT: 50,
};

export function LoginScreen() {
  const navigation = useNavigation();

  // ✅ onPress 핸들러 추가
  const handleGoogleLogin = () => {
    console.log("구글 로그인 시도");
    navigation.navigate("Dashboard");
  };

  const handleKakaoLogin = () => {
    console.log("카카오 로그인 시도");
    navigation.navigate("Dashboard");
  };

  const handleNaverLogin = () => {
    console.log("네이버 로그인 시도");
    navigation.navigate("Dashboard");
  };

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
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#DB4437" }]}
          onPress={handleGoogleLogin}
        >
          <Text style={styles.text}>G 구글로 로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FEE500" }]}
          onPress={handleKakaoLogin}
        >
          <Text style={[styles.text, { color: "#000" }]}>
            💬 카카오로 로그인
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#1EC800" }]}
          onPress={handleNaverLogin}
        >
          <Text style={styles.text}>N 네이버로 로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: LAYOUT.PADDING_TOP,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: LAYOUT.LOGO_MARGIN_BOTTOM,
  },
  logo: {
    width: LAYOUT.LOGO_WIDTH,
    height: LAYOUT.LOGO_HEIGHT,
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: LAYOUT.BUTTON_HEIGHT,
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
