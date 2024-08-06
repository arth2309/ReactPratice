import { Chart} from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { Bar} from "react-chartjs-2";

import { CourseInterestData } from "../../IdealCourseInterests";
import { CourseInterest } from "../../IdealCourseInterests"

Chart.register(CategoryScale);

const Testinterestanalysischart = (props : any) => {

    const {onCardHandler} = props

    const object =  {
        A: 84,
        C: 81.92,
        E: 80.67,
        I: 82.5,
        R: 82.35,
        S: 82.69,
        career_code: "ASI",
        created_at: "2024-02-22 11:28:23",
        id: 10,
     }
    
      const array = CourseInterestData.sort((a, b) => object.career_code.indexOf(a.name.charAt(0).toUpperCase()) - object.career_code.indexOf(b.name.charAt(0).toUpperCase())).slice(3,6);

     

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    onClick: (event : any, elements : any) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index;
       
        onCardHandler(array[clickedIndex].name);
      }
    },
    
  indexAxis : 'y' as const,

  scales : {
    y: {
      ticks: {
        color: array.map((item : CourseInterest) => item.color1), 
      } as const, 

  }},
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          display: true,
          color: '#000',
          anchor: 'end',
          align: 'start',
          formatter: (value : any) => {
            return value.toFixed(2); 
          },
        },
        
        
      },
  };

  const data = {
    labels: array.map((item : CourseInterest) => item.name), 

    

    datasets: [
      {
       
        backgroundColor: array.map((item : CourseInterest) => item.color1),
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: array.map((item : CourseInterest) => item.color2),
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [82.5,82.35, 82.69] 



      }
    ]

  };

  



  return (
    <>
    <Bar data={data} options={options}  />
    


    </>
  );
};

export default Testinterestanalysischart;
