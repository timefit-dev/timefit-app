import { Alert } from "react-native";
import { roomApi } from "../services/roomApi";

export function useRoom() {
  const createRoom = async (roomData) => {
    try {
      const result = await roomApi.createRoom(roomData);
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
