import styled, { css, keyframes } from "styled-components";
import profile from "../assests/img/profile_placeholder-3x.png";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../store/AuthContext";
import { useAudioRecorder } from "react-audio-voice-recorder";
import MicNoneIcon from "@mui/icons-material/MicNone";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import { Formik, Form } from "formik";
import recordButton from "../assests/img/record-removebg-preview.png";
import { useApi } from "../store/ReducerContext";
import { addTextNote } from "../services/TextNoteService";
import { uploadAudioNote } from "../services/AudioNoteService";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

interface ModalProps {
  onClose: () => void;
  profileImg: string | null;
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
    transform: translateY(100%); // Start from below the screen
  }
  to {
    transform: translateY(0); // Move to its final position
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: end; // Center horizontally
  align-items: flex-end; // Align to the bottom
  z-index: 1000;
  opacity: 1;
  transition: opacity 1s ease-in-out;
  animation: ${fadeIn} 1s ease-in-out;
`;

const ModalContent = styled.div`
  background: #eef2f6;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 275px;
  padding: 20px;
  margin: 0 25px 10px 0;
  position: relative;
  transition: transform 1s ease-in-out, opacity 1s ease-in-out;
  animation: ${slideIn} 1s ease-in-out;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  padding-top: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 600;
`;

const ProfileImg = styled.img({
  height: "60px",
  width: "60px",
  borderRadius: "50%",
});

const IconButton = styled.button({
  backgroundColor: "#0097A2",
  padding: "20px",
  borderRadius: "50%",
  width: "80px",
  height: "80px",
});

const Card = styled.div({
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  justifyContent: "center",
  alignItems: "center",
  width: "140px",
  height: "126px",
  borderRadius: "8px",
  margin: "10px 0px",
});

const NoteTextArea = styled.textarea({
  width: "249px",
  height: "200px",
});

const CardTitle = styled.div({
  fontSize: "1rem",
  color: "#4D5767",
});

const ModalClose = styled.button`
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  background-color: #f96332;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const NoteDiv = styled.div({
  fontSize: "20px",
  fontWeight: 600,
  margin: "10px 0px",
});

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
});

const ViewButton = styled.button({
  background: "transparent",
  padding: "10px 20px",
  fontSize: "18px",
  color: "#4D5767",
  width: "80%",
  border: "1px solid #4D5767",
  marginTop: "25px",
});

const TextCard = styled.div({
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  alignItems: "start",
  padding: "10px",
  width: "fit-content",
  borderRadius: "8px",
  margin: "10px 0px",
});

const DummyDiv = styled.div({
  width: "100%",
});

const BackButton = styled.button({
  background: "transparent",
  color: "#F96332",
  display: "flex",
  alignItems: "center",
  padding: "0px",
  fontSize: "16px",
  fontWeight: 600,
});

const Audio = styled.audio({
  width: "250px",
});

const scaleAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const RecordButtonImg = styled.img<{ isRecording: boolean }>`
  height: 200px;
  ${({ isRecording }) =>
    isRecording &&
    css`
      animation: ${scaleAnimation} 0.5s infinite;
    `}
`;

const SaveButton = styled.button({
  backgroundColor: "#0097A2",
  padding: "12px 26px",
  fontSize: "15px",
  fontWeight: 700,
});

const ModalBody = styled.div`
  height: 415px;
`;

