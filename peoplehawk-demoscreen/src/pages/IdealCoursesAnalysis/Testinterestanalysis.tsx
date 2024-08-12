import Accordion from "../../components/layout/accordion/Accordion";
import "./Memberinterestanalysis.css";
import "../../stylesheets/obviously-font.css";
import social from "../../assests/img/social.png";
import artistic from "../../assests/img/artistic.png";
import enterprise from "../../assests/img/enterprising.png";
import conventional from "../../assests/img/conventional.png";
import realistic from "../../assests/img/realistic.png";
import investigate from "../../assests/img/investigate.png";
import { CourseInterest, CourseInterestData } from "../../IdealCourseInterests";
import { useState } from "react";
import Hotspot from "./Hotspot";
import Diamond from "../../assests/img/vector-diamond.svg";
import idealCourse from "../../assests/img/ideal.png";
import { CourseInterest as Course } from "../../interface/Interface";
import { Heading, MainContent } from "./styled";

const Testinterestanalysis = (props: any) => {
  const { courseInterest, chartData } = props;

  const [analysisData, setAnalysisData] = useState<CourseInterest>(
    CourseInterestData[0]
  );

  const cardHandler = (item: string) => {
    const data = courseInterest.find((data: Course) => data.name === item);

    if (data) {
      setAnalysisData(data);
    }
  };

  const selecteditems = ["a", "c", "e", "i", "r", "s"];

  const data1 = selecteditems
    .map((item) => chartData[item])
    .sort((a, b) => b - a)
    .slice(0, 3);

  const array = CourseInterestData.sort(
    (a, b) =>
      chartData.career_code.indexOf(a.name.charAt(0).toUpperCase()) -
      chartData.career_code.indexOf(b.name.charAt(0).toUpperCase())
  ).slice(3, 6);

  return (
    <Accordion open={true} title="Member Interests Test Results:">
      <MainContent>
        <div className="w-50">
          <Heading>Learn what you Love</Heading>
          If you are geniunely interested in what you study you fill find the
          course more enjoyable be more motivated to learn and develop relevant
          skills. andoverco
          <div className="m-5">
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
                  opacity: array.some((item) => item.name === "ENTERPRISING")
                    ? 1
                    : 0.5,
                }}
              />
              <img src={idealCourse} alt="ideal" className="icon" />
              <Hotspot onCardHandler={cardHandler} />
            </div>
            <div
              className="d-flex"
              style={{ justifyContent: "center", marginTop: "10px" }}
            >
              Click Slice to get more information about the interest and related
              courses
            </div>
          </div>
        </div>
        <div className="w-50">
          <div className="result-heading">Your top 3 results</div>
          {array.map((item, index) => (
            <div key={index} className="progress-wrapper">
              <div className="progress-label" style={{ color: item.color1 }}>
                {item.name}
              </div>
              <div
                className="progress-bar"
                onClick={() => cardHandler(item.name)}
              >
                <div
                  className="progress"
                  style={{
                    width: `${data1[index]}%`,
                    backgroundColor: item.color1,
                  }}
                >
                  {data1[index]}%
                </div>
              </div>
            </div>
          ))}

          <div className="main-card">
            <div
              style={{ backgroundColor: analysisData.color1 }}
              className=" main-card-top"
            >
              <div className="p">
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>{analysisData.name}</strong>
                  </div>
                  <div>
                    {array[0].name === analysisData.name ? (
                      <img src={Diamond} alt="diamond" />
                    ) : null}
                  </div>
                </div>
                <div style={{ marginTop: "10px" }}>
                  {analysisData.description}
                </div>
                <div>
                  <div style={{ marginTop: "25px" }}>
                    <strong>You are:</strong>
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
                  <div style={{ marginTop: "25px" }}>
                    <strong>You Like to:</strong>
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
            <div
              style={{ backgroundColor: analysisData.color2 }}
              className="main-card-bottom"
            >
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
      </MainContent>
    </Accordion>
  );
};

export default Testinterestanalysis;
