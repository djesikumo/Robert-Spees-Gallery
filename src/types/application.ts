import type { SetStateAction } from "react";
import type { GaleryItem } from "./galery";

export interface ApplicationContextType {
  currentRoute: string;
  setCurrentRoute: (route: SetStateAction<string>) => void;
  selectedItem: GaleryItem | null;
  setSelectedItem: (item: SetStateAction<GaleryItem | null>) => void;
}