// auth/hooks/useAuth.js
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserInfo, logout } from "../services/authApi";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 앱 실행 시 JWT 확인 → 자동 로그인
  useEffect(() => {
    const init = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        if (token) {
          const userInfo = await fetchUserInfo();
          setUser(userInfo);
        }
      } catch (err) {
        console.error("Auto-login error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // 로그아웃 처리
  const handleLogout = useCallback(async () => {
    await logout();
    setUser(null);
  }, []);

  return { user, setUser, loading, handleLogout };
}
