import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

type Props = {
  children?: React.ReactNode;
};
export default function ProtectedRoute({ children }: Props) {
  const isLoggedIn = useAppSelector(item => item.auth.isLoggedIn)

  // console.log('isLogged IN ', isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to={'/register'} replace />;
  }
  return <>{children ? children : <Outlet />}</>;
}
