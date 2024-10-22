import Header from "../../components/layout/header/Header";
import { Fragment, useContext, useState, useEffect, useCallback } from "react";
import { styled } from "styled-components";
import "../../stylesheets/obviously-font.css";
import profile from "../../assests/img/profile_placeholder-3x.png";
import trophy from "../../assests/img/trophy-icon.svg";
import pioneer from "../../assests/img/Pioneer.png";
import broker from "../../assests/img/broker.png";
import achiever from "../../assests/img/Achiever.png";
import director from "../../assests/img/Director.png";
import anchor from "../../assests/img/Anchor.png";
import facebook from "../../assests/img/facebook-icon.svg";
import linkedin from "../../assests/img/linkedin-icon.svg";
import twitter from "../../assests/img/twitter-icon.svg";
import AuthContext from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  showToast,
  ToastComponent,
} from "../../components/layout/ToastComponent/Toastcomponent";
import { uploadPhoto, fetchUserDetail } from "../../services/HomeService";
import {
  Assignment,
  EducationDetail,
  WorkExperience,
} from "../../interface/Interface";
import Compentencytestanalytics from "../../modals/Compentencytestanalytics";
import { ROUTES } from "../../constants/routes";
import { TOAST } from "../../constants/toast";
import { RootState } from "../../store/Redux";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import Addeducation from "../../modals/Addeducation";
import Updateeducation from "../../modals/Updateeducation";
import Addassignment from "../../modals/Addassignment";
import { DeleteData, UpdateData } from "../../services/EducationDetailService";
import Addworkexperience from "../../modals/Addworkexperience";
import { EducationList } from "../../components/layout/List/EducationList";
import { DeleteData as DeleteAssigment } from "../../services/AssignmentService";
import { DeleteData as DeleteWorkExperience } from "../../services/WorkExperience";
import { ExperiencedHiredList } from "../../components/layout/List/ExperienceHiredList";
import { useApi } from "../../store/ReducerContext";
import Aboutme from "../../modals/Aboutme";
import { resultMaker } from "../PersonalityTest/Personalitytest";
import Note from "../../modals/Note";
import ShareProfile from "../../modals/ShareProfile";
import shareProfileIcon from "../../assests/img/share-profile.png";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface TrophyProps {
  trophyHeight: string;
  trophyWidth: string;
}

interface BorderBottomProps {
  bw: string;
}

const Container = styled.div({
  display: "flex",
  width: "100%",
  height: `calc(100vh - 100px)`,

  "@media (max-width : 992px)": {
    height: `calc(100vh - 293px)`,
  },
});

const LeftContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#B8DFF5",
  height: "100%",
  padding: "21px",
  minHeight: "950px",

  "@media (max-width : 992px)": {
    display: "none",
  },
});

const BrokerList = styled.div({
  fontSize: "17px",
  fontWeight: "600",
  color: "#394456",
});

const LeftChildContainer = styled.div({
  width: "80%",
});

const LeftChildMainContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Heading = styled.div({
  fontFamily: "obviously",
  borderBottom: "5px solid #F96332",
  fontSize: "25px",
  marginTop: "20px",
  width: "350px",
});

const Card1 = styled.div({
  width: "338px",
  padding: "5px 10px",
  borderRadius: "8px",
  display: "flex",
  gap: "10px",
  backgroundColor: "#DBEFFA",
  marginTop: "20px",
});

const Card1Item = styled.div({
  border: `1px solid #F96332`,
  borderRadius: "30px",
  display: "flex",
  padding: "9px 0px",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "14px",
  color: "#394456",
  width: "163px",
});

const Card2 = styled.div({
  display: "flex",
  gap: "30px",
  marginTop: "20px",
});

const Card2Item = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#DBEFFA",
  padding: "15px 25px 5px 25px",
  gap: "15px",
  borderRadius: "8px",
  width: "175px",
});

