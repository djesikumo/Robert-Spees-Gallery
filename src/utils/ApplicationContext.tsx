import { useState, type ReactNode } from "react";
import { ApplicationContext } from "./hooks";
import type { ApplicationContextType, Position } from "../types/application";
import type { GaleryItem } from "../types/galery";
import { data } from "../data";

interface NavigationProviderProps {
  children: ReactNode;
}

export const ApplicationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<string>("/");
  const [artworks, setArtworks] = useState<GaleryItem[]>(data);
  const [selectedItem, setSelectedItem] = useState<GaleryItem | null>(null);
  const [imageZoom, setImageZoom] = useState<number>(1);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })

  const value: ApplicationContextType = {
    currentRoute, setCurrentRoute,
    artworks, setArtworks,
    selectedItem, setSelectedItem,
    imageZoom, setImageZoom,
    position, setPosition
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}