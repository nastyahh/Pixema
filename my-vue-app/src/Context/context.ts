import { createContext } from "react";
import { IActiveContext } from "../utility/types";

export const ActiveContext = createContext<IActiveContext | undefined>(
  undefined
);
