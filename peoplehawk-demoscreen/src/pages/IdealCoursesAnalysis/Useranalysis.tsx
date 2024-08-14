import {useState,useEffect} from 'react';
import Header from "../../components/layout/header/Header";
import Banner from "./Banner";
import Memberinterestanalysis from "./Memberinterestanalysis";
import Testinterestanalysis from "./Testinterestanalysis";
import { CourseInterest,ChartData } from '../../interface/Interface';
import { getCourseInterest, getChartData } from '../../services/IdealCoursesServices';

const Useranalysis = () => {

    const [courseInterest, setCourseInterest] = useState<CourseInterest[]>([
        {
          id: 1,
          name: "ARTISTIC",
          description:
            "Artistic types (Creators): tend to think outside the box and to come up with innovative ideas.",
          features: "Expressive, Imaginative, Free-spirited",
          likes: "see things from Different Perspectives",
          courses:
            "Fine Arts, Graphic Design, Music, Media, Interior Design, Architecture, Communications",
          color1: "#2e6747",
          color2: "#58856c",
        },
      ]);

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
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const result = await getCourseInterest();
          const result1 = await getChartData();
    
          result && setCourseInterest(result);
          result1 && setChartData(result1);
        } catch (error) {}
      };

   return(
    <div>
     <Header />
     <Banner />
     <Memberinterestanalysis courseInterest = {courseInterest} chartData = {chartData} />
     <Testinterestanalysis courseInterest = {courseInterest} chartData = {chartData} />
    </div>
   )
}

export default Useranalysis