import Sidebar from "./Sidebar";
import styled from "styled-components";
import { useEffect, useState, useContext, useReducer } from "react";
import Pagination from "../../components/layout/pagination/Pagination";
import {
  MemberAnalytics as List,
  OptionTypes,
  Shortlist as ShortlistProps,
} from "../../interface/Interface";
import { MemberAnalyticsList } from "../../services/MemberAnalyticsService";
import { ReactSelect } from "../../components/layout/form/Select";
import DoneIcon from "@mui/icons-material/Done";
import { useUrlSearchState } from "../../customhooks/useUrlSearchState";
import { useMemberAnalytics } from "../../store/MemberAnalyticsContext";
import AuthContext from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
import Shortlist from "../../modals/Shortlist";
import { intialState, shortlistReducer } from "../../store/ShortlistReducer";
import { ROUTES } from "../../constants/routes";
import MemberCard from "../../components/layout/Member/MemberCard";

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

const SortTypes: OptionTypes[] = [
  { value: 1, label: "Last Updated" },
  { value: 2, label: "Alphabetical" },
];

interface SwitchContainerProps {
  isOn: boolean;
}

interface SwitchHandleProps {
  isOn: boolean;
}

interface ColorProps {
  color: string;
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
  display: "flex",
  width: "calc(100% - 40px)",
  padding: "20px",
  boxShadow:
    "0 .125rem .25rem rgba(0, 0, 0, .075), 0 .25rem .5rem rgba(0, 0, 0, .05)",
  borderRadius: "0px 0px 0px 12px",
});

const HeaderContainer = styled.div({
  display: "block",
  width: "calc(100% - 130px)",
  marginRight: "20px",
});

const UpperHeader = styled.div({
  display: "flex",
  justifyContent: "space-between",
});

const LowerHeader = styled.div({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "15px",
});

const Member = styled.div({
  color: "#4D5767",
  fontSize: "20px",
  fontWeight: 600,
  paddingTop: "10px",
});

const ShortlistDiv = styled.div({
  display: "flex",
  gap: "40px",
  alignItems: "center",
});

const GreyColor = styled.span({
  color: "#515A6A",
});

const GreenColor = styled.span({
  color: "#0097A2",
});

const OrderBy = styled.div({
  display: "flex",
  marginBottom: "15px",
});

const Asc = styled.div({
  borderRadius: "20px 0px 0px 20px",
  display: "flex",
  alignItems: "center",
  width: "70px",
  padding: "5px 0px",
  paddingLeft: "10px",
  color: "#515A6A",
  backgroundColor: "#D4D6D9",
  cursor: "pointer",
});

const Dsc = styled.div({
  borderRadius: "0px 20px 20px 0px",
  display: "flex",
  alignItems: "center",
  width: "70px",
  padding: "5px 0px",
  paddingLeft: "10px",
  backgroundColor: "#515A6A",
  color: "#D4D6D9",
  cursor: "pointer",
});

const SortedByDiv = styled.div({
  display: "block",
  position: "relative",
  width: "200px",
});

const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 150px;
  padding-top: 15px;
`;

const SwitchContainer = styled.div<SwitchContainerProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props.isOn ? "#0097a2" : "#ccc")};
  border-radius: 30px; /* Adjusted to match handle size */
  width: 72px; /* Increased width */
  height: 30px; /* Increased height */
  position: relative;
  transition: background-color 0.3s;
`;

const SwitchHandle = styled.div<SwitchHandleProps>`
  width: 36px;
  height: 36px;
  background-color: #172c4c;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: ${(props) => (props.isOn ? "50px" : "-5px")}; /* Adjusted positions */
  transform: translateY(-50%);
  transition: left 0.3s;
`;

const ItemContainer = styled.div({
  display: "flex",
  justifyContent: "end",
  gap: "10px",
});

const BorderStraight = styled.div({
  borderLeft: "1px solid black",
});

const FlexDiv = styled.div({
  display: "flex",
  gap: "10px",
});

