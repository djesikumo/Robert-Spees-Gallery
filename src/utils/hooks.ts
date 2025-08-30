import { createContext, useContext } from "react";
import type { ApplicationContextType, AuthContextType } from "../types/application";

// Hook personalizado de navegación
export const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const useApp = (): ApplicationContextType => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an ApplicationProvider');
  }
  return context;
}

// Hook personalizado de autenticación
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}