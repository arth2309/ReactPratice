import styled from "styled-components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useParams } from "react-router-dom";
import {
  getClientDetail,
  sendInvitationLink,
} from "../../services/AdminService";
import { useEffect, useState } from "react";
import { ViewClientProps } from "../../interface/Interface";
import profile from "../../assests/img/profile_placeholder-3x.png";
import { ToastComponent } from "../../components/layout/ToastComponent/Toastcomponent";

const Container = styled.div({
  display: "flex",
});

const SideBarContainer = styled.div({
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
  alignItems: "center",
});

const BackArrowButton = styled.div({
  display: "flex",
  gap: "3px",
  alignItems: "center",
  color: "#008892",
  cursor: "pointer",
});

const ProfilePhoto = styled.img({
  borderRadius: "50%",
  height: "168px",
  width: "168px",
  background: "white",
  border: "4px solid #43c88a",
});

const SaveButton = styled.button({
  backgroundColor: "#72DBD0",
  padding: "12px 26px",
  fontSize: "15px",
  fontWeight: 700,
  borderRadius: "10px",

  "&:hover": {
    backgroundColor: "#3CD0C3",
  },
});

const DetailDiv = styled.div({
  display: "flex",
  width: "100%",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
});

const DetailDec = styled.div({
  fontSize: "16px",
  color: "#5f6163ad",
});

const ClientProfile = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (clientId) {
      const response = await getClientDetail(parseInt(clientId));
      response && setClientDetail(response);
      response &&
        response.profilePhoto &&
        setImageSrc(`data:image/jpeg;base64,${response.profilePhoto}`);
    }
  };

  const [clientDetail, setClientDetail] = useState<ViewClientProps>({
    id: 0,
    lastName: "",
    firstName: "",
    countryName: "",
    organisationCode: "",
    email: "",
    profilePhoto: null,
    isActive: false,
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  return (
    <Container>
      <ToastComponent />
      <div>
        <SideBarContainer>
          <Title>
            <BackArrowButton
              onClick={() => {
                navigate(ROUTES.CLIENT_LIST);
              }}
            >
              <ArrowBackIosNewIcon />
              Back
            </BackArrowButton>
            {!clientDetail.isActive && (
              <SaveButton
                onClick={async () => {
                  await sendInvitationLink(clientDetail.email);
                }}
              >
                Send Invitation
              </SaveButton>
            )}
          </Title>

          <MainContainer>
            <ProfilePhoto src={imageSrc || profile} alt="profile-photo" />
            <div>{clientDetail.firstName + " " + clientDetail.lastName}</div>
            <div>{clientDetail.email}</div>
            <div>{clientDetail.countryName}</div>
            <div>{clientDetail.organisationCode}</div>
          </MainContainer>
        </SideBarContainer>
      </div>
      <DetailDiv>
        <DetailDec>
          Please provide the Client details in order to create the profile.
        </DetailDec>
      </DetailDiv>
    </Container>
  );
};

export default ClientProfile;
