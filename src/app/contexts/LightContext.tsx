"use client"

import { createContext } from "react";

export interface LightContextType {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}
const LightContext = createContext<LightContextType>({ value: false, setValue: () => {} })

export default LightContext