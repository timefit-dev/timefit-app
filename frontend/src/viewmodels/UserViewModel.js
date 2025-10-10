import { useState } from "react";
import { UserModel } from "../models/UserModel";

export function useUserViewModel() {
  const [user, setUser] = useState(new UserModel("지현", 22));

  const updateName = (newName) => {
    setUser(new UserModel(newName, user.age));
  };

  return {
    user,
    updateName,
  };
}
