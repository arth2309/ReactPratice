import { Chart} from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { Bar} from "react-chartjs-2";

import "./Memberinterestanalysis.css";
import { CourseInterest as Course } from '../../type';
Chart.register(CategoryScale);

const Memberinterestanalysischart = (props : any) => {

  const {courseInterest ,chartData} = props

   const description = [
        'A preference for activities that entail the explicit, ordered, or systematic manipulation \nof objects, tools, machines, and animals.',
        'A preference for activities that entail the observational, symbolic, systematic and creative investigation of \nphysical, biological, and cultural phenomena (in order to understand and control such phenomena). ',
        'A preference for ambiguous, free, unsystematised activities that entail the manipulation of \nphysical, verbal, or human materials to create art forms or products.',
        'A preference for activities that entail the manipulation \nof others to inform, train, develop, cure, or enlighten.',
        'A preference for activities that entail the manipulation of others to attain \norganisation goals or economic gain.',
        'Prefers structured data tasks, including record-keeping, filing, reproducing materials, \nand organizing business machines for organizational or economic goals.',
      ]

     const selecteditems = ['a','c','e','i','r','s']

     const data1 = selecteditems.map((item) => chartData[item]);
     console.log(data1);

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    
  indexAxis : 'y' as const,

  scales : {
    y: {
      ticks: {
        align: 'center',
        color: courseInterest.map((item : Course) => item.color1), 
      } as const, 

     

  }},
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem : any) {
                
              return description[tooltipItem.dataIndex];
            }
          }
        }
      },
  };

  const data = {
    labels: courseInterest.map((item : Course) => item.name), 

    

    datasets: [
      {
       
        backgroundColor: courseInterest.map((item : Course) => item.color1),
        hoverBackgroundColor: courseInterest.map((item : Course) => item.color2),
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: data1



      }
    ]

  };

  

  



  return (
    <Bar data={data} options={options}  />
  );
};

export default Memberinterestanalysischart;
