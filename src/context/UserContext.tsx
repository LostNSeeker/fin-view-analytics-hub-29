// context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  // Add other fields if needed
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  BackendUrl: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const BackendUrl = import.meta.env.VITE_BKND_URL || "http://localhost:3000/api";

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log('token is ',token);
      
      if (!token) return;

      const res = await axios.get(`${BackendUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('res is ',res);
      setUser(res.data);
    } catch (error) {
      console.error("Fetch user error", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user, setUser,BackendUrl }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
