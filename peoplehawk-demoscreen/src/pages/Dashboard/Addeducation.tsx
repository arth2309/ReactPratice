import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/layout/form/Input';
import styled, { css, keyframes } from "styled-components";
import { CSSProperties } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { FormValues ,EducationData} from '../../interface/Interface';

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
    onClose : () => void;
    onAddData: (data: EducationData[]) => void; // Add this prop
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

const FieldDiv = styled.div({
    display : 'flex',
    gap : '5px'
});

const LabelDiv = styled.div({
    display : 'flex',
    gap : '157px'
});

const AddButton = styled.button({
    background : 'transparent',
    color : 'green',
    padding: '0px 0px 4px 6px' 
});

const ClearButton = styled.button({
    background : 'transparent',
    color : 'orange',
    padding : '0px',
    fontSize: '30px'
});

const intialValues : FormValues = {
    comments : '',
    subjects : [{subject : '',grade : 0,rewardedDate : null}],
    school : ''
}

const Addeducation : React.FC<ModalProps> = ({isOpen, onClose, onAddData}) => {

    const DataConversion = (data : FormValues) : EducationData[] => {
        const TramformB : EducationData[] = data.subjects.map((item) => ({school : data.school,subject : item.subject,grade : item.grade,rewardedDate : item.rewardedDate,comments : data.comments }))
          return TramformB;
    }

    if(!isOpen) {return null}

    return(
        <ModalOverlay isOpen={isOpen} onClick={onClose}>
          <ModalContent isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
            <Title>Add</Title>
            <ModalClose onClick={onClose}>X</ModalClose>
            </ModalHeader>
            <ModalBody>
            <Formik
              initialValues={intialValues}
              validationSchema={validationSchema}
              onSubmit={(values : FormValues) => {
                onAddData(DataConversion(values));
              }}
            >
              {({ values, setFieldValue }) => (
                <Form>
                    <div>
                     <label>School/Organisation *</label>
                     <Input style={OverrideCss} required name='school' onChange={(e) => setFieldValue('school', e.target.value)} />
                     </div>
                  <FieldArray name="subjects">
                    {({ remove, push }) => (
                      <div>
                          <LabelDiv>
                           <label>Subject</label>
                           <label>Grade</label>
                           <label>Rewarded Date</label>
                          </LabelDiv>
                          <div style={FlexCss}>
                          <div>
                      {values.subjects.length > 0 &&
                        values.subjects.map((subject, index) => (
                          <FieldDiv key={index}>
                          <Input style={OverrideCss} name={`subjects.${index}.subject`} placeholder="Subject" onChange={(e) => setFieldValue(`subjects.${index}.subject`, e.target.value)} />
                            <Input style={OverrideCss} name={`subjects.${index}.grade`} placeholder="Grade" type='number' onChange={(e) => setFieldValue(`subjects.${index}.grade`, e.target.value)} />
                            <Input style={OverrideCss} name={`subjects.${index}.rewardedDate`} type="date" placeholder="Rewarded Date" onChange={(e) => setFieldValue(`subjects.${index}.rewardedDate`, e.target.value)}  />

                            <ClearButton
                              disabled={values.subjects.length <= 1}
                              type="button"
                              onClick={() => remove(index)}
                            >
                              <ClearIcon />
                            </ClearButton>
                          </FieldDiv>
                        ))}
                        </div>
                        <AddButton
                        type="button"
                        onClick={() => push({ subject: '', grade: '', rewardedDate: '' })}
                      >
                       <AddCircleOutlineIcon />
                      </AddButton>
                      </div>
                      <label>Comments</label>
                          <textarea style={{width : '99%'}} name='comments' onChange={(e) => setFieldValue('comments', e.target.value)}  />
                    </div>
                    )}
                  </FieldArray>
                  <button type="submit">Confirm</button>
                </Form>
              )}
            </Formik>
               </ModalBody>
              </ModalContent>
            </ModalOverlay>
    )
}

export default Addeducation
