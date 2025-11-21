import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RoomForm } from "../components/RoomForm";
import { useRoom } from "../hooks/useRoom";
import { useNavigation, useRoute } from "@react-navigation/native";

export function RoomEditScreen() {
  const { updateRoom } = useRoom();
  const navigation = useNavigation();
  const route = useRoute();

  const { room } = route.params; // 수정할 방 데이터

  const handleUpdate = async (data) => {
    // data = RoomForm에서 입력받은 수정된 값들

    const result = await updateRoom(room.roomNumber, data);

    if (result) {
      /* console.log("✅ 수정된 방:", result); */
      navigation.navigate("Dashboard");
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
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 40 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
