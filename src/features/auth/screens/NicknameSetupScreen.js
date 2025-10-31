import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export function NicknameSetupScreen() {
  const [nickname, setNickname] = useState("");
  const navigation = useNavigation();

  const handleConfirm = () => {
    if (nickname.trim().length < 2) {
      Alert.alert("알림", "닉네임은 2자 이상으로 입력해주세요.");
      return;
    }
    // TODO: 닉네임 저장 API 호출 또는 상태 관리 로직 추가
    console.log(`설정된 닉네임: ${nickname}`);
    navigation.reset({
      index: 0,
      routes: [{ name: "Dashboard" }],
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.title}>환영합니다!</Text>
          <Text style={styles.subtitle}>
            사용하실 닉네임을 입력해주세요.
          </Text>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            placeholder="닉네임 (2자 이상)"
            placeholderTextColor="#999"
            autoFocus={true}
            returnKeyType="done"
            onSubmitEditing={handleConfirm}
          />
          <TouchableOpacity
            style={[
              styles.button,
              nickname.trim().length < 2 && styles.buttonDisabled,
            ]}
            onPress={handleConfirm}
            disabled={nickname.trim().length < 2}
          >
            <Text style={styles.buttonText}>시작하기</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 10 
},
  subtitle: { 
    fontSize: 16, 
    color: "#666", 
    textAlign: "center", 
    marginBottom: 40 
},
  input: { 
    width: "100%", 
    height: 50, 
    borderColor: "#ccc", 
    borderWidth: 1, 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    fontSize: 16, 
    marginBottom: 20 
},
  button: { 
    width: "100%", 
    height: 50, 
    backgroundColor: "dodgerblue", 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 10 
},
  buttonDisabled: { 
    backgroundColor: "#ccc" 
},
  buttonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold" 
},
});