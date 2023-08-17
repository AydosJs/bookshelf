import React, { createContext, useState } from 'react';
import { User } from '../types/common';

export interface RegisterContextType {
  payload?: User;
  setPayload: React.Dispatch<React.SetStateAction<User>>;
}

export const RegisterContext = createContext<RegisterContextType>({} as RegisterContextType);

export default function RegisterProvider({ children }: React.PropsWithChildren<unknown>) {
  const [payload, setPayload] = useState<User>({
    name: '',
    email: '',
    key: '',
    secret: ''
  });

  return (
    <RegisterContext.Provider value={{ payload, setPayload }}>{children}</RegisterContext.Provider>
  );
}
