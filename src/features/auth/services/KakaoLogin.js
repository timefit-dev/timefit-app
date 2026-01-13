// src/features/auth/services/KakaoLogin.js
import { login, unlink } from "@react-native-seoul/kakao-login";

export async function kakaoLogin() {
  const token = await login();

  if (!token?.accessToken) {
    throw new Error("카카오 accessToken 없음");
  }

  return token.accessToken;
}

export async function kakaoUnlink() {
  await unlink();
}
