import { useState } from "react";
import { Alert } from "react-native";
import { getProfileData } from "../services/profileApi";

export function useProfile() {
  const [name, setName] = useState("유지현");
  const [prevName, setPrevName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState(require("@assets/profile.jpg"));

  const handleEditPhoto = () => {
    Alert.alert("사진 변경", "사진 변경 기능은 추후 구현 예정입니다.");
  };

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?");
  };

  const handleStartEditing = () => {
    setPrevName(name);
    setIsEditing(true);
  };

  const handleFinishEditing = () => {
    if (name.trim() === "") {
      Alert.alert("입력 오류", "이름은 비워둘 수 없습니다.");
      setName(prevName);
      return;
    }
    setIsEditing(false);
  };

  // TODO: API 연동 시 실제 데이터 불러오기
  const fetchProfile = async () => {
    const data = await getProfileData();
    console.log("[Mock API 응답]", data); // mock 로그 출력
  };

  return {
    name,
    setName,
    prevName,
    isEditing,
    photo,
    handleEditPhoto,
    handleLogout,
    handleStartEditing,
    handleFinishEditing,
    fetchProfile,
  };
}
