import { login } from "@react-native-seoul/kakao-login";
import { socialLogin } from "./authApi";

export async function handleKakaoLogin() {
  try {
    const token = await login();
    const result = await socialLogin("kakao", token.accessToken);
    return result.user;
  } catch (err) {
    console.error("Kakao login error:", err);
  }
}
