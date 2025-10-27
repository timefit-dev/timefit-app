import { Alert } from "react-native";
import { roomApi } from "../services/roomApi";

export function useRoom() {
  const createRoom = async ({ title, dates, startTime, endTime }) => {
    if (!title.trim()) return Alert.alert("⚠️ 제목을 입력해주세요");
    if (!dates.length) return Alert.alert("⚠️ 날짜를 선택해주세요");
    if (!startTime || !endTime) return Alert.alert("⚠️ 시간대를 입력해주세요");

    try {
      const result = await roomApi.createRoom({
        title,
        dates,
        startTime,
        endTime,
      });

      console.log("✅ 방 생성 성공 (테스트):", result);
      return result;
    } catch (e) {
      console.error("❌ 방 생성 중 오류:", e);
      Alert.alert("오류", "테스트용 방 생성 중 문제가 발생했습니다.");
      return null;
    }
  };

  return { createRoom };
}
