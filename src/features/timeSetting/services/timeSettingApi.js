// 서버 통신 관련 (임시로 콘솔 로그로 대체)
export const getRoomInfo = async (roomId) => {
  console.log("GET /api/rooms/" + roomId);
  // 실제로는 fetch로 불러오면 됨
  return {
    roomId: 1,
    title: "스터디 모임",
    dates: ["2025-10-15", "2025-10-17", "2025-10-20", "2025-10-21"],
    timeSlots: ["09:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
    isOwner: false,
    hasResponded: false,
    totalParticipants: 5,
    respondedCount: 3,
  };
};

export const postAvailableTimes = async (roomId, times) => {
  console.log("POST /api/rooms/" + roomId, times);
  return { success: true };
};