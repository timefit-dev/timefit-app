// src/features/profile/screens/ProfileScreen.js
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useProfile } from "../hooks/useProfile";
import { ProfileCard } from "../components/ProfileCard";

export function ProfileScreen() {
  const {
    name,
    setName,
    email,
    meetingCount,
    photo,
    isEditing,

    fetchProfile,
    handleEditPhoto,
    handleStartEditing,
    handleFinishEditing,

    handleLogoutForTest, // ⭐ 테스트용
  } = useProfile();

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleOutsidePress = () => {
    if (isEditing) {
      handleFinishEditing();
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        {/* ===== 프로필 영역 ===== */}
        <View style={styles.profileContainer}>
          <View style={styles.photoWrapper}>
            <Image source={photo} style={styles.photo} />
            <TouchableOpacity
              style={styles.editIcon}
              onPress={handleEditPhoto}
            >
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

          {/* 카드 */}
          <ProfileCard 
            email={email}
            meetingCount={meetingCount}
            />
        </View>

        {/* ===== 하단 ===== */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.footerText}>이용약관</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          {/* ❌ 실서비스 로그아웃 아직 없음 */}
          <TouchableOpacity onPress={handleLogoutForTest}>
            <Text style={styles.footerText}>
              [테스트] 카카오 unlink
            </Text>
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
