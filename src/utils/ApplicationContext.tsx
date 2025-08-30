import { useState, useEffect, type ReactNode } from "react";
import { ApplicationContext, AuthContext } from "./hooks";
import type { ApplicationContextType, Position, AuthContextType, AuthUser } from "../types/application";
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

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        const parsedUser: AuthUser = JSON.parse(storedUser);
        if (parsedUser) {
          setAuthUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing authUser from localStorage", error);
        localStorage.removeItem("authUser");
      }
    }
  }, []);

  const value: AuthContextType = {
    authUser, setAuthUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}