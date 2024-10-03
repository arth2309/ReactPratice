import styled, { css, keyframes } from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { getShortlist } from "../services/ShortlistService";
import { useEffect, useState } from "react";
import { Shortlist as ShortlistProps } from "../interface/Interface";

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
  background: #eef2f6;
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
  gap: 3px;
`;

const Title = styled.div`
  color: black;
  font-size: 20px;
  display: flex;
  font-weight: 900;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ModalClose = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: end;
  gap: 30px;
`;

const ConfirmButton = styled.button({
  backgroundColor: "#0097A2",
  padding: "12px 26px",
  fontSize: "15px",
  fontWeight: 700,
  borderRadius: "0px",

  "&:hover": {
    backgroundColor: "#00B0BA",
  },
});

const CancelButton = styled.button({
  backgroundColor: "#eef2f6",
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

const Shortlist: React.FC<ModalProps> = ({ onClose }) => {
  useEffect(() => {
    fetchData();
  }, []);
  const [shortlistData, setShortlistdata] = useState<ShortlistProps[]>([]);

  const fetchData = async () => {
    const response = await getShortlist();
    response && setShortlistdata(response);
  };
  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalClose onClick={onClose}>
            <HighlightOffOutlinedIcon fontSize="large" />
          </ModalClose>
          <Title>
            Add to Shortlist :<ConfirmButton>NEW SHORTLIST</ConfirmButton>
          </Title>
        </ModalHeader>
        <ModalBody>
          {shortlistData &&
            shortlistData.map((item, index) => (
              <div key={index}>{item.name}</div>
            ))}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Shortlist;
