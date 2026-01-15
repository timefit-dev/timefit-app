import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
console.log("🌐 BASE_URL:", BASE_URL);

export function useRoom() {
  /* ===============================
     ✅ POST /api/rooms
  =============================== */
  const createRoom = async (data) => {
    console.log("📡 useRoom.createRoom 호출");
    console.log("📦 요청 데이터:", data);

    try {
      const token = await AsyncStorage.getItem("jwt");
      console.log("🪪 jwt token:", token);

      const res = await fetch(`${BASE_URL}/api/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      // 🔥 핵심 로그
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

      const result = JSON.parse(rawText);
      console.log("✅ 방 생성 성공:", result);
      return result;

    } catch (e) {
      console.error("🔥 방 생성 fetch 실패:", e);
      throw e;
    }
  };

  /* ===============================
     🔥 PUT /api/rooms/{roomId}
  =============================== */
  const updateRoom = async (roomId, data) => {
    try {
      const token = await AsyncStorage.getItem("jwt");

      const res = await fetch(`${BASE_URL}/api/rooms/${roomId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (res.status === 401) {
        await AsyncStorage.clear();
        throw new Error("UNAUTHORIZED");
      }

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "UPDATE_FAILED");
      }

      return await res.json();
    } catch (e) {
      console.error("❌ 방 수정 실패:", e);
      throw e;
    }
  };

  /* ===============================
     🔥 DELETE /api/rooms/{roomId}
  =============================== */
  const deleteRoom = async (roomId) => {
    try {
      const token = await AsyncStorage.getItem("jwt");

      const res = await fetch(`${BASE_URL}/api/rooms/${roomId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        await AsyncStorage.clear();
        throw new Error("UNAUTHORIZED");
      }

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "DELETE_FAILED");
      }

      return true;
    } catch (e) {
      console.error("❌ 방 삭제 실패:", e);
      throw e;
    }
  };

  return {
    createRoom,
    updateRoom,
    deleteRoom,
  };
}
