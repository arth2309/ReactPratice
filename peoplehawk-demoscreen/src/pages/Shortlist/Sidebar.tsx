import styled from "styled-components";
import { Dispatch, useEffect, useState, useContext } from "react";
import {
  getShortlist,
  addOrRemoveFavouriteShortlist,
} from "../../services/ShortlistService";
import { Action } from "../../store/ShortlistReducer";
import CreateShortlist from "../../modals/CreateShortlist";
import { ShortlistReducerProps } from "../../interface/Interface";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import queryString from "query-string";
import { overrideAndEncodeState } from "../../customhooks/useUrlSearchState";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useMemberAnalytics } from "../../store/MemberAnalyticsContext";
import { useParams } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import PushPinSharpIcon from "@mui/icons-material/PushPinSharp";
import {
  showToast,
  ToastComponent,
} from "../../components/layout/ToastComponent/Toastcomponent";
import { TOAST } from "../../constants/toast";

interface SideBarProps {
  state: ShortlistReducerProps;
  dispatch: Dispatch<Action>;
}

const defaults = {
  page: 1,
  isResume: false,
  isPersonalityTest: false,
  sortOrder: "asc",
  orderedBy: 1,
  isProfilePhoto: false,
  sortBy: "Last Updated",
  isOn: false,
  searchTerm: "",
  countryId: 0,
  memberType: "",
};

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

  ".back": {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
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
  justify-content: space-between;
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

const Sidebar: React.FC<SideBarProps> = ({ state, dispatch }) => {
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const { userData } = useContext(AuthContext);
  const [isCreateShortlist, setIsCreateShortlist] = useState<boolean>(false);
  const urlState = useMemberAnalytics();
  const navigate = useNavigate();

  const backToLoginPage = () => {
    navigate(
      `${ROUTES.MEMBER_ANALYTICS}?${queryString.stringify(
        overrideAndEncodeState(urlState.state, urlState.state, defaults)
      )}`
    );
  };

  const createShortlistOpenHandler = () => {
    setIsCreateShortlist(true);
  };

  const createShortlistCloseHandler = () => {
    setIsCreateShortlist(false);
  };

  const fetchData = async () => {
    const response = await getShortlist(userData ? userData.Id : 0);
    response &&
      dispatch({ type: "POST_SHORTLIST", payload: response.shortlist });
    response &&
      dispatch({
        type: "POST_FAVOURITE_SHORTLIST",
        payload: response.favouriteShortlist,
      });
  };

  const { id } = useParams();

  const changeFavouriteList = async (
    id: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const response = await addOrRemoveFavouriteShortlist(id);
    response &&
      (response.isFavourite
        ? dispatch({ type: "ADD_IN_FAVOURITE_SHORTLIST", payload: response })
        : dispatch({
            type: "REMOVE_IN_FAVOURITE_SHORTLIST",
            payload: response.id,
          }));
    response &&
      (response.isFavourite
        ? showToast(
            TOAST.ADD_FAVOURITE_SHORTLIST.title,
            TOAST.ADD_FAVOURITE_SHORTLIST.description,
            TOAST.ADD_FAVOURITE_SHORTLIST.type
          )
        : showToast(
            TOAST.REMOVE_FAVOURITE_SHORTLIST.title,
            TOAST.REMOVE_FAVOURITE_SHORTLIST.description,
            TOAST.REMOVE_FAVOURITE_SHORTLIST.type
          ));
  };

  return (
    <div>
      <ToastComponent />
      <Container>
        {isCreateShortlist && (
          <CreateShortlist
            onClose={createShortlistCloseHandler}
            state={state}
            dispatch={dispatch}
          />
        )}
        <Title>
          <div className="back" onClick={backToLoginPage}>
            <ArrowBackIosIcon />
          </div>
          Shortlists
          <ShortlistButton onClick={createShortlistOpenHandler}>
            New Shortlist
          </ShortlistButton>
        </Title>
        <MainContainer>
          {state.favouriteList.length > 0 && <h3>Favourite Shortlists</h3>}
          {state.favouriteList &&
            state.favouriteList.map((item, index) => (
              <ShortlistDiv
                isSelect={id !== undefined && item.id === parseInt(id)}
                key={index}
                onClick={() => {
                  navigate(
                    userData && userData.RoleId === 3
                      ? `/client/shortlist/${item.id}`
                      : `/shortlist/${item.id}`
                  );
                }}
              >
                {item.name}
                <div
                  onClick={(e) => {
                    changeFavouriteList(item.id, e);
                  }}
                >
                  <PushPinSharpIcon />
                </div>
              </ShortlistDiv>
            ))}
          {state.list.length > 0 && <h3>Shortlists</h3>}
          {state.list &&
            state.list.map((item, index) => (
              <ShortlistDiv
                isSelect={id !== undefined && item.id === parseInt(id)}
                key={index}
                onClick={() => {
                  navigate(
                    userData && userData.RoleId === 3
                      ? `/client/shortlist/${item.id}`
                      : `/shortlist/${item.id}`
                  );
                }}
              >
                {item.name}
                <div
                  onClick={(e) => {
                    changeFavouriteList(item.id, e);
                  }}
                >
                  <PushPinSharpIcon />
                </div>
              </ShortlistDiv>
            ))}
        </MainContainer>
      </Container>
    </div>
  );
};

export default Sidebar;
