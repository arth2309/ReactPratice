import Collapsible from "../UI/Collapsible";
import "./Memberinterestanalysis.css";
import "../stylesheets/obviously-font.css";
import "../stylesheets/app.css"
import social from "../../assests/img/social.png";
import artistic from "../../assests/img/artistic.png";
import enterprise from "../../assests/img/enterprising.png";
import conventional from "../../assests/img/conventional.png";
import realistic from "../../assests/img/realistic.png";
import investigate from "../../assests/img/investigate.png";
import { CourseInterest, CourseInterestData } from "../../IdealCourseInterests";
import { useState } from "react";
import Hotspot from "./Hotspot";
import Diamond from '../../assests/img/vector-diamond.svg'
import idealCourse from '../../assests/img/ideal.png'
import { CourseInterest as Course } from "../../type";


const Testinterestanalysis = (props : any) => {
  

  const {courseInterest} = props 

  const [analysisData, setAnalysisData] = useState<CourseInterest>(
    CourseInterestData[0]
  );

  const cardHandler = (item: string) => {
   
    const data = courseInterest.find((data : Course) => data.name === item);
    

    if (data) {
      setAnalysisData(data);
    }
  };

  const object = {
    A: 84,
    C: 81.92,
    E: 80.67,
    I: 82.5,
    R: 82.35,
    S: 82.69,
    career_code: "ASI",
    created_at: "2024-02-22 11:28:23",
    id: 10,
  };

  const array = CourseInterestData.sort(
    (a, b) =>
      object.career_code.indexOf(a.name.charAt(0).toUpperCase()) -
      object.career_code.indexOf(b.name.charAt(0).toUpperCase())
  ).slice(3, 6);

  return (
    <Collapsible open={false} title="Member Interests Test Results:">
      <div className="main-content">
        <div className="w-50">
          <div className="heading">Learn what you Love</div>
          If you are geniunely interested in what you study you fill find the
          course more enjoyable be more motivated to learn and develop relevant
          skills. andoverco
          <div  className="m-5">
           <strong> Explore Interests and courses : </strong>
          <div className="ab">
            
              <img
                src={social}
                alt="social"
                className="chart-slice"
                style={{
                  opacity: array.some((item) => item.name === "SOCIAL")
                    ? 1
                    : 0.5,
                }}
              />

              <img
                src={artistic}
                alt="artistic"
                className="chart-slice"
                style={{
                  opacity: array.some((item) => item.name === "ARTISTIC")
                    ? 1
                    : 0.5,
                }}
              />
              <img
                src={conventional}
                alt="conventional"
                className="chart-slice"
                style={{
                  opacity: array.some((item) => item.name === "CONVENTIONAL")
                    ? 1
                    : 0.5,
                }}
              />
              <img
                src={realistic}
                alt="realistic"
                className="chart-slice"
                style={{
                  opacity: array.some((item) => item.name === "REALISTIC")
                    ? 1
                    : 0.5,
                }}
              />
              <img
                src={investigate}
                alt="investigate"
                className="chart-slice"
                style={{
                  opacity: array.some((item) => item.name === "INVESTIGATIVE")
                    ? 1
                    : 0.5,
                }}
              />
              <img
                src={enterprise}
                alt="enterprise"
                className="chart-slice"
                style={{
                  opacity: array.some((item) => item.name === "ENTERPRISE")
                    ? 1
                    : 0.5,
                }}
              />
              <img src={idealCourse} alt = 'ideal' className="icon" />
              <Hotspot onCardHandler={cardHandler} />
           
          </div>
          <div className="d-flex" style={{justifyContent:'center', marginTop : '10px'}}>
          Click Slice to get more information about the interest and related courses
          </div>
          </div>
        </div>
        <div className="w-50">
          <div className="result-heading">Your top 3 results</div>
          {/* <div style={{ height: "135px" }}>
            <Testinterestanalysischart onCardHandler={cardHandler} />
          </div> */}
          {array.map((item) => <div className="progress-wrapper">
    <div className="progress-label" style={{color : item.color1 }}>{item.name}</div>
    <div className="progress-bar" onClick={() => cardHandler(item.name)}>
        <div className="progress" style={{width: '80%', backgroundColor : item.color1}}>80%</div>
    </div>
</div> )}
          
          <div className="main-card">
            <div style={{ backgroundColor: analysisData.color1 }}>
              <div className="p">
                <div className="d-flex justify-content-between" >
                  <div>
                  <strong>{analysisData.name}</strong>
                  </div>
                  <div>
                  {array[0].name === analysisData.name ?<img src={Diamond} alt = 'diamond' />: null }  
                  </div>
                  </div>
                <div  style={{ marginTop: "10px" }}>
                  {analysisData.description}
                </div>
                <div>
                <div style={{marginTop : '25px'}}>
                  <strong >You are:</strong>
                  </div>
                  <div className="flex-wrap">
                  {analysisData.features.split(",").map((item, index) => (
                    <div className="item-card" key={index}>
                     <strong>{item}</strong> 
                    </div>
                  ))}
                  </div>
                </div>
                <div>
                  <div style={{marginTop : '25px'}}>
                  <strong >You Like to:</strong>
                  </div>
                  <div className="flex-wrap">
                  {analysisData.likes.split(",").map((item, index) => (
                    <div className="item-card" key={index}>
                     <strong>{item}</strong> 
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: analysisData.color2 }}>
              <div className="p">
                <strong>Courses to Consider(click to search)</strong>
                <ul>
                {analysisData.courses.split(",").map((item, index) => (
                  <li key={index}>
                    <strong>{item}</strong> 
                  </li>
                ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Collapsible>
  );
};

export default Testinterestanalysis;
