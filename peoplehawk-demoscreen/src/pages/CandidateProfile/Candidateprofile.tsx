import styled from "styled-components";
import profile from "../../assests/img/profile_placeholder-3x.png";
import "../../stylesheets/obviously-font.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NoteIcon from "@mui/icons-material/Note";
import PersonIcon from "@mui/icons-material/Person";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

const Container = styled.div({
  backgroundColor: "#394456",
  display: "flex",
  padding: "40px 20px",
  gap: "90px",
  height: "calc(100vh - 80px)",
});

const ProfileContainer = styled.div({
  display: "flex",
  justifyContent: "start",
  alignItems: "start",
});

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

const FontSize = styled.div({
  fontSize: "21.5px",
  fontFamily: "cursive",
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
});

const IconDiv = styled.div({
  backgroundColor: "#F96332",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  width: "72px",
  height: "72px",
  zIndex: 2,
});

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
  return (
    <Container>
      <ProfileContainer>
        <ProfilePhoto src={profile} alt="profile-photo" />
      </ProfileContainer>
      <InformationContainer>
        <Heading>
          <OrangeColor>Hi, I'm </OrangeColor>
          Nimesh Test.
        </Heading>
        <MailDiv>
          <MailOutlineIcon />
          nimesh.t20@yopmail.com
        </MailDiv>
        <SectionContainer>
          <DetailContainer>
            <SectionHeading>About Me</SectionHeading>
            <FontSize>
              I'm Nimesh, a 24-year-old student in Ireland with a background in
              IT and Business Management. I previously worked as a Software
              Engineer at 2 Sisters Food Group. My interests span from Fashion
              Design Assistant to Aerospace Engineering Technician and even EFL
              Teaching. I pride myself on my creative problem-solving and
              analytical skills.
            </FontSize>
            <FontSize>
              I'm practical, capable of seeing both the details and the bigger
              picture, and collected, able to work independently or
              collaboratively. I'm supportive, emotionally well-rounded, and
              perceptive. My work style is adaptable; I can work solo or in a
              team, stick to plans, and stay focused. I'm dependable, eager, and
              bring a realistic approach to problem-solving. I aim to leverage
              my diverse skills and interests in a fulfilling career.
            </FontSize>
          </DetailContainer>
          <ButtonContainer>
            <SectionHeading>Key Features</SectionHeading>
            <Button>
              <PositionDiv>
                <IconDiv>
                  <NoteIcon style={{ fontSize: "40px" }} />
                </IconDiv>
              </PositionDiv>
              <PrimaryButton>
                <MainButtonDiv>
                  View CV
                  <ArrowCircleRightOutlinedIcon style={{ fontSize: "45px" }} />
                </MainButtonDiv>
              </PrimaryButton>
            </Button>
            <Button>
              <PositionDiv>
                <IconDiv>
                  <PersonIcon style={{ fontSize: "40px" }} />
                </IconDiv>
              </PositionDiv>
              <PrimaryButton>
                <MainButtonDiv>
                  View Personality Test Result
                  <ArrowCircleRightOutlinedIcon style={{ fontSize: "45px" }} />
                </MainButtonDiv>
              </PrimaryButton>
            </Button>
            <Button>
              <PositionDiv>
                <IconDiv>
                  <BusinessCenterIcon style={{ fontSize: "40px" }} />
                </IconDiv>
              </PositionDiv>
              <PrimaryButton>
                <MainButtonDiv>
                  Key Information
                  <ArrowCircleRightOutlinedIcon style={{ fontSize: "45px" }} />
                </MainButtonDiv>
              </PrimaryButton>
            </Button>
          </ButtonContainer>
        </SectionContainer>
      </InformationContainer>
    </Container>
  );
};

export default Candidateprofile;
