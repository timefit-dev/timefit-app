import { useState } from "react";
import { Alert, LayoutAnimation, Share } from "react-native";
import * as Clipboard from "expo-clipboard";
import { mockRooms } from "../../../data/mockData";

export function useDashboard() {
  const [expandedRoomId, setExpandedRoomId] = useState(null);
  const [rooms] = useState(mockRooms); // 나중에 API 데이터로 교체 예정

  const handleInvite = async (inviteCode) => {
    // ✅ 서버에서 이미 생성된 초대 코드 사용
    const inviteLink = `https://timefit.app/invite?code=${inviteCode}`;
    try {
      await Clipboard.setStringAsync(inviteLink);
      await Share.share({
        message: `TimeFit 방에 초대합니다! 🎉\n\n초대 링크: ${inviteLink}`,
      });
      Alert.alert("✅ 초대 링크 복사 완료", "공유 창이 열렸습니다!");
    } catch (error) {
      Alert.alert("오류", "초대 링크를 복사하는 중 문제가 발생했습니다.");
      console.error(error);
    }
  };

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedRoomId(expandedRoomId === id ? null : id);
  };

  return { rooms, expandedRoomId, handleInvite, toggleExpand };
}
