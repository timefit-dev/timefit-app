import NaverLogin from "@react-native-seoul/naver-login";
import { socialLogin } from "./authApi";

const NAVER_CLIENT_ID = "YOUR_NAVER_CLIENT_ID";
const NAVER_CLIENT_SECRET = "YOUR_NAVER_CLIENT_SECRET";
const NAVER_APP_NAME = "YOUR_APP_NAME";

export async function handleNaverLogin() {
  try {
    const result = await NaverLogin.login({
      appName: NAVER_APP_NAME,
      consumerKey: NAVER_CLIENT_ID,
      consumerSecret: NAVER_CLIENT_SECRET,
      serviceUrlScheme: "naverlogin",
    });

    const resultData = await socialLogin("naver", result.accessToken);
    return resultData.user;
  } catch (err) {
    console.error("Naver login error:", err);
  }
}
