import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "../components/layout/form/Input";
import styled, { css, keyframes } from "styled-components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import { FormValues, EducationDetail } from "../interface/Interface";
import DatePicker from "react-datepicker";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import "react-datepicker/dist/react-datepicker.css";
import { AddData } from "../services/EducationDetailService";

const FlexDiv = styled.div ({
  display: "flex",
  alignItems: "end",
});

interface ModalProps {
  onClose: () => void;
  onAddData: (data: EducationDetail[]) => void; // Add this prop
}

const validationSchema = Yup.object({
  school: Yup.string().required("Please Enter School/Organisation name"),
  subjects: Yup.array().of(
    Yup.object({
      subject: Yup.string().required("Required"),
      grade: Yup.string().required("Required"),
      rewardedDate: Yup.date().required("Required").nullable(),
    })
  ),
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
  animation: ${ css`${fadeIn} 0.3s ease-in-out`};
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 800px;
  padding: 20px 50px;
  position: relative;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  animation: ${ css`${slideIn} 0.3s ease-in-out`};
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

const FieldDiv = styled.div({
  display: "flex",
  gap: "12px",
  margin: "24px 0px",
});

const SchoolDiv = styled.div({
  margin: "8px 0px",
});

const LabelDiv = styled.div({
  display: "flex",
  gap: "157px",
});

const AddButton = styled.button({
  background: "transparent",
  color: "green",
  padding: "0px 0px 4px 6px",
  marginBottom: "30px",
});

const Comments = styled.textarea({
  width: "99%",
  height: "65px",
});

const ClearButton = styled.button({
  background: "transparent",
  color: "orange",
  padding: "0px",
  fontSize: "30px",
});

const FormDiv = styled.div`
input
  {
    background-color : white;
    height : 45px; 
  }

  .datepicker
                {
                  height : 40px;
                  border : 1px solid #ced4da;
                  border-radius : 0.25rem; 
                  font-size : 1rem;
                }`

const intialValues: FormValues = {
  comments: "",
  subjects: [{ subject: "", grade: "", rewardedDate: null }],
  school: "",
};

const Addeducation: React.FC<ModalProps> = ({ onClose, onAddData }) => {
  const DataConversion = (data: FormValues): EducationDetail[] => {
    const TramformB: EducationDetail[] = data.subjects.map((item) => ({
      school: data.school,
      subject: item.subject,
      grade: item.grade,
      rewardedDate: item.rewardedDate,
      comments: data.comments,
      id: 0,
      userId: authctx.userData ? authctx.userData.Id : 0,
    }));

    return TramformB;
  };

  const authctx = useContext(AuthContext);

  return (
    <ModalOverlay  onClick={onClose}>
      <ModalContent  onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>Add</Title>
          <ModalClose onClick={onClose}>X</ModalClose>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={intialValues}
            validationSchema={validationSchema}
            validateOnChange = {false}
            validateOnBlur = {false}
            onSubmit={async (values: FormValues) => {
              const response = await AddData(DataConversion(values));
              response && onAddData(response);
            }}
          >
            {({values, setFieldValue, touched, errors }) => (
              <Form>
                <FormDiv>
                <SchoolDiv>
                  <label>School / Organisation *</label>
                  <Input
                    required
                    name="school"
                    error={Boolean(errors.school && touched.school)}
                    onChange={(e) => setFieldValue("school", e.target.value)}
                  />
                  <ErrorMessage name="school" component="div" />
                </SchoolDiv>
                <FieldArray name="subjects">
                  {({ remove, push }) => (
                    <div>
                      <LabelDiv>
                        <label>Subject</label>
                        <label>Grade</label>
                        <label>Rewarded Date</label>
                      </LabelDiv>
                      <FlexDiv>
                        <div>
                          {values.subjects.map((_, index) => (
                            <FieldDiv key={index}>
                              <div>
                                <Input
                                  name={`subjects.${index}.subject`}
                                  error={Boolean(
                                    errors.subjects &&
                                      errors.subjects[index] &&
                                      touched.subjects?.[index]?.subject
                                  )}
                                  placeholder="Enter Level and Subject name"
                                  onChange={(e) =>
                                    setFieldValue(
                                      `subjects.${index}.subject`,
                                      e.target.value
                                    )
                                  }
                                />
                                <ErrorMessage
                                  name={`subjects.${index}.subject`}
                                  component="div"
                                />
                              </div>
                              <Input
                                name={`subjects.${index}.grade`}
                                placeholder="Grade"
                                type="number"
                                onChange={(e) =>
                                  setFieldValue(
                                    `subjects.${index}.grade`,
                                    e.target.value
                                  )
                                }
                              />
                              <DatePicker
                                className="datepicker"
                                name={`subjects.${index}.rewardedDate`}
                                showFullMonthYearPicker
                                selected={values.subjects[index].rewardedDate}
                                placeholderText="Pick a Date"
                                onChange={(date) =>
                                  setFieldValue(
                                    `subjects.${index}.rewardedDate`,
                                    date
                                  )
                                }
                              />

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
                          onClick={() =>
                            push({ subject: "", grade: "", rewardedDate: "" })
                          }
                        >
                          <AddCircleOutlineIcon />
                        </AddButton>
                      </FlexDiv>
                      <label>Comments</label>
                      <Comments
                        name="comments"
                        onChange={(e) =>
                          setFieldValue("comments", e.target.value)
                        }
                      />
                    </div>
                  )}
                </FieldArray>
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

export default Addeducation;
