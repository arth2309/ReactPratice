import styled, { css, keyframes } from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import "../stylesheets/obviously-font.css";
import { memo, useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import AuthContext from "../store/AuthContext";
import { useApi } from "../store/ReducerContext";
import { postAboutMeDetail } from "../services/HomeService";
import Markdown from "react-markdown";
import aiIcon from "../assests/img/icon-ai.svg";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
  height: "450px",
  overflow: "auto",
});

const AIIconDiv = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "5px",
});

const ButtonDiv = styled.div({
  display: "flex",
  justifyContent: "start",
  gap: "10px",
});

const AIIconImg = styled.img({
  height: "25px",
  width: "40px",
  cursor: "pointer",
});

const OutlineButton = styled.button({
  cursor: "pointer",
  position: "relative",
  background: "transparent",
  border: "1px solid #F96332",
  width: "150px",
  fontSize: "16px",
  fontWeight: "600",
  display: "flex",
  marginTop: "10px",
  marginBottom: "10px",
  justifyContent: "center",
  borderRadius: "20px",
  color: "#394456",
});
let listArray: string[] = [];
const Aboutme: React.FC<ModalProps> = ({ onClose, note }) => {
  const { userData } = useContext(AuthContext);
  const { state, dispatch } = useApi();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAutoGenerateText, setIsAutoGenerateText] = useState<boolean>(false);
  const [streamedText, setStreamedText] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [isRegenerate, setIsRegenerate] = useState<boolean>(false);

  useEffect(() => {
    setIsEdit(state.aboutMe ? true : false);
  }, [state]);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyD1rX7VkFWhjoEtYUl48DgMFjM2wFl4C7M"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const aiRun = async () => {
    setIsAutoGenerateText(true);
    const prompt = `please create about me description here are my details my name is ${
      state.firstName + " " + state.lastName
    } my birth country is ${
      state.countryName
    } i have broker as personality type`;
    const result = await model.generateContentStream(prompt);

    let res = await result.stream.next();

    while (!res.done) {
      if (res.value.candidates) {
        setStreamedText(
          (prevState) =>
            prevState + res.value.candidates[0].content.parts[0].text
        );
      }
      res = await result.stream.next();
    }
    listArray.push((await result.response).text());
    setCount(listArray.length);
    setIsRegenerate(true);
  };

  const regenerateText = async () => {
    setIsRegenerate(false);
    setStreamedText("");
    await aiRun();
  };

  const goToForward = () => {
    if (count < listArray.length) {
      setCount((prevState) => prevState + 1);
      setStreamedText(listArray[count]);
    }
  };

  const goToBackward = () => {
    if (count > 1) {
      setCount((prevState) => prevState - 1);
      setStreamedText(listArray[count - 2]);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalClose
            onClick={() => {
              listArray = [];
              onClose();
            }}
          >
            <HighlightOffOutlinedIcon fontSize="large" />
          </ModalClose>
          <Title>
            {isAutoGenerateText
              ? "Auto Generated About me"
              : "Tell me About Yourself!!"}
          </Title>
        </ModalHeader>
        <AIIconDiv>
          <div>
            {" "}
            {isAutoGenerateText && (
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => {
                  listArray = [];
                  setStreamedText("");
                  setIsAutoGenerateText(false);
                  setCount(0);
                }}
              >
                <ArrowBackIosNewIcon /> Back
              </div>
            )}
          </div>
          {!isAutoGenerateText && (
            <AIIconImg src={aiIcon} onClick={async () => aiRun()} />
          )}
          {listArray.length > 1 && (
            <div style={{ display: "flex" }}>
              <div style={{ cursor: "pointer" }} onClick={goToBackward}>
                <ArrowBackIosNewIcon />
              </div>
              {count + "/" + listArray.length}
              <div style={{ cursor: "pointer" }} onClick={goToForward}>
                <ArrowForwardIosIcon />
              </div>
            </div>
          )}
        </AIIconDiv>
        {!isAutoGenerateText ? (
          isEdit ? (
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
          )
        ) : (
          <>
            <SectionDiv>
              <Markdown>{streamedText}</Markdown>
            </SectionDiv>

            <div style={{ display: "flex" }}>
              {isRegenerate && listArray.length > 0 && (
                <SaveButton
                  onClick={async () => {
                    const response = await postAboutMeDetail({
                      userId: userData ? userData.Id : 0,
                      text: streamedText,
                    });
                    response &&
                      dispatch({
                        type: "POST_ABOUT_ME",
                        payload: streamedText,
                      });
                    response && (listArray = []);
                    response && setIsEdit(false);
                    response && setStreamedText("");
                    response && setIsAutoGenerateText(false);
                  }}
                >
                  Save
                </SaveButton>
              )}
              {isRegenerate &&
                listArray.length === count &&
                listArray.length < 3 && (
                  <SaveButton
                    onClick={async () => {
                      regenerateText();
                    }}
                  >
                    Regenerate
                  </SaveButton>
                )}
            </div>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default memo(Aboutme);
