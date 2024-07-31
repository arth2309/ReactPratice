import React from "react";
import Select, { StylesConfig } from "react-select";
import { OptionTypes } from "../../../interface/Interface";


interface SelectProps {
  isMulti?: boolean;
  isLoading?: boolean;
  name: string;
  defaultValue?: any,
  options?: OptionTypes[];
  onChange?: (field : string, value : any) => void;
}



const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
  
    border: '2px solid #ced4da',
    backgroundColor: "#F9F9F9",
    boxShadow: "none",
    fontSize: "1rem",
    lineHeight: 1.5,
    padding: "0.25rem",
    width: "100%",

    ":focus" :{
      border: '2px solid #72DBD0',
      outline : 'none',
      outlineColor : 'none',
      outlineStyle : 'none'
    },
  
    ":active" : {
      border: '2px solid #72DBD0',
      
    }
   
  }),

  // menu: (provided) => ({
  //   ...provided,
  //   zIndex: 9999,
  // }),

  multiValue: (provided) => ({
      ...provided,
      backgroundColor : '#72DBD0',
      boxShadow : '#72DBD0 0px 2px 4px 0px',
      color : 'white',
      
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



export const MyComponent: React.FC<SelectProps> = (props) => {

  const handleChange = (event : any) => {
      props.onChange && props.onChange(props.name,event)
  }
 
  return (
    <Select
      options={props.options}
      styles={customStyles}
      isClearable
      isMulti={props.isMulti}
      isLoading={props.isLoading}
      placeholder="please select a country"
      onChange={handleChange}
      defaultValue={props.defaultValue}
    />
  );
};
