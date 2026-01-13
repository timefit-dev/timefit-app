// src/features/profile/hooks/useProfile.js
import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getProfileData } from "../services/profileApi";

/* ===============================
   🔥 테스트 끝나면 반드시 삭제
=============================== */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { kakaoUnlink } from "../../auth/services/KakaoLogin";
/* =============================== */

export function useProfile() {
  /* ===============================
     ✅ 임시 프로필 데이터 (백엔드 미완)
  =============================== */
  const [name, setName] = useState("유지현");
  const [email, setEmail] = useState("jihyun@timefit.app");
  const [meetingCount, setMeetingCount] = useState(5);

  const [photo, setPhoto] = useState(require("@assets/profile.jpg"));
  const [isEditing, setIsEditing] = useState(false);
  const [prevName, setPrevName] = useState("");

  /* ===============================
     ⚠️ 테스트용 로그아웃 (카카오 unlink)
     - 배포 전 반드시 제거
  =============================== */
  const handleLogoutForTest = async () => {
    try {
      // 1️⃣ 카카오 계정 - 앱 연결 완전 해제
      /* await kakaoUnlink(); */
      await AsyncStorage.clear();
      console.log("✅ kakao unlink 완료 (테스트)");

      // 2️⃣ 앱 JWT 제거
      await AsyncStorage.removeItem("jwt");
      await AsyncStorage.removeItem("refreshToken");

      Alert.alert(
        "테스트 로그아웃",
        "카카오 연결 해제 완료\n앱을 완전히 종료 후 다시 실행하세요"
      );
    } catch (e) {
      console.error(e);
      Alert.alert("오류", "테스트 로그아웃 실패");
    }
  };

  /* ===============================
     ✅ 프로필 데이터 불러오기
     - 지금은 mock + API 혼합
     - 백엔드 완성되면 API만 사용
  =============================== */
  const fetchProfile = async () => {
    try {
      const data = await getProfileData();

      setName(data.nickname ?? "유지현");
      setEmail(data.email ?? "jihyun@timefit.app");
      setMeetingCount(data.meetingCount ?? 5);

      if (
        data.profile_image &&
        typeof data.profile_image === "string" &&
        data.profile_image.startsWith("http")
      ) {
        setPhoto({ uri: data.profile_image });
      }
    } catch (error) {
      console.error(error);
      Alert.alert("오류", "프로필 정보를 불러오지 못했습니다.");
    }
  };

  /* ===============================
     ✅ 사진 변경
  =============================== */
  const handleEditPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "권한 거부됨",
        "사진을 변경하려면 갤러리 접근 권한이 필요합니다."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return;
    setPhoto({ uri: result.assets[0].uri });
  };

  /* ===============================
     ✅ 이름 수정
  =============================== */
  const handleStartEditing = () => {
    setPrevName(name);
    setIsEditing(true);
  };

  const handleFinishEditing = () => {
    if (name.trim() === "") {
      Alert.alert("입력 오류", "이름을 비워둘 수 없습니다.");
      setName(prevName);
      return;
    }
    setIsEditing(false);
  };

  return {
    name,
    setName,
    email,
    meetingCount,
    photo,
    isEditing,

    fetchProfile,
    handleEditPhoto,
    handleStartEditing,
    handleFinishEditing,

    handleLogoutForTest, // ⚠️ 테스트용
  };
}
