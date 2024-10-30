import styled, { css, keyframes } from "styled-components";
import { Assignment } from "../interface/Interface";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Input from "../components/layout/form/Input";
import DatePicker from "react-datepicker";
import { AddData, UpdateData } from "../services/AssignmentService";
import * as Yup from "yup";
import moment from "moment";

interface ModalProps {
  onClose: () => void;
  intialValues: Assignment;
  onAddHandler: (values: Assignment) => void;
  onUpdateHandler: (values: Assignment) => void;
}

const validationSchema = Yup.object({
  organisation: Yup.string().required("Please Enter School/Organisation name"),
  title: Yup.string().required("Please Enter title"),
  startDate: Yup.date().required("Please enter start date"),
  endDate: Yup.date().required("Please enter end date"),
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

const FlexDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

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

const Addassignment: React.FC<ModalProps> = ({
  onClose,
  intialValues,
  onAddHandler,
  onUpdateHandler,
}) => {
  interface Assignment {
    id: number;
    userId: number;
    organisation: string;
    title: string;
    description: string;
    infohraphicResumeDescription: string;
    startDate: Date | null;
    endDate: Date | null;
    isOngoing: boolean;
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>{intialValues.id > 0 ? "Update" : "Add"} Assignment</Title>
          <ModalClose onClick={onClose}>X</ModalClose>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={intialValues}
            validationSchema={validationSchema}
            onSubmit={async (values: Assignment) => {
              if (values.id === 0) {
                const response = await AddData(values);
                response && onAddHandler(response);
              } else {
                await UpdateData(values);
                onUpdateHandler(values);
              }
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <FormDiv>
                  <div>
                    <label>Company / Organisation *</label>
                    <Input
                      defaultValue={intialValues.organisation}
                      name="organisation"
                      onChange={(e) =>
                        setFieldValue("organisation", e.target.value)
                      }
                    />
                    <div className="error">
                      <ErrorMessage name="organisation" />
                    </div>
                  </div>
                  <div>
                    <Input
                      defaultValue={intialValues.title}
                      name="title"
                      onChange={(e) => setFieldValue("title", e.target.value)}
                      label="Title"
                      required
                    />
                    <div className="error">
                      <ErrorMessage name="title" />
                    </div>
                  </div>
                  <div>
                    <label>Assignment Description</label>
                    <Input
                      defaultValue={intialValues.description}
                      name="description"
                      onChange={(e) =>
                        setFieldValue("description", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>Brief Description for Infographic Resume</label>
                    <Input
                      defaultValue={intialValues.infohraphicResumeDescription}
                      name="infohraphicResumeDescription"
                      onChange={(e) =>
                        setFieldValue(
                          "infohraphicResumeDescription",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <FlexDiv>
                    <div>
                      <label>Start Date*</label>
                      <DatePicker
                        className="datepicker"
                        name="startDate"
                        maxDate={
                          values.endDate
                            ? moment(values.endDate).add(-1, "days").toDate()
                            : moment(new Date()).add(-1, "days").toDate()
                        }
                        showFullMonthYearPicker
                        selected={values.startDate}
                        placeholderText="Pick a Date"
                        onChange={(date) => setFieldValue("startDate", date)}
                      />
                      <div className="error">
                        <ErrorMessage name="startDate" />
                      </div>
                    </div>
                    <div>
                      <label>End Date*</label>
                      <DatePicker
                        className="datepicker"
                        disabled={values.isOngoing}
                        minDate={moment(values.startDate)
                          .add(1, "days")
                          .toDate()}
                        maxDate={new Date()}
                        name="endDate"
                        showFullMonthYearPicker
                        selected={values.endDate}
                        placeholderText="Pick a Date"
                        onChange={(date) => setFieldValue("endDate", date)}
                      />
                      <div className="error">
                        <ErrorMessage name="endDate" />
                      </div>
                    </div>
                    <label>
                      <Field
                        type="checkbox"
                        name="isOngoing"
                        checked={values.isOngoing}
                        onChange={() => {
                          setFieldValue("isOngoing", !values.isOngoing);
                          !values.isOngoing
                            ? setFieldValue("endDate", new Date())
                            : setFieldValue("endDate", null);
                        }}
                      />
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
  );
};

export default Addassignment;
