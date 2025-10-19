import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  const login = async (id, password) => {
    // 실제 로그인 API와 연동 예정
    if (id && password) {
      setUser({ id, name: "유지현" });
    }
  };

  const logout = () => setUser(null);

  return { user, login, logout };
}
