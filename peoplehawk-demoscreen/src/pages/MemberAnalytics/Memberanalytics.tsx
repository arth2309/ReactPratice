import Sidebar from "./Sidebar";
import styled from "styled-components";
import profile from "../../assests/img/profile_placeholder-3x.png";
import { useState } from "react";

interface VideoProps {
    elevator : boolean,
    video : boolean,
    all : boolean
}

interface ResumeProps {
    infographic : boolean,
    peoplehawk : boolean,
    member : boolean,
    any : boolean
}

interface ColorProps {
    color : string
}

const Container = styled.div({
  display: "flex",
  gap: "20px",
  width: "100%",
});

const RightContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const Header = styled.div({
  backgroundColor: "white",
  width: "calc(100% - 40px)",
  padding: "20px",
  boxShadow:
    "0 .125rem .25rem rgba(0, 0, 0, .075), 0 .25rem .5rem rgba(0, 0, 0, .05)",
  borderRadius: "0px 0px 0px 12px",
});

const UpperHeader = styled.div({
  display: "flex",
  justifyContent: "space-between",
});

const LowerHeader = styled.div({
    display: "flex",
    justifyContent: "space-between",
    marginTop : '10px'
  });

const Member = styled.div({
  color: "#4D5767",
  fontSize: "20px",
  fontWeight: 600,
});

const Shortlist = styled.div({
  display: "flex",
  gap: "40px",
});
const AllShortlist = styled.div({
  color: "#0097A2",
  fontSize: "20px",
  fontWeight: 500,
  paddingTop: "2px",
});

const DyamicShortlist = styled.div({
  color: "#CED0D7",
  fontSize: "20px",
  fontWeight: 500,
  paddingTop: "4px",
});

const MemberAnalytics = styled.div({
  color: "#0097A2",
  fontSize: "20px",
  fontWeight: 500,
  paddingTop: "6px",
});

const GreyColor = styled.span({
  color: "#515A6A",
});

const GreenColor = styled.span({
  color: "#0097A2",
});

const OrderBy = styled.div({
  display: "flex",
});

const Asc = styled.div({
  borderRadius: "20px 0px 0px 20px",
  width: "70px",
  padding: "5px 0px",
  paddingLeft: "10px",
  color: "#515A6A",
  backgroundColor: "#D4D6D9",
  cursor: "pointer",
});

const Dsc = styled.div({
  borderRadius: "0px 20px 20px 0px",
  width: "70px",
  padding: "5px 0px",
  paddingLeft: "10px",
  backgroundColor: "#515A6A",
  color: "#D4D6D9",
  cursor : 'pointer'
});

const BorderBottom = styled.div({
  borderBottom: "1px solid #B4B4B4",
  marginTop: "10px",
});

const ItemContainer = styled.div({
  display: "flex",
  justifyContent: "end",
  gap: "10px",
  marginTop: "10px",
});

const BorderStraight = styled.div({
  borderLeft: "1px solid black",
});

const MemberContainer = styled.div({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  padding: "20px",
});

const MembarCard = styled.div({
  backgroundColor: "white",
  borderRadius: "20px",
  display: "flex",
  width: "300px",
  height: "300px",
  padding: "20px",
});

const MemberImg = styled.img({
  height: "140px",
});

const MemberLeftCard = styled.div({
  display: "flex",
  flexDirection: "column",
});

const MemberRightCard = styled.div({
  display: "flex",
  flexDirection: "column",
});

const ItemCard = styled.div<ColorProps>`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.color};
  color: white;
  margin-top: 10px;
  font-weight: 900;
  width: fit-content;
  font-size: 12px;
  padding: 10px;
  border-radius: 30px;
  cursor: pointer;
`;

const Memberanalytics = () => {

    const [hasPhoto,setHasPhoto] = useState<boolean>(false);
    const [videoType,setVideoType] = useState<VideoProps>({elevator : false, video : false, all : true});
    const [resumeType,setResumeType] = useState<ResumeProps>({infographic : false, peoplehawk : false, member : false, any : true})
  return (
    <Container>
      <Sidebar />
      <RightContainer>
        <Header>
          <UpperHeader>
            <Member>Members</Member>
            <Shortlist>
              <AllShortlist>Shortlist All Results</AllShortlist>
              <DyamicShortlist>Create Dynamic Shortlist</DyamicShortlist>
              <MemberAnalytics>Member Analytics</MemberAnalytics>
            </Shortlist>
          </UpperHeader>
          <LowerHeader>
            <div>
              <GreyColor>55 member</GreyColor>
            </div>
            <Shortlist>
              <div>
                <GreyColor>Sort By</GreyColor>
                <GreenColor> Last Updated</GreenColor>
              </div>
              <OrderBy>
                <Asc>ASC</Asc>
                <Dsc>DESC</Dsc>
              </OrderBy>
            </Shortlist>
          </LowerHeader>
          <BorderBottom />
          <ItemContainer>
            <ItemCard color = {hasPhoto ? '#172C4C' : '#0097a2'} onClick={() => {setHasPhoto(!hasPhoto)}}>Profile Photo</ItemCard>
            <BorderStraight />
            <ItemCard color = {videoType.elevator ? '#172C4C' : '#0097a2'} onClick={() => {setVideoType({elevator : true,video : false, all : false})}}>Elevator Pitches</ItemCard>
            <ItemCard color = {videoType.video ? '#172C4C' : '#0097a2'} onClick={() => {setVideoType({elevator : false,video : true, all : false})}}>Video Interviews</ItemCard>
            <ItemCard color = {videoType.all ? '#172C4C' : '#0097a2'}onClick={() => {setVideoType({elevator : false,video : false, all : true})}}>Any Video</ItemCard>
            <BorderStraight />
            <ItemCard color = {resumeType.infographic ? '#172C4C' : '#0097a2'} onClick={() => {setResumeType({infographic : true,peoplehawk : false,member : false,any : false})}}>Infographic Resume</ItemCard>
            <ItemCard color = {resumeType.peoplehawk ? '#172C4C' : '#0097a2'} onClick={() => {setResumeType({infographic : false,peoplehawk : true,member : false,any : false})}}>PeopleHawk CV</ItemCard>
            <ItemCard color = {resumeType.member ? '#172C4C' : '#0097a2'} onClick={() => {setResumeType({infographic : false,peoplehawk : false,member : true,any : false})}}>Member CV</ItemCard>
            <ItemCard color = {resumeType.any ? '#172C4C' : '#0097a2'} onClick={() => {setResumeType({infographic : false,peoplehawk : false,member : false,any : true})}}>Any CV/ Resume</ItemCard>
          </ItemContainer>
        </Header>
        <MemberContainer>
          <MembarCard>
            <MemberLeftCard>
              <MemberImg src={profile} alt="profile" />
            </MemberLeftCard>
            <MemberRightCard>
              <div>Member 434</div>
            </MemberRightCard>
          </MembarCard>
        </MemberContainer>
      </RightContainer>
    </Container>
  );
};

export default Memberanalytics;
