// 이 파일은 결과 화면에 필요한 데이터를 서버로부터 가져오는 함수들을 정의합니다.
// 현재는 모의(mock) 데이터로 대체되어 있습니다.
import { mockResultData } from "../../../data/mockData";

/**
 * 특정 방의 결과 데이터를 가져오는 API 함수 (모의)
 * @param {number} roomId - 방의 ID
 * @returns {Promise<object>} - 결과 데이터
 */
export const getRoomResult = (roomId) => {
  // eslint-disable-next-line no-console
  console.log(`GET /api/rooms/${roomId}/result`);
  // 실제 앱에서는 fetch 또는 axios를 사용하여 서버와 통신합니다.
  // Promise.resolve를 사용하여 비동기 동작을 시뮬레이션합니다.
  return Promise.resolve(mockResultData);
};