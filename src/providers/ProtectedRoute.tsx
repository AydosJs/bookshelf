import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

type Props = {
  children?: React.ReactNode;
};
export default function ProtectedRoute({ children }: Props) {
  const { isLoggedIn } = useContext(AuthContext);
  console.log('isLogged IN ', isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to={'/register'} replace />;
  }
  return <>{children ? children : <Outlet />}</>;
}
