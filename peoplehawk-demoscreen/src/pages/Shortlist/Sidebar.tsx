import styled from "styled-components";
import { Dispatch, useEffect, useReducer, useState } from "react";
import { getShortlist } from "../../services/ShortlistService";
import { Action } from "../../store/ShortlistReducer";
import CreateShortlist from "../../modals/CreateShortlist";
import { ShortlistReducerProps } from "../../interface/Interface";

interface SideBarProps {
  state: ShortlistReducerProps;
  dispatch: Dispatch<Action>;
  onChangeShortlistId: (shortListId: number) => void;
}

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

const ShortlistDiv = styled.div<ButtonProps>`
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: start;
  background-color: ${(props) => (!props.isSelect ? "white" : "#c6cdd9")};
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

interface ButtonProps {
  isSelect: boolean;
}

const Sidebar: React.FC<SideBarProps> = ({
  state,
  dispatch,
  onChangeShortlistId,
}) => {
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const [isCreateShortlist, setIsCreateShortlist] = useState<boolean>(false);
  const [isSelect, setIsSelect] = useState<number>(0);

  const CreateShortlistOpenHandler = () => {
    setIsCreateShortlist(true);
  };

  const CreateShortlistCloseHandler = () => {
    setIsCreateShortlist(false);
  };

  const fetchData = async () => {
    const response = await getShortlist();
    response && dispatch({ type: "POST_SHORTLIST", payload: response });
  };

  return (
    <div>
      <Container>
        {isCreateShortlist && (
          <CreateShortlist
            onClose={CreateShortlistCloseHandler}
            state={state}
            dispatch={dispatch}
          />
        )}
        <Title>
          Shortlists
          <ShortlistButton onClick={CreateShortlistOpenHandler}>
            New Shortlist
          </ShortlistButton>
        </Title>
        <MainContainer>
          {state.list &&
            state.list.map((item, index) => (
              <ShortlistDiv
                isSelect={item.id === isSelect}
                key={index}
                onClick={() => {
                  if (item.id !== isSelect) {
                    onChangeShortlistId(item.id);
                    setIsSelect(item.id);
                  }
                }}
              >
                {item.name}
              </ShortlistDiv>
            ))}
        </MainContainer>
      </Container>
    </div>
  );
};

export default Sidebar;
