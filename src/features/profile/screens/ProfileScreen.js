import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function ProfileScreen() {
  const [name, setName] = useState("유지현");
  const [prevName, setPrevName] = useState(name); // ✅ 수정 전 이름 저장
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState(require("@assets/profile.jpg"));

  const handleEditPhoto = () => {
    Alert.alert("사진 변경", "사진 변경 기능은 추후 구현 예정입니다.");
  };

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?");
  };

  const handleOutsidePress = () => {
    if (isEditing) {
      handleFinishEditing();
      Keyboard.dismiss();
    }
  };

  // ✅ 이름 수정 시작 시 이전 이름 저장
  const handleStartEditing = () => {
    setPrevName(name);
    setIsEditing(true);
  };

  // ✅ 이름 수정 완료 처리 함수
  const handleFinishEditing = () => {
    if (name.trim() === "") {
      Alert.alert("입력 오류", "이름은 비워둘 수 없습니다.");
      setName(prevName); // ⚠️ 빈 값이면 이전 이름으로 복구
      return;
    }
    setIsEditing(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        {/* 프로필 영역 */}
        <View style={styles.profileContainer}>
          {/* 사진 */}
          <View style={styles.photoWrapper}>
            <Image source={photo} style={styles.photo} />
            <TouchableOpacity style={styles.editIcon} onPress={handleEditPhoto}>
              <Ionicons name="pencil" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          {/* 이름 */}
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              onBlur={handleFinishEditing}
              autoFocus
            />
          ) : (
            <TouchableOpacity onPress={handleStartEditing}>
              <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
          )}

          {/* 내 정보 카드 */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>내 정보</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>가입일</Text>
              <Text style={styles.infoValue}>2025-03-10</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>참여한 모임</Text>
              <Text style={styles.infoValue}>5개</Text>
            </View>
          </View>
        </View>

        {/* 풋터 */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.footerText}>이용약관</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.footerText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
    backgroundColor: "#fff",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 60,
    width: "100%",
  },
  photoWrapper: {
    position: "relative",
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    padding: 6,
  },
  name: {
    marginTop: 15,
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
  },
  input: {
    marginTop: 15,
    fontSize: 26,
    borderBottomWidth: 1,
    borderColor: "#aaa",
    textAlign: "center",
    padding: 5,
    width: 180,
    fontWeight: "700",
  },
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
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  footerText: {
    color: "#888",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  divider: {
    width: 1,
    height: 12,
    backgroundColor: "#ccc",
  },
});
