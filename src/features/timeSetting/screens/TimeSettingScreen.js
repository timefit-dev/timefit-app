import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTimeSetting } from "../hooks/useTimeSetting";
import { TimeTable } from "../../../shared/components/TimeTable";

export function TimeSettingScreen({ route }) {
  const { roomId = 1 } = route.params || {};
  const { room, times, selected, toggle, submit } = 
    useTimeSetting(roomId) || {};

  const handleSubmit = () => {
    submit();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{ room ? room.title : "방 제목" }</Text>
        <Text style={styles.participants}>
          {room && (
            <Text style={styles.participants}>
            {room.respondedCount} / {room.totalParticipants} 명 참여
            </Text>
          )}
        </Text>
      </View>
      <View style={styles.selectorContainer}>
        <TimeTable times={times} selected={selected} toggle={toggle} />
      </View>
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>등록하기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 20, borderBottomWidth: 1, borderColor: "#eee" },
  title: { fontSize: 24, fontWeight: "bold" },
  participants: { fontSize: 16, color: "gray", marginTop: 4 },
  selectorContainer: { flex: 1, padding: 0, },
  submitButton: {
    backgroundColor: "dodgerblue",
    padding: 15,
    margin: 20,
    bottom: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
