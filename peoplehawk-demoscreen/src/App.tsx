import React from 'react';
import './App.css';
import Header from './components/analysis/header/Header';
import Banner from './components/analysis/Banner/Banner';
import Memberinterestanalysis from './components/interest-analysis/Memberinterestanalysis';
import Testinterestanalysis from './components/interest-analysis/Testinterestanalysis';
import { useEffect,useState } from 'react';
import { getCourseInterest , getChartData } from './API/apiClient';
import { CourseInterest,ChartData } from './type';

function App() {


  const [courseInterest,setCourseInterest] = useState<CourseInterest[]>([{
    id : 1,
    name: "ARTISTIC",
    description: "Artistic types (Creators): tend to think outside the box and to come up with innovative ideas.",
    features: "Expressive, Imaginative, Free-spirited",
    likes: "see things from Different Perspectives",
    courses: "Fine Arts, Graphic Design, Music, Media, Interior Design, Architecture, Communications",
    color1 : "#2e6747",
    color2 : "#58856c",

  }]);
  const [chartData,setChartData] = useState<ChartData>({ id : 1, a : 1, s : 1, c : 1, i : 1, r : 1,e : 1, career_code : 'asi'});

  useEffect(() => {
    fetchData();

  },[])

  const fetchData = async () => {
    try {
      const result = await getCourseInterest<CourseInterest[]>(``);
      const result1 = await getChartData<ChartData>(`/${1}`);

      result && setCourseInterest(result);
      result1 && setChartData(result1);
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='App' >
     <Header />
     <Banner />
     <Memberinterestanalysis courseInterest = {courseInterest} chartData = {chartData} />
     <Testinterestanalysis courseInterest = {courseInterest} chartData = {chartData} />
    </div>
  );
}

export default App;