const Card2Sub = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const Card2SubItem = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#DBEFFA",
  gap: "13px",
  borderRadius: "8px",
  width: "110px",
  height: "100px",
});

const Progress = styled.div({
  fontSize: "40px",
  color: "#F96332",
  fontWeight: "600",
});

const Trophy = styled.div.withConfig({
  shouldForwardProp: (prop) => !["trophyWidth", "trophyHeight"].includes(prop),
})<TrophyProps>((props) => ({
  width: props.trophyWidth,
  backgroundColor: "#F96332",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  height: props.trophyHeight,
  padding: "2px 0px 2px 5px",
  cursor: "pointer",
}));

const Card3 = styled.div({
  backgroundColor: "#DBEFFA",
  display: "flex",
  gap: "37px",
  margin: "20px 0px",
  padding: "10px",
  borderRadius: "8px",
  width: "337px",
});

const BrokerImg = styled.img`
    object-fit: cover;
    object-position: center;
    height: 200px;
}`;

const Card3Item = styled.div({
  display: "flex",
  gap: "5px",
  flexDirection: "column",
});

const Broker = styled.div({
  color: "#F96332",
  fontSize: "28px",
  fontWeight: "700",
});

const Card3Img = styled.div({
  display: "flex",
  gap: "20px",
});

const PrimaryButton = styled.button({
  cursor: "pointer",
  backgroundColor: "#F96332",
  width: "300px",
  fontSize: "16px",
  fontWeight: "600",
  display: "flex",
  justifyContent: "center",
  borderRadius: "20px",
  marginTop: "10px",
  marginBottom: "10px",
  position: "relative",
});

const OutlineButton = styled.button({
  cursor: "pointer",
  position: "relative",
  background: "transparent",
  border: "1px solid #F96332",
  width: "300px",
  fontSize: "16px",
  fontWeight: "600",
  display: "flex",
  marginTop: "10px",
  marginBottom: "10px",
  justifyContent: "center",
  borderRadius: "20px",
  color: "#394456",
});

const BorderBottom = styled.div.withConfig({
  shouldForwardProp: (prop) => ["bw"].includes(prop),
})<BorderBottomProps>((props) => ({
  borderBottom: "3px solid #F96332",
  width: `${props.bw}px`,
  maxWidth: "100%",
  marginTop: "10px",
}));

const MobileLeftContainer = styled.div({
  display: "none",
  backgroundColor: "white",
  gap: "20px",
  width: "calc(100% - 15px)",
  paddingLeft: "15px",

  "@media (max-width : 992px)": {
    display: "flex",
  },
});

const MobileCard1 = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
  marginBottom: "15px",
});

const MobileCard2 = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  width: "50%",
  marginTop: "20px",

  "@media (max-width : 768px)": {
    width: "70%",
  },
});

const RequestedDiv = styled.div({
  position: "absolute",
  backgroundColor: "#009702",
  width: "fit-content",
  padding: "0px 16px",
  color: "white",
  borderRadius: "8px",
  right: "16px",
  top: "-15px",
  display: "flex",
  height: "24px",
  alignItems: "center",
  fontSize: "14px",
});

const Obviously = styled.div({
  fontFamily: "obviously",
  fontSize: "25px",
  lineHeight: "25px",
});

const ObviouslyOrange = styled.div({
  fontFamily: "obviously",
  fontSize: "25px",
  lineHeight: "25px",
  color: "#F96332",
});

const RightContainer = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "16px 80px",

  "@media (max-width : 992px)": {
    padding: "16px 0px",
  },
});

const RightHeading = styled.div({
  display: "flex",
  justifyContent: "start",

  "@media (max-width : 992px)": {
    paddingLeft: "16px",
  },
});

const RightHeading1 = styled.h1({
  color: "#394456",
  letterSpacing: "1px",
});

const RightHeadingSpan = styled.span({
  color: "#F96332",
  fontFamily: "obviously",
  fontWeight: "bold",
});

