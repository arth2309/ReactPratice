import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { ReactSelect } from '../../components/layout/form/Select';
import { OptionTypes } from '../../interface/Interface';
import chartImage from '../../assests/img/competency-test-analytics.png';
import { Competency,UserCompetency } from '../../interface/Interface';

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
    competencies : Competency[] | null;
    candidates : UserCompetency[] | null;
  }
 
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
   height: 815px;
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
    height: 674px;
    top: -38px;
    padding-right: 80px;
`;

const Create = styled.div`
   position: absolute;
    top: 102px;
    padding-left: 232px;
    rotate: 48deg;
    color: white;
    font-size: 30px;
    font-weight: 600;`

    const Collaborate = styled.div`
    position: absolute;
    top: 58px;
    padding-right: 354px;
    rotate: -46deg;
    color: white;
    font-size: 24px;
    font-weight: 600;`

    const Control = styled.div`
     position: absolute;
    top: 495px;
    padding-right: 316px;
    rotate: 44deg;
    color: white;
    font-size: 25px;
    font-weight: 600;`

     const Compete = styled.div`
    position: absolute;
    top: 430px;
    padding-left: 148px;
    rotate: -36deg;
    color: white;
    font-size: 25px;
    font-weight: 600;`

const ImageContainer = styled.div`
  display: flex;
    justify-content: center;
    margin-top: 30px;
    position: absolute;
    height: 468px;
    top: 34px;
    padding-right: 53px;
`;

const radarOptions = {
  scales: {
    r: {
       grid : {
          display : false,
       },
      angleLines: {
        display: false,
      },
      suggestedMin: 0,
      suggestedMax: 5,
      ticks: {
        display: false,
        color : 'red'
      } 
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    
  },

 
};



const Compentencytestanalytics: React.FC<ModalProps> = ({ isOpen, onClose,competencies,candidates }) => {
 
  const [filteredData, setFilteredData] = useState<any[]>([]);
  useEffect(() => {setFilteredData([])},[isOpen])
  const radarData = {
    labels: competencies?.map(c => c.title),
    datasets: filteredData.map(candidate => ({
      data: candidate.compentencies,
      label: candidate.name,
      fill : true,
      backgroundColor: 'red', 
      defaultBackgroundColor : 'red',
      hoverBackgroundColor: 'blue',
      borderColor: ['green','blue'],
      // hoverBorderColor : ['red','orange'],
      borderWidth: 1,
      pointBackgroundColor: 'rgba(0, 123, 255, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',

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
              options={candidates?.map(candidate => ({ label: candidate.name, value: candidate.id }))}
              name="test"
              isMulti
              onChange={(e,value) => {
                const ids : number[] = value.map((option : OptionTypes) => option.value);
                const newFilteredData =candidates?.filter(candidate => 
                     ids.includes(candidate.id));
                     newFilteredData &&  setFilteredData(newFilteredData);
                   
              }}
            />
          </SelectContainer>
          <Container>
            <ImageContainer>
              <img src={chartImage} alt="chartimage" />
            </ImageContainer>
            <Collaborate>COLLABORATE</Collaborate>
            <Create>CREATE</Create>
            <Control>CONTROL</Control>
            <Compete>COMPETE</Compete>
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
