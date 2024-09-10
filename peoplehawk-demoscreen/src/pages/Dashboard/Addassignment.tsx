import styled, { css, keyframes } from "styled-components";
import { Assignment } from "../../interface/Interface";
import { CSSProperties } from "react";
import Yup from 'yup'
import { Field, Form, Formik } from "formik";
import Input from "../../components/layout/form/Input";
import DatePicker from 'react-datepicker';
import { AddData, UpdateData} from "../../services/AssignmentService";



const OverrideCss : CSSProperties = {
    backgroundColor : 'white',
    height : '45px', 
}


interface ModalProps {
    isOpen : boolean,
    onClose : () => void,
    intialValues : Assignment
    onAddHandler : (values : Assignment) => void
    onUpdateHandler : (values : Assignment) => void
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

const FlexDiv = styled.div`
  display : flex;
  gap : 10px;
  align-items : center;
`
const FormDiv = styled.div`
 display : flex;
 flex-direction : column;
 gap : 10px;
 margin-top : 20px;
`



const Addassignment : React.FC<ModalProps> = ({isOpen, onClose,intialValues,onAddHandler,onUpdateHandler}) =>  
    {
        
        
         interface Assignment
        {
          id: number,
          userId: number,
          organisation: string,
          title: string,
          description: string,
          infohraphicResumeDescription: string,
          startDate: Date | null,
          endDate : Date | null,
          isOngoing: boolean
        }
        
        if(!isOpen) {return null}

    return(
        <ModalOverlay isOpen={isOpen} onClick={onClose}>
            <style>
                {`
                .datepicker
                {
                  height : 40px;
                  border : 1px solid #ced4da;
                  border-radius : 0.25rem; 
                  font-size : 1rem;
                }
            `}
            </style>
          <ModalContent isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
            <Title>{intialValues.id > 0 ? 'Update' : 'Add' } Assignment</Title>
            <ModalClose onClick={onClose}>X</ModalClose>
            </ModalHeader>
            <ModalBody>
            <Formik
              initialValues={intialValues}
              onSubmit={async(values : Assignment) => {
                   if(values.id === 0)
                   {
                     await AddData(values);
                     onAddHandler(values);
                   }

                   else
                   {
                    await UpdateData(values);
                    onUpdateHandler(values);
                   }
                 
              }}
            >
              {({ setFieldValue,values }) => (
                <Form>
                    <FormDiv>
                    <div>
                     <label>Company / Organisation *</label>
                     <Input style={OverrideCss} defaultValue={intialValues.organisation} name='organisation' onChange={(e) => setFieldValue('organisation', e.target.value)} />
                     </div>
                     <div>
                     <label>Title *</label>
                     <Input style={OverrideCss} defaultValue={intialValues.title}  name='title' onChange={(e) => setFieldValue('title', e.target.value)} />
                     </div>
                     <div>
                     <label>Assignment Description</label>
                     <Input style={OverrideCss} defaultValue={intialValues.description} name='description' onChange={(e) => setFieldValue('description', e.target.value)} />
                     </div>
                     <div>
                     <label>Brief Description for Infographic Resume</label>
                     <Input style={OverrideCss} defaultValue={intialValues.infohraphicResumeDescription} name='infohraphicResumeDescription' onChange={(e) => setFieldValue('infohraphicResumeDescription', e.target.value)} />
                     </div>
                     <FlexDiv>
                     <div>
                     <label>Start Date*</label>
                     <DatePicker className='datepicker' name = 'startDate' showFullMonthYearPicker selected={values.startDate} placeholderText='Pick a Date' onChange={(date) => setFieldValue('startDate',date)}  />
                    </div>
                    <div>
                     <label>End Date*</label>
                     <DatePicker className='datepicker' name = 'endDate' showFullMonthYearPicker selected={values.endDate} placeholderText='Pick a Date' onChange={(date) => setFieldValue('endDate',date)}  />
                    </div>
                    <label>
            <Field type="checkbox" name="isOngoing" />
            Ongoing
          </label>
          <button type="submit">Confirm</button>
                     </FlexDiv>
                     </FormDiv>
                </Form>
              )}
            </Formik>
             </ModalBody>
              </ModalContent>
             </ModalOverlay>
    )
}

export default Addassignment;