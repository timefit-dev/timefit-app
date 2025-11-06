import { Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { socialLogin } from "./authApi";

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

    const result = await socialLogin("apple", credential.identityToken);
    return result.user;
  } catch (err) {
    console.error("Apple login error:", err);
  }
}
