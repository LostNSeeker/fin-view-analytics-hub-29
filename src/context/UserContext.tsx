// context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Server } from "@/App";

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
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log('token is ',token);
      
      if (!token) return;

      const res = await axios.get(`${Server}/auth/me`, {
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

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
