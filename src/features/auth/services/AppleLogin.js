// src/features/auth/services/AppleLogin.js
import { Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";

/**
 * @returns {Promise<{
 *  provider: "apple",
 *  socialId: string,
 *  name: string | null,
 *  email: string | null,
 *  avatar: string | null,
 *  token: string
 * } | null>}
 */
export async function handleAppleLogin() {
  if (Platform.OS !== "ios") {
    console.warn("Apple 로그인은 iOS 전용 기능입니다.");
    return null;
  }

  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (!credential.identityToken) {
      console.warn("⚠️ Apple identityToken 없음");
      return null;
    }

    return {
      provider: "apple",
      socialId: credential.user,
      name: credential.fullName?.givenName ?? null,
      email: credential.email ?? null,
      avatar: null,
      token: credential.identityToken,
    };
  } catch (err) {
    console.error("Apple login error:", err);
    return null;
  }
}
