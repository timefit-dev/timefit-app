import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RoomForm } from "../components/RoomForm";
import { useRoom } from "../hooks/useRoom";
import { useNavigation } from "@react-navigation/native";

export function RoomCreateScreen() {
  const { createRoom } = useRoom();
  const navigation = useNavigation();

  const handleCreate = async (data) => {
    const result = await createRoom(data);
    if (result?.success) {
      navigation.navigate("Dashboard");
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
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
});
