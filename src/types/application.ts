import type { SetStateAction } from "react";
import type { GaleryItem } from "./galery";
import type { CV } from "./cv";

export interface Position {
  x: number;
  y: number;
}

export interface ApplicationContextType {
  currentRoute: string;
  setCurrentRoute: (route: SetStateAction<string>) => void;
  artworks: GaleryItem[];
  setArtworks: (artworks: SetStateAction<GaleryItem[]>) => void;
  selectedItem: GaleryItem | null;
  setSelectedItem: (item: SetStateAction<GaleryItem | null>) => void;
  imageZoom: number;
  setImageZoom: (zoom: SetStateAction<number>) => void;
  position: Position;
  setPosition: (position: SetStateAction<Position>) => void;
  cv: CV;
  setCv: (cv: SetStateAction<CV>) => void;
}

// Tipado del esquema del body de la solicitud de autenticación
export interface AuthRequestBody {
  username: string,
  password: string;
}

// Tipado del esquema del response del usuario autenticado
export interface AuthUser {
  username: string;
  token: string;
}

// Tipado para el contexto de autenticación
export interface AuthContextType {
  authUser: AuthUser | null;
  setAuthUser: (user: SetStateAction<AuthUser | null>) => void;
}