const Note: React.FC<ModalProps> = ({ onClose, profileImg }) => {
  const { userData } = useContext(AuthContext);
  const { state, dispatch } = useApi();
  const [isTextNote, setIstextNote] = useState<boolean>(false);
  const [isAudioNote, setIsAudioNote] = useState<boolean>(false);
  const [isViewHistory, setIsViewHistory] = useState<boolean>(false);
  const [isHome, setIsHome] = useState<boolean>(true);
  const [isRecordingStopped, setIsRecordingStopped] = useState<boolean>(false);
  const fetchAudio = async (recording: Blob, userId: number) => {
    const response = await uploadAudioNote(userId, recording);
    response && dispatch({ type: "POST_AUDIO_NOTE", payload: response });
  };
  const audioRef = useRef<HTMLAudioElement>(null);

  const addText = () => {
    setIstextNote(true);
    setIsHome(false);
  };

  const addAudioNote = () => {
    setIsAudioNote(true);
    setIsHome(false);
  };

  const addAudioElement = () => {
    if (isRecording) {
      stopRecording();
      setIsRecordingStopped(true);
    } else {
      startRecording();
    }
  };

  const handlePlay = () => {
    audioRef.current?.play();
  };

  const viewNote = () => {
    setIsViewHistory(true);
    setIsHome(false);
    setIsAudioNote(false);
    setIstextNote(false);
  };

  const RecordDiv = styled.div({
    display: "flex",
    gap: "10px",
  });

  const back = () => {
    setIsViewHistory(false);
    setIsAudioNote(false);
    setIstextNote(false);
    setIsHome(true);
  };

  const base64ToBlob = (base64String: string): string => {
    const byteCharacters = atob(base64String);
    const byteArrays: Uint8Array[] = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return URL.createObjectURL(
      new Blob(byteArrays, { type: "audio/webm;codecs=opus" })
    );
  };

  const { startRecording, stopRecording, isRecording, recordingBlob } =
    useAudioRecorder();

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>
            <ProfileImg src={profileImg || profile} alt="profile" />{" "}
            <div>{userData && userData.FirstName}</div>
          </Title>
          <ModalClose onClick={onClose}>X</ModalClose>
        </ModalHeader>
        <ModalBody>
          <NoteDiv>
            {isHome && "Add A Note"}
            {isTextNote && "Add A Text Note"}
            {isAudioNote && "Add A Audio Note"}
            {isViewHistory && "View Note"}
          </NoteDiv>
          {isHome && (
            <>
              <Container>
                <Card>
                  <IconButton onClick={addText}>
                    <ModeOutlinedIcon fontSize="large" />
                  </IconButton>
                  <CardTitle>Add Text Note</CardTitle>
                </Card>
                <Card>
                  <IconButton
                    onClick={() => {
                      addAudioNote();
                    }}
                  >
                    <MicNoneIcon fontSize="large" />
                  </IconButton>
                  <CardTitle>Add Audio Note</CardTitle>
                </Card>
                <ViewButton onClick={viewNote}>View History</ViewButton>
              </Container>
            </>
          )}
          {isTextNote && (
            <Formik
              initialValues={{
                id: 0,
                userId: userData ? userData.Id : 0,
                textNote: "",
              }}
              onSubmit={async (values) => {
                dispatch({ type: "POST_TEXT_NOTE", payload: values });
                await addTextNote(values);
                back();
              }}
            >
              {({ setFieldValue }) => (
                <Form>
                  <TextCard>
                    <BackButton onClick={back}>
                      <KeyboardArrowLeftIcon />
                      Back
                    </BackButton>
                    <NoteTextArea
                      name="textNote"
                      onChange={(e) => {
                        setFieldValue("textNote", e.target.value);
                      }}
                    />
                    <SaveButton type="submit">Save</SaveButton>
                  </TextCard>
                  <ViewButton onClick={viewNote}>View History</ViewButton>
                </Form>
              )}
            </Formik>
          )}
          {isAudioNote && (
            <Container>
              <DummyDiv>
                <BackButton onClick={back}>
                  <KeyboardArrowLeftIcon />
                  Back
                </BackButton>
              </DummyDiv>
              {isRecordingStopped ? (
                <>
                  <RecordDiv>
                    <div onClick={handlePlay}>
                      <PlayArrowIcon style={{ fontSize: "100px" }} />
                      {recordingBlob && (
                        <audio
                          style={{ display: "none" }}
                          ref={audioRef}
                          src={URL.createObjectURL(recordingBlob)}
                        />
                      )}
                    </div>
                    <div
                      onClick={() => {
                        setIsRecordingStopped(false);
                      }}
                    >
                      <ReplayIcon style={{ fontSize: "100px" }} />
                    </div>
                  </RecordDiv>
                  <SaveButton
                    onClick={async () => {
                      recordingBlob &&
                        (await fetchAudio(
                          recordingBlob,
                          userData ? userData.Id : 0
                        ));
                      setIsRecordingStopped(false);
                    }}
                  >
                    Save
                  </SaveButton>
                </>
              ) : (
                <>
                  <RecordButtonImg
                    isRecording={isRecording}
                    src={recordButton}
                    height="200px"
                    alt="record-button"
                    onClick={addAudioElement}
                  />
                  <div>{isRecording ? "Stop" : "Start"} Recording</div>
                </>
              )}

              <ViewButton onClick={viewNote}>View History</ViewButton>
            </Container>
          )}
          {isViewHistory && (
            <div>
              <BackButton onClick={back}>back</BackButton>
              <ul>
                {state.textNoteList.map((item, index) => (
                  <li key={index}>{item.textNote}</li>
                ))}
              </ul>
              {state.audioNoteList.map((blob, index) => (
                <div key={index}>
                  {base64ToBlob(blob.file) ? (
                    <Audio
                      controls
                      src={`data:audio/mpeg;base64,${blob.file}`}
                    />
                  ) : null}
                </div>
              ))}
              {/* {audioNoteList.map((blob, index) => (
                <div key={index}>
                  {<Audio controls src={URL.createObjectURL(blob)} />}
                </div>
              ))} */}
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Note;
