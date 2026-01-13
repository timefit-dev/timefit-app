// src/features/profile/components/ProfileCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function ProfileCard({ meetingCount, email }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoTitle}>내 정보</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>참여한 모임</Text>
        <Text style={styles.infoValue}>{meetingCount}개</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>이메일</Text>
        <Text style={styles.infoValue}>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 25,
    width: "85%",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  infoLabel: {
    color: "#555",
    fontSize: 14,
  },
  infoValue: {
    color: "#000",
    fontWeight: "500",
    fontSize: 14,
  },
});
