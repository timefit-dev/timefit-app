// ✅ 테스트 전용 — 실제 API 호출 없음
export const roomApi = {
  createRoom: async (roomData) => {
    console.log("🧩 [TEST] roomApi.createRoom 호출됨");
    console.log(roomData);

    // 가짜 딜레이 후 성공 응답 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "테스트용 방 생성 완료",
          room: {
            roomId: Math.floor(Math.random() * 1000),
            ...roomData,
          },
        });
      }, 500);
    });
  },
};
