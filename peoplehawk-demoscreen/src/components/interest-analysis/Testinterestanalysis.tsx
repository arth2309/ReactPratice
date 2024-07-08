import Collapsible from "../UI/Collapsible";
import "./Memberinterestanalysis.css";
import "../stylesheets/obviously-font.css";
import hotspot from "../../assests/img/hotspots.svg";
import social from '../../assests/img/social.png'
import artistic from "../../assests/img/artistic.png"
import enterprise from "../../assests/img/enterprising.png"
import conventional from "../../assests/img/conventional.png"
import realistic from '../../assests/img/realistic.png'
import investigate from '../../assests/img/investigate.png'

const Testinterestanalysis = () => {
  return (
    <Collapsible open={false} title="Member Interests Test Results:">
      <div className="heading">Learn what you Love</div>
      <div className="main-content">
        <div className="w-50">
          If you are geniunely interested in what you study you fill find the
          course more enjoyable be more motivated to learn and develop relevant
          skills. andoverco
           <div className="ab">
            <div>
           {/* <img src={hotspot} alt="hotspot"  /> */}
           <img src={social} alt="hotspot"  className="chart-slice" />
           <img src={artistic} alt="hotspot"className="chart-slice"  />
           <img src={conventional} alt="hotspot" className="chart-slice" />
           <img src={realistic} alt="hotspot" className="chart-slice" />
           <img src={investigate} alt="hotspot"className="chart-slice"  />
           <img src={enterprise} alt="hotspot" className="chart-slice"  />
           </div>
          
           </div>
          
        </div>
      </div>
    </Collapsible>
  );
};

export default Testinterestanalysis;
