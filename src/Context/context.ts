import { createContext } from "react";
import {
  IActiveContext,
  IBurgerMenuContext,
  IThemeContext,
} from "../utility/types";

export const ActiveContext = createContext<IActiveContext | undefined>(
  undefined
);

export const ThemeContext = createContext<IThemeContext>({
  isDark: false,
  toggleTheme: () => {},
});

export const BurgerMenuContext = createContext<IBurgerMenuContext>({
  isMenuOpen: false,
  toggleMenu: () => {},
  closeMenu: () => {},
});
