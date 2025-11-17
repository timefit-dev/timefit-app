// src/features/auth/services/KakaoLogin.js
import * as AuthSession from "expo-auth-session";

const KAKAO_REST_API_KEY = "f939f9e98e824f5ce7592923a30ed35c";

const redirectUri = AuthSession.makeRedirectUri({
  scheme: "timefit",
  useProxy: true,
});

const discovery = {
  authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
  tokenEndpoint: "https://kauth.kakao.com/oauth/token",
};

/**
 * @returns {{ login: () => Promise<SocialUser | null>, request: any }}
 */
export function useKakaoAuth() {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: KAKAO_REST_API_KEY,
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
      usePKCE: false,
    },
    discovery
  );

  const login = async () => {
    try {
      const result = await promptAsync({ useProxy: true });
      if (result.type !== "success" || !result.params?.code) {
        console.warn("⚠️ Kakao 로그인 취소 또는 실패");
        return null;
      }

      const code = result.params.code;

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
      const accessToken = tokenData.access_token;
      if (!accessToken) {
        console.warn("⚠️ Kakao 토큰 요청 실패:", tokenData);
        return null;
      }

      const meRes = await fetch("https://kapi.kakao.com/v2/user/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userInfo = await meRes.json();

      return {
        provider: "kakao",
        socialId: userInfo.id?.toString() ?? "",
        name: userInfo.kakao_account?.profile?.nickname ?? null,
        email: userInfo.kakao_account?.email ?? null,
        avatar:
          userInfo.kakao_account?.profile?.profile_image_url ?? null,
        token: accessToken,
      };
    } catch (e) {
      console.error("카카오 로그인 오류:", e);
      return null;
    }
  };

  return { login, request };
}
