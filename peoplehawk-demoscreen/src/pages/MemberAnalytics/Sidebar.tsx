import styled from "styled-components";
import { ReactSelect } from "../../components/layout/form/Select";
import { OptionTypes } from "../../interface/Interface";
import { useState } from "react";

interface DivProps {
  selected : number
}

const Container = styled.div({
    backgroundColor : '#F7F9FC',
    width : '400px',
    height : '100vh'
});

const Title = styled.div({
    color : '#4D5767',
    backgroundColor : 'white',
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'center',
    height: '70px',
    fontSize : '18px',
    padding : '0px 20px',
    fontWeight : 800,
    boxShadow: '0 .125rem .25rem rgba(0, 0, 0, .075), 0 .25rem .5rem rgba(0, 0, 0, .05)'
    
});

const MainContainer = styled.div({
    display : 'flex',
    flexDirection : 'column',
    gap : '20px',
    padding : '20px'

});

const PreferredPosition = styled.div({
  display : 'flex'
})

const Employee = styled.div<DivProps>(({selected}) => ({
  backgroundColor : selected == 0 ? '#172C4C' : `#D4D6D9`,
  color : selected == 0 ? 'white' : '#515A6A',
  cursor : 'pointer',
  width : 'fit-content',
  padding : '10px',
  borderRadius : '20px 0px 0px 20px'
}));

const NA = styled.div<DivProps>(({selected})=> ({
  backgroundColor : selected == 1 ? '#172C4C' : `#D4D6D9`,
  color : selected == 1 ? 'white' : '#515A6A',
  cursor : 'pointer',
  width : 'fit-content',
  padding : '10px',
  borderLeft : '1px solid #515A6A',
  borderRight : '1px solid #515A6A'
}));

const FreeLancer = styled.div<DivProps>(({selected}) => ({
  backgroundColor : selected == 2 ? '#172C4C' : `#D4D6D9`,
  color : selected == 2 ? 'white' : '#515A6A',
  cursor : 'pointer',
  width : 'fit-content',
  padding : '10px',
  borderRadius : '0px 20px 20px 0px'
}));

const Sidebar = () => {

    const options : OptionTypes[] = [{label : 'strawberry',value : 1},{label : 'mango',value : 2}]

    const [selectedIndex, setSelectedIndex] = useState<number>(1);

  const handleDivClick = (index: number) => {
    setSelectedIndex(index);
  };
  
    return(
    <Container>
        <Title>
            Search All Members
        </Title>
        <MainContainer>
            <div>
            <label>Shortlists</label>
                    
                      <ReactSelect
                        options={options}
                        name="countryId"
                      />
            </div>
            <div>
            <label>Career Preferences</label>
                    
                      <ReactSelect
                        options={options}
                        name="countryId"
                      />
            </div>
            <div>
            <label>Member Type</label>
                    
                      <ReactSelect
                        options={options}
                        name="countryId"
                      />
            </div>
            <div>
            <label>Course Category</label>
                    
                      <ReactSelect
                        options={options}
                        name="countryId"
                      />
            </div>
            <div>
            <label>Preferred Position</label>
            <PreferredPosition>
               <Employee selected={selectedIndex} onClick={() => handleDivClick(0)}>Employee</Employee>
               <NA selected={selectedIndex} onClick={() => handleDivClick(1)}>N/A</NA>
               <FreeLancer selected={selectedIndex} onClick={() => handleDivClick(2)}>Freelancer</FreeLancer>
            </PreferredPosition>
            </div>
            <div>
            <label>Curent Status</label>
                    
                      <ReactSelect
                        options={options}
                        name="countryId"
                      />
            </div>
            <div>
            <label>Willing to work From</label>
                    
                      <ReactSelect
                        options={options}
                        name="countryId"
                      />
            </div>
        </MainContainer>
    </Container>
    )
}

export default Sidebar;