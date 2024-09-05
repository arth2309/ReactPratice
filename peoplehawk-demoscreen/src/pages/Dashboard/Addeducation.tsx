import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/layout/form/Input';
import styled, { css, keyframes } from "styled-components";
import { CSSProperties } from 'react';

const OverrideCss : CSSProperties = {
    backgroundColor : 'white',
    height : '45px'
}

interface ModalProps {
    isOpen : boolean,
    onClose : () => void;
}

const validationSchema = Yup.object({
    subjects: Yup.array().of(
      Yup.object({
        subject: Yup.string().required('Required'),
        grade: Yup.string().required('Required'),
        rewardedDate: Yup.date().required('Required').nullable(),
      })
    ).required('At least one subject is required'),
  });
  

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
  padding: 20px 10px;
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
  font-size: 25px;
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

const FieldDiv = styled.div({
    display : 'flex',
    gap : '5px'
});

const LabelDiv = styled.div({
    display : 'flex',
    gap : '157px'
})


const Addeducation : React.FC<ModalProps> = ({isOpen,onClose}) => {
    if(!isOpen) {return null}

    return(
        <ModalOverlay isOpen = {isOpen} onClick={onClose}>
          <ModalContent isOpen = {isOpen} onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
            <Title>Add</Title>
            <ModalClose onClick={onClose}>X</ModalClose>
            </ModalHeader>
            <ModalBody>
            <Formik
      initialValues={{
        subjects: [{ subject: '', grade: '', rewardedDate: '' }],
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values }) => (
        <Form>
             <Input style={OverrideCss} label='School/Organisation' required name = 'School/Organisation' placeholder="School/Organisation" />
          <FieldArray name="subjects">
            {({ remove, push }) => (
              <div>
                  
                 <LabelDiv>
                 <label >Subject</label>
                 <label >Grade</label>
                 <label >Rewarded Date</label>
                    </LabelDiv>
                {values.subjects.length > 0 &&
                  values.subjects.map((subject, index) => (
                    <FieldDiv key={index}>
                    <Input style={OverrideCss} name = {`subjects.${index}.subject`} placeholder="Subject" />
                      <Input style={OverrideCss} name={`subjects.${index}.grade`} placeholder="Grade" />
                      <Input style={OverrideCss} name={`subjects.${index}.rewardedDate`} type="date" placeholder="Rewarded Date" />

                      <button
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </FieldDiv>
                  ))}
                    <textarea style={{width : '100%'}} required name = 'School/Organisation' placeholder="School/Organisation" />
                <button
                  type="button"
                  onClick={() => push({ subject: '', grade: '', rewardedDate: '' })}
                >
                  Add Subject
                </button>
              </div>
            )}
          </FieldArray>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
           </ModalBody>
          </ModalContent>
        </ModalOverlay>
    )

}

export default Addeducation







