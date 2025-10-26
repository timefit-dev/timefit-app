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
    isEditing,
    photo,
    handleEditPhoto,
    handleLogout,
    handleStartEditing,
    handleFinishEditing,
    fetchProfile,
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
        <View style={styles.profileContainer}>
          <View style={styles.photoWrapper}>
            <Image source={photo} style={styles.photo} />
            <TouchableOpacity style={styles.editIcon} onPress={handleEditPhoto}>
              <Ionicons name="pencil" size={20} color="#333" />
            </TouchableOpacity>
          </View>

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

          <ProfileCard />
        </View>

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
