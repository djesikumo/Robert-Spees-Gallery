import { useState, type ReactNode } from "react";
import { NavigationContext } from "./hooks";
import type { NavigationContextType } from "../types/application";

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<string>("/");

  const value: NavigationContextType = { currentRoute, setCurrentRoute };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}