import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RoomForm } from "../components/RoomForm";
import { useRoom } from "../hooks/useRoom";

export function RoomEditScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { room } = route.params; // Dashboard → RoomEditScreen 전달된 방 전체 데이터
  const { updateRoom } = useRoom();

  const handleUpdate = async (data) => {
    // data = RoomForm에서 반환된 { title, dates, startTime, endTime }
    const result = await updateRoom(room.roomNumber, data);

    if (result) {
      Alert.alert("✔ 방 수정 완료", "방 정보가 성공적으로 수정되었습니다.");
      navigation.navigate("Dashboard"); // 수정 후 목록으로
    } else {
      Alert.alert("❌ 수정 실패", "다시 시도해주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>방 수정</Text>

      <RoomForm
        onSubmit={handleUpdate}
        submitLabel="방 수정"
        initialValues={{
          title: room.title,
          dates: room.dates,
          startTime: room.startTime,
          endTime: room.endTime,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
});
