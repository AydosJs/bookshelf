import React, { createContext, useState } from 'react';
import { AuthPayload } from '../api/authApi';

export interface RegisterContextType {
  payload?: AuthPayload;
  setPayload: React.Dispatch<React.SetStateAction<AuthPayload>>;
}

export const RegisterContext = createContext<RegisterContextType>({} as RegisterContextType);

export default function RegisterProvider({ children }: React.PropsWithChildren<unknown>) {
  const [payload, setPayload] = useState<AuthPayload>({
    name: '',
    email: '',
    key: '',
    secret: ''
  });

  return (
    <RegisterContext.Provider value={{ payload, setPayload }}>{children}</RegisterContext.Provider>
  );
}
