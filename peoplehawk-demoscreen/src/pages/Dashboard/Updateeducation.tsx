import styled, { css, keyframes } from "styled-components";
import { EducationDetail } from "../../interface/Interface";
import { CSSProperties } from "react";
import Yup from 'yup'
import { Form, Formik } from "formik";
import Input from "../../components/layout/form/Input";


const OverrideCss : CSSProperties = {
    backgroundColor : 'white',
    height : '45px', 
}

const FlexCss : CSSProperties = {
    display : 'flex',
    alignItems : 'end'
}

interface ModalProps {
    isOpen : boolean,
    onClose : () => void,
    defaultValues : EducationDetail,
    onEditHandler : (values : EducationDetail) => void
   
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
`;

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => (props.isOpen ? '1' : '0')};
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease-in-out;
  animation: ${props => (props.isOpen ? css`${fadeIn} 0.3s ease-in-out` : 'none')};
`;

const ModalContent = styled.div<{ isOpen: boolean }>`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 800px;
  padding: 20px 50px;
  position: relative;
  transform: ${props => (props.isOpen ? 'translateY(0)' : 'translateY(-50px)')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  animation: ${props => (props.isOpen ? css`${slideIn} 0.3s ease-in-out` : 'none')};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
    padding-top: 15px;
    font-size: 20px;
    font-weight: 600;
`;

const ModalClose = styled.button`
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 0px;
  background-color: #f96332;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const ModalBody = styled.div`
   height: 603px;
   overflow-y : auto;
`;
const Updateeducation : React.FC<ModalProps> = ({isOpen, onClose,defaultValues,onEditHandler}) =>  
    {

     

        if(!isOpen) {return null}

    return(
        <ModalOverlay isOpen={isOpen} onClick={onClose}>
          <ModalContent isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
            <Title>Edit</Title>
            <ModalClose onClick={onClose}>X</ModalClose>
            </ModalHeader>
            <ModalBody>
            <Formik
              initialValues={defaultValues}
              onSubmit={(values : EducationDetail) => {
                 onEditHandler(values);
              }}
            >
              {({ setFieldValue }) => (
                <Form>
                    <div>
                     <label>School / Organisation *</label>
                     <Input style={OverrideCss} defaultValue={defaultValues.school} name='school' onChange={(e) => setFieldValue('school', e.target.value)} />
                     </div>
                     <div>
                     <label>Subject *</label>
                     <Input style={OverrideCss} defaultValue={defaultValues.subject}  name='subject' onChange={(e) => setFieldValue('subject', e.target.value)} />
                     </div>
                     <div>
                     <label>Grade</label>
                     <Input style={OverrideCss} defaultValue={defaultValues.grade} name='grade' onChange={(e) => setFieldValue('grade', e.target.value)} />
                     </div>
                     <div>
                     <label>Comments</label>
                     <textarea style={{width : '99%'}} defaultValue={defaultValues.comments} name='comments' onChange={(e) => setFieldValue('comments', e.target.value)}  />
                     </div>
                  <button type="submit">Confirm</button>
                </Form>
              )}
            </Formik>
               </ModalBody>
              </ModalContent>
            </ModalOverlay>
    )

}

export default Updateeducation;