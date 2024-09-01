import { useState } from "react";
import { filterInitialState, selectedOptions } from "../utility/types";

export const useSearchFilterForm = (initialState: filterInitialState) => {
  const [searchQuery, setSearchQuery] = useState(initialState);
  const [validity, setValidity] = useState({ title: true, year: true });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchQuery({ ...searchQuery, [name]: value });

    if (name === "title" || name === "year") {
      setValidity((prev) => ({ ...prev, [name]: !!value }));
    }
    console.log(validity);
  };

  const handleSelectChange = (
    selectedOptions: selectedOptions[] | null,
    name: string
  ) => {
    setSearchQuery({
      ...searchQuery,
      [name]: selectedOptions
        ? selectedOptions.map((option) => option.label)
        : [],
    });
  };

  return {
    searchQuery,
    validity,
    handleInput,
    handleSelectChange,
    setValidity,
    setSearchQuery,
  };
};
