import Collapsible from "../UI/Collapsible";
import Memberinterestanalysischart from "./Memberinterestanalysischart";
import "./Memberinterestanalysis.css";
import "../stylesheets/obviously-font.css";
import { CourseInterestData } from "../../IdealCourseInterests";


const Memberinterestanalysis = () => {

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
  return (
    <>
      <Collapsible open={false} title="Member Interests Test Results:">
        <div className="heading">Member Interests Analysis</div>
        <div className="main-content">
        <div className="w-50">
          <div>
          Our Member Test uses a series of questions to understand your likes
          and dislikes. From these results we can scientifically meaure your
          score across six categroies and determine which courses would be best
          fit for you
          </div>
          <button className="button"><strong>Re-take Member test</strong></button>
        </div>
       <div className="w-50">
        <div  style={{height : '263px'}}>
          <Memberinterestanalysischart />
         

        </div>
        <div>Your top 3 interest areas are <b>{array[0].name}, {array[1].name} and {array[2].name}</b></div>
      </div>
      </div>
      </Collapsible>
     
    </>
  );
};

export default Memberinterestanalysis;
