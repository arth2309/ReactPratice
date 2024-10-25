import Sidebar from "./Sidebar";
import { intialState, shortlistReducer } from "../../store/ShortlistReducer";
import { useEffect, useReducer, useState, useContext } from "react";
import { styled } from "styled-components";
import Pagination from "../../components/layout/pagination/Pagination";
import { memberAnalyticsShortList } from "../../services/MemberAnalyticsService";
import {
  MemberAnalytics,
  Shortlist as ShortlistProps,
} from "../../interface/Interface";
import MemberCard from "../../components/layout/Member/MemberCard";
import { useNavigate, useParams } from "react-router-dom";
import Shortlist from "../../modals/Shortlist";
import { deleteShortlist } from "../../services/ShortlistService";
import { ROUTES } from "../../constants/routes";
import ConfirmDialog from "../../modals/ConfirmDialog";
import AuthContext from "../../store/AuthContext";

const FlexDiv = styled.div({
  display: "flex",
  gap: "20px",
});

const Header = styled.div({
  backgroundColor: "#F7F9FC",
  display: "flex",
  width: "calc(100% - 40px)",
  padding: "20px",
  height: "40px",
  boxShadow:
    "0 .125rem .25rem rgba(0, 0, 0, .075), 0 .25rem .5rem rgba(0, 0, 0, .05)",
  borderRadius: "0px 0px 0px 12px",
  justifyContent: "space-between",
  alignItems: "center",
});

const MemberContainer = styled.div({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  padding: "20px",
  overflowX: "hidden",
});

const DeleteShortlistButton = styled.button({
  backgroundColor: "#F7F9FC",
  padding: "12px 26px",
  fontSize: "15px",
  color: "#0097A2",
  border: "1px solid #eef2f6",
  borderRadius: "0px",
  fontWeight: 700,

  "&:hover": {
    border: "1px solid #0097A2",
  },
});

const MemberPaginationDiv = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "calc(100% - 120px)",
});

const MemberShortlist = () => {
  const [state, dispatch] = useReducer(shortlistReducer, intialState);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState<boolean>(false);
  const [isShortlistDialog, setIsShortlistDialog] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [filterData, setFilterData] = useState<MemberAnalytics[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { id } = useParams();

  const handlePageChange = (page1: number) => {
    if (page !== page1) {
      setIsVisible(false);
    }
    setPage(page1);
  };

  const shortListDialogOpener = () => {
    setIsShortlistDialog(true);
  };

  const shortListDialogClose = () => {
    setIsShortlistDialog(false);
  };

  const deleteDialogOpener = () => {
    setIsDeleteConfirm(true);
  };

  const deleteDialogClose = () => {
    setIsDeleteConfirm(false);
  };

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
    // eslint-disable-next-line
  }, [page, id]);

  const { userData, typeId } = useContext(AuthContext);

  const fetchData = async () => {
    if (id) {
      const result = await memberAnalyticsShortList(
        page,
        parseInt(id),
        userData ? userData.Id : 0,
        typeId ? parseInt(typeId) : 0
      );
      result && setFilterData(result.items);

      if (result && result.totalCount === 0) {
        setCount(0);
        setTotalPages(0);
      }
      result && setCount(result.totalCount);
      result && setTotalPages(Math.ceil(result.totalCount / 6));
    }
  };

  const navigate = useNavigate();

  const userlistHandler = async (list: ShortlistProps[], userId: number) => {
    await fetchData();
  };

  const goToUser = (userId: number) => {
    navigate(`/profile/${userId}`);
  };

  const deleteShortlistHandler = async () => {
    if (id) {
      const response = await deleteShortlist(parseInt(id));
      response && dispatch({ type: "DELETE_SHORTLIST", payload: parseInt(id) });
      response && navigate(ROUTES.DEFAULT_SHORTLIST);
      response && setFilterData([]);
      response && deleteDialogClose();
    }
  };

  return (
    <FlexDiv>
      {isShortlistDialog && (
        <Shortlist
          onClose={shortListDialogClose}
          onUserlist={userlistHandler}
          state={state}
          dispatch={dispatch}
        />
      )}
      {isDeleteConfirm && (
        <ConfirmDialog
          title="Delete!!"
          description="Are you sure you want to delete."
          onClose={deleteDialogClose}
          onConfirm={deleteShortlistHandler}
        />
      )}
      <Sidebar state={state} dispatch={dispatch} />
      <div style={{ width: "100%" }}>
        {id && (
          <Header>
            <div>{count} Member</div>
            <DeleteShortlistButton
              onClick={() => {
                deleteDialogOpener();
              }}
            >
              Delete Shortlist
            </DeleteShortlistButton>
          </Header>
        )}
        <MemberPaginationDiv>
          <MemberContainer>
            {filterData &&
              filterData.map((item, index) => (
                <MemberCard
                  isVisible={isVisible}
                  index={index}
                  item={item}
                  onUser={goToUser}
                  onShortlistOpener={shortListDialogOpener}
                  dispatch={dispatch}
                  state={state}
                />
              ))}
          </MemberContainer>
          {filterData.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </MemberPaginationDiv>
      </div>
    </FlexDiv>
  );
};

export default MemberShortlist;
