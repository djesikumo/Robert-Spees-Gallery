import { createContext, useContext } from "react";
import type { NavigationContextType } from "../types/application";

// Hook personalizado de navegación
export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNav = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNav must be used within an NavigationProvider');
  }
  return context;
}