import type { SetStateAction } from "react";

export interface NavigationContextType {
  currentRoute: string;
  setCurrentRoute: (route: SetStateAction<string>) => void;
}