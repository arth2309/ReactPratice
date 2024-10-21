import styled from "styled-components";
import profile from "../../../assests/img/profile_placeholder-3x.png";
import { ViewClientProps } from "../../../interface/Interface";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Card = styled.div(() => ({
  backgroundColor: "white",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  width: "300px",
  gap: "15px",
  padding: "20px",
  boxShadow:
    "0 .125rem .25rem rgba(0, 0, 0, .075), 0 .25rem .5rem rgba(0, 0, 0, .05)",
  "&:hover": {
    transform: `scale(1.05)`,
    boxShadow:
      "0 .25rem .5rem rgba(0, 0, 0, .15), 0 .5rem .75rem rgba(0, 0, 0, .1)",
    cursor: "pointer",
  },
}));

const MainCard = styled.div({
  display: "flex",
  width: "100%",
  gap: "10px",
  alignItems: "center",
});

const ImageCard = styled.img({
  height: "100px",
  width: "100px",
});

const NameDiv = styled.div({
  fontSize: "20px",
  fontWeight: 700,
  marginBottom: "15px",
});

interface ClientProps {
  item: ViewClientProps;
}

const ClientCard: FC<ClientProps> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`/client/${item.id}/profile`);
      }}
    >
      <MainCard>
        <ImageCard src={profile} alt="profile" />
        <div>
          <NameDiv>{item.firstName + " " + item.lastName}</NameDiv>
          <div style={{ fontFamily: "cursive" }}>{item.email}</div>
          <div style={{ fontFamily: "cursive" }}>{item.countryName}</div>
        </div>
      </MainCard>
    </Card>
  );
};

export default ClientCard;
