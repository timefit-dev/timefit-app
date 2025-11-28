import { useState, useEffect } from "react";
import { Alert, LayoutAnimation, Share } from "react-native";
import * as Clipboard from "expo-clipboard";
import { mockRooms } from "../../../data/mockData";

export function useDashboard() {
  const [expandedRoomId, setExpandedRoomId] = useState(null);
  const [rooms, setRooms] = useState([]);

  // 🔥 대시보드 방 목록 가져오기 (현재는 mock)
  const fetchRooms = async () => {
    // 서버 연동되면 여기에 fetch 변경하면 됨
    setRooms(mockRooms);
  };

  // 🔥 외부에서 호출할 수 있는 새로고침 함수
  const refreshRooms = () => {
    fetchRooms();
  };

  // 화면 진입 시 1회 실행
  useEffect(() => {
    fetchRooms();
  }, []);

  // 🔗 초대 링크 복사
  const handleInvite = async (inviteCode) => {
    const inviteLink = `https://timefit.app/invite?code=${inviteCode}`;

    try {
      await Clipboard.setStringAsync(inviteLink);
      await Share.share({
        message: `TimeFit 방에 초대합니다! 🎉\n\n초대 링크: ${inviteLink}`,
      });

      Alert.alert("✅ 초대 링크 복사 완료", "공유 창이 열렸습니다!");
    } catch (err) {
      Alert.alert("오류", "초대 링크를 복사하는 중 문제가 발생했습니다.");
      console.error(err);
    }
  };

  // 🔽 방 접기/펼치기
  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedRoomId(expandedRoomId === id ? null : id);
  };

  return {
    rooms,
    setRooms,
    refreshRooms,
    expandedRoomId,
    handleInvite,
    toggleExpand,
  };
}
