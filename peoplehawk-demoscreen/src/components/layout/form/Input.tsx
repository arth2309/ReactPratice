import styled from 'styled-components';

interface InputProps {
    label?: string;
    type?: string;
    name?: string; 
    required?: boolean;
    error?: boolean;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

   
    
}

const CustomInput = styled.input`
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    background-color: #F9F9F9;

    &:focus {
       border: 2px solid #72DBD0;
       outline: none;
    }
`;

const CustomLabel = styled.label`
    display: block;
    color: #394456;
    font-weight: 500;
`;

const Input: React.FC<InputProps> = (props) => {
    const { label, type = 'text', required = false, onClick, onChange, name} = props;
  
    

    return (
        <div>
            {label && <CustomLabel>{label}{required ? ' *' : ''}</CustomLabel>}
            <CustomInput
               
                type={type}
                onClick={onClick}
                onChange={onChange}
                
            />
            
        </div>
    );
}

export default Input;