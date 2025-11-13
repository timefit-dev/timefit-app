import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../features/auth/screens/LoginScreen";
import { DashboardScreen } from "../features/dashboard/screens/DashboardScreen";
import { ProfileScreen } from "../features/profile/screens/ProfileScreen";
import { RoomCreateScreen } from "../features/room/screens/RoomCreateScreen";
import { TimeSettingScreen } from "../features/timeSetting/screens/TimeSettingScreen";
import { ResultScreen } from "../features/result/screens/ResultScreen";

const Stack = createStackNavigator();

export function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="RoomCreate" component={RoomCreateScreen} />
        <Stack.Screen name="TimeSetting" component={TimeSettingScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
