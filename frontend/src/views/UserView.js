import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useUserViewModel } from "../viewmodels/UserViewModel";

export default function UserView() {
  const { user, updateName } = useUserViewModel();

  return (
    <View style={styles.container}>
      <Text>이름: {user.name}</Text>
      <Text>나이: {user.age}</Text>
      <Button title="이름 변경" onPress={() => updateName("유지현")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
