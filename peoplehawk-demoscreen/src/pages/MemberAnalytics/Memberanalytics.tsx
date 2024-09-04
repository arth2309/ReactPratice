import Sidebar from "./Sidebar";
import styled from "styled-components";
import profile from "../../assests/img/profile_placeholder-3x.png";
import { useEffect, useState } from "react";
import Pagination from "../../components/layout/pagination/Pagination";
import { MemberAnalytics as List, OptionTypes , KeyValue, StateValue} from "../../interface/Interface";
import { MemberAnalyticsList,MemberAnalyticsCount } from "../../services/MemberAnalyticsService";
import { ReactSelect } from "../../components/layout/form/Select";
import  personalityQuizCompleted from '../../assests/img/personality_quiz-completed.svg'
import personalityQuizEmpty from '../../assests/img/personality_quiz-empty.svg'
import gamesEmpty from '../../assests/img/games_icon-empty.svg'
import gamesCompleted from '../../assests/img/games_icon-completed.svg'
import videoCompleted from '../../assests/img/video-completed.svg'
import videoEmpty from '../../assests/img/video-empty.svg'
import cvOptimizedCompleted from '../../assests/img/cv_optimiser-completed.svg'
import cvOptimizedEmpty from '../../assests/img/cv_optimiser-empty.svg'
import cvGeneratedEmpty from '../../assests/img/cv_genrated-empty.svg'
import cvGeneratedCompleted from '../../assests/img/cv_genrated-completed.svg'
import documentCompleted from '../../assests/img/document-completed.svg'
import documentEmpty from '../../assests/img/document-empty.svg'
import DoneIcon from '@mui/icons-material/Done';
import { useUrlSearchState } from "../../customhooks/useUrlSearchState";

const defaults: KeyValue = {
  searchTerm: '',
  page: 1,
  filters: []
};

    const SortTypes : OptionTypes[] = [
      {value : 1, label : 'Last Updated'},
      {value : 2, label : 'Alphabetical'},
    ]

interface SwitchContainerProps {
      isOn: boolean;
    }
    
interface SwitchHandleProps {
      isOn: boolean;
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

interface TransistionProps {
  isVisible : boolean,
  delay: number
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
  display : 'flex',
  width: "calc(100% - 40px)",
  padding: "20px",
  boxShadow:
    "0 .125rem .25rem rgba(0, 0, 0, .075), 0 .25rem .5rem rgba(0, 0, 0, .05)",
  borderRadius: "0px 0px 0px 12px",
});

const HeaderContainer = styled.div({
  display : 'block',
  width : 'calc(100% - 130px)',
  marginRight : '20px'

});

const UpperHeader = styled.div({
  display: "flex",
  justifyContent: "space-between",
});

const LowerHeader = styled.div({
    display: "flex",
    justifyContent: "space-between",
    marginTop : '15px'
  });

const Member = styled.div({
  color: "#4D5767",
  fontSize: "20px",
  fontWeight: 600,
  paddingTop : '10px'
});

const Shortlist = styled.div({
  display: "flex",
  gap: "40px",
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
  display : 'flex',
  alignItems : 'center',
  width: "70px",
  padding: "5px 0px",
  paddingLeft: "10px",
  color: "#515A6A",
  backgroundColor: "#D4D6D9",
  cursor: "pointer",
});

const Dsc = styled.div({
  borderRadius: "0px 20px 20px 0px",
  display : 'flex',
  alignItems : 'center',
  width: "70px",
  padding: "5px 0px",
  paddingLeft: "10px",
  backgroundColor: "#515A6A",
  color: "#D4D6D9",
  cursor : 'pointer'
});

const SortedByDiv = styled.div({
   display : 'block',
   position : 'relative',
   width : '200px'
});

const CompletionImg = styled.img({
  height : '24px'
})

const SwitchWrapper = styled.div`
  display: flex;
  flex-direction : column;
  align-items: center;
  gap: 10px; 
  width : 150px;
  padding-top : 15px;
`;

const SwitchContainer = styled.div<SwitchContainerProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${props => (props.isOn ? '#0097a2' : '#ccc')};
  border-radius: 30px; /* Adjusted to match handle size */
  width: 72px; /* Increased width */
  height: 30px; /* Increased height */
  position: relative;
  transition: background-color 0.3s;
`;

const SwitchHandle = styled.div<SwitchHandleProps>`
  width: 36px; 
  height: 36px; 
  background-color: #172C4C;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: ${props => (props.isOn ? '50px' : '-5px')}; /* Adjusted positions */
  transform: translateY(-50%);
  transition: left 0.3s;
