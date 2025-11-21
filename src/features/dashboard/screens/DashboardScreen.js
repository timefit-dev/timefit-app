import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RoomList } from "../components/RoomList";
import { useDashboard } from "../hooks/useDashboard";

export function DashboardScreen() {
  const navigation = useNavigation();
  const { rooms, handleInvite, expandedRoomId, toggleExpand } = useDashboard();

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
        onDelete={(roomNumber) => console.log("삭제:", roomNumber)}
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
    paddingTop: 60,
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
    bottom: 40,
    backgroundColor: "#007AFF",
    width: 65,
    height: 65,
    borderRadius: 32.5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
});
