import React from "react";
import { Text, TextInput, Platform } from "react-native";
import { AppNavigation } from "./src/navigation/AppNavigation";

// ✅ 전역 폰트 설정
if (Text.defaultProps == null) Text.defaultProps = {};
if (TextInput.defaultProps == null) TextInput.defaultProps = {};

Text.defaultProps.style = {
  fontFamily: Platform.select({
    ios: "System", // iOS 기본 폰트
    android: "sans-serif", // Android 기본 폰트
  }),
};

TextInput.defaultProps.style = {
  fontFamily: Platform.select({
    ios: "System",
    android: "sans-serif",
  }),
};

export default function App() {
  return <AppNavigation />;
}
