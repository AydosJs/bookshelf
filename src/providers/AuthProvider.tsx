import React, { createContext, useState } from 'react';
import * as authApi from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { User } from '../types/common';
import toast from 'react-hot-toast';

export interface AuthContextType {
  isLoggedIn?: boolean;
  loader: boolean;
  register: (payload: User) => void;
  logout: () => void;
}

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: Props) {
  const isLoggedINCookie = Cookies.get('key') || false

  const [isLoggedIn, setLoggedIn] = useState<boolean>(isLoggedINCookie ? true : false);
  const [loader, setLoader] = useState<boolean>(false);

  const navigate = useNavigate();

  const setAsLoggedIn = (resp: User) => {
    console.log("resp", resp)
    setLoggedIn(true);
    Cookies.set('key', resp.key);
    Cookies.set('Secret', resp.secret);
    navigate('/');
    return resp;
  };
  const setCatchLogin = () => {
    setLoggedIn(false);
  };

  const register = (payload: User) => {
    setLoader(true);
    return authApi
      .register(payload)
      .then(setAsLoggedIn)
      .catch(setCatchLogin)
      .finally(() => {
        setLoader(false);
        toast.success('Registers successfully')
      });
  };

  const logout = () => {
    Cookies.remove('key');
    Cookies.remove('Secret');
    setLoggedIn(false);
    navigate('/register');
  };

  const value = { loader, isLoggedIn, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
