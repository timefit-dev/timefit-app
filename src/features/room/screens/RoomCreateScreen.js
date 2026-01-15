import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { RoomForm } from "../components/RoomForm";
import { useRoom } from "../hooks/useRoom";
import { useNavigation } from "@react-navigation/native";

export function RoomCreateScreen() {
  const { createRoom } = useRoom();
  const navigation = useNavigation();

  const handleCreate = async (data) => {
    try {
      const result = await createRoom(data);

      if (result) {
        navigation.navigate("Dashboard");
      }
    } catch (e) {
      console.error("방 생성 오류:", e);

      // 🔐 인증 만료
      if (e.message === "UNAUTHORIZED") {
        Alert.alert("세션 만료", "다시 로그인해주세요.");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
        return;
      }

      // ❌ 일반 오류
      Alert.alert("오류", "방 생성에 실패했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>방 생성</Text>
      <RoomForm onSubmit={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 40 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
});
