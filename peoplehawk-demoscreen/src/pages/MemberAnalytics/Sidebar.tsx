import styled from "styled-components";
import { ReactSelect } from "../../components/layout/form/Select";
import { OptionTypes } from "../../interface/Interface";
import { useState } from "react";
import Input from "../../components/layout/form/Input";

interface DivProps {
  selected: number;
}

const CandidateTypes : OptionTypes[] = [
  {value : 1, label : 'High School/College Student'},
  {value : 2, label : 'Undergraduate'},
  {value : 3, label : 'Graduate'},
  {value : 4, label : 'Experienced Hire'},
]

const Container = styled.div({
  backgroundColor: "#F7F9FC",
  width: "400px",
  minHeight: "100vh",
});

const SearchKeyword = styled.div({
  width: "215px",
});

const Title = styled.div({
  color: "#4D5767",
  backgroundColor: "#F7F9FC",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "70px",
  fontSize: "18px",
  padding: "0px 20px",
  fontWeight: 800,
  boxShadow:
    "0 .125rem .25rem rgba(0, 0, 0, .075), 0 .25rem .5rem rgba(0, 0, 0, .05)",
});

const SearchLabel = styled.label({
  letterSpacing: 0.5,
  marginBottom: "3px",
});

const SearchDiv = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const GreenSearch = styled.div({
  color: "#0097A2",
  fontSize: "16px",
  fontWeight: 600,
});

const MainContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "20px",
  overflowY: "auto",
});

const PreferredPosition = styled.div({
  display: "flex",
});

const Employee = styled.div<DivProps>(({ selected }) => ({
  backgroundColor: selected === 0 ? "#172C4C" : `#D4D6D9`,
  color: selected === 0 ? "white" : "#394456",
  cursor: "pointer",
  width: "fit-content",
  padding: "10px",
  borderRadius: "20px 0px 0px 20px",
}));

const NA = styled.div<DivProps>(({ selected }) => ({
  backgroundColor: selected === 1 ? "#172C4C" : `#D4D6D9`,
  color: selected === 1 ? "white" : "#394456",
  cursor: "pointer",
  width: "fit-content",
  padding: "10px",
  borderLeft: "1px solid #515A6A",
  borderRight: "1px solid #515A6A",
}));

const FreeLancer = styled.div<DivProps>(({ selected }) => ({
  backgroundColor: selected === 2 ? "#172C4C" : `#D4D6D9`,
  color: selected === 2 ? "white" : "#394456",
  cursor: "pointer",
  width: "fit-content",
  padding: "10px",
  borderRadius: "0px 20px 20px 0px",
}));

const Sidebar = (props : any) => {
  const options: OptionTypes[] = [
    { label: "strawberry", value: 1 },
    { label: "mango", value: 2 },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number>(1);
 
  const handleDivClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Container>
      <Title>Search All Members</Title>
      <MainContainer>
        <div>
          <SearchLabel>Keyword</SearchLabel>

          <SearchDiv>
            <SearchKeyword>
              <Input 
               placeholder="i.e: Member's Name" 
               onChange={(e) => {props.onSearchHandler(e.target.value)}}
                 />
            </SearchKeyword>
            <GreenSearch>Search</GreenSearch>
          </SearchDiv>
        </div>
        <div>
          <SearchLabel>Shortlists</SearchLabel>

          <ReactSelect
            options={options}
            placeholder=""
            isClearable
            name="countryId"
            showDropdownIndicator
          />
        </div>
        <div>
          <SearchLabel>Career Preferences</SearchLabel>

          <ReactSelect
            options={options}
            placeholder=""
            isClearable
            name="countryId"
            showDropdownIndicator
          />
        </div>
        <div>
          <SearchLabel>Member Type</SearchLabel>

          <ReactSelect
            options={CandidateTypes}
            placeholder=""
            isClearable
            name="countryId"
            showDropdownIndicator
            onChange={(e,value) => {props.onCandidateTypeHandler(value!=null?value.value : 0)}}
          />
        </div>
        <div>
          <SearchLabel>Course Category</SearchLabel>

          <ReactSelect
            options={options}
            placeholder=""
            isClearable
            name="countryId"
            showDropdownIndicator
          />
        </div>
        <div>
          <SearchLabel>Preferred Position</SearchLabel>
          <PreferredPosition>
            <Employee
              selected={selectedIndex}
              onClick={() => handleDivClick(0)}
            >
              Employee
            </Employee>
            <NA selected={selectedIndex} onClick={() => handleDivClick(1)}>
              N/A
            </NA>
            <FreeLancer
              selected={selectedIndex}
              onClick={() => handleDivClick(2)}
            >
              Freelancer
            </FreeLancer>
          </PreferredPosition>
        </div>
        <div>
          <SearchLabel>Current Status</SearchLabel>

          <ReactSelect
            options={options}
            placeholder=""
            isClearable
            name="countryId"
            showDropdownIndicator
          />
        </div>
        <div>
          <SearchLabel>Willing to work From</SearchLabel>

          <ReactSelect
            options={options}
            placeholder=""
            isClearable
            name="countryId"
            showDropdownIndicator
          />
        </div>
      </MainContainer>
    </Container>
  );
};

export default Sidebar;
