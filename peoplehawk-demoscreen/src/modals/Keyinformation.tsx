import styled, { css, keyframes } from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useApi } from "../store/ReducerContext";
import "../stylesheets/obviously-font.css";

interface ModalProps {
  onClose: () => void;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  animation: ${css`
    ${fadeIn} 0.3s ease-in-out
  `};
`;

const ModalContent = styled.div`
  background: #b8dff5;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 600px;
  padding: 10px 20px 20px 20px;
  position: relative;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  animation: ${css`
    ${slideIn} 0.3s ease-in-out
  `};
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: obviously;
  font-size: 25px;
  color: #394456;
`;

const ModalClose = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
`;

const ModalBody = styled.div({
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "20px",
});

const DetailContainer = styled.div({
  display: "flex",
  width: "100%",
  marginTop: "10px",
});

const DetailCard = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "50%",
});

const CardTitle = styled.div({
  fontSize: "20px",
  fontWeight: 700,
  color: "#394456",
});

const Keyinformation: React.FC<ModalProps> = ({ onClose }) => {
  const { state } = useApi();
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalClose onClick={onClose}>
            <HighlightOffOutlinedIcon fontSize="large" />
          </ModalClose>
          <Title>Key Informatiom</Title>
        </ModalHeader>
        <ModalBody>
          <DetailContainer>
            <DetailCard>
              <CardTitle>MemberType :</CardTitle>
              <div>{state.memberType}</div>
            </DetailCard>
            <DetailCard>
              <CardTitle>PersonalityType :</CardTitle>
              <div>None</div>
            </DetailCard>
          </DetailContainer>
          <DetailContainer>
            <DetailCard>
              <CardTitle>Country :</CardTitle>
              <div>{state.countryName}</div>
            </DetailCard>
            <DetailCard>
              <CardTitle>MemberId :</CardTitle>
              <div>1</div>
            </DetailCard>
          </DetailContainer>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Keyinformation;
