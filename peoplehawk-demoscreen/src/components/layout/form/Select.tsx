import React from "react";
import Select, { StylesConfig } from "react-select";
import { OptionTypes } from "../../../interface/Interface";

interface SelectProps {
  isMulti?: boolean;
  isLoading?: boolean;
  name: string;
  isClearable?: boolean;
  isSearchable?: boolean;
  className?: string;
  defaultValue?: any;
  value?: any;
  options?: OptionTypes[];
  placeholder?: string;
  onChange?: (field: string, value: any) => void;
  showDropdownIndicator?: boolean; // New prop
}

const baseStyles: StylesConfig<OptionTypes[], boolean> = {
  control: (provided, state) => ({
    ...provided,
    border: `2px solid ${state.isFocused ? "#72DBD0" : "#ced4da"}`,
    backgroundColor: "#F9F9F9",
    boxShadow: "none",
    fontSize: "1rem",
    lineHeight: 1.5,
    padding: "0rem",
    width: "100%",
    ":hover": {
      border: "2px solid #72DBD0",
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#72DBD0",
    boxShadow: "#72DBD0 0px 2px 4px 0px",
    color: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#3CD0C3"
      : state.isFocused
      ? "transparent"
      : "#fff",
    cursor: "pointer",
    zIndex: 10,
    ":hover": {
      backgroundColor: "#72DBD0",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#333",
  }),
};

export const ReactSelect: React.FC<SelectProps> = (props) => {
  const handleChange = (event: any) => {
    props.onChange && props.onChange(props.name, event);
  };

  const styles: StylesConfig<OptionTypes[], boolean> = {
    ...baseStyles,
    dropdownIndicator: props.showDropdownIndicator
      ? baseStyles.dropdownIndicator
      : (provided) => ({
          ...provided,
          display: "none", // Hide the dropdown indicator when not needed
        }),
  };

  return (
    <div>
      <Select
        options={props.options}
        styles={styles} // Apply conditional styles
        isClearable={props.isClearable}
        isMulti={props.isMulti}
        isLoading={props.isLoading}
        placeholder={props.placeholder}
        onChange={handleChange}
        defaultValue={props.defaultValue}
        className={props.className}
        value={props.value}
        isSearchable={props.isSearchable}
      />
    </div>
  );
};
