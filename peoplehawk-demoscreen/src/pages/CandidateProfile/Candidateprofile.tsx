import styled from "styled-components";
import { useEffect, useState } from "react";
import profile from "../../assests/img/profile_placeholder-3x.png";
import "../../stylesheets/obviously-font.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NoteIcon from "@mui/icons-material/Note";
import PersonIcon from "@mui/icons-material/Person";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import Keyinformation from "../../modals/Keyinformation";
import { fetchUserDetail, verifyToken } from "../../services/HomeService";
import { useApi } from "../../store/ReducerContext";
import { resultMaker } from "../PersonalityTest/Personalitytest";
import Markdown from "react-markdown";
import Profilephoto from "../../modals/Profilephoto";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import { useParams } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Personalityresult from "../../modals/Personalityresult";
import Request from "../../modals/Request";
import { Request as RequestProps } from "../../interface/Interface";
import { upsertRequest } from "../../services/RequestService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const Header = styled.div({
  backgroundColor: "#FFFFFF",
  display: "flex",
  justifyContent: "start",
  paddingLeft: "10px",
  alignItems: "center",
  height: "60px",
});

const Container = styled.div({
  backgroundColor: "#394456",
  display: "flex",
  padding: "40px 20px",
  gap: "90px",
  minHeight: "calc(100vh - 140px)",
  height: "100%",
});

const ProfileContainer = styled.div({
  display: "flex",
  justifyContent: "start",
  alignItems: "start",
  position: "relative",
  height: "fit-content",
  borderRadius: "50%",
});

const ZoomDiv = styled.div<{ isHovered: boolean }>(({ isHovered }) => ({
  position: "absolute",
  rotate: "90deg",
  top: "130px",
  left: "8px",
  cursor: "pointer",
  display: isHovered ? "block" : "none",
}));

const MailDiv = styled.div({
  color: "white",
  marginTop: "10px",
  paddingLeft: "3px",
  display: "flex",
  fontSize: "20px",
  alignItems: "center",
  gap: "10px",
});

const ProfilePhoto = styled.img({
  borderRadius: "50%",
  height: "200px",
  width: "200px",
  background: "white",
});

const InformationContainer = styled.div({
  width: "100%",
});

const Heading = styled.div({
  fontFamily: "obviously",
  fontSize: "40px",
  color: "white",
  borderBottom: "5px solid #F96332",
});

const OrangeColor = styled.span({
  color: "#F96332",
});

const SectionContainer = styled.div({
  marginTop: "30px",
  display: "flex",
  gap: "50px",
});

const MailTo = styled.a({
  textDecoration: "none",
  color: "white",
  cursor: "pointer",
});

const DetailContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  color: "white",
  width: "100%",
});

const ButtonContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  color: "white",
  width: "35%",
});

const SectionHeading = styled.div({
  color: "#F96332",
  fontSize: "30px",
  fontWeight: 500,
});

const PrimaryButton = styled.button({
  cursor: "pointer",
  backgroundColor: "white",
  width: "100%",
  color: "black",
  fontSize: "18px",
  fontWeight: "100",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  borderRadius: "0px 20px 20px 0px",
  padding: "0px 10px 0px 60px",
  height: "60px",

  "&:hover": {
    border: "2px solid #F96332",
  },
});

const IconDiv = styled.div<{ iconColor: string }>(({ iconColor }) => ({
  backgroundColor: iconColor,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  width: "72px",
  height: "72px",
  zIndex: 2,
}));

const PositionDiv = styled.div({
  position: "absolute",
  left: "-17px",
});
const Button = styled.div({
  position: "relative",
  display: "flex",
  width: "100%",
});

const MainButtonDiv = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

