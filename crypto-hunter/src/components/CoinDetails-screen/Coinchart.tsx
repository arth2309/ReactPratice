import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart } from "chart.js/auto";
import { useEffect } from "react";
import { getChartData } from "../../API/apiClient";
import { coinChartDetails } from "../../Type";
import Moment from "react-moment";
Chart.register(CategoryScale);

const Coinchart = () => {

    useEffect(() => {
        fetchData();
       
      }, []);
    
      // eslint-disable-next-line
    
      const fetchData = async () => {
        try {
          const result : coinChartDetails = await getChartData<coinChartDetails>(`/bitcoin/market_chart?vs_currency=INR&days=1`); // Replace with your actual endpoint
          console.log(result.prices.map((item) => <Moment format="hh:mm A">{new Date(item[0])}</Moment>))
        } catch (error) {
          console.log(error);
        }
      };

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
         
          {
            label: "Second dataset",
            data: [33, 25, 35, 51, 54, 76],
            fill: false,
            borderColor: "#742774"
          }
        ]
      };

    return (

        <div style={{height : '600px', width : '500px'}}>
        <Line data={data} />
        </div>
    );

}

export default Coinchart;