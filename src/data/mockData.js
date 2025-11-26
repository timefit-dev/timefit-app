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
  roomId: 101,
  title: "스터디 모임",
  dates: ["2025-10-20", "2025-10-21", "2025-10-22", "2025-10-23", "2025-10-24"],
  timeSlots: [
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ],
  isOwner: false,
  hasResponded: false,
  totalParticipants: 6,
  respondedCount: 5,
};

export const mockResultData = {
  roomId: 101,
  title: "스터디 모임",
  totalParticipants: 6,
  timeSlots: [
    {
      date: "2025-10-20",
      availableCount: 5,
      participants: [
        {
          id: 1,
          nickname: "김민수",
          profileImage: "https://...",
        },
        {
          id: 2,
          nickname: "이서준",
          profileImage: "https://...",
        },
        {
          id: 3,
          nickname: "박지은",
          profileImage: "https://...",
        },
        {
          id: 4,
          nickname: "최현우",
          profileImage: "https://...",
        },
        {
          id: 5,
          nickname: "정수민",
          profileImage: "https://...",
        },
      ],
    },
    {
      date: "2025-10-21",
      availableCount: 3,
      participants: [
        {
          id: 1,
          nickname: "김민수",
          profileImage: "https://...",
        },
        {
          id: 3,
          nickname: "박지은",
          profileImage: "https://...",
        },
        {
          id: 6,
          nickname: "강민호",
          profileImage: "https://...",
        },
      ],
    },
    {
      date: "2025-10-22",
      availableCount: 4,
      participants: [
        {
          id: 2,
          nickname: "이서준",
          profileImage: "https://...",
        },
        {
          id: 4,
          nickname: "최현우",
          profileImage: "https://...",
        },
        {
          id: 5,
          nickname: "정수민",
          profileImage: "https://...",
        },
        {
          id: 6,
          nickname: "강민호",
          profileImage: "https://...",
        },
      ],
    },
    {
      date: "2025-10-23",
      availableCount: 6,
      participants: [
        {
          id: 1,
          nickname: "김민수",
          profileImage: "https://...",
        },
        {
          id: 2,
          nickname: "이서준",
          profileImage: "https://...",
        },
        {
          id: 3,
          nickname: "박지은",
          profileImage: "https://...",
        },
        {
          id: 4,
          nickname: "최현우",
          profileImage: "https://...",
        },
        {
          id: 5,
          nickname: "정수민",
          profileImage: "https://...",
        },
        {
          id: 6,
          nickname: "강민호",
          profileImage: "https://...",
        },
      ],
    },
  ],
  bestSlots: [
    {
      date: "2025-10-20",
      time: "14:00",
      participants: [
        {
          id: 1,
          nickname: "김민수",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 2,
          nickname: "이서준",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 3,
          nickname: "박지은",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 4,
          nickname: "최현우",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 5,
          nickname: "정수민",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 6,
          nickname: "강민호",
          profileImage: "https://...",
          hasResponded: false,
        },
      ],
    },
    {
      date: "2025-10-22",
      time: "19:00",
      participants: [
        {
          id: 2,
          nickname: "이서준",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 4,
          nickname: "최현우",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 5,
          nickname: "정수민",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 6,
          nickname: "강민호",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 1,
          nickname: "김민수",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 3,
          nickname: "박지은",
          profileImage: "https://...",
          hasResponded: false,
        },
      ],
    },
    {
      date: "2025-10-21",
      time: "13:00",
      participants: [
        {
          id: 1,
          nickname: "김민수",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 3,
          nickname: "박지은",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 6,
          nickname: "강민호",
          profileImage: "https://...",
          hasResponded: true,
        },
      ],
    },
    {
      date: "2025-10-23",
      time: "15:00",
      participants: [
        {
          id: 1,
          nickname: "김민수",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 2,
          nickname: "이서준",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 3,
          nickname: "박지은",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 4,
          nickname: "최현우",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 5,
          nickname: "정수민",
          profileImage: "https://...",
          hasResponded: true,
        },
        {
          id: 6,
          nickname: "강민호",
          profileImage: "https://...",
          hasResponded: false,
        },
      ],
    },
  ],
};