const Candidateprofile = () => {
  const [isKeyInformationOpen, setIsKeyInformationOpen] =
    useState<boolean>(false);
  const { userId, token } = useParams();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [personalityResult, setPersonalityResult] = useState<number[]>([]);
  const [personalityIndex, setPersonalityIndex] = useState<number>(5);
  const [isZoom, setIsZoom] = useState<boolean>(false);
  const [isResult, setIsResult] = useState<boolean>(false);
  const [isRequest, setIsRequest] = useState<boolean>(false);
  const [requestData, setRequestData] = useState<{
    content: string;
    data: RequestProps;
    isAlreadyRequested: boolean;
  }>({
    content: "",
    data: {
      id: 0,
      userId: 0,
      isPersonalityTestRequest: false,
      isResumeUploadRequest: false,
    },
    isAlreadyRequested: false,
  });
  const keyInformationCloseHandler = () => {
    setIsKeyInformationOpen(false);
  };
  const keyInformationOpenHandler = () => {
    setIsKeyInformationOpen(true);
  };
  const startZoom = () => {
    setIsZoom(true);
  };
  const stopZoom = () => {
    setIsZoom(false);
  };
  const navigate = useNavigate();
  const requestModalOpenHandler = (content: string, index: number) => {
    state.request === null
      ? setRequestData({
          content: content,
          data: {
            id: 0,
            userId: userId ? parseInt(userId) : 0,
            isPersonalityTestRequest: index === 2 ? true : false,
            isResumeUploadRequest: index === 1 ? true : false,
          },
          isAlreadyRequested: false,
        })
      : setRequestData({
          content: content,
          data: {
            ...state.request,
            isPersonalityTestRequest:
              index === 2 ? true : state.request.isPersonalityTestRequest,
            isResumeUploadRequest:
              index === 1 ? true : state.request.isResumeUploadRequest,
          },
          isAlreadyRequested:
            (index === 1 && state.request.isResumeUploadRequest) ||
            (index === 2 && state.request.isPersonalityTestRequest)
              ? true
              : false,
        });
    setIsRequest(true);
  };
  const requestModalCloseHandler = () => {
    setIsRequest(false);
  };

  const requestModalConfirmHandler = async (data: RequestProps) => {
    const response = await upsertRequest(data);
    response && dispatch({ type: "REQUEST", payload: response });
    setIsRequest(false);
  };

  const showResult = () => {
    if (state.quizDetail.isFirstTestGiven) {
      setIsResult(true);
    } else {
      requestModalOpenHandler("You can make request to Candidate", 2);
    }
  };
  const hideResult = () => {
    setIsResult(false);
  };

  const BackButton = styled.button({
    background: "transparent",
    color: "#F96332",
    display: "flex",
    alignItems: "center",
    padding: "0px",
    fontSize: "16px",
    fontWeight: 600,
  });

  const { state, dispatch } = useApi();

  useEffect(() => {
    fetchdata();
    // eslint-disable-next-line
  }, []);

  const fetchdata = async () => {
    if (userId) {
      const response = await fetchUserDetail(parseInt(userId));
      if (response) {
        response && dispatch({ type: "GET_HOME_PAGE_DATA", payload: response });

        response.profilePhoto &&
          setImageSrc(`data:image/jpeg;base64,${response.profilePhoto}`);
        const list = resultMaker(response.quizDetail.quizResponse);
        list && setPersonalityResult(list.array);
        list && setPersonalityIndex(list.index);
      }
    } else if (token) {
      const response = await verifyToken(token);
      if (response) {
        response && dispatch({ type: "GET_HOME_PAGE_DATA", payload: response });

        response.profilePhoto &&
          setImageSrc(`data:image/jpeg;base64,${response.profilePhoto}`);
        const list = resultMaker(response.quizDetail.quizResponse);
        list && setPersonalityResult(list.array);
        list && setPersonalityIndex(list.index);
      } else {
        navigate(ROUTES.LINK_EXPIRE);
      }
    }
  };

  const handleClick = (file: string | null) => {
    if (file) {
      const anchor = document.createElement("a");
      anchor.href = file;
      anchor.target = "_blank";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } else {
      requestModalOpenHandler("You can make request to Candidate", 1);
    }
  };

  return (
    <div>
      <Header>
        <BackButton
          onClick={() => {
            window.history.back();
          }}
        >
          <KeyboardArrowLeftIcon />
          Back
        </BackButton>
      </Header>
      <Container>
        {isZoom && <Profilephoto onClose={stopZoom} profile={imageSrc} />}
        {isRequest && (
          <Request
            onClose={requestModalCloseHandler}
            onConfirm={requestModalConfirmHandler}
            request={requestData}
          />
        )}
        {isResult && (
          <Personalityresult
            onClose={hideResult}
            result={personalityResult}
            index={personalityIndex}
          />
        )}
        {isKeyInformationOpen && (
          <Keyinformation
            onClose={keyInformationCloseHandler}
            index={personalityIndex}
          />
        )}
        <ProfileContainer
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {imageSrc && (
            <ZoomDiv onClick={startZoom} isHovered={isHovered}>
              <ZoomInOutlinedIcon
                style={{ color: "#F96332", fontSize: "40px" }}
              />
            </ZoomDiv>
          )}
          <ProfilePhoto src={imageSrc || profile} alt="profile-photo" />
        </ProfileContainer>
        <InformationContainer>
          <Heading>
            <OrangeColor>Hi, I'm </OrangeColor>
            {state.firstName + " " + state.lastName}.
          </Heading>
          <MailDiv>
            <MailOutlineIcon />
            <MailTo href={`mailto:${state.email}`}>{state.email}</MailTo>
          </MailDiv>
          <SectionContainer>
            <DetailContainer>
              <SectionHeading>About Me</SectionHeading>
              <Markdown>{state.aboutMe}</Markdown>
            </DetailContainer>
            <ButtonContainer>
              <SectionHeading>Key Features</SectionHeading>
              <Button
                onClick={() => {
                  handleClick(state.resume);
                }}
              >
                <PositionDiv>
                  <IconDiv iconColor={state.resume ? "#F96332" : "black"}>
                    <NoteIcon style={{ fontSize: "40px" }} />
                  </IconDiv>
                </PositionDiv>
                <PrimaryButton>
                  <MainButtonDiv>
                    View CV
                    {!state.resume ? (
                      <ArrowCircleRightOutlinedIcon
                        style={{ fontSize: "45px" }}
                      />
                    ) : (
                      <CheckCircleIcon
                        style={{ fontSize: "45px", color: "green" }}
                      />
                    )}
                  </MainButtonDiv>
                </PrimaryButton>
              </Button>
              <Button onClick={showResult}>
                <PositionDiv>
                  <IconDiv
                    iconColor={
                      state.quizDetail.isFirstTestGiven ? "#F96332" : "black"
                    }
                  >
                    <PersonIcon style={{ fontSize: "40px" }} />
                  </IconDiv>
                </PositionDiv>
                <PrimaryButton>
                  <MainButtonDiv>
                    View Personality Test Result
                    {!state.quizDetail.isFirstTestGiven ? (
                      <ArrowCircleRightOutlinedIcon
                        style={{ fontSize: "45px" }}
                      />
                    ) : (
                      <CheckCircleIcon
                        style={{ fontSize: "45px", color: "green" }}
                      />
                    )}
                  </MainButtonDiv>
                </PrimaryButton>
              </Button>
              <Button>
                <PositionDiv>
                  <IconDiv iconColor="#F96332">
                    <BusinessCenterIcon style={{ fontSize: "40px" }} />
                  </IconDiv>
                </PositionDiv>
                <PrimaryButton onClick={keyInformationOpenHandler}>
                  <MainButtonDiv>
                    Key Information
                    <CheckCircleIcon
                      style={{ fontSize: "45px", color: "green" }}
                    />
                  </MainButtonDiv>
                </PrimaryButton>
              </Button>
            </ButtonContainer>
          </SectionContainer>
        </InformationContainer>
      </Container>
    </div>
  );
};

export default Candidateprofile;
