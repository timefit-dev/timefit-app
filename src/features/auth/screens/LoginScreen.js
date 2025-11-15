// src/features/auth/screens/LoginScreen.js
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
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGoogleAuth } from "../services/GoogleLogin";
import { handleAppleLogin } from "../services/AppleLogin";

// ✅ 세션 자동 마무리 (Expo 공식 권장)
WebBrowser.maybeCompleteAuthSession();

export function LoginScreen() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const { handleGoogleLogin } = useGoogleAuth();

  // ✅ Kakao OAuth 설정
  const KAKAO_REST_API_KEY = "f939f9e98e824f5ce7592923a30ed35c";
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "timefit",
    useProxy: true,
  });

  const discovery = {
    authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
    tokenEndpoint: "https://kauth.kakao.com/oauth/token",
  };

  // ✅ Expo SDK 54 이상에서는 useAuthRequest 사용
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: KAKAO_REST_API_KEY,
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
      usePKCE: false,
    },
    discovery
  );

  const handleKakaoLogin = async () => {
    try {
      // ✅ 브라우저에서 카카오 로그인 열기
      const result = await promptAsync({ useProxy: true });

      if (result.type !== "success" || !result.params?.code) {
        console.warn("⚠️ 로그인 취소 또는 실패");
        return null;
      }

      const code = result.params.code;
      console.log("✅ 인가 코드:", code);

      // ✅ 토큰 요청
      const tokenResponse = await fetch(discovery.tokenEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: KAKAO_REST_API_KEY,
          redirect_uri: redirectUri,
          code,
        }).toString(),
      });

      const tokenData = await tokenResponse.json();

      if (!tokenData.access_token) {
        console.warn("⚠️ 토큰 요청 실패:", tokenData);
        return null;
      }

      await AsyncStorage.setItem("kakao_access_token", tokenData.access_token);
      console.log("🔑 토큰:", tokenData.access_token);

      // ✅ 사용자 정보 요청
      const userInfoResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const userInfo = await userInfoResponse.json();
      console.log("👤 사용자 정보:", userInfo);

      return userInfo;
    } catch (error) {
      console.error("카카오 로그인 오류:", error);
      return null;
    }
  };

  // ✅ 로그인 버튼 클릭 핸들러
  const handleLogin = async (type) => {
    try {
      let user = null;
      if (type === "카카오") user = await handleKakaoLogin();
      if (type === "애플") user = await handleAppleLogin();
      if (type === "구글") user = await handleGoogleLogin();

      if (user) {
        console.log("✅ 로그인 성공:", user);
        navigation.replace("Dashboard");
      } else {
        console.warn("⚠️ 로그인 취소 또는 실패");
      }
    } catch (err) {
      console.error("로그인 중 오류:", err);
    }
  };

  // ✅ UI (기존 그대로)
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
        {["구글", "카카오", "애플"].map((type) => {
          if (type === "애플" && Platform.OS !== "ios") return null;

          const buttonStyle = {
            구글: styles.googleButton,
            카카오: styles.kakaoButton,
            애플: styles.appleButton,
          }[type];

          const iconSource = {
            구글: require("@assets/google_icon.png"),
            카카오: require("@assets/kakao_icon.png"),
            애플: require("@assets/apple_icon.png"),
          }[type];

          const textStyle = {
            구글: styles.googleText,
            카카오: styles.kakaoText,
            애플: styles.appleText,
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
  logo: { alignSelf: "center" },
  buttonContainer: { width: "100%" },
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
  iconRow: { flexDirection: "row", alignItems: "center" },
  icon: { resizeMode: "contain", marginRight: 10 },
  googleButton: { backgroundColor: "#DB4437" },
  kakaoButton: { backgroundColor: "#FEE500" },
  appleButton: { backgroundColor: "#000" },
  googleText: { color: "#fff", fontWeight: "600" },
  kakaoText: { color: "#000", fontWeight: "600" },
  appleText: { color: "#fff", fontWeight: "600" },
});
