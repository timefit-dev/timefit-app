import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Share,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useNavigation } from "@react-navigation/native";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export function DashboardScreen() {
  const navigation = useNavigation();

  const rooms = [
    {
      id: "1",
      title: "스터디룸 A",
      date: "2025-10-21", // 방 생성 날짜
      time: "09:00 ~ 18:00",
      dates: ["10-15", "10-17", "10-20", "10-21"],
      participants: [
        {
          id: 1,
          name: "지현",
          avatar: require("../../../../assets/profile1.jpg"),
        },
        {
          id: 2,
          name: "민수",
          avatar: require("../../../../assets/profile2.jpg"),
        },
        {
          id: 3,
          name: "유진",
          avatar: require("../../../../assets/profile3.jpg"),
        },
      ],
    },
    {
      id: "2",
      title: "회의실 B",
      date: "2025-10-22",
      time: "10:00 ~ 17:00",
      dates: ["10-15", "10-17", "10-20", "10-21"],
      participants: [
        {
          id: 1,
          name: "가영",
          avatar: require("../../../../assets/profile2.jpg"),
        },
        {
          id: 2,
          name: "현우",
          avatar: require("../../../../assets/profile1.jpg"),
        },
      ],
    },
    {
      id: "3",
      title: "운동방 C",
      date: "2025-10-23",
      time: "07:00 ~ 09:00",
      dates: ["10-15", "10-17", "10-20", "10-21"],
      participants: [
        {
          id: 1,
          name: "하늘",
          avatar: require("../../../../assets/profile3.jpg"),
        },
      ],
    },
  ];

  const [expandedRoomId, setExpandedRoomId] = useState(null);

  const handleInvite = async (roomTitle) => {
    const inviteLink = `https://timefit.app/invite?room=${encodeURIComponent(
      roomTitle
    )}`;
    try {
      await Clipboard.setStringAsync(inviteLink);
      await Share.share({
        message: `${roomTitle} 방에 초대합니다! 🎉\n\n초대 링크: ${inviteLink}`,
      });
      Alert.alert("✅ 초대 링크 복사 완료", "공유 창이 열렸습니다!");
    } catch (error) {
      Alert.alert("오류", "초대 링크를 복사하는 중 문제가 발생했습니다.");
      console.error(error);
    }
  };

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedRoomId(expandedRoomId === id ? null : id);
  };

  const renderRoom = ({ item }) => {
    const isExpanded = expandedRoomId === item.id;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("TimeSetting", { room: item })}
        activeOpacity={0.8}
      >
        <View style={styles.roomItem}>
          <View style={styles.roomHeader}>
            <View>
              <Text style={styles.roomTitle}>{item.title}</Text>
              <Text style={styles.roomDate}>{item.date}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => handleInvite(item.title)}
                style={styles.iconButton}
              >
                <Ionicons name="link-outline" size={22} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleExpand(item.id)}
                style={styles.iconButton}
              >
                <Ionicons
                  name={
                    isExpanded ? "chevron-up-outline" : "chevron-down-outline"
                  }
                  size={22}
                  color="#333"
                />
              </TouchableOpacity>
            </View>
          </View>

          {isExpanded && (
            <View style={styles.roomDetails}>
              <Text style={styles.infoText}>날짜: {item.dates.join(", ")}</Text>
              <Text style={styles.infoText}>시간대: {item.time}</Text>
              <Text style={styles.infoText}>
                참가자 수: {item.participants.length}명
              </Text>

              <View style={styles.participantsContainer}>
                {item.participants.map((p) => (
                  <View key={p.id} style={styles.participantItem}>
                    <Image source={p.avatar} style={styles.avatar} />
                    <Text style={styles.participantName}>{p.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Image
          source={require("../../../../assets/logo.png")}
          style={styles.logo}
        />
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-circle-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* 방 목록 */}
      <FlatList
        data={rooms}
        renderItem={renderRoom}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* 하단 추가 버튼 */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("RoomCreate")}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  profileButton: {
    padding: 5,
  },
  listContainer: {
    marginTop: 30,
    paddingBottom: 100,
  },
  roomItem: {
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  roomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  roomDate: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 6,
    marginLeft: 5,
  },
  roomDetails: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  participantsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  participantItem: {
    alignItems: "center",
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 4,
  },
  participantName: {
    fontSize: 12,
    color: "#333",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 80,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
