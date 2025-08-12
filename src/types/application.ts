import type { SetStateAction } from "react";
import type { GaleryItem } from "./galery";

export interface Position {
  x: number;
  y: number;
}

export interface ApplicationContextType {
  currentRoute: string;
  setCurrentRoute: (route: SetStateAction<string>) => void;
  selectedItem: GaleryItem | null;
  setSelectedItem: (item: SetStateAction<GaleryItem | null>) => void;
  isOpenItemDetailsDrawer: boolean;
  setIsOpenItemDetailsDrawer: (item: SetStateAction<boolean>) => void;
  imageZoom: number;
  setImageZoom: (zoom: SetStateAction<number>) => void;
  position: Position;
  setPosition: (position: SetStateAction<Position>) => void;
}
