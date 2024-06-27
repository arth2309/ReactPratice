import React from 'react';
import Chart from "react-chartjs-2";
import {Line} from "react-chartjs-2";


const Analysis = () =>
    {




        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sept','Oct','Nov','Dec'],
            datasets: [{
            label: 'Dataset 1',
            data: [20, 40, 20, 100, 80, 120,140,80,100,80,100,40],
            fill: true,
            backgroundColor: '#F9E9EA',
            borderColor: '#CA2D37'
           
            }]
            };
        
          return (
            <div>
              <h2>Bar Chart Example</h2>
              <Line data={data} typeof='category'/>
            </div>
          );
        };

    


    

export default Analysis

