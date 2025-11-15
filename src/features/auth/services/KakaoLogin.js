import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KAKAO_REST_API_KEY = "f939f9e98e824f5ce7592923a30ed35c";

// ✅ Expo 개발환경용 redirect URI
const redirectUri = AuthSession.makeRedirectUri({
  scheme: "timefit", // app.json의 scheme과 동일
  useProxy: true,
});

// ✅ Kakao OAuth 설정
const discovery = {
  authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
  tokenEndpoint: "https://kauth.kakao.com/oauth/token",
};

export function useKakaoAuth() {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: KAKAO_REST_API_KEY,
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
      usePKCE: false, // Kakao는 PKCE 미사용
    },
    discovery
  );

  const login = async () => {
    try {
      const result = await promptAsync({ useProxy: true });

      if (result.type !== "success" || !result.params?.code) {
        console.warn("⚠️ 로그인 취소 또는 실패");
        return null;
      }

      const code = result.params.code;
      console.log("✅ 인가 코드:", code);

      // 🔑 토큰 요청
      const tokenRes = await fetch(discovery.tokenEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: KAKAO_REST_API_KEY,
          redirect_uri: redirectUri,
          code,
        }).toString(),
      });

      const tokenData = await tokenRes.json();

      if (!tokenData.access_token) {
        console.warn("⚠️ 토큰 요청 실패:", tokenData);
        return null;
      }

      await AsyncStorage.setItem("kakao_access_token", tokenData.access_token);
      console.log("🔑 액세스 토큰:", tokenData.access_token);

      // 👤 사용자 정보 요청
      const meRes = await fetch("https://kapi.kakao.com/v2/user/me", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });

      const userInfo = await meRes.json();
      console.log("👤 사용자 정보:", userInfo);

      return userInfo;
    } catch (e) {
      console.error("카카오 로그인 오류:", e);
      return null;
    }
  };

  return { login };
}
