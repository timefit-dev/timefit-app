// auth/services/authApi.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://your-backend.com/api/auth"; // 👉 백엔드 주소로 변경

// ✅ SDK에서 받은 token을 백엔드로 전달해 JWT 발급받기
export async function socialLogin(provider, token) {
  try {
    const response = await fetch(`${BASE_URL}/${provider}/callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");

    if (data.accessToken) await AsyncStorage.setItem("jwt", data.accessToken);
    return data; // { accessToken, refreshToken, user }
  } catch (err) {
    console.error(`[${provider}] login error:`, err);
    throw err;
  }
}

// ✅ JWT 기반 사용자 정보 조회
export async function fetchUserInfo() {
  try {
    const jwt = await AsyncStorage.getItem("jwt");
    if (!jwt) throw new Error("No JWT found");

    const res = await fetch(`${BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch user info");
    return data;
  } catch (err) {
    console.error("fetchUserInfo error:", err);
    throw err;
  }
}

// ✅ 로그아웃
export async function logout() {
  try {
    await AsyncStorage.removeItem("jwt");
  } catch (err) {
    console.error("logout error:", err);
  }
}

// ✅ API 요청용 헤더
export async function getAuthHeader() {
  const token = await AsyncStorage.getItem("jwt");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
