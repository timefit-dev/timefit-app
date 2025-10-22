import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Share,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useNavigation } from "@react-navigation/native";

export function DashboardScreen() {
  const navigation = useNavigation();

  const rooms = [
    { id: "1", title: "스터디룸 A", date: "2025-10-21" },
    { id: "2", title: "회의실 B", date: "2025-10-22" },
    { id: "3", title: "운동방 C", date: "2025-10-23" },
  ];

  const handleInvite = async (roomTitle) => {
    const inviteLink = `https://timefit.app/invite?room=${encodeURIComponent(
      roomTitle
    )}`;

    try {
      // 1️⃣ 클립보드에 복사
      await Clipboard.setStringAsync(inviteLink);
      console.log(`${inviteLink} 복사됨`);

      // 2️⃣ 공유 기능 실행
      await Share.share({
        message: `${roomTitle} 방에 초대합니다! 🎉\n\n초대 링크: ${inviteLink}`,
      });

      Alert.alert("✅ 초대 링크 복사 완료", "공유 창이 열렸습니다!");
    } catch (error) {
      Alert.alert("오류", "초대 링크를 복사하는 중 문제가 발생했습니다.");
      console.error(error);
    }
  };

  const renderRoom = ({ item }) => (
    <View style={styles.roomItem}>
      <View style={styles.roomInfo}>
        <Text style={styles.roomTitle}>{item.title}</Text>
        <Text style={styles.roomDate}>{item.date}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleInvite(item.title)}
        style={styles.inviteIcon}
      >
        <Ionicons name="link-outline" size={22} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  roomInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  roomDate: {
    fontSize: 14,
    color: "#777",
  },
  inviteIcon: {
    padding: 5,
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
