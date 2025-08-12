import { useState, type ReactNode } from "react";
import { ApplicationContext } from "./hooks";
import type { ApplicationContextType } from "../types/application";
import type { GaleryItem } from "../types/galery";

interface NavigationProviderProps {
  children: ReactNode;
}

export const ApplicationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<string>("/gallery");
  const [selectedItem, setSelectedItem] = useState<GaleryItem | null>(null)

  const value: ApplicationContextType = { 
    currentRoute, setCurrentRoute,
    selectedItem, setSelectedItem
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}