import React from "react";
import Select, { StylesConfig } from "react-select";
import { OptionTypes } from "../../../interface/Interface";

interface SelectProps {
  isMulti?: boolean;
  isLoading?: boolean;
  name: string;
  defaultValue?: any;
  options?: OptionTypes[];
  placeholder? : string;
  onChange?: (field: string, value: any) => void;
}

const customStyles: StylesConfig<OptionTypes[]> = {
  control: (provided,state) => ({
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
      ? "#72DBD0"
      : "#fff",
    cursor: "pointer",
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

  return (
    <div>
    <Select
      options={props.options}
      styles={customStyles}
      isClearable
      isMulti={props.isMulti}
      isLoading={props.isLoading}
      placeholder={props.placeholder}
      onChange={handleChange}
      defaultValue = {props.defaultValue}
    />
    </div>
  );
};