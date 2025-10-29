
export const roomApi = {
  createRoom: async (roomData) => {
    console.log("🧩 [TEST MODE] roomApi.createRoom 호출됨");
    console.log("전달된 데이터:", roomData);

    // 실제 fetch/axios 대신 Promise로 테스트용 응답 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "✅ 테스트용 방 생성 완료",
          room: {
            roomId: Math.floor(Math.random() * 10000),
            owner: "테스트유저",
            ...roomData,
            createdAt: new Date().toISOString(),
          },
        });
      }, 700); // 0.7초 지연으로 자연스럽게
    });
  },
};
