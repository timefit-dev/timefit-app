import React from "react";
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

export function LoginScreen() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const handleLogin = (type) => {
    console.log(`${type} 로그인 시도`);
    // TODO: 실제 소셜 로그인 로직 구현 후, 성공 시 아래 코드로 닉네임 설정 화면으로 이동
    navigation.navigate("NicknameSetup");
  };

  return (
    <View style={styles.container}>
      {/* 로고 */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@assets/logo.png")}
          style={[styles.logo, { width: width * 0.5, height: height * 0.2 }]}
          resizeMode="contain"
        />
      </View>

      {/* 로그인 버튼들 */}
      <View style={styles.buttonContainer}>
        {["구글", "카카오", "애플", "네이버"].map((type) => {
          if (type === "애플" && Platform.OS !== "ios") return null;

          const buttonStyle = {
            구글: styles.googleButton,
            카카오: styles.kakaoButton,
            애플: styles.appleButton,
            네이버: styles.naverButton,
          }[type];

          const iconSource = {
            구글: require("@assets/google_icon.png"),
            카카오: require("@assets/kakao_icon.png"),
            애플: require("@assets/apple_icon.png"),
            네이버: require("@assets/naver_icon.png"),
          }[type];

          const textStyle = {
            구글: styles.googleText,
            카카오: styles.kakaoText,
            애플: styles.appleText,
            네이버: styles.naverText,
          }[type];

          return (
            <Pressable
              key={type}
              onPress={() => handleLogin(type)}
              style={({ pressed }) => [
                styles.button,
                buttonStyle,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.iconRow}>
                <Image
                  source={iconSource}
                  style={[
                    styles.icon,
                    { width: width * 0.055, height: width * 0.055 },
                  ]}
                />
                <Text style={[textStyle, { fontSize: width * 0.04 }]}>
                  {`${type}로 로그인`}
                </Text>
              </View>
            </Pressable>
          );
        })}
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
    paddingHorizontal: "8%",
    paddingTop: "6%",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: "25%",
    marginTop: "10%",
  },
  logo: {
    alignSelf: "center",
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 10,
    marginVertical: 8,
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
    resizeMode: "contain",
    marginRight: 10,
  },
  googleButton: { backgroundColor: "#DB4437" },
  kakaoButton: { backgroundColor: "#FEE500" },
  appleButton: { backgroundColor: "#000" },
  naverButton: { backgroundColor: "#1EC800" },
  googleText: { color: "#fff", fontWeight: "600" },
  kakaoText: { color: "#000", fontWeight: "600" },
  appleText: { color: "#fff", fontWeight: "600" },
  naverText: { color: "#fff", fontWeight: "600" },
});