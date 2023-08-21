import React, { createContext, useState } from 'react';
import * as authApi from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { User } from '../types/common';
import toast, { Renderable, Toast, ValueFunction } from 'react-hot-toast';

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

  const [isLoggedIn, setLoggedIn] = useState<boolean>(Boolean(isLoggedINCookie));
  const [loader, setLoader] = useState<boolean>(false);

  const navigate = useNavigate();

  const setAsLoggedIn = (resp: User) => {
    setLoggedIn(true);
    Cookies.set('key', resp.key);
    Cookies.set('Secret', resp.secret);
    navigate('/');
    toast.success('Registers successfully')
    return resp;
  };
  const setCatchLogin = (error: { response: { data: { message: Renderable | ValueFunction<Renderable, Toast>; }; }; }) => {
    setLoggedIn(false);
    toast.error(error.response?.data.message)
  };

  const register = (payload: User) => {
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
    Cookies.remove('key');
    Cookies.remove('Secret');
    setLoggedIn(false);
    navigate('/register');
  };

  const value = { loader, isLoggedIn, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
