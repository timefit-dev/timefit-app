import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function RoomList({
  rooms,
  expandedRoomId,
  toggleExpand,
  handleInvite,
  navigation,
  onEdit,
  onDelete,
}) {
  const renderRoom = ({ item }) => {
    const isExpanded = expandedRoomId === item.roomNumber;

    return (
      <TouchableOpacity 
        style={styles.roomItem}
        onPress={() =>
          navigation.navigate("TimeSetting", {
            roomId: item.roomNumber,
          })
        }>
        <View style={styles.roomHeader}>
          <View>
            <Text style={styles.roomTitle}>{item.title}</Text>
            <Text style={styles.roomDate}>{item.date}</Text>
          </View>
          <View style={styles.actions}>
             <TouchableOpacity
                onPress={() => onEdit(item)}
                style={styles.iconButton}
              >
                <Ionicons name="create-outline" size={20} color="#007AFF" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "방 삭제",
                    `"${item.title}" 방을 삭제하시겠습니까?`,
                    [
                      { text: "취소", style: "cancel" },
                      {
                        text: "삭제",
                        style: "destructive",
                        onPress: () => onDelete(item.roomNumber),
                      },
                    ]
                  )
                }
                style={styles.iconButton}
              >
                <Ionicons name="trash-outline" size={20} color="#FF3B30" />
              </TouchableOpacity>


            <TouchableOpacity
              onPress={() => handleInvite(item.inviteCode)}
              style={styles.iconButton}
            >
              <Ionicons name="link-outline" size={20} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleExpand(item.roomNumber)}
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
            <Text style={styles.infoText}>방장: {item.owner}</Text>
            <Text style={styles.infoText}>날짜: {item.dates.join(", ")}</Text>
            <Text style={styles.infoText}>
              시간대: {item.startTime} ~ {item.endTime}
            </Text>
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
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={rooms}
      renderItem={renderRoom}
      keyExtractor={(item) => item.roomNumber}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 25,
    paddingBottom: 120,
  },
  roomItem: {
    backgroundColor: "#f8f8f8",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
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
    padding: 4,
    marginLeft: 8,
  },
  roomDetails: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
  participantsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  participantItem: {
    alignItems: "center",
    marginRight: 15,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginBottom: 4,
  },
  participantName: {
    fontSize: 12,
    color: "#333",
  },
});
