// src/features/auth/services/socialAuth.js
import { kakaoLogin } from "./KakaoLogin"; // ⬅️ 경로/대소문자 정확히!
import { socialLogin } from "./authApi";

export async function loginWithSocial(provider) {
  let accessToken;

  switch (provider) {
    case "KAKAO":
      accessToken = await kakaoLogin(); // ✅ 여기서 undefined 나면 import 문제
      break;

    default:
      throw new Error("지원하지 않는 로그인 방식");
  }

  // accessToken → 백엔드 → JWT
  await socialLogin(provider, accessToken);
}
