import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { AuthContext } from "./auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    return !!(token && storedUser);
  });

  // ✅ LOGIN
  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // ✅ REGISTER
  const register = async (fullName, email, password) => {
    try {
      const res = await axiosInstance.post("/user/register", {
        fullName,
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  // ✅ LOGOUT (fixed)
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axiosInstance.post(
        "/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch {
      console.warn("Logout API failed, clearing local data");
    }

    // ✅ Clear frontend state (MOST IMPORTANT)
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading: false,
        login,
        register,
        logout,
        setIsAuthenticated,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
