import Sidebar from "./Sidebar";
import { intialState, shortlistReducer } from "../../store/ShortlistReducer";
import { useEffect, useReducer, useState } from "react";
import { styled } from "styled-components";
import Pagination from "../../components/layout/pagination/Pagination";
import { memberAnalyticsShortList } from "../../services/MemberAnalyticsService";
import {
  MemberAnalytics,
  Shortlist as ShortlistProps,
} from "../../interface/Interface";
import MemberCard from "../../components/layout/Member/MemberCard";
import { useNavigate } from "react-router-dom";
import Shortlist from "../../modals/Shortlist";

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
});

const MemberContainer = styled.div({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  padding: "20px",
  overflowX: "hidden",
});

const MemberShortlist = () => {
  const [state, dispatch] = useReducer(shortlistReducer, intialState);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(2);
  const [isShortlistDialog, setIsShortlistDialog] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [filterData, setFilterData] = useState<MemberAnalytics[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [shortlistId, setShortlistId] = useState<number>(0);

  const handlePageChange = (page1: number) => {
    if (page !== page1) {
      setIsVisible(false);
    }
    setPage(page1);
  };

  const ShortListDialogOpener = () => {
    setIsShortlistDialog(true);
  };

  const ShortListDialogClose = () => {
    setIsShortlistDialog(false);
  };

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
  }, [page, shortlistId]);

  const fetchData = async () => {
    const result = await memberAnalyticsShortList(page, shortlistId);
    result && setFilterData(result.items);
    if (result && result.totalCount === 0) {
      setCount(0);
      setTotalPages(0);
    }
    result && setCount(result.totalCount);
    result && setTotalPages(Math.ceil(result.totalCount / 6));
  };

  const navigate = useNavigate();

  const userlistHandler = (list: ShortlistProps[], userId: number) => {
    const response = filterData.filter((item) => item.userId !== userId);
    setFilterData(response);
  };

  const goToUser = (userId: number) => {
    navigate(`/profile/${userId}`);
  };

  const shortlistIdHandler = (shortlistId: number) => {
    setIsVisible(false);
    setShortlistId(shortlistId);
  };

  return (
    <FlexDiv>
      {isShortlistDialog && (
        <Shortlist
          onClose={ShortListDialogClose}
          onUserlist={userlistHandler}
          state={state}
          dispatch={dispatch}
        />
      )}
      <Sidebar
        state={state}
        dispatch={dispatch}
        onChangeShortlistId={shortlistIdHandler}
      />
      <div style={{ width: "100%" }}>
        <Header />
        <MemberContainer>
          {filterData &&
            filterData.map((item, index) => (
              <MemberCard
                isVisible={isVisible}
                index={index}
                item={item}
                onUser={goToUser}
                onShortlistOpener={ShortListDialogOpener}
                dispatch={dispatch}
                state={state}
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
      </div>
    </FlexDiv>
  );
};

export default MemberShortlist;
