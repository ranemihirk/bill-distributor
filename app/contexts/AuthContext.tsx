"use client";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AuthUserProp, RedisUserProp } from "@/lib/types";
import {
  checkCookieAge,
  removeCookie,
  setCookie,
  getCookie,
} from "@/lib/cookies";
import { fetchBook } from "@/lib/redis";

type AuthContext = {
  user: AuthUserProp | null;
  setUser: Dispatch<SetStateAction<AuthUserProp | null>>;
  init: () => void;
  loginUser: (userData) => void;
  logoutUser: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, setUser] = useState<AuthUserProp | null>(null);

  const init = async () => {
    const cookie = getCookie("MyBills");
    if (cookie) {
      const cookieAge = checkCookieAge("MyBills");
      if (!cookieAge) {
        const data = await fetchBook(cookie);
        loginUser(data.message.data);
      } else {
        logoutUser();
      }
    }
  };

  const loginUser = (userData) => {
    setUser({ id: userData.id, name: userData.name, email: userData.email });
    setCookie(userData.email);
  };

  const logoutUser = () => {
    setUser(null);
    removeCookie();
  };

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        init,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be called within a AuthContextProvider"
    );
  }
  return context;
}
