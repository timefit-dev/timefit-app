import { useState } from "react";

export function useRoom() {
  const BASE_URL = "http://YOUR_SERVER_URL";

  const createRoom = async (data) => { /* 이미 있음 */ };

  // 🔥 PUT /rooms/{roomId}
  const updateRoom = async (roomId, data) => {
    try {
      const response = await fetch(`${BASE_URL}/rooms/${roomId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Update failed");

      return await response.json();
    } catch (err) {
      console.error("❌ 방 수정 실패:", err);
      return null;
    }
  };

  // 🔥 DELETE /rooms/{roomId}
  const deleteRoom = async (roomId) => {
    try {
      const response = await fetch(`${BASE_URL}/rooms/${roomId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      return true;
    } catch (err) {
      console.error("❌ 방 삭제 실패:", err);
      return false;
    }
  };

  return {
    createRoom,
    updateRoom,
    deleteRoom,
  };
}
