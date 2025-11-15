// src/features/room/services/roomApi.js

// ✅ 랜덤 초대코드 생성 함수
function generateInviteCode() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const part1 = Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  const part2 = Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `${part1}-${part2}`;
}

export const roomApi = {
  createRoom: async (roomData) => {
    console.log("🧩 [TEST MODE] roomApi.createRoom 호출됨");
    console.log("전달된 데이터:", roomData);

    return new Promise((resolve) => {
      setTimeout(() => {
        // ✅ createdAt 기준 +2일 계산
        const createdDate = new Date(roomData.createdAt);
        const expiresDate = new Date(createdDate);
        expiresDate.setDate(createdDate.getDate() + 2);
        const formattedExpiresAt = expiresDate.toISOString().split("T")[0];

        // ✅ startTime ~ endTime 사이 timelist 자동 생성
        const startHour = parseInt(roomData.startTime.split(":")[0], 10);
        const endHour = parseInt(roomData.endTime.split(":")[0], 10);

        const timelist = [];
        for (let i = startHour; i <= endHour; i++) {
          timelist.push(`${String(i).padStart(2, "0")}:00`);
        }

        // ✅ 순서 고정된 결과 객체
        const orderedRoom = {
          id: "1",
          title: roomData.title,
          invitecode: generateInviteCode(), // ✅ 랜덤 생성
          owner: roomData.owner,
          dates: roomData.dates.sort((a, b) => new Date(a) - new Date(b)), // ✅ 날짜 정렬
          starttime: roomData.startTime,
          endtime: roomData.endTime,
          timelist: timelist, // ✅ 자동 생성된 timelist
          createdAt: roomData.createdAt,
          updatedAt: null,
          expiresAt: formattedExpiresAt,
        };

        // ✅ 보기 좋게 정렬된 JSON 출력
        console.log(
          "✅ 방 생성 성공 (테스트):",
          JSON.stringify(
            orderedRoom,
            [
              "id",
              "title",
              "invitecode",
              "owner",
              "dates",
              "starttime",
              "endtime",
              "timelist",
              "createdAt",
              "updatedAt",
              "expiresAt",
            ],
            2
          )
        );

        resolve(orderedRoom);
      }, 700);
    });
  },
};
