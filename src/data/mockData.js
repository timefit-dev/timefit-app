export const mockRooms = [
  {
    roomNumber: "1",
    title: "스터디룸 A",
    owner: "지현",
    date: "2025-10-21", // 방 생성 날짜
    startTime: "09:00",
    endTime: "18:00",
    dates: ["10-15", "10-17", "10-20", "10-21"],
    participants: [
      {
        id: 1,
        name: "지현",
        avatar: require("../../assets/profile1.jpg"),
      },
      {
        id: 2,
        name: "민수",
        avatar: require("../../assets/profile2.jpg"),
      },
      {
        id: 3,
        name: "유진",
        avatar: require("../../assets/profile3.jpg"),
      },
    ],
  },
  {
    roomNumber: "2",
    title: "회의실 B",
    owner: "민수",
    date: "2025-10-22",
    startTime: "10:00",
    endTime: "17:00",
    dates: ["10-15", "10-17", "10-20", "10-21"],
    participants: [
      {
        id: 1,
        name: "가영",
        avatar: require("../../assets/profile2.jpg"),
      },
      {
        id: 2,
        name: "현우",
        avatar: require("../../assets/profile1.jpg"),
      },
    ],
  },
  {
    roomNumber: "3",
    title: "운동방 C",
    owner: "유진",
    date: "2025-10-23",
    startTime: "18:00",
    endTime: "24:00",
    dates: ["10-15", "10-17", "10-20", "10-21"],
    participants: [
      {
        id: 1,
        name: "하늘",
        avatar: require("../../assets/profile3.jpg"),
      },
    ],
  },
];
