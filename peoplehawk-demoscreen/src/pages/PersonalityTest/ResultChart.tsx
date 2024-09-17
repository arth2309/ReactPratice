import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { FC } from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { CourseInterestData } from "../../IdealCourseInterests";
Chart.register(CategoryScale);

const label = ["Pioneer", "Broker", "Achiever", "Director", "Anchor"];

interface ChartProps {
  result: number[];
}

const Container = styled.div({
  height: "400px",
});

const ResultChart: FC<ChartProps> = ({ result }) => {
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

  return (
    <Container>
      <Bar data={data} options={options} />
    </Container>
  );
};

export default ResultChart;
