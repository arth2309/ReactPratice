import styled, { css, keyframes } from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import "../stylesheets/obviously-font.css";
import { CourseInterestData } from "../IdealCourseInterests";
import { useApi } from "../store/ReducerContext";
Chart.register(CategoryScale);

interface ModalProps {
  onClose: () => void;
  result: number[];
  index: number;
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

const ProfileContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

const label = ["Pioneer", "Broker", "Achiever", "Director", "Anchor"];

const Container = styled.div({
  height: "400px",
  width: "80%",
  backgroundColor: "white",
});

const Personalityresult: React.FC<ModalProps> = ({
  onClose,
  result,
  index,
}) => {
  const typeArray = [
    "Pioneer",
    "Broker",
    "Achiever",
    "Director",
    "Anchor",
    "None",
  ];

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    animation: {
      duration: 5000,
    },
    scales: {
      x: {
        ticks: {
          stepSize: 20,
        },
        min: 0,
        max: 100,
      },
      y: {
        ticks: {
          align: "center",
          color: CourseInterestData.map((item) => item.color1),
        } as const,
        min: 0,
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels: label,

    datasets: [
      {
        backgroundColor: CourseInterestData.map((item) => item.color1),
        hoverBackgroundColor: CourseInterestData.map((item) => item.color2),
        hoverBorderColor: "rgba(255,99,132,1)",
        data: result,
      },
    ],
  };

  const { state } = useApi();
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalClose onClick={onClose}>
            <HighlightOffOutlinedIcon fontSize="large" />
          </ModalClose>
          <Title>{state.firstName}'s Personality Result</Title>
        </ModalHeader>
        <ProfileContainer>
          <h4>
            {state.firstName}'s Personality Type is : {typeArray[index]}
          </h4>
          <Container>
            <Pie data={data} options={options} />
          </Container>
        </ProfileContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Personalityresult;
