import { CSSProperties } from 'react';
import styled from 'styled-components';



interface InputProps {
    label?: string;
    type?: string;
    name?: string;
    defaultValue? : string | number | readonly string[]  
    required?: boolean;
    error?: boolean;
    className? : string;
    placeholder? : string;
    style? : CSSProperties;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

   
    
}

const CustomInput = styled.input`
    width: 100%;
    padding: 0.25rem;
    font-size: 1rem;
    line-height: 1.5;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    background-color: #F9F9F9;
    box-sizing: border-box;

    &:focus {
       border: 2px solid #72DBD0;
       outline: none;
    }
`;

const CustomLabel = styled.label`
    display: block;
    color: #394456;
    font-weight: 450;
     line-height: 1.5;
`;

const Input: React.FC<InputProps> = (props) => {
    const { label, type = 'text', required = false, onClick, onChange, name,className,placeholder,defaultValue,style} = props;
  
    

    return (
        <div >
            {label && <CustomLabel>{label}{required ? ' *' : ''}</CustomLabel>}
            <CustomInput
               
                type={type}
                onClick={onClick}
                onChange={onChange}
                className= {className}
                defaultValue={defaultValue}
                name={name}
                style={style}
                placeholder={placeholder}
                
            />
            
        </div>
    );
}

export default Input;