// auth/components/LoginForm.js
import React from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Image,
  Platform,
  useWindowDimensions,
} from "react-native";

export function LoginForm({ onPress }) {
  const { width } = useWindowDimensions();

  const buttons = [
    { type: "카카오", color: "#FEE500" },
    { type: "구글", color: "#DB4437" },
    { type: "네이버", color: "#1EC800" },
    { type: "애플", color: "#000000" },
  ];

  return (
    <View style={styles.container}>
      {buttons.map(({ type, color }) => {
        if (type === "애플" && Platform.OS !== "ios") return null;

        const iconSource = {
          카카오: require("@assets/kakao_icon.png"),
          구글: require("@assets/google_icon.png"),
          네이버: require("@assets/naver_icon.png"),
          애플: require("@assets/apple_icon.png"),
        }[type];

        return (
          <Pressable
            key={type}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: color },
              pressed && styles.pressed,
            ]}
            onPress={() => onPress(type)}
          >
            <View style={styles.iconRow}>
              <Image
                source={iconSource}
                style={{
                  width: width * 0.055,
                  height: width * 0.055,
                  marginRight: 10,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={[
                  styles.text,
                  { color: type === "카카오" ? "#000" : "#fff" },
                ]}
              >
                {`${type}로 로그인`}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  iconRow: { flexDirection: "row", alignItems: "center" },
  text: { fontWeight: "600", fontSize: 16 },
  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
});
