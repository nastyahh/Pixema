import { createContext } from "react";
import { IActiveContext, IThemeContext } from "../utility/types";

export const ActiveContext = createContext<IActiveContext | undefined>(
  undefined
);

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);
