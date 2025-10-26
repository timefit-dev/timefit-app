import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getProfileData } from "../services/profileApi";

export function useProfile() {
  const [photo, setPhoto] = useState(require("@assets/profile.jpg"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [prevName, setPrevName] = useState("");

  // ✅ 프로필 데이터 불러오기
  const fetchProfile = async () => {
    try {
      const data = await getProfileData();
      setName(data.nickname);
      setEmail(data.email);

      // ✅ 진짜 URL인 경우에만 변경
      if (
        data.profile_image &&
        typeof data.profile_image === "string" &&
        data.profile_image.startsWith("http")
      ) {
        setPhoto({ uri: data.profile_image });
      } else {
        // 아무것도 안 함 → 기존 기본 이미지 유지
      }
    } catch (error) {
      console.error(error);
      Alert.alert("오류", "프로필 정보를 불러오지 못했습니다.");
    }
  };

  // ✅ 사진 변경
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
    email,
    photo,
    isEditing,
    fetchProfile,
    handleEditPhoto,
    handleStartEditing,
    handleFinishEditing,
  };
}
