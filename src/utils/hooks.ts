import { createContext, useContext } from "react";
import type { ApplicationContextType } from "../types/application";

// Hook personalizado de navegación
export const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const useApp = (): ApplicationContextType => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an ApplicationProvider');
  }
  return context;
}