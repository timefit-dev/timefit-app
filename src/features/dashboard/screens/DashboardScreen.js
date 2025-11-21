import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RoomList } from "../components/RoomList";
import { useDashboard } from "../hooks/useDashboard";
import { useRoom } from "../../room/hooks/useRoom";

export function DashboardScreen() {
  const navigation = useNavigation();
  const { rooms, refreshRooms, expandedRoomId, toggleExpand, handleInvite } = useDashboard();
  const { deleteRoom } = useRoom();

  const handleDelete = async (roomNumber) => {
    /* const ok = await deleteRoom(roomNumber);

    if (ok) {
      Alert.alert("삭제 완료", "방이 성공적으로 삭제되었습니다.");
      // 🔥 Dashboard 새로고침 필요하면 useDashboard()에서 rooms 재요청 처리
    } */
    // 🔥 서버 연동 전: 그냥 프론트에서 목록에서만 제거
    Alert.alert("삭제 완료", "서버 연동 전이라 프론트에서만 삭제합니다.");
    setRooms((prev) => prev.filter((room) => room.roomNumber !== roomNumber));
  };
  return (
    <View style={styles.container}>
      {/* 상단 로고 & 프로필 */}
      <View style={styles.header}>
        <Image
          source={require("@assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.profileButton}
        >
          <Ionicons name="person-circle-outline" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      {/* 방 목록 */}
      <RoomList
        rooms={rooms}
        expandedRoomId={expandedRoomId}
        toggleExpand={toggleExpand}
        handleInvite={handleInvite}
        navigation={navigation}
        onEdit={(room) => navigation.navigate("RoomEdit", { room })}
        onDelete={handleDelete}
      />

      {/* 하단 추가 버튼 */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("RoomCreate")}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 45,
  },
  profileButton: {
    padding: 4,
  },
  addButton: {
    position: "absolute",
    right: 25,
    bottom: 80,
    backgroundColor: "#007AFF",
    width: 65,
    height: 65,
    borderRadius: 32.5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
});
