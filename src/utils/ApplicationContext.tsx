import { useState, type ReactNode } from "react";
import { ApplicationContext } from "./hooks";
import type { ApplicationContextType, Position } from "../types/application";
import type { GaleryItem } from "../types/galery";
import type { CV } from "../types/cv";
import { data } from "../data";
import { cvData } from "../data";

interface NavigationProviderProps {
  children: ReactNode;
}

export const ApplicationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<string>("/");
  const [artworks, setArtworks] = useState<GaleryItem[]>(data);
  const [selectedItem, setSelectedItem] = useState<GaleryItem | null>(null);
  const [imageZoom, setImageZoom] = useState<number>(0.8);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [cv, setCv] = useState<CV>(cvData);

  const value: ApplicationContextType = {
    currentRoute, setCurrentRoute,
    artworks, setArtworks,
    selectedItem, setSelectedItem,
    imageZoom, setImageZoom,
    position, setPosition,
    cv, setCv
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}