"use client"

import { createContext } from "react";

export interface LightContextType {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>> | null;
}
const LightContext = createContext<LightContextType>({ value: false, setValue: null})

export default LightContext