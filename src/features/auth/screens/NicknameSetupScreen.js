import React, { useState, useMemo } from "react";
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
  Image,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export function NicknameSetupScreen() {
  const [nickname, setNickname] = useState("");
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  // 닉네임 유효성 검사 (1~12자, 특수문자 및 공백 제외)
  const isNicknameValid = useMemo(() => {
    const regex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{1,12}$/;
    return regex.test(nickname);
  }, [nickname]);

  const handleConfirm = () => {
    if (!isNicknameValid) {
      Alert.alert(
        "알림",
        "닉네임은 1~12자의 한글, 영문, 숫자만 사용할 수 있습니다."
      );
      return;
    }
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
            onChangeText={(text) => setNickname(text.replace(/\s/g, ""))} // 공백 입력 방지
            placeholder="닉네임 (1~12자)"
            placeholderTextColor="#999"
            autoFocus={true}
            returnKeyType="done"
            onSubmitEditing={handleConfirm}
            maxLength={12}
          />
          <Text style={styles.validationText}>
            * 1~12자의 한글, 영문, 숫자만 사용 가능합니다.
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              !isNicknameValid && styles.buttonDisabled,
            ]}
            onPress={handleConfirm}
            disabled={!isNicknameValid}
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
  logoContainer: {
    alignItems: "center",
    marginBottom: "15%",
    marginTop: "5%",
  },
  logo: {
    alignSelf: "center",
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 10,
    color: "#333",
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
    marginBottom: 10,
},
  validationText: {
    width: "100%",
    fontSize: 12,
    color: "#666",
    marginBottom: 20,
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