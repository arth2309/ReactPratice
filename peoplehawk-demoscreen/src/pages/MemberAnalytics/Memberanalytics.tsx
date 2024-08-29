import Sidebar from "./Sidebar";
import styled from "styled-components";
import profile from "../../assests/img/profile_placeholder-3x.png";
import { useEffect, useState } from "react";
import Pagination from "../../components/layout/pagination/Pagination";

const data =   [
        {
            "user_id": 63,
            "first_name": "Nimesh1",
            "middle_name": null,
            "last_name": "Parmar",
            "default_email": "acraig+nikita@mail.com",
            "phone_number": "+27 76 729 9959",
            "updated_at": "2024-08-21 06:43:41",
            "completion": {
                "basic_information": true,
                "domain_knowledge": true,
                "personality_quiz": true,
                "culture_quiz": true,
                "competency_quiz": true,
                "elevator_pitch": true,
                "video_interview": true,
                "documents": true,
                "career_preference": true,
                "is_personal_statement": true,
                "career_interest_quiz": true,
                "career_value_test": true
            },
            "current_location": {
                "id": 1,
                "name": "Greater London",
                "highlighted": true,
                "order": 0,
                "country_code": "GB"
            },
            "candidate_type": {
                "id": 4,
                "name": "High School/College Student",
                "unique_key": "high-school/college-students",
                "order": 40
            },
            "strengths": [
                {
                    "name": "Systematic"
                },
                {
                    "name": "Well-rounded"
                },
                {
                    "name": "Listening"
                }
            ],
            "grade_point_average": 65,
            "profile_image_thumbnail": {
                "id": 3757,
                "name": "hume-bust",
                "collection_name": "profile_image",
                "url": "",
                "title": null,
                "description": null,
                "document_type": null,
                "date": "2024-02-09 13:20:40",
                "access_type": "public"
            },
            "languages": [
                {
                    "id": 1,
                    "name": "English"
                },
                {
                    "id": 11,
                    "name": "Afar"
                },
                {
                    "id": 13,
                    "name": "Afrikaans"
                },
                {
                    "id": 18,
                    "name": "Akoose"
                }
            ],
            "status": {
                "id": 7,
                "name": "Published",
                "unique_key": "published"
            },
            "candidate_types": {
                "id": 4,
                "name": "High School/College Student"
            },
               "traditional_cv": {
                "id": 3781,
                "name": "Nimesh1_Parmar_Traditional_CV",
                "collection_name": "traditional_cv_docx",
                "url": "",
                "title": null,
                "description": null,
                "document_type": null,
                "date": "2024-02-16 07:03:22",
                "access_type": "public"
            },
            "traditional_cv_pdf": {
                "id": 1768,
                "name": "Nikita_Candidate_Traditional_CV",
                "collection_name": "traditional_cv_pdf",
                "url": "",
                "title": null,
                "description": null,
                "document_type": null,
                "date": "2021-12-06 12:03:05",
                "access_type": "public"
            },
            "my_cv": {
                "id": 2700,
                "name": "Clare_Thompson_Traditional_CV",
                "collection_name": "my_cv",
                "url": "",
                "title": null,
                "description": null,
                "document_type": null,
                "date": "2022-08-29 06:24:35",
                "access_type": "public"
            },
        },
{
            "user_id": 18,
            "first_name": "Dhruvinsinh",
            "middle_name": null,
            "last_name": "Parmar",
            "default_email": "dj@mail.com",
            "phone_number": "+91 7722993344",
            "updated_at": "2024-08-21 06:43:41",
            "completion": {
                "basic_information": true,
                "domain_knowledge": true,
                "personality_quiz": true,
                "culture_quiz": true,
                "competency_quiz": true,
                "elevator_pitch": true,
                "video_interview": true,
                "documents": true,
                "career_preference": true,
                "is_personal_statement": true,
                "career_interest_quiz": true,
                "career_value_test": true
            },
            "current_location": {
                "id": 1,
                "name": "Greater London",
                "highlighted": true,
                "order": 0,
                "country_code": "GB"
            },
            "candidate_type": {
                "id": 4,
                "name": "High School/College Student",
                "unique_key": "high-school/college-students",
                "order": 40
            },
            "strengths": [
                {
                    "name": "Systematic"
                },
                {
                    "name": "Well-rounded"
                },
                {
                    "name": "Listening"
                }
            ],
            "grade_point_average": 65,
            "profile_image_thumbnail": {
                "id": 3757,
                "name": "hume-bust",
                "collection_name": "profile_image",
                "url": "",
                "title": null,
                "description": null,
                "document_type": null,
                "date": "2024-02-09 13:20:40",
                "access_type": "public"
            },
            "languages": [
                {
                    "id": 1,
                    "name": "English"
                },
                {
                    "id": 11,
                    "name": "Afar"
                },
                {
                    "id": 13,
                    "name": "Afrikaans"
                },
                {
                    "id": 18,
                    "name": "Akoose"
                }
            ],
            "status": {
                "id": 7,
                "name": "Published",
                "unique_key": "published"
            },
            "candidate_types": {
                "id": 4,
                "name": "High School/College Student"
            },
               "traditional_cv": {
                "id": 3781,
                "name": "Nimesh1_Parmar_Traditional_CV",
                "collection_name": "traditional_cv_docx",
                "url": "",
                "title": null,
                "description": null,
                "document_type": null,
                "date": "2024-02-16 07:03:22",
                "access_type": "public"
            },
            "traditional_cv_pdf": {
                "id": 1768,
                "name": "Nikita_Candidate_Traditional_CV",
                "collection_name": "traditional_cv_pdf",
                "url": "",
                "title": null,
                "description": null,
                "document_type": null,
                "date": "2021-12-06 12:03:05",
                "access_type": "public"
            },
            "my_cv": {
                "id": 2700,
                "name": "Clare_Thompson_Traditional_CV",
                "collection_name": "my_cv",
                "url": "",
                "title": null,
                "description": null,
                "document_type": null,
                "date": "2022-08-29 06:24:35",
                "access_type": "public"
            },
 "owned_by": {
                "id": 1,
                "first_name": "Seeded",
                "middle_name": null,
                "last_name": "Admin",
mail:"client@mail.com"
           }
        },
    ]

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
  backgroundColor: "#F7F9FC",
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
    const [resumeType,setResumeType] = useState<ResumeProps>({infographic : false, peoplehawk : false, member : false, any : true});
    const [searchString,setSearchString] = useState<string>('');
    const [candidateType, setCandidatetype] = useState<number>(0);
    const [filterData,setFilterData] = useState<any>(data);
    const [page,setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(data.length);

    const handlePageChange = (page: number) => {
      setPage(page);
    };

    const searchHandler = (value : string) =>
    {
        setSearchString(value);
        
    }

   const candidateTypeHandler = (value : number) =>
   {
     setCandidatetype(value);
   }

   const filteredData = () => {
      
    let filtered = data

    if(searchString.trim().length > 0)
    {
      filtered = filtered.filter((item) => item.first_name.toLowerCase().includes(searchString.toLowerCase()));
    }

    if(candidateType !== 0)
     {
      filtered = filtered.filter((item) => item.candidate_type.id === candidateType);
     }

     setTotalPages(filtered.length);
     setPage(1);
   }

   useEffect(() => {filteredData()},[searchString,candidateType,page])

  return (
    <Container>
      <Sidebar onSearchHandler = {searchHandler} onCandidateTypeHandler = {candidateTypeHandler} />
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
              <GreyColor>{filterData.length} member</GreyColor>
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
            {filterData.slice(page-1,page).map((item : any) =>  
          <MembarCard>
            <MemberLeftCard>
              <MemberImg src={profile} alt="profile" />
            </MemberLeftCard>
            <MemberRightCard>
              <div>{item.first_name}</div>
            </MemberRightCard>
          </MembarCard>
          )}
        </MemberContainer>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange}/>
      </RightContainer>
    </Container>
  );
};

export default Memberanalytics;
