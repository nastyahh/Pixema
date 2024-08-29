import { useState } from "react";

export const useSearchFilterForm = (initialState) => {
  const [searchQuery, setSearchQuery] = useState(initialState);
  const [validity, setValidity] = useState({ title: true, year: true });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchQuery({ ...searchQuery, [name]: value });

    if (name === "title" || name === "year") {
      setValidity((prev) => ({ ...prev, [name]: !!value }));
    }
  };

  const handleSelectChange = (selectedOptions, name: string) => {
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
