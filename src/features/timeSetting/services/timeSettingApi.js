import { mockRoomConfig } from "../../../data/mockData";

// 서버 통신 관련 (임시로 콘솔 로그로 대체)
export const getRoomInfo = (roomId) => {
  // eslint-disable-next-line no-console
  console.log(`GET /api/rooms/${roomId}`);
  // 실제로는 fetch로 불러오면 됨
  return mockRoomConfig;
};

export const postAvailableTimes = (roomId, times) => {
  // eslint-disable-next-line no-console
  console.log(`POST /api/rooms/${roomId}`, times);
  return { success: true };
};