const MobileButtonDiv = styled.div({
  display: "none",
  flexDirection: "column",
  alignItems: "center",

  "@media (max-width : 992px)": {
    display: "flex",
  },
});

const Images = styled.img({
  cursor: "pointer",
  height: "30px",

  "&:hover": {
    filter:
      "invert(43%) sepia(93%) saturate(2389%) hue-rotate(154deg) brightness(101%) contrast(101%)",
  },
});

const imageArray = [pioneer, broker, achiever, director, anchor];
const typeArray = ["Pioneer", "Broker", "Achiever", "Director", "Anchor"];

const Dashboard = () => {
  const { data, loading } = useSelector((state: RootState) => state.data);
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const ctx = useApi();

  const handleAddData = (data: EducationDetail[]) => {
    ctx.dispatch({ type: "ADD_EDUCATION_DETAIL", payload: data });
    setProfileOpen(false);
    setTimeout(() => {
      showToast(
        TOAST.ADD_EDUCATION_DETAIL.title,
        TOAST.ADD_EDUCATION_DETAIL.description,
        TOAST.ADD_EDUCATION_DETAIL.type
      );
    }, 100);
  };

  useEffect(() => {
    fetchdata();
    // eslint-disable-next-line
  }, []);

  const fetchdata = async () => {
    if (authctx.userData) {
      const response = await fetchUserDetail(authctx.userData.Id);
      if (response) {
        response &&
          ctx.dispatch({ type: "GET_HOME_PAGE_DATA", payload: response });
        response.profilePhoto &&
          setImageSrc(`data:image/jpeg;base64,${response.profilePhoto}`);
        const list = resultMaker(response.quizDetail.quizResponse);
        list && setPersonalityIndex(list.index);
      }
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024) {
        showToast(
          TOAST.FILE_LIMIT.title,
          TOAST.FILE_LIMIT.description,
          TOAST.FILE_LIMIT.type
        );
        return;
      }
      if (authctx.userData) {
        await uploadPhoto(authctx.userData.Id, { file: file });
      }
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  const intialAssignmentValues: Assignment = {
    id: 0,
    userId: authctx.userData ? authctx.userData.Id : 0,
    title: "",
    organisation: "",
    startDate: null,
    endDate: null,
    isOngoing: false,
    description: "",
    infohraphicResumeDescription: "",
  };

  const intialWorkExperienceValues: WorkExperience = {
    id: 0,
    userId: authctx.userData ? authctx.userData.Id : 0,
    role: "",
    organisation: "",
    startDate: null,
    endDate: null,
    isOngoing: false,
    roleDescription: "",
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [streamedText, setStreamedText] = useState<string>("");
  const [isProfileOpen, setProfileOpen] = useState<boolean>(false);
  const [isAssignmentOpen, setAssignmentOpen] = useState<boolean>(false);
  const [isAboutMeOpen, setIsAboutMeOpen] = useState<boolean>(false);
  const [isNoteOpen, setIsNoteOpen] = useState<boolean>(false);
  const [isShareProfileOpen, setIsShareProfileOpen] = useState<boolean>(false);
  const [isWorkExperienceOpen, setWorkExperienceOpen] =
    useState<boolean>(false);
  const [isUpdateProfileOpen, setUpdateProfileOpen] = useState<boolean>(false);
  const [personalityIndex, setPersonalityIndex] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [assignmentIndex, setAssignmentIndex] = useState<number>(0);
  const [workExperienceIndex, setWorkExperienceIndex] = useState<number>(0);
  const [assignmentValues, setAssignmentValues] = useState<Assignment>(
    intialAssignmentValues
  );
  const [workExperiencedValues, setWorkExperiencedValues] =
    useState<WorkExperience>(intialWorkExperienceValues);
  const [updateValues, setUpdateValues] = useState<EducationDetail>({
    id: 0,
    userId: 0,
    school: "",
    grade: "",
    rewardedDate: null,
    subject: "",
    comments: "",
  });
  const openProfile = () => {
    setProfileOpen(true);
  };
  const closeProfile = useCallback(() => {
    setProfileOpen(false);
  }, []);
  const closeNote = useCallback(() => {
    setIsNoteOpen(false);
  }, []);
  const closeAbouMe = useCallback(() => {
    setIsAboutMeOpen(false);
  }, []);
  const closeUpdateProfile = useCallback(() => {
    setUpdateProfileOpen(false);
  }, []);
  const openModal = () => {
    window.screen.width > 900
      ? setModalOpen(true)
      : showToast(
          TOAST.MOBILE_VIEW_NOT_SUPPORTED.title,
          TOAST.MOBILE_VIEW_NOT_SUPPORTED.description,
          TOAST.MOBILE_VIEW_NOT_SUPPORTED.type
        );
  };
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);
  const openAssignment = () => {
    setAssignmentValues(intialAssignmentValues);
    setAssignmentOpen(true);
  };
  const closeAssignment = useCallback(() => {
    setAssignmentOpen(false);
  }, []);
  const openWorkExperience = () => {
    setWorkExperiencedValues(intialWorkExperienceValues);
    setWorkExperienceOpen(true);
  };
  const closeWorkExperience = useCallback(() => {
    setWorkExperienceOpen(false);
  }, []);

  const openShareProfileModal = useCallback(() => {
    setIsShareProfileOpen(true);
  }, []);

  const closeShareProfileModal = useCallback(() => {
    setIsShareProfileOpen(false);
  }, []);

  const HandleDelete = async (index: number, id: number) => {
    await DeleteData(id);
    ctx.dispatch({ type: "DELETE_EDUCATION_DETAIL", payload: index });
    setTimeout(() => {
      showToast(
        TOAST.DELETE_EDUCATION_DETAIL.title,
        TOAST.DELETE_EDUCATION_DETAIL.description,
        TOAST.DELETE_EDUCATION_DETAIL.type
      );
    }, 100);
  };

  const handleAddAssignmentData = (data: Assignment) => {
    ctx.dispatch({ type: "ADD_ASSIGNMENT", payload: data });
    setAssignmentOpen(false);
    setTimeout(() => {
      showToast(
        TOAST.ADD_ASSIGNMENT.title,
        TOAST.ADD_ASSIGNMENT.description,
        TOAST.ADD_ASSIGNMENT.type
      );
    }, 100);
  };

  const handleAddWorkExperienceData = (data: WorkExperience) => {
    ctx.dispatch({ type: "ADD_WORK_EXPERIENCE", payload: data });
    setWorkExperienceOpen(false);
    setTimeout(() => {
      showToast(
        TOAST.ADD_WORK_EXPERIENCE.title,
        TOAST.ADD_WORK_EXPERIENCE.description,
        TOAST.ADD_WORK_EXPERIENCE.type
      );
    }, 100);
  };

  const handleAssignmentDelete = async (index: number, id: number) => {
    await DeleteAssigment(id);
    ctx.dispatch({ type: "DELETE_ASSIGNMENT", payload: index });
    setTimeout(() => {
      showToast(
        TOAST.DELETE_ASSIGNMENT.title,
        TOAST.DELETE_ASSIGNMENT.description,
        TOAST.DELETE_ASSIGNMENT.type
      );
    }, 100);
  };

  const handleWorkExperienceDelete = async (index: number, id: number) => {
    await DeleteWorkExperience(id);
    ctx.dispatch({ type: "DELETE_WORK_EXPERIENCE", payload: index });
    setTimeout(() => {
      showToast(
        TOAST.DELETE_WORK_EXPERIENCE.title,
        TOAST.DELETE_WORK_EXPERIENCE.description,
        TOAST.DELETE_WORK_EXPERIENCE.type
      );
    }, 100);
  };

  const OpenEditModal = (id: number) => {
    setIndex(id);
    if (ctx.state.educations) {
      const updatedItems = ctx.state.educations.find((_, i) => i === id);
      if (updatedItems) {
        setUpdateValues(updatedItems);
        setUpdateProfileOpen(true);
      }
    }
  };

  const OpenAssignmentEditModal = (id: number) => {
    setAssignmentIndex(id);
    if (ctx.state.assignments) {
      const updatedItems = ctx.state.assignments.find((_, i) => i === id);
      if (updatedItems) {
        setAssignmentValues(updatedItems);
        setAssignmentOpen(true);
      }
    }
  };

  const OpenWorkExperienceEditModal = (id: number) => {
    setWorkExperienceIndex(id);
    if (ctx.state.workExperiences) {
      const updatedItems = ctx.state.workExperiences.find((_, i) => i === id);
      if (updatedItems) {
        setWorkExperiencedValues(updatedItems);
        setWorkExperienceOpen(true);
      }
    }
  };

  const EditData = async (values: EducationDetail) => {
    await UpdateData(values);
    ctx.dispatch({
      type: "UPDATE_EDUCATION_DETAIL",
      payload: { item: values, i: index },
    });
    closeUpdateProfile();
    setTimeout(() => {
      showToast(
        TOAST.UPDATE_EDUCATION_DETAIL.title,
        TOAST.UPDATE_EDUCATION_DETAIL.description,
        TOAST.UPDATE_EDUCATION_DETAIL.type
      );
    }, 100);
  };

  const EditAssignmentData = async (values: Assignment) => {
    ctx.dispatch({
      type: "UPDATE_ASSIGNMENT",
      payload: { item: values, i: assignmentIndex },
    });
    closeAssignment();
    setTimeout(() => {
      showToast(
        TOAST.UPDATE_ASSIGNMENT.title,
        TOAST.UPDATE_ASSIGNMENT.description,
        TOAST.UPDATE_ASSIGNMENT.type
      );
    }, 100);
  };
  const EditWorkExperienceData = async (values: WorkExperience) => {
    ctx.dispatch({
      type: "UPDATE_WORK_EXPERIENCE",
      payload: { item: values, i: workExperienceIndex },
    });
    closeWorkExperience();
    setTimeout(() => {
      showToast(
        TOAST.UPDATE_WORK_EXPERIENCE.title,
        TOAST.UPDATE_WORK_EXPERIENCE.description,
        TOAST.UPDATE_WORK_EXPERIENCE.type
      );
    }, 100);
  };

  return (
    <Fragment>
      {isModalOpen && (
        <Compentencytestanalytics
          onClose={closeModal}
          competencies={ctx.state.competencies}
          candidates={ctx.state.userCompentencyDetails}
        />
      )}
      {isAboutMeOpen && (
        <Aboutme onClose={closeAbouMe} note={ctx.state.aboutMe} />
      )}
      {isNoteOpen && <Note onClose={closeNote} profileImg={imageSrc} />}
      {isProfileOpen && (
        <Addeducation onClose={closeProfile} onAddData={handleAddData} />
      )}
      {isAssignmentOpen && (
        <Addassignment
          onClose={closeAssignment}
          intialValues={assignmentValues}
          onAddHandler={handleAddAssignmentData}
          onUpdateHandler={EditAssignmentData}
        />
      )}
      {isWorkExperienceOpen && (
        <Addworkexperience
          onClose={closeWorkExperience}
          intialValues={workExperiencedValues}
          onAddHandler={handleAddWorkExperienceData}
          onUpdateHandler={EditWorkExperienceData}
        />
      )}
      {isUpdateProfileOpen && (
        <Updateeducation
          onClose={closeUpdateProfile}
          defaultValues={updateValues}
          onEditHandler={EditData}
        />
      )}

      {isShareProfileOpen && <ShareProfile onClose={closeShareProfileModal} />}
      <ToastComponent />
      <Header />
      <MobileLeftContainer>
        <MobileCard1>
          <label htmlFor="file-input" style={{ cursor: "pointer" }}>
            <img
              src={imageSrc || profile}
              alt="profile"
              style={{ height: "120px", width: "120px", borderRadius: "50%" }}
            />
            <input
              type="file"
              id="file-input"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
          <Trophy trophyHeight="40px" trophyWidth="40px">
            <img src={trophy} alt="trophy" />
          </Trophy>
        </MobileCard1>
        <MobileCard2>
          <Obviously>Welcome</Obviously>
          <ObviouslyOrange>{authctx.userData?.FirstName}</ObviouslyOrange>
          <BorderBottom bw="100%" />
          <div>Build a Epic Career here</div>
        </MobileCard2>
      </MobileLeftContainer>
      <Container>
        <LeftContainer>
          <Heading>
            Welcome{" "}
            <span style={{ color: "#F96332" }}>
              {authctx.userData?.FirstName}
            </span>
          </Heading>

          <LeftChildContainer>
            <LeftChildMainContainer>
              <Card1>
                <Card1Item
                  onClick={() => {
                    setIsAboutMeOpen(true);
                  }}
                >
                  <strong>About Me</strong>
                </Card1Item>
                <Card1Item
                  onClick={() => {
                    setIsNoteOpen(true);
                  }}
                >
                  <strong>View My Notes</strong>
                </Card1Item>
              </Card1>
              <Card2>
                <Card2Item>
                  <h2 style={{ color: "#394456", margin: "0px" }}>
                    {" "}
                    {authctx.userData?.FirstName} {authctx.userData?.LastName}
                  </h2>
                  <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                    <img
                      src={imageSrc || profile}
                      alt="profile"
                      style={{
                        height: "140px",
                        width: "140px",
                        borderRadius: "50%",
                      }}
                    />
                    <input
                      type="file"
                      id="file-input"
                      accept="image/png, image/jpeg"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </label>
                </Card2Item>
                <Card2Sub>
                  <Card2SubItem>
                    <div style={{ color: "#394456" }}>
                      <strong> Progress</strong>
                    </div>
                    <Progress>
                      {" "}
                      {loading && <ClipLoader />}{" "}
                      {ctx.state && `${ctx.state.userProgress?.progress}%`}
                    </Progress>
                  </Card2SubItem>
                  <Card2SubItem onClick={openShareProfileModal}>
                    <div style={{ color: "#394456", fontSize: "14px" }}>
                      <strong>Share Profile</strong>
                    </div>
                    <Trophy trophyHeight="60px" trophyWidth="60px">
                      <img
                        src={shareProfileIcon}
                        alt="trophy"
                        width="52px"
                        height="52px"
                      />
                    </Trophy>
                  </Card2SubItem>
                </Card2Sub>
              </Card2>
              <Card3>
                {ctx.state.quizDetail.testNo > 0 && (
                  <BrokerImg src={imageArray[personalityIndex]} alt="broker" />
                )}
                <Card3Item>
                  {ctx.state.quizDetail.isFirstTestGiven ? (
                    <>
                      <div style={{ color: "#394456" }}>
                        Your personality Type
                      </div>
                      <Broker>{typeArray[personalityIndex]}</Broker>
                      <div>
                        <div style={{ fontSize: "12px", letterSpacing: "1px" }}>
                          <i>Your key strengths:</i>
                        </div>
                        <BrokerList>Unflappable</BrokerList>
                        <BrokerList>Concrete</BrokerList>
                        <BrokerList>Team-builder</BrokerList>
                      </div>
                    </>
                  ) : (
                    <PrimaryButton
                      onClick={() => {
                        navigate(ROUTES.PERSONALITY_TEST);
                      }}
                    >
                      Give Personality Test
                    </PrimaryButton>
                  )}
                  <div style={{ marginTop: "20px", color: "#394456" }}>
                    owned By :{" "}
                    {ctx.state.ownedBy_Client
                      ? ctx.state.ownedBy_Client.firstName +
                        " " +
                        ctx.state.ownedBy_Client.lastName
                      : "PeopleHawk"}
                  </div>
                  {/* <div style={{ marginTop: "20px", color: "#394456" }}>
                    Share your personality type
                  </div>
                  <Card3Img>
                    <Images src={facebook} alt="facebook" />
                    <Images src={twitter} alt="twitter" />
                    <Images src={linkedin} alt="linkedin" />
                  </Card3Img> */}
                </Card3Item>
              </Card3>

              <OutlineButton
                onClick={() => {
                  navigate(ROUTES.IDEAL_COURSES);
                }}
              >
                Ideal Course Analysis
              </OutlineButton>
              <PrimaryButton onClick={openModal}>
                Competency Test Analytics
              </PrimaryButton>
              <OutlineButton
                onClick={() => {
                  navigate(ROUTES.RESUME);
                }}
              >
                {ctx.state.request &&
                  ctx.state.request.isResumeUploadRequest && (
                    <RequestedDiv>Requested</RequestedDiv>
                  )}
                {ctx.state.userProgress?.isResumeUpload ? "View " : "Upload "}{" "}
                Your Resume
              </OutlineButton>
              <PrimaryButton
                onClick={() => {
                  navigate(ROUTES.PERSONALITY_TEST);
                }}
              >
                {ctx.state.request &&
                  ctx.state.request.isPersonalityTestRequest && (
                    <RequestedDiv>Requested</RequestedDiv>
                  )}
                {ctx.state.quizDetail.testNo > 0
                  ? "View Your Personality Result"
                  : "Take Your Personality Test"}
              </PrimaryButton>
            </LeftChildMainContainer>
          </LeftChildContainer>
          <BorderBottom bw="350px" />
        </LeftContainer>
        <RightContainer>
          <RightHeading>
            <RightHeading1>
              Your <RightHeadingSpan>EPIC</RightHeadingSpan> Progress
            </RightHeading1>
          </RightHeading>
          {ctx.state.memberType !== "Experienced Hire" ? (
            <EducationList
              dataList={ctx.state.educations}
              openProfile={openProfile}
              HandleDelete={HandleDelete}
              OpenEditModal={OpenEditModal}
            />
          ) : (
            <ExperiencedHiredList
              openAssignment={openAssignment}
              openWorkExperience={openWorkExperience}
              assignmentList={ctx.state.assignments}
              workExperienceList={ctx.state.workExperiences}
              handleAssignmentDelete={handleAssignmentDelete}
              handleWorkExperienceDelete={handleWorkExperienceDelete}
              OpenAssignmentEditModal={OpenAssignmentEditModal}
              OpenWorkExperienceEditModal={OpenWorkExperienceEditModal}
            />
          )}
          {streamedText}
          <MobileButtonDiv>
            <PrimaryButton
              onClick={() => {
                navigate(ROUTES.PERSONALITY_TEST);
              }}
            >
              {ctx.state.quizDetail.testNo > 0
                ? "View Your Personality Result"
                : "Take Your Personality Test"}
            </PrimaryButton>
            <OutlineButton
              onClick={() => {
                navigate(ROUTES.IDEAL_COURSES);
              }}
            >
              Ideal Course Analysis
            </OutlineButton>
            <OutlineButton
              onClick={() => {
                navigate(ROUTES.RESUME);
              }}
            >
              {data ? (data.isResumeUpload ? "View " : "Upload ") : "Upload "}{" "}
              Your Resume
            </OutlineButton>
            <PrimaryButton onClick={openModal}>
              Competency Test Analytics
            </PrimaryButton>
          </MobileButtonDiv>
        </RightContainer>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
