import { createContext, useContext, useState } from "react";
import api from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("CampusFlow_user") || "null")
  );

  const save = (data) => {
    localStorage.setItem("CampusFlow_user", JSON.stringify(data));
    setUser(data);
  };

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    save(data);
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    save(data);
  };

  const logout = () => {
    localStorage.removeItem("CampusFlow_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
