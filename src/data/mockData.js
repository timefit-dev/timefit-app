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

export const mockRoomConfig = {
  roomId: 1,
  title: "스터디 모임",
  dates: ["2025-10-15", "2025-10-17", "2025-10-20", "2025-10-22", "2025-10-30"],
  timeSlots: ["09:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
  isOwner: false,
  hasResponded: false,
  totalParticipants: 5,
  respondedCount: 3,
};

export const mockResultData = {
  message: "응답이 저장되었습니다",
  roomInfo: {
    ...mockRoomConfig, // title, totalParticipants, respondedCount 등 포함
  },
  allParticipants: [
    { id: 1, nickname: "김철수" },
    { id: 2, nickname: "이영희" },
    { id: 3, nickname: "최지우" },
    { id: 4, nickname: "정수진" },
    { id: 5, nickname: "박민수" },
  ],
  // 방에 설정된 모든 날짜와 시간대를 포함해야 합니다.
  dates: mockRoomConfig.dates,
  timeSlots: mockRoomConfig.timeSlots,
  participantsInfo: [
    {
      date: "2025-10-17",
      time: "13:00",
      availableCount: 3,
      participants: [
        { id: 1, nickname: "김철수" },
        { id: 2, nickname: "이영희" },
        { id: 5, nickname: "박민수" },
      ],
    },
    {
      date: "2025-10-17",
      time: "14:00",
      availableCount: 2,
      participants: [
        { id: 3, nickname: "최지우" },
        { id: 4, nickname: "정수진" },
      ],
    },
    {
      date: "2025-10-17",
      time: "15:00",
      availableCount: 5,
      participants: [
        { id: 1, nickname: "김철수" },
        { id: 2, nickname: "이영희" },
        { id: 3, nickname: "최지우" },
        { id: 4, nickname: "정수진" },
        { id: 5, nickname: "박민수" },
      ],
    },
    {
      date: "2025-10-17",
      time: "16:00",
      availableCount: 4,
      participants: [
        { id: 1, nickname: "김철수" },
        { id: 2, nickname: "이영희" },
        { id: 4, nickname: "정수진" },
        { id: 5, nickname: "박민수" },
      ],
    },
    {
      date: "2025-10-17",
      time: "17:00",
      availableCount: 2,
      participants: [
        { id: 1, nickname: "김철수" },
        { id: 2, nickname: "이영희" },
      ],
    },
    {
      date: "2025-10-20",
      time: "14:00",
      availableCount: 3,
      participants: [
        { id: 1, nickname: "김철수" },
        { id: 3, nickname: "최지우" },
        { id: 4, nickname: "정수진" },
      ],
    },
    {
      date: "2025-10-22",
      time: "16:00",
      availableCount: 1,
      participants: [{ id: 1, nickname: "김철수" }],
    },
  ],
};
