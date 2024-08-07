import Header from "../../components/layout/header/Header";
import { Fragment, useContext, useState,useRef, useEffect } from "react";
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
import {fetchPhoto,uploadPhoto,getProgress} from "../../API/apiClient";



interface Card1ItemProps {
  bordercolor: string;
}

interface TrophyProps {
  cHeight: string;
  cWidth: string;
}

interface BorderBottomProps {
  cWidth: string;
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

const Card1Item = styled.div<Card1ItemProps>((props) => ({
  border: `1px solid ${props.bordercolor}`,
  borderRadius: "30px",
  display: "flex",
  padding: "9px 0px",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "14px",
  color: "#394456",
  width : "163px"
}));

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

const Trophy = styled.div<TrophyProps>((props) => ({
  width: props.cWidth,
  backgroundColor: "#F96332",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  height: props.cHeight,
  padding: "2px",
  cursor: "pointer",
}));

const Card3 = styled.div({
  backgroundColor: "#DBEFFA",
  display: "flex",
  gap: "80px",
  marginTop: "20px",
  padding: "10px",
  borderRadius: "8px",
  width : '337px'
});

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

const BorderBottom = styled.div<BorderBottomProps>((props) => ({
  borderBottom: "3px solid #F96332",
  width: props.cWidth,
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


const Dashboard : React.FC = () => {
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
       fetchdata();
  },[])

  const fetchdata = async() => {
    if(authctx.userData)
    {
      const result = await fetchPhoto(authctx.userData.Id);
      if(result)
        {
          setImageSrc(result);
        }
        const prog = await getProgress(authctx.userData.Id);
        if(prog)
        {
          setProgress(prog);
        }
    }
   
  }

    const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            
            if (file.size > 15*1024) {
                showToast('error', 'File size exceeds 15 KB limit.','error');
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


  return (
    <Fragment>
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
          <Trophy cHeight="40px" cWidth="40px">
            <img src={trophy} alt="trophy" />
          </Trophy>
        </MobileCard1>
        <MobileCard2>
          <Obviously>Welcome</Obviously>
          <ObviouslyOrange>{authctx.userData?.FirstName}</ObviouslyOrange>
          <BorderBottom cWidth="100%" />
          <div>Build a Epic Career here</div>
        </MobileCard2>
      </MobileLeftContainer>
      <Container>
        <LeftContainer>
        <Heading>Welcome <span style={{color : '#F96332'}}>{authctx.userData?.FirstName}</span></Heading>
          <LeftChildContainer>
           
            <LeftChildMainContainer>
              <Card1>
                <Card1Item bordercolor="#F96332">
                  <strong>View My Profile</strong>
                </Card1Item>
                <Card1Item bordercolor="#F96332">
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
                    <Progress>{progress}%</Progress>
                  </Card2SubItem>
                  <Card2SubItem>
                    <div style={{ color: "#394456", fontSize: "12px" }}>
                      <strong>Trophies</strong>
                    </div>
                    <Trophy cHeight="60px" cWidth="60px">
                      <img src={trophy} alt="trophy" />
                    </Trophy>
                  </Card2SubItem>
                </Card2Sub>
              </Card2>
              <Card3>
                <img src={broker} alt="broker" />
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
                    <img src={facebook} alt="facebook" height="30px" />
                    <img src={twitter} alt="twitter" height="30px" />
                    <img src={linkedin} alt="linkedin" height="30px" />
                  </Card3Img>
                </Card3Item>
              </Card3>
              <PrimaryButton onClick={() => {navigate('/personality-test')}}>Take Your Personality Test</PrimaryButton>
              <OutlineButton onClick={() => {navigate('/analysis')}}>Ideal Course Analysis</OutlineButton>
              <OutlineButton onClick={() => {navigate('/resume')}}>Upload / View Your Resume</OutlineButton>
            </LeftChildMainContainer>
          </LeftChildContainer>
          <BorderBottom cWidth="350px" />
        </LeftContainer>
        <RightContainer>
               <RightHeading>
                <RightHeading1>Your <RightHeadingSpan>EPIC</RightHeadingSpan> Progress</RightHeading1>
               </RightHeading>
              <MobileButtonDiv>
              <PrimaryButton onClick={() => {navigate('/personality-test')}}>Take Your Personality Test</PrimaryButton>
              <OutlineButton onClick={() => {navigate('/analysis')}}>Ideal Course Analysis</OutlineButton>
              <OutlineButton onClick={() => {navigate('/resume')}}>Upload / View Your Resume</OutlineButton>
              </MobileButtonDiv>
        </RightContainer>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
