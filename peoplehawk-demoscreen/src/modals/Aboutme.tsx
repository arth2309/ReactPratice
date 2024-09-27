import styled, { css, keyframes } from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import "../stylesheets/obviously-font.css";
import { memo, useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import AuthContext from "../store/AuthContext";
import { useApi } from "../store/ReducerContext";
import { postAboutMeDetail } from "../services/HomeService";
import Markdown from "react-markdown";

interface ModalProps {
  onClose: () => void;
  note: string | null;
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
  background: #b8dff5;
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
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: obviously;
  font-size: 25px;
  color: #394456;
`;

const ModalClose = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
`;

const NoteTextArea = styled.textarea({
  width: "100%",
  height: "200px",
});

const SaveButton = styled.button({
  backgroundColor: "#0097A2",
  padding: "12px 26px",
  fontSize: "15px",
  fontWeight: 700,
});

const SectionDiv = styled.div({
  background: "white",
  padding: "10px",
  borderRadius: "12px",
  marginBottom: "5px",
});

const ButtonDiv = styled.div({
  display: "flex",
  justifyContent: "start",
  gap: "10px",
});

const Aboutme: React.FC<ModalProps> = ({ onClose, note }) => {
  const { userData } = useContext(AuthContext);
  const { state, dispatch } = useApi();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    setIsEdit(state.aboutMe ? true : false);
  }, [state]);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalClose onClick={onClose}>
            <HighlightOffOutlinedIcon fontSize="large" />
          </ModalClose>
          <Title>Tell me About Yourself!!</Title>
        </ModalHeader>

        {isEdit ? (
          <div>
            <SectionDiv>
              <Markdown>{state.aboutMe}</Markdown>
            </SectionDiv>
            <ButtonDiv>
              <SaveButton
                onClick={() => {
                  setIsEdit(false);
                }}
              >
                Edit
              </SaveButton>
            </ButtonDiv>
          </div>
        ) : (
          <Formik
            initialValues={{
              userId: userData ? userData.Id : 0,
              text: "",
            }}
            onSubmit={async (values) => {
              const response = await postAboutMeDetail(values);
              response &&
                dispatch({ type: "POST_ABOUT_ME", payload: values.text });
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <NoteTextArea
                  name="text"
                  defaultValue={state.aboutMe ? state.aboutMe : ""}
                  onChange={(e) => {
                    setFieldValue("text", e.target.value);
                  }}
                />
                <SaveButton type="submit">Save</SaveButton>
              </Form>
            )}
          </Formik>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default memo(Aboutme);
