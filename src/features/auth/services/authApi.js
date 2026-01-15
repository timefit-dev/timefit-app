// src/features/auth/services/authApi.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://43.200.177.229:8080/api/auth";

/**
 * 소셜 accessToken → 서버 JWT
 */
export async function socialLogin(provider, accessToken) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      provider,      // "KAKAO"
      accessToken,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("❌ login response:", data);
    throw new Error("로그인 실패");
  }

  await AsyncStorage.setItem("jwt", data.accessToken);
  await AsyncStorage.setItem("refreshToken", data.refreshToken);

  return data;
}
