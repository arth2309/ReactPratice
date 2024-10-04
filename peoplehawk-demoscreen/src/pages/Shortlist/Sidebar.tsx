import styled from "styled-components";
import { useEffect, useReducer } from "react";
import { getShortlist } from "../../services/ShortlistService";
import { intialState, shortlistReducer } from "../../store/ShortlistReducer";

interface SideBarProps {}

const Container = styled.div({
  backgroundColor: "#F7F9FC",
  width: "400px",
  minHeight: "100vh",
});

const Title = styled.div({
  color: "#4D5767",
  backgroundColor: "#F7F9FC",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "70px",
  fontSize: "18px",
  padding: "0px 20px",
  fontWeight: 800,
  boxShadow:
    "0 .125rem .25rem rgba(0, 0, 0, .075), 0 .25rem .5rem rgba(0, 0, 0, .05)",
});

const MainContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "20px",
});

const ShortlistButton = styled.button({
  backgroundColor: "#0097A2",
  padding: "12px 26px",
  fontSize: "15px",
  fontWeight: 700,
  borderRadius: "0px",

  "&:hover": {
    backgroundColor: "#00B0BA",
  },
});

const ShortlistDiv = styled.div`
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: start;
  background-color: white;
  color: black;
  padding: 10px;
  font-weight: 700;
  border-radius: 15px;
  cursor: pointer;
  height: 35px;
  align-items: center;
  font-size: 18px;
  &:hover {
    background-color: #c6cdd9;
  }
`;

const Sidebar: React.FC<SideBarProps> = () => {
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const [state, dispatch] = useReducer(shortlistReducer, intialState);

  const fetchData = async () => {
    const response = await getShortlist();
    response && dispatch({ type: "POST_SHORTLIST", payload: response });
  };

  return (
    <div>
      <Container>
        <Title>
          Shortlists
          <ShortlistButton>New Shortlist</ShortlistButton>
        </Title>
        <MainContainer>
          {state.list &&
            state.list.map((item, index) => (
              <ShortlistDiv key={index}>{item.name}</ShortlistDiv>
            ))}
        </MainContainer>
      </Container>
    </div>
  );
};

export default Sidebar;
