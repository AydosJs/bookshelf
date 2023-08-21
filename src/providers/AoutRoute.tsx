import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
// import RegisterProvider from './RegisterProvider';

type Props = {
  children?: React.ReactNode;
};
export default function AuthRoute({ children }: Props) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <Navigate to={'/'} />;
  }
  return <>{children ? children : <Outlet />}</>;
}
