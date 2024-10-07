import styled, { css, keyframes } from "styled-components";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "../components/layout/form/Input";
import { addShortlist } from "../services/ShortlistService";
import { ShortlistReducerProps } from "../interface/Interface";
import { Action } from "../store/ShortlistReducer";
import { Dispatch } from "react";

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
  background: #eef2f6;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 600px;
  padding: 10px 20px 20px 20px;
  position: relative;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  animation: ${css`
    ${slideIn} 0.3s ease-in-out
  `};
`;

const ModalHeader = styled.div`
  color: black;
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 20px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  div {
    width: 100%;
    .error {
      color: red;
    }
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: end;
  gap: 30px;
  margin-top: 10px;
`;

const ConfirmButton = styled.button({
  backgroundColor: "#0097A2",
  padding: "12px 26px",
  fontSize: "15px",
  fontWeight: 700,
  borderRadius: "0px",

  "&:hover": {
    backgroundColor: "#00B0BA",
  },
});

const CancelButton = styled.button({
  backgroundColor: "#eef2f6",
  padding: "12px 26px",
  fontSize: "15px",
  color: "#0097A2",
  border: "1px solid #eef2f6",
  borderRadius: "0px",
  fontWeight: 700,

  "&:hover": {
    border: "1px solid #0097A2",
  },
});

interface ModalProps {
  onClose: () => void;
  state: ShortlistReducerProps;
  dispatch: Dispatch<Action>;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("please enter shortlist name"),
});

const CreateShortlist: React.FC<ModalProps> = ({
  onClose,
  state,
  dispatch,
}) => {
  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>Create A Shortlist</ModalHeader>
        <ModalBody>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ title: "" }}
            onSubmit={async (values) => {
              const response = await addShortlist({
                id: 0,
                name: values.title,
                userId: 0,
              });
              response &&
                dispatch({ type: "ADD_IN_SHORTLIST", payload: response });
              onClose();
            }}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form>
                <div>
                  <Input
                    label="Shortlist Name"
                    name="title"
                    error={Boolean(errors.title && touched.title)}
                    onChange={(e) => setFieldValue("title", e.target.value)}
                  />
                  <ErrorMessage
                    name="title"
                    className="error"
                    component="div"
                  />
                </div>
                <ButtonDiv>
                  <CancelButton onClick={onClose}>Cancel</CancelButton>
                  <ConfirmButton type="submit">Confirm</ConfirmButton>
                </ButtonDiv>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateShortlist;
