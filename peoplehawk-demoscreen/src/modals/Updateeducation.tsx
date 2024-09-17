import styled, { css, keyframes } from "styled-components";
import { EducationDetail } from "../interface/Interface";
import { ErrorMessage, Form, Formik } from "formik";
import Input from "../components/layout/form/Input";
import * as Yup from "yup";

interface ModalProps {
  onClose: () => void;
  defaultValues: EducationDetail;
  onEditHandler: (values: EducationDetail) => void;
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

const ModalOverlay = styled.div`
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
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  animation: ${css`
    ${fadeIn} 0.3s ease-in-out
  `};
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 800px;
  padding: 20px 50px;
  position: relative;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  animation: ${css`
    ${slideIn} 0.3s ease-in-out
  `};
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
  overflow-y: auto;
`;

const FormDiv = styled.div`
  input {
    background-color: white;
    height: 45px;
  }

  .datepicker {
    height: 40px;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-size: 1rem;
  }

  .error {
    color: red;
    font-size: 1rem;
  }
`;

const validationSchema = Yup.object({
  school: Yup.string().required("Please Enter School/Organisation name"),
  subject: Yup.string().required("Please Enter subject"),
});

const Updateeducation: React.FC<ModalProps> = ({
  onClose,
  defaultValues,
  onEditHandler,
}) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>Edit</Title>
          <ModalClose onClick={onClose}>X</ModalClose>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={defaultValues}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values: EducationDetail) => {
              onEditHandler(values);
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <FormDiv>
                  <div>
                    <label>School / Organisation *</label>
                    <Input
                      defaultValue={defaultValues.school}
                      name="school"
                      onChange={(e) => setFieldValue("school", e.target.value)}
                    />
                    <div className="error">
                      <ErrorMessage name="school" />
                    </div>
                  </div>
                  <div>
                    <label>Subject *</label>
                    <Input
                      defaultValue={defaultValues.subject}
                      name="subject"
                      onChange={(e) => setFieldValue("subject", e.target.value)}
                    />
                    <div className="error">
                      <ErrorMessage name="subject" />
                    </div>
                  </div>
                  <div>
                    <label>Grade</label>
                    <Input
                      defaultValue={defaultValues.grade}
                      name="grade"
                      onChange={(e) => setFieldValue("grade", e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Comments</label>
                    <textarea
                      style={{ width: "99%" }}
                      defaultValue={defaultValues.comments}
                      name="comments"
                      onChange={(e) =>
                        setFieldValue("comments", e.target.value)
                      }
                    />
                  </div>
                  <button type="submit">Confirm</button>
                </FormDiv>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Updateeducation;
