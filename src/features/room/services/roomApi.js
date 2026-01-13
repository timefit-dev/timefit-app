import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
console.log("🌐 BASE_URL:", BASE_URL);

export const roomApi = {
  createRoom: async (roomData) => {
    console.log("📡 roomApi.createRoom 시작");
    console.log("📦 요청 데이터:", roomData);

    try {
      const token = await AsyncStorage.getItem("jwt");
      console.log("🪪 jwt token:", token);

      const payload = {
          title: roomData.title, // ✅ roomData로 변경
          dates: roomData.dates,
          startTime: roomData.startTime,
          endTime: roomData.endTime,
      };

      console.log("📦 실제 전송 payload:", payload);

      const res = await fetch(`${BASE_URL}/api/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("❌ CREATE ROOM status:", res.status);
      const rawText = await res.text();
      console.log("❌ CREATE ROOM body:", rawText);

      if (res.status === 401) {
        await AsyncStorage.clear();
        throw new Error("UNAUTHORIZED");
      }

      if (!res.ok) {
        throw new Error("CREATE_FAILED");
      }

      const data = JSON.parse(rawText);
      console.log("✅ 방 생성 성공:", data);
      return data;

    } catch (error) {
      console.error("🔥 FETCH 자체 실패:", error);
      throw error;
    }
  },
};
