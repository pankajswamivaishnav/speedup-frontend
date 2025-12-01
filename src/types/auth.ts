import { ReactElement } from 'react';

// ==============================|| AUTH TYPES  ||============================== //

export type GuardProps = {
  children: ReactElement | null;
};

export type UserProfile = {
  id?: string;
  email?: string;
  avatar?: string;
  image?: string;
  name?: string;
  role?: string;
  tier?: string;
};

export interface AuthProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: any | null;
  token?: string | null;
}

export interface AuthActionProps {
  type: string;
  payload?: AuthProps;
}

export interface InitialLoginContextProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: any | null | undefined;
}

export interface JWTDataProps {
  userId: string;
}

export type JWTContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: any | null | undefined;
  logout: () => void;
  login: (email: string, password: string, keepSignedIn: boolean) => Promise<void>;
  register: (email: string, mobileNumber: string, password: string, firstName: string, lastName: string, role: string) => Promise<void>;
  resetPassword: (email: string, password: string, token: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  updateProfile: VoidFunction;
};
