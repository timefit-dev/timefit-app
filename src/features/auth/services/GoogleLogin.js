import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { socialLogin } from "./authApi";

WebBrowser.maybeCompleteAuthSession();

const WEB_CLIENT_ID =
  "144050250731-t0t3cj67l6p82t2inf5a5ql1pnp5npfl.apps.googleusercontent.com";

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: WEB_CLIENT_ID, // ✅ 웹 애플리케이션용 클라이언트 ID
    androidClientId: WEB_CLIENT_ID,
    iosClientId: WEB_CLIENT_ID,
    redirectUri: "https://auth.expo.io/@yoojihyeon/timefit-app", // ✅ expo 계정 + slug 정확히 일치
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await promptAsync();
      if (result?.type === "success") {
        const token = result.authentication?.accessToken;
        const data = await socialLogin("google", token);
        if (data?.accessToken) {
          await AsyncStorage.setItem("jwt", data.accessToken);
          return data.user;
        }
      }
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  return { handleGoogleLogin, request };
}
