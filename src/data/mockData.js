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
  dates: ["2025-10-20", "2025-10-21", "2025-10-22", "2025-10-23", "2025-10-24", "2025-10-25", "2025-10-26"],
  timeSlots: [
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
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
  title: "스터디 모임 상세 일정 조율",
  totalParticipants: 6,

  // [날짜별 요약]: 해당 날짜의 '최대 가능 인원' 기준
  timeSlots: [
    {
      date: "2025-10-20",
      availableCount: 6, // 월요일: 14시~15시에 전원 참여 가능
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://..." },
        { id: 2, nickname: "이서준", profileImage: "https://..." },
        { id: 3, nickname: "박지은", profileImage: "https://..." },
        { id: 4, nickname: "최현우", profileImage: "https://..." },
        { id: 5, nickname: "정수민", profileImage: "https://..." },
        { id: 6, nickname: "강민호", profileImage: "https://..." },
      ],
    },
    {
      date: "2025-10-21",
      availableCount: 4, // 화요일: 최대 4명 겹침
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://..." },
        { id: 3, nickname: "박지은", profileImage: "https://..." },
        { id: 4, nickname: "최현우", profileImage: "https://..." },
        { id: 6, nickname: "강민호", profileImage: "https://..." },
      ],
    },
    {
      date: "2025-10-22",
      availableCount: 5, // 수요일: 저녁 시간에 5명 가능
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://..." },
        { id: 2, nickname: "이서준", profileImage: "https://..." },
        { id: 4, nickname: "최현우", profileImage: "https://..." },
        { id: 5, nickname: "정수민", profileImage: "https://..." },
        { id: 6, nickname: "강민호", profileImage: "https://..." },
      ],
    },
    {
      date: "2025-10-23",
      availableCount: 3, // 목요일: 시간이 많이 갈려서 최대 3명
      participants: [
        { id: 2, nickname: "이서준", profileImage: "https://..." },
        { id: 3, nickname: "박지은", profileImage: "https://..." },
        { id: 5, nickname: "정수민", profileImage: "https://..." },
      ],
    },
    {
      date: "2025-10-24",
      availableCount: 2, // 금요일: 참여 저조 (최대 2명)
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://..." },
        { id: 6, nickname: "강민호", profileImage: "https://..." },
      ],
    },
  ],

  // [시간대별 상세]: 13:00 ~ 20:00 (다양한 인원 분포)
  bestSlots: [
    // --- 10월 20일 (월) : 참여율 높음 ---
    {
      date: "2025-10-20",
      time: "13:00",
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://...", hasResponded: true },
        { id: 2, nickname: "이서준", profileImage: "https://...", hasResponded: true },
        { id: 3, nickname: "박지은", profileImage: "https://...", hasResponded: true },
        { id: 4, nickname: "최현우", profileImage: "https://...", hasResponded: true },
      ], // 4명
    },
    {
      date: "2025-10-20",
      time: "14:00",
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://...", hasResponded: true },
        { id: 2, nickname: "이서준", profileImage: "https://...", hasResponded: true },
        { id: 3, nickname: "박지은", profileImage: "https://...", hasResponded: true },
        { id: 4, nickname: "최현우", profileImage: "https://...", hasResponded: true },
        { id: 5, nickname: "정수민", profileImage: "https://...", hasResponded: true },
        { id: 6, nickname: "강민호", profileImage: "https://...", hasResponded: true },
      ], // 6명 (Best)
    },
    {
      date: "2025-10-20",
      time: "15:00",
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://...", hasResponded: true },
        { id: 2, nickname: "이서준", profileImage: "https://...", hasResponded: true },
        { id: 3, nickname: "박지은", profileImage: "https://...", hasResponded: true },
        { id: 4, nickname: "최현우", profileImage: "https://...", hasResponded: true },
        { id: 5, nickname: "정수민", profileImage: "https://...", hasResponded: true },
        { id: 6, nickname: "강민호", profileImage: "https://...", hasResponded: true },
      ], // 6명 (Best)
    },
    {
      date: "2025-10-20",
      time: "16:00",
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://...", hasResponded: true },
        { id: 5, nickname: "정수민", profileImage: "https://...", hasResponded: true },
        { id: 6, nickname: "강민호", profileImage: "https://...", hasResponded: true },
      ], // 3명
    },
    {
      date: "2025-10-20",
      time: "17:00",
      participants: [
        { id: 5, nickname: "정수민", profileImage: "https://...", hasResponded: true },
        { id: 6, nickname: "강민호", profileImage: "https://...", hasResponded: true },
      ], // 2명
    },
    // (18:00~20:00 생략 또는 0~1명 가정하여 데이터 용량 조절, 필요시 추가 가능)

    // --- 10월 21일 (화) : 중간 정도 참여 ---
    {
      date: "2025-10-21",
      time: "13:00",
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://...", hasResponded: true },
        { id: 3, nickname: "박지은", profileImage: "https://...", hasResponded: true },
      ], // 2명
    },
    {
      date: "2025-10-21",
      time: "14:00",
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://...", hasResponded: true },
        { id: 3, nickname: "박지은", profileImage: "https://...", hasResponded: true },
        { id: 4, nickname: "최현우", profileImage: "https://...", hasResponded: true },
        { id: 6, nickname: "강민호", profileImage: "https://...", hasResponded: true },
      ], // 4명 (Max for Tue)
    },
    {
      date: "2025-10-21",
      time: "15:00",
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://...", hasResponded: true },
        { id: 3, nickname: "박지은", profileImage: "https://...", hasResponded: true },
        { id: 4, nickname: "최현우", profileImage: "https://...", hasResponded: true },
        { id: 6, nickname: "강민호", profileImage: "https://...", hasResponded: true },
      ], // 4명
    },
    {
      date: "2025-10-21",
      time: "16:00",
      participants: [
        { id: 4, nickname: "최현우", profileImage: "https://...", hasResponded: true },
        { id: 6, nickname: "강민호", profileImage: "https://...", hasResponded: true },
      ], // 2명
    },
    {
      date: "2025-10-21",
      time: "19:00",
      participants: [
        { id: 2, nickname: "이서준", profileImage: "https://...", hasResponded: true },
      ], // 1명
    },

    // --- 10월 22일 (수) : 저녁 모임 선호 ---
    {
      date: "2025-10-22",
      time: "13:00",
      participants: [
        { id: 2, nickname: "이서준", profileImage: "https://...", hasResponded: true },
      ], // 1명
    },
    {
      date: "2025-10-22",
      time: "18:00",
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://...", hasResponded: true },
        { id: 2, nickname: "이서준", profileImage: "https://...", hasResponded: true },
        { id: 5, nickname: "정수민", profileImage: "https://...", hasResponded: true },
      ], // 3명
    },
    {
      date: "2025-10-22",
      time: "19:00",
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://...", hasResponded: true },
        { id: 2, nickname: "이서준", profileImage: "https://...", hasResponded: true },
        { id: 4, nickname: "최현우", profileImage: "https://...", hasResponded: true },
        { id: 5, nickname: "정수민", profileImage: "https://...", hasResponded: true },
        { id: 6, nickname: "강민호", profileImage: "https://...", hasResponded: true },
      ], // 5명 (Max for Wed)
    },
    {
      date: "2025-10-22",
      time: "20:00",
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://...", hasResponded: true },
        { id: 2, nickname: "이서준", profileImage: "https://...", hasResponded: true },
        { id: 4, nickname: "최현우", profileImage: "https://...", hasResponded: true },
        { id: 5, nickname: "정수민", profileImage: "https://...", hasResponded: true },
        { id: 6, nickname: "강민호", profileImage: "https://...", hasResponded: true },
      ], // 5명
    },

    // --- 10월 23일 (목) : 의견 분열 (최대 3명) ---
    {
      date: "2025-10-23",
      time: "13:00",
      participants: [
        { id: 2, nickname: "이서준", profileImage: "https://...", hasResponded: true },
        { id: 3, nickname: "박지은", profileImage: "https://...", hasResponded: true },
      ], // 2명
    },
    {
      date: "2025-10-23",
      time: "14:00",
      participants: [
        { id: 2, nickname: "이서준", profileImage: "https://...", hasResponded: true },
        { id: 3, nickname: "박지은", profileImage: "https://...", hasResponded: true },
        { id: 5, nickname: "정수민", profileImage: "https://...", hasResponded: true },
      ], // 3명 (Max for Thu)
    },
    {
      date: "2025-10-23",
      time: "15:00",
      participants: [
        { id: 2, nickname: "이서준", profileImage: "https://...", hasResponded: true },
        { id: 5, nickname: "정수민", profileImage: "https://...", hasResponded: true },
      ], // 2명
    },
    {
      date: "2025-10-23",
      time: "16:00",
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://...", hasResponded: true },
        { id: 6, nickname: "강민호", profileImage: "https://...", hasResponded: true },
      ], // 2명 (다른 그룹)
    },

    // --- 10월 24일 (금) : 참여 저조 ---
    {
      date: "2025-10-24",
      time: "13:00",
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://...", hasResponded: true },
      ], // 1명
    },
    {
      date: "2025-10-24",
      time: "14:00",
      participants: [
        { id: 1, nickname: "김민수", profileImage: "https://...", hasResponded: true },
        { id: 6, nickname: "강민호", profileImage: "https://...", hasResponded: true },
      ], // 2명 (Max for Fri)
    },
    {
      date: "2025-10-24",
      time: "15:00",
      participants: [
        { id: 6, nickname: "강민호", profileImage: "https://...", hasResponded: true },
      ], // 1명
    },
    {
      date: "2025-10-24",
      time: "18:00",
      participants: [
        { id: 3, nickname: "박지은", profileImage: "https://...", hasResponded: true },
      ], // 1명
    },
  ],
};