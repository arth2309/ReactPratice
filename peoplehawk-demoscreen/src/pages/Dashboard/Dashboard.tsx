import Header from "../../components/layout/header/Header";
import { Fragment, useContext, useState, useEffect } from "react";
import { styled } from "styled-components";
import "../../stylesheets/obviously-font.css";
import profile from "../../assests/img/profile_placeholder-3x.png";
import trophy from "../../assests/img/trophy-icon.svg";
import broker from "../../assests/img/broker.png";
import facebook from "../../assests/img/facebook-icon.svg";
import linkedin from "../../assests/img/linkedin-icon.svg";
import twitter from "../../assests/img/twitter-icon.svg";
import AuthContext from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { showToast, ToastComponent } from "../../components/layout/ToastComponent/Toastcomponent";
import {fetchPhoto,uploadPhoto,getProgress,getCompentencies,getUserCompentencies} from "../../services/HomeService";
import { CandidateProgress,Competency,UserCompetency } from "../../interface/Interface";
import Compentencytestanalytics from "./Compentencytestanalytics";
import { ROUTES } from "../../constants/routes";
import { TOAST } from "../../constants/toast";


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
});

const LeftContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#B8DFF5",
  height: "100%",
  padding : "21px",
  minHeight : '900px',
 

  "@media (max-width : 992px)": {
    display: "none",
  },
});

const BrokerList = styled.div({
  fontSize : '17px',
  fontWeight : '600',
  color : '#394456'
})

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
  marginTop : "20px",
  width : '350px'
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
  width : "163px"
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
  width : "175px"
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
  padding: "5px 25px 5px 25px",
  gap: "13px",
  borderRadius: "8px",
  width : '50px',
  height : '100px'
});

const Progress = styled.div({
  fontSize: "40px",
  color: "#F96332",
  fontWeight : "600"
});

const Trophy = styled.div.withConfig({shouldForwardProp: (prop) => !['trophyWidth','trophyHeight'].includes(prop)})<TrophyProps>((props) => ({
  width: props.trophyWidth,
  backgroundColor: "#F96332",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  height: props.trophyHeight,
  padding: "2px",
  cursor: "pointer",
}));

const Card3 = styled.div({
  backgroundColor: "#DBEFFA",
  display: "flex",
  gap: "37px",
  marginTop: "20px",
  padding: "10px",
  borderRadius: "8px",
  width : '337px'
});

const BrokerImg = styled.img`
    object-fit: cover;
    object-position: center;
    height: 200px;
}`

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
  fontSize : '16px',
  fontWeight : '600',
  display: "flex",
  justifyContent: "center",
  borderRadius: "20px",
  marginTop: "10px",
});

const OutlineButton = styled.button({
  cursor: "pointer",
  background: "transparent",
  border: "1px solid #F96332",
  width: "300px",
  fontSize : '16px',
  fontWeight : '600',
  display: "flex",
  justifyContent: "center",
  borderRadius: "20px",
  color: "#394456",
});

const BorderBottom = styled.div.withConfig({shouldForwardProp: (prop) => ['bw'].includes(prop)})<BorderBottomProps>((props) => ({
  borderBottom: "3px solid #F96332",
  width:  `${props.bw}px`,
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
  marginBottom : '15px'
});

const MobileCard2 = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  width: "50%",
  marginTop : '20px',

  "@media (max-width : 768px)": {
    width: "70%",
  },
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
  color : '#F96332'
});

const RightContainer = styled.div({
    width : '100%',
    display : 'flex',
    flexDirection : 'column',
    padding : '16px 80px',

    "@media (max-width : 992px)": {
       padding : '16px 0px'
  },
})

const RightHeading = styled.div({
     display : 'flex',
     justifyContent : 'start',

     "@media (max-width : 992px)": {
       paddingLeft : '16px'
  },
    
})

const RightHeading1 = styled.h1({
  color : '#394456', 
  letterSpacing : '1px'
})

const RightHeadingSpan = styled.span({
   color : '#F96332',
   fontFamily : 'obviously',
   fontWeight : 'bold'
})

const MobileButtonDiv = styled.div({
    display : 'none',
    flexDirection : 'column',
    alignItems : 'center',

    "@media (max-width : 992px)": {
       display : 'flex'
  },
})

const Images = styled.img({

  cursor : 'pointer',
  height : '30px',

  '&:hover' : {
    filter : 'invert(43%) sepia(93%) saturate(2389%) hue-rotate(154deg) brightness(101%) contrast(101%)',
  }
}) 

