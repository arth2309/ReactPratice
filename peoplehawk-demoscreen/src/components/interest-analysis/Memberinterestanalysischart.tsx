import { Chart} from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { Bar} from "react-chartjs-2";
import { CourseInterestData } from "../../IdealCourseInterests";
import { CourseInterest } from "../../IdealCourseInterests"

Chart.register(CategoryScale);

const Memberinterestanalysischart = () => {

   const description = [
        'A preference for activities that entail the explicit, ordered, or systematic manipulation \nof objects, tools, machines, and animals.',
        'A preference for activities that entail the observational, symbolic, systematic and creative investigation of \nphysical, biological, and cultural phenomena (in order to understand and control such phenomena). ',
        'A preference for ambiguous, free, unsystematised activities that entail the manipulation of \nphysical, verbal, or human materials to create art forms or products.',
        'A preference for activities that entail the manipulation \nof others to inform, train, develop, cure, or enlighten.',
        'A preference for activities that entail the manipulation of others to attain \norganisation goals or economic gain.',
        'Prefers structured data tasks, including record-keeping, filing, reproducing materials, \nand organizing business machines for organizational or economic goals.',
      ]

     

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    onClick: (event : any, elements : any) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index;
        // Call different functions based on clicked bar index
        switch (clickedIndex) {
          case 0:
            console.log(elements);
            break;
          case 1:
            console.log('hii 1');
            break;
          // Add more cases as needed
          default:
            break;
        }
      }
    },
    
  indexAxis : 'y' as const,

  scales : {
    y: {
      ticks: {
        color: CourseInterestData.map((item : CourseInterest) => item.color1), 
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
    labels: CourseInterestData.map((item : CourseInterest) => item.name), 

    

    datasets: [
      {
       
        backgroundColor: CourseInterestData.map((item : CourseInterest) => item.color1),
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: CourseInterestData.map((item : CourseInterest) => item.color2),
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [84, 81.9, 81.9,82.5,82.35, 82.69] 



      }
    ]

  };

  



  return (
    <Bar data={data} options={options}  />
  );
};

export default Memberinterestanalysischart;
