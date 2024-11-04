import { useState, useEffect } from "react";
import Header from "../../components/layout/header/Header";
import Banner from "./Banner";
import Memberinterestanalysis from "./Memberinterestanalysis";
import Testinterestanalysis from "./Testinterestanalysis";
import { CourseInterest, ChartData } from "../../interface/Interface";
import {
  getCourseInterest,
  getChartData,
} from "../../services/IdealCoursesServices";
import { useApi } from "../../store/ReducerContext";

const Useranalysis = () => {
  const [courseInterest, setCourseInterest] = useState<CourseInterest[]>();

  const [chartData, setChartData] = useState<ChartData>({
    id: 1,
    a: 1,
    s: 1,
    c: 1,
    i: 1,
    r: 1,
    e: 1,
    career_code: "asi",
  });

  useEffect(() => {
    if (state.chartDetail) {
      setChartData(state.chartDetail);
      state.courseInterestDetails &&
        setCourseInterest(state.courseInterestDetails);
    } else {
      fetchData();
    }
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      const result = await getCourseInterest();
      const result1 = await getChartData();
      result && setCourseInterest(result);
      result1 && setChartData(result1);
    } catch (error) {}
  };

  const { state } = useApi();

  return (
    <div>
      <Header />
      <Banner />
      <Memberinterestanalysis
        courseInterest={courseInterest}
        chartData={chartData}
      />
      <Testinterestanalysis
        courseInterest={courseInterest}
        chartData={chartData}
      />
    </div>
  );
};

export default Useranalysis;
