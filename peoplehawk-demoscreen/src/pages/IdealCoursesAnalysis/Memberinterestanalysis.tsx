import Accordion from "../../components/layout/accordion/Accordion";
import Memberinterestanalysischart from "./Memberinterestanalysischart";
import "./Memberinterestanalysis.css";
import "../../stylesheets/obviously-font.css";
import { CourseInterestData } from "../../IdealCourseInterests";
import { Heading, MainContent } from "./styled";





const Memberinterestanalysis  = (props : any ) => {

  const {courseInterest ,chartData} = props
 
  const array = CourseInterestData.sort((a : any, b : any) => chartData.career_code.indexOf(a.name.charAt(0).toUpperCase()) - chartData.career_code.indexOf(b.name.charAt(0).toUpperCase())).slice(3,6);
  return (
    <>
      <Accordion open={true} title="Member Interests Test Results:">
        <Heading>Member Interests Analysis</Heading>
        <MainContent>
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
        <div className="react-chartjs-2 " style={{height : '263px'}}>
          <Memberinterestanalysischart courseInterest = {courseInterest} chartData = {chartData}  />
         

        </div>
        <div>Your top 3 interest areas are <b>{array[0].name}, {array[1].name} and {array[2].name}</b></div>
      </div>
      </MainContent>
      </Accordion>
     
    </>
  );
};

export default Memberinterestanalysis;
