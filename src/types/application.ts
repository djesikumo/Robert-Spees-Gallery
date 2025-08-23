import type { SetStateAction } from "react";
import type { GaleryItem } from "./galery";

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
}