const Dashboard  = () => {
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [progress, setProgress] = useState<CandidateProgress | null>(null);
  const[competencies,setCompetencies] = useState<Competency[] | null>(null);
  const[candidates,setCandidates] = useState<UserCompetency[] | null>(null);
  
  useEffect(() => {
       fetchdata();
       // eslint-disable-next-line
  },[])

  const fetchdata = async() => {
    if(authctx.userData)
    {
      const result = await fetchPhoto(authctx.userData.Id);
         result && setImageSrc(result);

        const prog = await getProgress(authctx.userData.Id);
        prog && setProgress(prog);

        const comp = await getCompentencies();
        comp && setCompetencies(comp);

        const cand = await getUserCompentencies();
        cand && setCandidates(cand);
    }
  }

    const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            
            if (file.size > 15*1024) {
                showToast(TOAST.FILE_LIMIT.title, TOAST.FILE_LIMIT.description,TOAST.FILE_LIMIT.type);
                return;
            }
                if(authctx.userData)
                {
                   await uploadPhoto(authctx.userData.Id,{file : file})
                }
            const imageUrl = URL.createObjectURL(file);
            setImageSrc(imageUrl);
            return () => URL.revokeObjectURL(imageUrl);
        }
      }

      const [isModalOpen, setModalOpen] = useState(false);
      const openModal = () => {window.screen.width > 900 ? setModalOpen(true) : showToast(TOAST.MOBILE_VIEW_NOT_SUPPORTED.title,TOAST.MOBILE_VIEW_NOT_SUPPORTED.description,TOAST.MOBILE_VIEW_NOT_SUPPORTED.type)};
      const closeModal = () => setModalOpen(false);

  return (
    <Fragment> 

      
      <Compentencytestanalytics isOpen = {isModalOpen} onClose={closeModal} competencies = {competencies} candidates = {candidates} />
      <ToastComponent />
      <Header />
      <MobileLeftContainer>
        <MobileCard1>
        <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                <img
                   src={imageSrc || profile} alt="profile" 
                   style={{height : '120px',width : '120px', borderRadius : '50%'}}
                  
                />
                <input
                    type="file"
                    id="file-input"
                    accept="image/png, image/jpeg" 
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
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
        <Heading>Welcome <span style={{color : '#F96332'}}>{authctx.userData?.FirstName}</span></Heading>
       
          <LeftChildContainer>
            <LeftChildMainContainer>
              <Card1>
                <Card1Item >
                  <strong>View My Profile</strong>
                </Card1Item>
                <Card1Item >
                  <strong>What's included</strong>
                </Card1Item>
              </Card1>
              <Card2>
                <Card2Item >
                  <h2 style={{ color: "#394456", margin: "0px" }}>
                    {" "}
                    {authctx.userData?.FirstName} {authctx.userData?.LastName}
                  </h2>
                  <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                <img
                   src={imageSrc || profile} alt="profile" 
                   style={{height : '140px',width : '140px', borderRadius : '50%'}}
                  
                />
                <input
                    type="file"
                    id="file-input"
                    accept="image/png, image/jpeg" 
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </label>
                </Card2Item>
                <Card2Sub>
                  <Card2SubItem>
                    <div style={{ color: "#394456" }}>
                      <strong> Progress</strong>
                    </div>
                    <Progress>{progress ? progress.progress : 0}%</Progress>
                  </Card2SubItem>
                  <Card2SubItem>
                    <div style={{ color: "#394456", fontSize: "12px" }}>
                      <strong>Trophies</strong>
                    </div>
                    <Trophy trophyHeight="60px" trophyWidth="60px">
                      <img src={trophy} alt="trophy" />
                    </Trophy>
                  </Card2SubItem>
                </Card2Sub>
              </Card2>
              <Card3>
                <BrokerImg src={broker} alt="broker" />
                <Card3Item>
                  <div style = {{color:"#394456"}}>Your personality Type</div>
                  <Broker>Broker</Broker>
                  <div>
                    <div style={{ fontSize: "12px", letterSpacing: "1px" }}>
                      <i>Your key strengths:</i>
                    </div>
                    <BrokerList>Unflappable</BrokerList>
                    <BrokerList>Concrete</BrokerList>
                    <BrokerList>Team-builder</BrokerList>
                  </div>
                  <div style={{ marginTop: "20px",color : '#394456' }}>
                    Share your personality type
                  </div>
                  <Card3Img>
                    <Images src={facebook} alt="facebook"  />
                    <Images src={twitter} alt="twitter" />
                    <Images src={linkedin} alt="linkedin"  />
                  </Card3Img>
                </Card3Item>
                
              </Card3>
              <PrimaryButton onClick={() => {navigate(ROUTES.PERSONALITY_TEST)}}>Take Your Personality Test</PrimaryButton>
              <OutlineButton onClick={() => {navigate(ROUTES.IDEAL_COURSES)}}>Ideal Course Analysis</OutlineButton>
              <OutlineButton onClick={() => {navigate(ROUTES.RESUME)}}>{progress? progress.isResumeUpload ? 'View '  : 'Upload ' : 'Upload '} Your Resume</OutlineButton>
              <PrimaryButton onClick={openModal}>Competency Test Analytics</PrimaryButton>
            </LeftChildMainContainer>
          </LeftChildContainer>
          <BorderBottom bw="350px" />
        </LeftContainer>
        <RightContainer>
               <RightHeading>
                <RightHeading1>Your <RightHeadingSpan>EPIC</RightHeadingSpan> Progress</RightHeading1>
               </RightHeading>
              <MobileButtonDiv>
              <PrimaryButton onClick={() => {navigate(ROUTES.PERSONALITY_TEST)}}>Take Your Personality Test</PrimaryButton>
              <OutlineButton onClick={() => {navigate(ROUTES.IDEAL_COURSES)}}>Ideal Course Analysis</OutlineButton>
              <OutlineButton onClick={() => {navigate(ROUTES.RESUME)}}>{progress? progress.isResumeUpload ? 'View '  : 'Upload ' : 'Upload '} Your Resume</OutlineButton>
              <PrimaryButton onClick={openModal}>Competency Test Analytics</PrimaryButton>
              </MobileButtonDiv>
        </RightContainer>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
