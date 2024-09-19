import styled, { keyframes } from "styled-components";
import profile from "../assests/img/profile_placeholder-3x.png";
import { useContext, useState } from "react";
import AuthContext from "../store/AuthContext";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import MicNoneIcon from "@mui/icons-material/MicNone";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import { Formik, Form } from "formik";

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
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
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
});

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
});

const ModalBody = styled.div`
  height: 400px;
  overflow-y: auto;
`;

const Note: React.FC<ModalProps> = ({ onClose, profileImg }) => {
  const { userData } = useContext(AuthContext);

  const [isTextNote, setIstextNote] = useState<boolean>(false);
  const [isAudioNote, setIsAudioNote] = useState<boolean>(false);
  const [isViewHistory, setIsViewHistory] = useState<boolean>(false);
  const [isHome, setIsHome] = useState<boolean>(true);
  const [textNoteList, setTextNoteList] = useState<string[]>([]);
  const [audioNoteList, setAudioNoteList] = useState<Blob[]>([]); // Store audio blobs here

  const addText = () => {
    setIstextNote(true);
    setIsHome(false);
  };

  const addAudioElement = () => {
    if (isRecording) {
      recordingBlob &&
        setAudioNoteList((prevList) => [...prevList, recordingBlob]);
      stopRecording(); // Store the audio blob
    } else {
      startRecording();
    }
  };

  const viewNote = () => {
    setIsViewHistory(true);
    setIsHome(false);
  };

  const back = () => {
    setIsViewHistory(false);
    setIsAudioNote(false);
    setIstextNote(false);
    setIsHome(true);
  };

  const { startRecording, stopRecording, isRecording, recordingBlob } =
    useAudioRecorder();

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>
            <ProfileImg src={profileImg || profile} alt="profile" />{" "}
            <div>{userData && userData.FirstName} Invited</div>
          </Title>
          <ModalClose onClick={onClose}>X</ModalClose>
        </ModalHeader>
        <ModalBody>
          {isHome && (
            <>
              <NoteDiv>Add a Note ...</NoteDiv>
              <Container>
                <IconButton onClick={addText}>
                  <ModeOutlinedIcon fontSize="large" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    addAudioElement();
                  }}
                >
                  <MicNoneIcon fontSize="large" />
                </IconButton>
                <button onClick={viewNote}>View History</button>
              </Container>
            </>
          )}
          {isTextNote && (
            <Formik
              initialValues={{ text: "" }}
              onSubmit={(values) => {
                setTextNoteList((prevState) => [...prevState, values.text]);
                back();
              }}
            >
              {({ setFieldValue }) => (
                <Form>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <button onClick={back}>Back</button>
                    <textarea
                      name="text"
                      onChange={(e) => {
                        setFieldValue("text", e.target.value);
                      }}
                    />
                    <button type="submit">Save</button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
          {isViewHistory && (
            <ul>
              {textNoteList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
              {audioNoteList.map((blob, index) => (
                <li key={index}>
                  <audio controls src={URL.createObjectURL(blob)} />
                </li>
              ))}
            </ul>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Note;
