import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
// import RegisterProvider from './RegisterProvider';

type Props = {
  children?: React.ReactNode;
};
export default function AuthRoute({ children }: Props) {
  const isLoggedIn = useAppSelector(item => item.auth.isLoggedIn)

  if (isLoggedIn) {
    return <Navigate to={'/'} />;
  }
  return <>{children ? children : <Outlet />}</>;
}
