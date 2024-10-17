import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

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

const MyClient = () => {
  const navigate = useNavigate();
  return (
    <Header>
      <div>My Clients</div>
      <AddClientButton
        onClick={() => {
          navigate(ROUTES.CLIENT_CREATE);
        }}
      >
        Add Client
      </AddClientButton>
    </Header>
  );
};

export default MyClient;
