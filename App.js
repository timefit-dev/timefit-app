// App.js
import React from "react";
import { Platform, UIManager } from "react-native";
import { AppNavigation } from "./src/navigation/AppNavigation";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  return <AppNavigation />;
}
