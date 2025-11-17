// src/features/auth/services/GoogleLogin.js
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

const WEB_CLIENT_ID =
  "144050250731-t0t3cj67l6p82t2inf5a5ql1pnp5npfl.apps.googleusercontent.com";

/**
 * @returns {{ handleGoogleLogin: () => Promise<SocialUser | null>, request: any }}
 */
export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: WEB_CLIENT_ID,
    androidClientId: WEB_CLIENT_ID,
    iosClientId: WEB_CLIENT_ID,
    redirectUri: "https://auth.expo.io/@yoojihyeon/timefit-app",
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await promptAsync();
      if (result?.type !== "success") {
        console.warn("⚠️ Google 로그인 취소 또는 실패");
        return null;
      }

      const token = result.authentication?.accessToken;
      if (!token) {
        console.warn("⚠️ Google accessToken 없음");
        return null;
      }

      // Google 사용자 정보 조회
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const info = await res.json();

      return {
        provider: "google",
        socialId: info.sub,
        name: info.name ?? null,
        email: info.email ?? null,
        avatar: info.picture ?? null,
        token,
      };
    } catch (err) {
      console.error("Google login error:", err);
      return null;
    }
  };

  return { handleGoogleLogin, request };
}
