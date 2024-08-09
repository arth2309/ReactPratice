import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { ReactSelect } from '../../components/layout/form/Select';
import { OptionTypes } from '../../interface/Interface';
import chartImage from '../../assests/img/competency-test-analytics.png';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  

// Mock data
const candidates = [
  { id: 6, name: 'Clare Thompson', competencies: [2.4, 2.26, 3.4, 3.82, 2, 2.72, 4.1, 2.8, 3.62, 3.4, 4.02, 1.4, 3, 1.4, 2.8, 1.8, 3.4, 3.2, 2.8, 3.1] },
  { id: 434, name: 'Nimesh Test', competencies: [4.56, 1, 5.56, 4.46, 1, 1, 1, 4.58, 4.6, 4.34, 4.42, 1, 4.58, 1, 3.86, 1, 4.6, 4.6, 4.6, 1] },
  { id: 99349, name: 'Nimeshedit Yadav', competencies: [2, 1.4, 2.8, 3, 1.6, 1.4, 1.2, 1.8, 1.8, 2.2, 2.4, 1.4, 2.4, 1.4, 2.2, 1.6, 2.4, 2.4, 2.8, 1.2] },
  { id: 99934, name: 'Kruti Candidate', competencies: [4.7, 4.54, 5.02, 5.02, 5.06, 4.74, 4.5, 4.62, 4.38, 4.72, 4.88, 4.92, 4.86, 4.64, 5.04, 4.74, 4.86, 4.9, 4.92, 4.36] }
];

const competencies = [
  { id: 1, title: "Knowing Yourself & Others" },
  { id: 2, title: "Communicating Clearly" },
  { id: 3, title: "Supporting Others" },
  { id: 4, title: "Leading Teams" },
  { id: 5, title: "Resolving Differences" },
  { id: 6, title: "Managing Information" },
  { id: 7, title: "Working With Different People" },
  { id: 8, title: "Organising Projects" },
  { id: 9, title: "Tracking Progress" },
  { id: 10, title: "Following Rules" },
  { id: 11, title: "Preparing & Presenting Plans" },
  { id: 12, title: "Setting Targets" },
  { id: 13, title: "Being Inspirational" },
  { id: 14, title: "Showing Initiative" },
  { id: 15, title: "Getting Results" },
  { id: 16, title: "Using Influence" },
  { id: 17, title: "Sharing Ideas" },
  { id: 18, title: "Being Creative" },
  { id: 19, title: "Getting Agreement" },
  { id: 20, title: "Welcoming Change" }
];

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #eef2f6;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 800px;
  padding: 20px 10px;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 600;
`;

const ModalClose = styled.button`
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 0px;
  background-color: #f96332;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const ModalBody = styled.div`
   height: 700px;
  overflow-y: auto;
`;

const SelectContainer = styled.div`
  display: block;
  margin-top: 20px;
  width: 75%;
  margin-bottom : 64px;
`;

const Container = styled.div`
 display : flex;
  position : relative;
  justify-content : center;
`;

const ChartContainer = styled.div`
   display: flex;
    justify-content: center;
    position: absolute;
    height: 722px;
    top: -64px;
    width: 889px;
`;

const ImageContainer = styled.div`
  display: flex;
    justify-content: center;
    margin-top: 30px;
    position: absolute;
    height: 466px;
    top: 34px;
    padding-right: 53px;
`;

const radarOptions = {
  scales: {
    r: {
      angleLines: {
        display: true,
      },
      suggestedMin: 0,
      suggestedMax: 5,
      ticks: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};



const Compentencytestanalytics: React.FC<ModalProps> = ({ isOpen, onClose }) => {
 
  const [filteredData, setFilteredData] = useState<any[]>([]);
  useEffect(() => {setFilteredData([])},[isOpen])
  const radarData = {
    labels: competencies.map(c => c.title),
    datasets: filteredData.map(candidate => ({
      data: candidate.competencies,
      label: candidate.name,
      backgroundColor: 'rgba(255, 99, 132, 0.2)', 
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    })),

  };

  if(!isOpen) {return null}

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>Competency Test Analytics</Title>
          <ModalClose onClick={onClose}>X</ModalClose>
        </ModalHeader>
        <ModalBody>
          <SelectContainer>
            <label>Find and Compare Members</label>
            <ReactSelect
              options={candidates.map(candidate => ({ label: candidate.name, value: candidate.id }))}
              name="test"
              isMulti
              onChange={(e,value) => {
                const ids : number[] = value.map((option : OptionTypes) => option.value);
                const newFilteredData =candidates.filter(candidate => 
                     ids.includes(candidate.id));
                  setFilteredData(newFilteredData);
                   
              }}
            />
          </SelectContainer>
          <Container>
            <ImageContainer>
              <img src={chartImage} alt="chartimage" />
            </ImageContainer>
            <ChartContainer>
              <Radar data={radarData} options={radarOptions} />
            </ChartContainer>
          </Container>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Compentencytestanalytics;
