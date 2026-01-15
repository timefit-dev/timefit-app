// src/features/profile/services/profileApi.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://13.124.232.236:8080";

export async function getProfileData() {
  const jwt = await AsyncStorage.getItem("jwt");
  if (!jwt) throw new Error("No JWT");

  const res = await fetch(`${BASE_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!res.ok) throw new Error("프로필 조회 실패");

  return res.json();
}
