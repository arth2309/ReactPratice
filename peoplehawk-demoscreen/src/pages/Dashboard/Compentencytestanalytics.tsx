import React, { useState, useEffect , memo} from 'react';
import { styled } from 'styled-components';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { ReactSelect } from '../../components/layout/form/Select';
import { OptionTypes } from '../../interface/Interface';
import chartImage from '../../assests/img/competency-test-analytics.png';
import { Competency,UserCompetency } from '../../interface/Interface';

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
   height: 603px;
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
  margin-top : -80px;
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

const ErrorMessage = styled.div`
font-size : 12px;
color : #FF9862;
margin-top : 1px`

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

  elements: {
    radar: {
      fill : true,
      backgroundColor: ['transparent','transparent','transparent'], 
      borderColor: ['red','green','blue'],
      hoverBackgroundColor:  ['red','green','blue'], 
      hoverBorderColor:  ['red','green','blue'],
    },
    point: {
      hoverBackgroundColor:  'white', 
      hoverBorderColor:  'white', 
    },
  },

  onHover
  :
  (event : any, chartElement : any) =>
  {    
  const
  chart = event.chart;    
 
      chart.data.datasets.forEach((dataset : any, i : any) =>
  {      
  if
  (chartElement.length) {        
 
          dataset.backgroundColor = dataset.backgroundColor
            ?
            ['red','green','blue']
            :
            ['transparent','transparent','transparent']
  ; }
  else
  {

  dataset.backgroundColor =
  ['transparent','transparent','transparent']
  ; } }); 
  chart.update();

  },
};

const Compentencytestanalytics: React.FC<ModalProps> = ({ isOpen, onClose,competencies,candidates }) => {

  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedoption,setSelectedOption] = useState<OptionTypes[] | null>(null);
  const [error,setError] = useState<string>('');

  useEffect(() => {setFilteredData([]);setSelectedOption(null)},[isOpen])
  const radarData = {
    labels: competencies?.map(c => c.title),
    datasets: filteredData.map(candidate => ({
      data: candidate.compentencies,
      label: candidate.name,
      fill : true,
      borderColor: ['red','green','blue'],
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
              value={selectedoption}
              showDropdownIndicator
              options={candidates?.map(candidate => ({ label: candidate.name, value: candidate.id }))}
              name="test"
              isMulti
              onChange={(e,value) => {
               
                if(value.length > 3)
                {
                      setError('Maximum 3 options are allowed');
                      return;
                }
                setSelectedOption(value);
                const ids : number[] = value.map((option : OptionTypes) => option.value);
                const newFilteredData =candidates?.filter(candidate => 
                     ids.includes(candidate.id));
                     newFilteredData &&  setFilteredData(newFilteredData);
                  setError('');
              }}
            />
            <ErrorMessage>{error}</ErrorMessage>
          </SelectContainer>
          <Container>
            <ImageContainer >
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

export default memo(Compentencytestanalytics);
