import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import Cookies from "js-cookie";

type Props = {
  children?: React.ReactNode;
};
export default function ProtectedRoute({ children }: Readonly<Props>) {
  const isLoggedIn = useAppSelector(item => item.auth.isLoggedIn)
  const key = Boolean(Cookies.get("key")) || false;

  if (!isLoggedIn && !key) {
    return <Navigate to={'/register'} replace />;
  }
  return <>{children ?? <Outlet />}</>;
}
