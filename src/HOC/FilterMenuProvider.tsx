import { createContext, useContext, useState } from "react";
import { IChildren } from "../utility/types";

const FilterMenuContext = createContext({
  isFilterMenuOpen: false,
  toggleFilterMenu: () => {},
});

export const FilterMenuProvider = ({ children }: IChildren) => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen((prev) => !prev);
  };

  return (
    <FilterMenuContext.Provider value={{ isFilterMenuOpen, toggleFilterMenu }}>
      {children}
    </FilterMenuContext.Provider>
  );
};

export const useFilterMenu = () => {
  return useContext(FilterMenuContext);
};
