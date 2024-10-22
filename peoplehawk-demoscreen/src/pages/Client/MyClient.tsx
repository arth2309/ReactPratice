import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import ClientCard from "../../components/layout/Member/ClientCard";
import { getClientList } from "../../services/AdminService";
import { useEffect, useState } from "react";
import { ViewClientProps } from "../../interface/Interface";
import Pagination from "../../components/layout/pagination/Pagination";

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

const AddClientButton = styled.button({
  backgroundColor: "#72DBD0",
  padding: "12px 26px",
  fontSize: "15px",
  fontWeight: 700,
  borderRadius: "10px",

  "&:hover": {
    backgroundColor: "#3CD0C3",
  },
});

const MainDiv = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "calc(100vh - 120px)",
});

const MyClient = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<ViewClientProps[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getClientList(1);
    response && setList(response.items);
    response && setCount(response.totalCount);
    response && setPage(response.page);
    response &&
      setTotalPages(Math.ceil(response.totalCount / response.pageSize));
  };

  const handlePageChange = (page1: number) => {
    setPage(page1);
  };

  return (
    <>
      <Header>
        <div>
          <div style={{ fontWeight: 500, fontSize: "18px" }}>My Clients</div>
          {count + " Clients"}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <AddClientButton
            onClick={() => {
              navigate(ROUTES.CLIENT_CREATE);
            }}
          >
            Add Client
          </AddClientButton>
          <AddClientButton
            onClick={() => {
              navigate(ROUTES.MEMBER_ANALYTICS);
            }}
          >
            Back
          </AddClientButton>
        </div>
      </Header>
      <MainDiv>
        <div
          style={{
            display: "flex",
            padding: "30px 60px",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {list.map((item, index) => (
            <ClientCard item={item} key={index} />
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </MainDiv>
    </>
  );
};

export default MyClient;