const MemberContainer = styled.div({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  padding: "20px",
  overflowX: "hidden",
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
  display: flex;
  align-items: center;
`;

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

const Memberanalytics = () => {
  const { state } = useMemberAnalytics();
  const [urlState, seturlState] = useUrlSearchState(defaults);
  const [filterData, setFilterData] = useState<List[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(2);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isShortlistDialog, setIsShortlistDialog] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const { logout, userData, typeId } = useContext(AuthContext);

  const handleSwitchToggle = () => {
    // setIsOn(prevState => !prevState);
    seturlState({ ...urlState, isOn: !urlState.isOn });
  };

  const ShortListDialogOpener = () => {
    setIsShortlistDialog(true);
  };

  const ShortListDialogClose = () => {
    setIsShortlistDialog(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
  }, [urlState.page]);

  const handlePageChange = (page1: number) => {
    if (page !== page1) {
      setIsVisible(false);
    }
    seturlState({ ...urlState, page: page1 });
    setPage(page1);
  };

  const searchHandler = (value: string) => {
    seturlState({ ...urlState, searchTerm: value, page: 1 });
    state.searchTerm = value;
    state.page = 1;
  };

  const candidateTypeHandler = (value: string | undefined) => {
    seturlState({
      ...urlState,
      memberType: value !== undefined ? value : "",
      page: 1,
    });
    state.memberType = value !== undefined ? value : "";
    state.page = 1;
  };

  const countryTypeHandler = (value: number) => {
    seturlState({ ...urlState, countryId: value, page: 1 });
    setPage(1);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [urlState]);

  const fetchData = async () => {
    const result = await MemberAnalyticsList(
      urlState.page,
      userData ? userData.Id : 0,
      typeId ? parseInt(typeId) : 0,
      urlState.isResume,
      urlState.isPersonalityTest,
      urlState.sortOrder,
      urlState.isProfilePhoto,
      urlState.orderedBy,
      urlState.searchTerm,
      urlState.countryId,
      urlState.memberType
    );
    result && setFilterData(result.items);
    result && setPage(result.page);
    if (result && result.totalCount === 0) {
      setCount(0);
      setTotalPages(0);
    }
    result && setCount(result.totalCount);
    result && setTotalPages(Math.ceil(result.totalCount / 6));
  };

  const userlistHandler = (list: ShortlistProps[], userId: number) => {
    const response = filterData.map((item) =>
      item.userId === userId ? { ...item, shortlist: list } : item
    );
    setFilterData(response);
  };

  const navigate = useNavigate();

  const goToUser = (userId: number) => {
    state.isResume = urlState.isResume;
    state.isPersonalityTest = urlState.isPersonalityTest;
    state.isProfilePhoto = urlState.isProfilePhoto;
    state.orderedBy = urlState.orderedBy;
    state.searchTerm = urlState.searchTerm;
    state.countryId = urlState.countryId;
    state.memberType = urlState.memberType;
    state.sortOrder = urlState.sortOrder;
    state.orderedBy = urlState.orderedBy;
    state.sortBy = urlState.sortBy;
    state.isOn = urlState.isOn;
    state.page = urlState.page;
    navigate(`/profile/${userId}`);
  };

  const goToShortlist = () => {
    state.isResume = urlState.isResume;
    state.isPersonalityTest = urlState.isPersonalityTest;
    state.isProfilePhoto = urlState.isProfilePhoto;
    state.orderedBy = urlState.orderedBy;
    state.searchTerm = urlState.searchTerm;
    state.countryId = urlState.countryId;
    state.memberType = urlState.memberType;
    state.sortOrder = urlState.sortOrder;
    state.orderedBy = urlState.orderedBy;
    state.sortBy = urlState.sortBy;
    state.isOn = urlState.isOn;
    state.page = urlState.page;
    navigate(
      userData && userData.RoleId === 3
        ? ROUTES.CLIENT_DEFAULT_SHORTLIST
        : ROUTES.DEFAULT_SHORTLIST
    );
  };

  const goToNavigate = (route: string) => {
    state.isResume = urlState.isResume;
    state.isPersonalityTest = urlState.isPersonalityTest;
    state.isProfilePhoto = urlState.isProfilePhoto;
    state.orderedBy = urlState.orderedBy;
    state.searchTerm = urlState.searchTerm;
    state.countryId = urlState.countryId;
    state.memberType = urlState.memberType;
    state.sortOrder = urlState.sortOrder;
    state.orderedBy = urlState.orderedBy;
    state.sortBy = urlState.sortBy;
    state.isOn = urlState.isOn;
    state.page = urlState.page;
    navigate(route);
  };

  const [shortListstate, dispatch] = useReducer(shortlistReducer, intialState);

  return (
    <Container>
      {isShortlistDialog && (
        <Shortlist
          onClose={ShortListDialogClose}
          onUserlist={userlistHandler}
          state={shortListstate}
          dispatch={dispatch}
        />
      )}
      <Sidebar
        onSearchHandler={searchHandler}
        onCandidateTypeHandler={candidateTypeHandler}
        onCountryTypeHandler={countryTypeHandler}
        onNavigation={logout}
        searchString={state.searchTerm}
        memberType={state.memberType}
        countryId={state.countryId}
      />
      <RightContainer>
        <Header>
          <HeaderContainer>
            <UpperHeader>
              <div>
                <Member>Members</Member>
                <GreyColor>{count} member</GreyColor>
              </div>

              <ItemContainer>
                <ItemCard
                  color={urlState.isProfilePhoto ? "#172C4C" : "#0097a2"}
                  onClick={() => {
                    seturlState({
                      ...urlState,
                      isProfilePhoto: !urlState.isProfilePhoto,
                      page: 1,
                    });
                  }}
                >
                  Profile Photo{" "}
                </ItemCard>
                <BorderStraight />
                <ItemCard
                  color={urlState.isPersonalityTest ? "#172C4C" : "#0097a2"}
                  onClick={() => {
                    seturlState({
                      ...urlState,
                      isPersonalityTest: !urlState.isPersonalityTest,
                      page: 1,
                    });
                  }}
                >
                  Personality Test
                </ItemCard>
                <BorderStraight />
                <ItemCard
                  color={urlState.isResume ? "#172C4C" : "#0097a2"}
                  onClick={() => {
                    seturlState({
                      ...urlState,
                      isResume: !urlState.isResume,
                      page: 1,
                    });
                  }}
                >
                  CV / Resume
                </ItemCard>
              </ItemContainer>
            </UpperHeader>
            <LowerHeader>
              <FlexDiv>
                <ShortlistButton onClick={goToShortlist}>
                  View Shortlist
                </ShortlistButton>
                {userData && userData.RoleId === 2 && (
                  <ShortlistButton
                    onClick={() => {
                      goToNavigate(ROUTES.CLIENT_LIST);
                    }}
                  >
                    My Client
                  </ShortlistButton>
                )}
              </FlexDiv>
              <ShortlistDiv>
                <SortedByDiv>
                  <div style={{ position: "absolute" }}>
                    <GreyColor>Sort By </GreyColor>
                    <GreenColor>{urlState.sortBy}</GreenColor>
                  </div>

                  <ReactSelect
                    options={SortTypes}
                    placeholder=""
                    hideInput
                    name="countryId"
                    onChange={(e, value) => {
                      seturlState({
                        ...urlState,
                        sortBy: value.label,
                        orderedBy: value.value,
                      });
                    }}
                  />
                </SortedByDiv>
                <OrderBy>
                  <Asc
                    onClick={() => {
                      seturlState({ ...urlState, sortOrder: "asc" });
                    }}
                  >
                    ASC {urlState.sortOrder === "asc" && <DoneIcon />}
                  </Asc>
                  <Dsc
                    onClick={() => {
                      seturlState({ ...urlState, sortOrder: "desc" });
                    }}
                  >
                    DESC {urlState.sortOrder === "desc" && <DoneIcon />}
                  </Dsc>
                </OrderBy>
              </ShortlistDiv>
            </LowerHeader>
          </HeaderContainer>
          <SwitchWrapper>
            <SwitchContainer onClick={handleSwitchToggle} isOn={urlState.isOn}>
              <SwitchHandle isOn={urlState.isOn} />
            </SwitchContainer>
            <label>Names/Anonymous</label>
          </SwitchWrapper>
        </Header>
        <MemberContainer>
          {filterData &&
            filterData.map((item: List, index: number) => (
              <MemberCard
                isVisible={isVisible}
                index={index}
                item={item}
                isOn={urlState.isOn}
                onUser={goToUser}
                onShortlistOpener={ShortListDialogOpener}
                dispatch={dispatch}
                state={shortListstate}
              />
            ))}
        </MemberContainer>
        {count > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </RightContainer>
    </Container>
  );
};
export default Memberanalytics;
