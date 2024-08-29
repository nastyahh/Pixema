export const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#323537",
    "&:hover": {},
    padding: "12px",
    marginBottom: "24px",
    color: "#fff",
    borderRadius: "10px",
    border: "none",
    ...(window.innerWidth <= 430 && {
      fontSize: "13px",
      marginBottom: "10px",
    }),
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    color: "#fff",
    background: "#323537",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#242426" : "#3b3b3e",
    "&:hover": {
      backgroundColor: "#333335",
    },
    borderBottom: "1px solid #242426",
    padding: "10px 8px",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#242426",
    borderRadius: "6px",
    padding: "4px 8px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#fff",
    "&:hover": {
      backgroundColor: "blue",
      color: "white",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: "none",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
};
