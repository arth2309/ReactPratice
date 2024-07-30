
import React from "react";
import { useField } from "formik";
import styled from 'styled-components';

interface InputProps {
    label?: string,
    type? : string,
    name: string,
    required?: boolean,
    error? : boolean,
    onClick? : (event : React.MouseEvent<HTMLInputElement>) => void,
    onChange? : (event : React.ChangeEvent<HTMLInputElement>) => void,
}

const CustomInput = styled.input`
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    background-color: #F9F9F9;
`;

const CustomLabel = styled.label`
    display: block;
    color: #394456;
    font-weight: 500;
`;

const Input: React.FC<InputProps> = (props) => {
    const [field, meta] = useField(props.name);

    return (
        <div>
            {props.label && <CustomLabel>{props.label}{props.required ? '*' : ''}</CustomLabel>}
            <CustomInput
                {...field} type={props.type} onClick={props.onClick}
                onChange={(e) => {
                    field.onChange(e);
                    if (props.onChange) {
                        props.onChange(e);
                    }
                }}
            />
            {meta.touched && meta.error ? (
                <div style={{ color: 'red' }}>{meta.error}</div>
            ) : null}
        </div>
    );
}

export default Input;