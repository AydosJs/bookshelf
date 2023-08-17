import React, { createContext, useState } from 'react';
import * as authApi from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { AuthPayload, TokenResponse } from '../api/authApi';
import Cookies from 'js-cookie';

export interface AuthContextType {
  isLoggedIn?: boolean;
  loader: boolean;
  register: (payload: AuthPayload) => void;
  logout: () => void;
}

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: Props) {
  const isLoggedINCookie = Cookies.get('isLoggedIn') || "no"

  const [isLoggedIn, setLoggedIn] = useState<boolean>(isLoggedINCookie === "yes" ? true : false);
  const [loader, setLoader] = useState<boolean>(false);

  const navigate = useNavigate();

  const setAsLoggedIn = (resp: TokenResponse) => {
    console.log("resp", resp)
    setLoggedIn(true);
    Cookies.set('isLoggedIn', "yes");
    navigate('/');
    return resp;
  };
  const setCatchLogin = () => {
    setLoggedIn(false);
  };

  const register = (payload: AuthPayload) => {
    setLoader(true);
    return authApi
      .register(payload)
      .then(setAsLoggedIn)
      .catch(setCatchLogin)
      .finally(() => {
        setLoader(false);
      });
  };

  const logout = () => {
    Cookies.remove('isLoggedIn');
    setLoggedIn(false);
    navigate('/register');
  };

  const value = { loader, isLoggedIn, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
