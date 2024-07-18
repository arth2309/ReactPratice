import React from 'react';
import { useEffect,useState } from 'react';
import { getCourseInterest , getChartData } from './API/apiClient';
import { CourseInterest,ChartData } from './type';
import Routes from './components/Routes';

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
      const result1 = await getChartData<ChartData>(`/${2}`);

      result && setCourseInterest(result);
      result1 && setChartData(result1);
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
   
     
     <Routes courseInterest = {courseInterest} chartData = {chartData} />

    
  );
}

export default App;