`;


const BorderBottom = styled.div({
  borderBottom: "1px solid #B4B4B4",
  marginTop: "10px",
  width : '250px'
});

const MemberCardTitle = styled.div({
  color: "#4D5767",
  fontSize: "18px",
  fontWeight: 600,
  
});

const MemberCardSubTitle = styled.div({
  color: "#4D5767",
  fontSize: "14px",
  fontWeight: 600,
})

const ItemContainer = styled.div({
  display: "flex",
  justifyContent: "end",
  gap: "10px",
  
});

const BorderStraight = styled.div({
  borderLeft: "1px solid black",
});

const MemberContainer = styled.div({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  padding: "20px",
  overflowX : 'hidden'
});


const MembarCard = styled.div<TransistionProps>(({isVisible,delay}) => ({
  backgroundColor: "white",
  borderRadius: "20px",
  display: "flex",
  flexDirection : 'column',
  width: "400px",
  gap : '15px',
  height: "300px",
  padding: "20px",
  transform : `translateX(${isVisible ? '0' : '100vw'})`,
  transition : 'transform 0.5s ease-in-out',
  transitionDelay : `${delay}ms`,
  boxShadow:
  "0 .125rem .25rem rgba(0, 0, 0, .075), 0 .25rem .5rem rgba(0, 0, 0, .05)",
}));

const MemberMainCard = styled.div({
   display : 'flex',
   gap : '40px'
});

const UpdatedDate = styled.div ({
  display : 'flex',
  justifyContent : 'end'
});

const MemberImg = styled.img({
  height: "110px",
});

const MemberLeftCard = styled.div({
  display: "flex",
  flexDirection: "column",
  gap : '10px',
  alignItems : 'center'
});

const CompletionCont = styled.div({
   display : 'flex',
   flexDirection : 'column',
   gap : '10px'
});

const CompletionCard = styled.div({
  display : 'flex',
  gap : '5px'
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
    const [resumeType,setResumeType] = useState<ResumeProps>({infographic : false, peoplehawk : false, member : false, any : false});
    const [searchString,setSearchString] = useState<string>('');
    const [candidateType, setCandidatetype] = useState<string | undefined>(undefined);
    const [country, setCountry] = useState<number>(0);
    const [filterData,setFilterData] = useState<List[]>([]);
    const [page,setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(2);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isOn, setIsOn] = useState<boolean>(false);
    const [sortOrder,setSortOrder] = useState<string>('asc');
    const [sortBy,setSortedBy] = useState<string>('Last updated');
    const [orderedBy,setOrderedBy] = useState<number>(0);
    const[count,setCount] = useState<number>(0);

   

  const[state,setState] = useUrlSearchState(defaults);

  const handleSwitchToggle = () => {
    setIsOn(prevState => !prevState);
  };


  useEffect(() => {
    setTimeout(() => {setIsVisible(true)},200);
  },[page]);

    const handlePageChange = (page1: number) => {
      setPage(page1);
      if(page !== page1)
      {
        setIsVisible(false);
      }

    };

    const searchHandler = (value : string) =>
    {
    
      setState({ searchTerm: 'React', page: 2});
      console.log(state);
        setSearchString(value.trim());
        setPage(1);
        
    }

   const candidateTypeHandler = (value : string | undefined) =>
   {
    setState({ searchTerm: 'React', page: 3 });
    console.log(state);
     setCandidatetype(value);
     setPage(1);
   }

   const countryTypeHandler = (value : number) =>
    {
      setCountry(value);
      setPage(1);
    }

   // eslint-disable-next-line
   useEffect(() => {fetchData(); },[page,sortOrder,orderedBy,searchString,country,candidateType,hasPhoto,resumeType]);

   const fetchData = async() => {
      const result = await MemberAnalyticsList(page,resumeType.infographic,resumeType.member,resumeType.peoplehawk,resumeType.any,sortOrder,hasPhoto,orderedBy,searchString,country,candidateType);
      result && setFilterData(result);;
      const result1 = await MemberAnalyticsCount(resumeType.infographic,resumeType.member,resumeType.peoplehawk,resumeType.any,sortOrder,hasPhoto,orderedBy,searchString,country,candidateType);
      if(result1 === 0)
      {
        setCount(0);
        setTotalPages(0);
      }
       result1 && setCount(result1);
       result1 && setTotalPages(Math.ceil(result1/6));
   }

  return (
    <Container>
      <Sidebar onSearchHandler = {searchHandler} onCandidateTypeHandler = {candidateTypeHandler} onCountryTypeHandler = {countryTypeHandler} />
      <RightContainer>
        <Header>
          <HeaderContainer>
          <UpperHeader>
            <Member>Members</Member>
            <ItemContainer>
            <ItemCard color = {hasPhoto ? '#172C4C' : '#0097a2'} onClick={() => {setHasPhoto(!hasPhoto); setPage(1);}}>Profile Photo </ItemCard>
            <BorderStraight />
            <ItemCard color = {resumeType.infographic ? '#172C4C' : '#0097a2'} onClick={() => {setResumeType({infographic : !resumeType.infographic,peoplehawk : false,member : false,any : false});  setPage(1);}}>Infographic Resume</ItemCard>
            <ItemCard color = {resumeType.peoplehawk ? '#172C4C' : '#0097a2'} onClick={() => {setResumeType({infographic : false,peoplehawk : !resumeType.peoplehawk,member : false,any : false});  setPage(1);}}>PeopleHawk CV</ItemCard>
            <ItemCard color = {resumeType.member ? '#172C4C' : '#0097a2'} onClick={() => {setResumeType({infographic : false,peoplehawk : false,member : !resumeType.member,any : false});  setPage(1);}}>Member CV</ItemCard>
            <ItemCard color = {resumeType.any ? '#172C4C' : '#0097a2'} onClick={() => {setResumeType({infographic : false,peoplehawk : false,member : false,any : !resumeType.any});  setPage(1);}}>Any CV/ Resume</ItemCard>
          </ItemContainer>
          </UpperHeader>
          <LowerHeader>
            <div>
              <GreyColor>{count} member</GreyColor>
            </div>
            <Shortlist>
              <SortedByDiv>
                <div style={{position : 'absolute'}}>
                <GreyColor>Sort By </GreyColor>
                <GreenColor>
                   {sortBy}
                   </GreenColor>
                   </div>
                   
                   <ReactSelect
            options={SortTypes}
            placeholder=""
            hideInput
            name="countryId"
            onChange={(e,value) => {setSortedBy(value.label);setOrderedBy(value.value)}}
          />
              </SortedByDiv>
              <OrderBy>
                <Asc onClick={() => {setSortOrder('asc')}}>ASC {sortOrder === 'asc' && <DoneIcon />}</Asc>
                <Dsc onClick={() => {setSortOrder('desc')}}>DESC {sortOrder === 'desc' && <DoneIcon />}</Dsc>
              </OrderBy>
            </Shortlist>
          </LowerHeader>
          </HeaderContainer>
          <SwitchWrapper>
      <SwitchContainer onClick={handleSwitchToggle} isOn={isOn}>
        <SwitchHandle isOn={isOn} />
      </SwitchContainer>
      <label>Names/Anonymous</label>
    </SwitchWrapper>
        </Header>
        <MemberContainer>
            { filterData && filterData.map((item : List,index : number) =>  
          <MembarCard isVisible = {isVisible} delay={index*120} key={item.userId}>
            <UpdatedDate>Updated : 28 August 2024</UpdatedDate>
            <MemberMainCard>
            <MemberLeftCard>
              <MemberImg src={item.photoContent? `data:image/jpeg;base64,${item.photoContent}`:profile} alt="profile" />
              <CompletionCont>
                <CompletionCard>
                  <CompletionImg src={item.completion.isPersonalityQuizGiven? personalityQuizCompleted : personalityQuizEmpty} alt="personality-quiz" />
                  <CompletionImg src={item.completion.isGames? gamesCompleted : gamesEmpty} alt="games" />
                  <CompletionImg src={item.completion.isVideoInterview? videoCompleted : videoEmpty} alt="video" />
                </CompletionCard>
                <CompletionCard>
                  <CompletionImg src={item.completion.isCVOptimized? cvOptimizedCompleted : cvOptimizedEmpty} alt="cv-optimizer" />
                  <CompletionImg src={item.completion.isCompentencyQuizGiven? cvGeneratedCompleted : cvGeneratedEmpty} alt="cv-generated" />
                  <CompletionImg src={item.completion.isDocumentGiven? documentCompleted : documentEmpty} alt="video" />
                </CompletionCard>
              </CompletionCont>
            </MemberLeftCard>
            <MemberRightCard>
              <MemberCardTitle>{isOn ? `Member ${item.userId}` : item.firstName}</MemberCardTitle>
              <BorderBottom />
              <CompletionCont>
                <CompletionCard>
                  <MemberCardSubTitle>Member Type:</MemberCardSubTitle>
                  <div>{item.memberType}</div>
                </CompletionCard>
                <CompletionCard>
                  <MemberCardSubTitle>Country:</MemberCardSubTitle>
                  <div>{item.country &&  item.country.countryName}</div>
                </CompletionCard>
                { item.ownedBy && <CompletionCard>
                  <MemberCardSubTitle>ownedBy:</MemberCardSubTitle>
                  <div>{item.ownedBy.firstName}</div>
                </CompletionCard>}
              </CompletionCont>
            </MemberRightCard>
            </MemberMainCard>
          </MembarCard>
          )}
        </MemberContainer>
       {count > 0 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange}/>}
      </RightContainer>
    </Container>
  );
};
export default Memberanalytics;